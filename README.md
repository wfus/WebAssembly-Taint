# TaintAssembly: Taint-Based Information FlowControl Tracking for WebAssembly

## Installation

This is a modification to the src files of the [V8 JavaScript Engine](https://www.github.com/v8/v8.git) that is used in Google Chrome, Chromium, NodeJS, etc. To prevent conflicts, this modification should be used on the the stable releases ```chromium/3270``` in the V8 repository and ```64.0.3270.2``` for chromium. To build, first fetch V8 using google's depot_tools. 

```
fetch v8
cd v8
git checkout chromium/3270
rm -rf src/
git clone https://www.github.com/wfus/WebAssembly-Taint src


# Build V8, preferably with the debug build
tools/dev/v8gen.py x64.debug
ninja -C out.gn/x64.debug -j4
```

This should store 

## Usage

Since our flags are integrated into V8, you can view all of our flags and usage documentation with V8's built in debug shell ```./d8 --help```. However, since that shows all possible flags, we list the flags we have added to V8 below. .  

### Starting V8 in Taint Mode
Using taint tracking with V8 and Chromium should be similar. First, to enable taint tracking, use the ```--wasm_taint``` V8 flag, which should automatically start V8 or Chromium in interpreted WASM mode.  


For Chromium
```
# Mac OSX
Chromium.app/Contents/MacOS/Chromium --js-flags="--wasm_taint"
```

For V8
```
out.gn/x64.debug/d8 --wasm_taint example.js
```

For NodeJS
```
node --v8-options="--wasm_taint"
```

### Logging
```
--taint_log <outdir> [default: no logging]
	Output file for logging purposes. If no argument is given, does not log. 
```

### Taint Options
Taint is currently implemented as a ```uint32_t```, or 32 bits that represent 32 unique taint tags. However, this can be easily changed by going into the ```src/frames.h``` and changing ```typedef uint32_t taint_t``` to ```typedef <YOUR_TYPE> taint_t```. 

If a WasmValue with any taint tag set returns to the JavaScript context, the JavaScript process will throw an error and exit. If you don't want the program to exit, but rather log, if certain taint tags are present, then set the flag ```wasm_kill```. 

```
--taint_kill<input> [default: 0x00000000]
	Computes taint OR input when returning from WebAssmeblyInterpreter to 
	JavaScript. Kills and throws an exception if the OR is nonzero. 
	Default option basically kills if ANY taint is returned.
```

### Taint Explosion + Probabilistic Taint
We have a prototype option enabled for probabilistic taint. This takes in the parameters ```--taint_random```, which propagates specific taints with user-specified probablities. We use this as testing to avoid taint explosion for non-sensitive taint labels. We store the probability p that we *don't* propagate the taint value. 

```
--taint_random <num_bits> [default: 0]
	Specifies the number of bits used to hold a probability p of propagation.
	The default, 0, means that probabilistic taint propagation is disabled. 
	Probabilities are stored as integers in <num_bits> most significant bits
	of the taint input, as an integer. 
		(p = taint >> (sizeof(taint_t)-<num_bits>)/(1 << <num_bits>))
	The taints will therefore only be the lower (sizeof(taint_t) - <num_bits>)
	bits, decreasing the total taint resolution. Taints will be passed in normally.  
```

For sensitive taint labels, like TAINT_CREDIT_CARD, we could set the p=0, and for labels like TAINT_GAME_DATA or TAINT_NETWORK_MESSAGE we could use p=255/256. This allows us to see approximately how much contact several variables have had with certain non-sensitive information sources. For example


nefariouscall.js
```
var sekritkey = 13371337;
var r00db0y35NetMsg = 100291239123;

// Let's use the top 8 bits for probability (will pass as flag to d8/chromium/node)
var key_t = TAINT_KEY; 
var key_prob = 0 << (32 - 8);   // p=0, always propagate

var msg_t = TAINT_NETMSG;
var msg_prob = 250 << (32 - 8); // p=250/256, 6/256 chance of propagating

therudeboys.sendKey(sekritkey, r00db0y35NetMsg, key_t+key_prob, msg_t+msg_prob); 
```

bash
```
./d8 --wasm_taint --taint_random 8 nefariouscall.js 
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



## Contributing/Authors

This taint tracking repository was made by [Raymond Lin](https://www.github.com/raylin1000), [Daniel Inge](https://www.github.com/daninge98), and [William Fu](https://www.github.com/wfus) for Harvard's CS263, System Security. If there are any issues, please submit an issue on Github or fork this repository!

   





