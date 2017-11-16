# WebAssembly to D8 Toolkit

## Problems

Unfortunately, D8 doesn't support using ```require``` or other external packages. Therefore, instead of reading from file, we have to manually pipe in the binary for our .wasm file as a ```Uint8Array``` and call ```WebAssembly.compile()``` on that. 

## wasm2uint8

Running ```wasm2uint8``` will convert a binary ```.wasm``` file to a format that you can copy paste into your JS file, printing to stdout. 
