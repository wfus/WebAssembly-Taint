/* Loads the WebAssembly from file if running on browser */
/*
async function createWebAssembly(path, importObject) {
	const bytes = await window.fetch(path).then(x => x.arrayBuffer());
	return WebAssembly.instantiate(bytes, importObject);
}
*/

/* Configures the memory available for Web Aseembly */
const memory = new WebAssembly.Memory({initial:256, maximum:256});
const env = {
	'abortStackOverflow': _ => {throw new Error('overflow');},
	'table': new WebAssembly.Table({initial: 0, maximum: 0, element: 'anyfunc'}),          
	'tableBase': 0,  
	'memory': memory,
	'memoryBase': 1024,
	'STACKTOP': 0, 
	'STACK_MAX': memory.buffer.byteLength,
};
const importObject = {env};

const bytes = new Uint8Array(
	[0,97,115,109,1,0,0,0,1,134,128,128,128,0,1,96,1,127,1,127,
		3,130,128,128,128,0,1,0,4,132,128,128,128,0,1,112,0,0,5,131,
		128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,144,128,128,128,0,
		2,6,109,101,109,111,114,121,2,0,3,102,105,98,0,0,10,150,129,128,
		128,0,1,144,129,128,128,0,1,3,127,65,0,40,2,4,65,16,107,34,
		3,32,0,54,2,12,32,3,65,1,54,2,4,32,3,65,1,54,2,8,
		32,3,65,2,54,2,0,2,64,3,64,32,3,40,2,0,32,3,40,2,
		12,74,13,1,32,3,65,4,106,32,3,40,2,0,34,0,65,2,111,65,
		2,116,106,34,1,40,2,0,33,2,32,3,32,0,65,1,106,34,0,54,
		2,0,32,1,32,2,32,3,65,4,106,32,0,65,2,111,65,2,116,106,
		40,2,0,106,54,2,0,12,0,11,11,32,3,65,4,106,32,3,40,2,
		12,65,2,111,65,2,116,106,40,2,0,11]
);

// console.log(bytes);

/* Load in our wasm file and try to activate functions */
WebAssembly.instantiate(bytes, importObject).then(wa => {
	const exports = wa.instance.exports;	
	print(exports.fib(10));
}).catch(err => console.log('Error loading WASM', err));
print("Reached end of file");

