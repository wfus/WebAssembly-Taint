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
