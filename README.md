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
node --js-flags="--wasm_taint"
```

### Logging


### Taint Options
Taint is currently implemented as a ```uint32_t```, or 32 bits that represent 32 unique taint tags. However, this can be easily changed by going into the ```src/frames.h``` and changing ```typedef uint32_t taint_t``` to ```typedef <YOUR_TYPE> taint_t```. 

If a WasmValue with any taint tag set returns to the JavaScript context, the JavaScript process will throw an error and exit. If you don't want the program to exit, but rather log, if certain taint tags are present, then set the flag ```wasm_kill```. 

```
--wasm_kill <input> [default: 0xffffffff]
	Computes taint OR input when returning from WebAssmeblyInterpreter to 
	JavaScript. Kills and throws an exception if the OR is nonzero. 
	Default option basically kills if ANY taint is returned.
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

The upside of having taints passed in as extra variables to the signature is that the default version of V8 throws away the extra parameters. Therefore, you can test/run your taint modified scripts in both this custom V8 as well as regular V8.  









