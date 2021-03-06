# TaintAssembly: Taint-Based Information FlowControl Tracking for WebAssembly

[The original paper associated with this project can be found here](TaintAssembly.pdf)
## Installation

This is a modification to the src files of the [V8 JavaScript Engine](https://www.github.com/v8/v8.git) that is used in Google Chrome, Chromium, NodeJS, etc. To prevent conflicts, this modification should be used on the the stable releases ```chromium/3270``` in the V8 repository and ```64.0.3270.2``` for chromium. 

To build, first fetch V8 using Google's depot_tools and reset the version to ```chromium/3270```. Then, replace the ```src``` folder with this repository, and build V8. The commands for performing a build are included below.

```
fetch v8
cd v8
git checkout chromium/3270
rm -rf src/
git clone https://www.github.com/wfus/WebAssembly-Taint src/
tools/dev/v8gen.py x64.release
ninja -C out.gn/x64.release -j72
```

## Usage

Since our flags are integrated into V8, you can view all of our flags and usage documentation with V8's built in debug shell ```./d8 --help```. However, since that shows all possible flags, we list the flags we have added to V8 below.  

### Starting V8 in Taint Mode
Using taint tracking with V8 and Chromium should be similar. First, to enable taint tracking, use the ```--wasm_taint``` V8 flag, which should automatically start V8 or Chromium in interpreted WASM mode.  


For Chromium
```
# Mac OSX
Chromium.app/Contents/MacOS/Chromium --js-flags="--wasm_taint"

# Chromium sandboxes its V8 wasm interpreter inside a NaCl sandbox even when
# not running the compiled version. Therefore, to log use this at your own risk!!!
Chromium.app/Contents/MacOS/Chromium --js-flags="--wasm_taint --taint_log=/my/logging/dir" --no-sandbox
```

For V8
```
out.gn/x64.release/d8 --wasm_taint example.js
```

For NodeJS
```
node --v8-options="--wasm_taint"
```

### Logging
```
--taint_log=<outdir> [default: no logging]
	Output file for logging purposes. Only logs when a wasm function returns a tainted
	value to JavaScript. If no argument is given, does not log. 
```

```
--taint_full_log [default: false]
	Fully logs all function calls including inputs and output WasmValues. For each
	WasmValue, it logs [ Value | Taint ] to taint_log's specified directory.
	Value will be printed normally, while taint is printed in hex. 
```


### Taint Options
Taint is currently implemented as a ```uint32_t```, or 32 bits that represent 32 unique taint tags. However, this can be easily changed by going into the ```src/frames.h``` and changing ```typedef uint32_t taint_t``` to ```typedef <YOUR_TYPE> taint_t```. 

If a WasmValue with any taint tag set returns to the JavaScript context, the JavaScript process will throw an error and exit. If you don't want the program to exit, but rather log, if certain taint tags are present, then set the flag ```wasm_kill```. 

```
--taint_kill=<input> [default: 0x00000000]
	Terminates execution if result returned from WebAssembly interpreter to 
	Javascript contains any of the taints specified in <input> (if r is result,
	kills if (r & <input>) is non-zero). Default option does not ever kill.
```

We are currently testing with using an ```std::unordered_map``` to store taint on the heap, which is currently not optimized. Therefore, the current heap tracking taint solution is an optional flag. 
```
--taint_heap [default: false]
	Enables tracking taint on the heap. Currently uses an unordered map that gets 
	cleared when the wasm context is deallocated. 
```

### Taint Lifetimes and Probabilistic Taint
We have a prototype option enabled for probabilistic taint. This takes in the parameters ```--taint_random```, which propagates specific taints with user-specified probablities. We use this as testing to avoid taint explosion for non-sensitive taint labels. We store the probability p that we propagate the taint value. 

```
--taint_random=<num_bits> [default: 0]
	Specifies the number of bits used to hold a probability p of propagation.
	The default, 0, means that probabilistic taint propagation is disabled. 
	Probabilities are stored as integers in <num_bits> most significant bits
	of the taint input, as an integer. 
		(p = taint >> (sizeof(taint_t) - <num_bits>) / (1 << <num_bits>) - 1))
	The taints will therefore only be the lower (sizeof(taint_t) - <num_bits>)
	bits, decreasing the total taint resolution. Taints will be passed in normally.  
```
<p align="center">
	<img src ="images/taint_t.png" />
</p>


For sensitive taint labels, like TAINT_CREDIT_CARD, we could set the p=255 (for <num_bits> = 8), and for labels like TAINT_GAME_DATA or TAINT_NETWORK_MESSAGE we could use p as a small integer. This allows us to see approximately how much contact several variables have had with certain non-sensitive information sources. For example


```nefariouscall.js```
```
var sekritkey = 13371337;
var r00db0y35NetMsg = 100291239123;

// Let's use the top 8 bits for probability (will pass as flag to d8/chromium/node)
var key_t = TAINT_KEY; 
var key_prob = 255  << (32 - 8);   // p=255/255, always propagate

var msg_t = TAINT_NETMSG;
var msg_prob = 5 << (32 - 8); // p = 5/255 chance of propagating

therudeboys.sendKey(sekritkey, r00db0y35NetMsg, key_t+key_prob, msg_t+msg_prob); 
```

```bash```
```
./d8 --wasm_taint --taint_random=8 nefariouscall.js 
```


## Modifying your Source Code 

In order to input taint into the source code, we implement function overloading as a way to enter in taint. For example, if we have a sample WASM function ```myfunction = exports._wasm_function``` with three integer parameters A, B, C,  

```
// Inputs three args with taints of 0x00000000
var out = myfunction(50, 100, 200);

// Input 50 has taint 0x000000f0, others have 0x00000000
var out = myfunction(50, 100, 200, 0x000000f0);

// The extra taint of 0x8 is thrown away, since more taints than params
var out = myfunction(1, 2, 3, 0x1, 0x2, 0x4, 0x8);
``` 

The upside of having taints passed in as extra variables to the signature is that the default version of V8 throws away the extra parameters without error. Therefore, you can test/run your taint modified scripts in both this custom V8 as well as regular V8.  

## Small note on most significant bit of taint

Because of V8's internal structure (Smi are stored as signed ints, 31 bits of int and most significant bit for sign), taints with the full 32 bits set will be noticably slower. Therefore, it is advisable to use the lower 31 bits unless necessary. We have created our system such that the most significant bit is the most rarely used.  

## Contributing/Authors

This taint tracking repository was made by [William Fu](https://www.github.com/wfus), [Daniel Inge](https://www.github.com/daninge98), and [Raymond Lin](https://www.github.com/raylin1000) for Harvard's CS263, System Security. If there are any issues, please submit an issue on Github or fork this repository!

   





