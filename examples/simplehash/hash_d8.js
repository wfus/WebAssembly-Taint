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
	[0,97,115,109,1,0,0,0,1,147,128,128,128,0,3,96,3,127,127,127,
	1,127,96,1,127,1,127,96,2,127,127,1,127,3,132,128,128,128,0,3,
	0,1,2,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,
	0,1,6,129,128,128,128,0,0,7,163,128,128,128,0,4,6,109,101,109,
	111,114,121,2,0,3,109,105,120,0,0,8,116,101,115,116,104,97,115,104,
	0,1,5,104,97,115,104,110,0,2,10,247,129,128,128,0,3,128,129,128,
	128,0,0,32,2,32,0,32,1,107,32,2,107,32,2,65,13,117,115,34,
	0,107,32,1,32,2,107,32,0,107,32,0,65,8,116,115,34,2,107,32,
	2,65,13,117,115,34,1,32,0,32,2,107,32,1,107,32,1,65,12,117,
	115,34,0,107,32,2,32,1,107,32,0,107,32,0,65,16,116,115,34,2,
	107,32,2,65,5,117,115,34,1,32,0,32,2,107,32,1,107,32,1,65,
	3,117,115,34,0,107,32,2,32,1,107,32,0,107,32,0,65,10,116,115,
	34,2,107,32,2,65,15,117,115,11,183,128,128,128,0,1,3,127,32,0,
	65,228,0,106,33,2,65,156,127,33,1,32,0,33,3,3,64,32,3,32,
	0,32,1,106,32,2,16,0,33,3,32,2,65,127,106,33,2,32,1,65,
	1,106,34,1,13,0,11,32,3,11,176,128,128,128,0,1,1,127,2,64,
	32,1,65,1,72,13,0,65,0,33,2,3,64,32,0,32,2,65,0,32,
	2,107,16,0,33,0,32,2,65,1,106,34,2,32,1,71,13,0,11,11,
	32,0,11]
)

// console.log(bytes);

/* Load in our wasm file and try to activate functions */
WebAssembly.instantiate(bytes, importObject).then(wa => {
	const exports = wa.instance.exports;
	exports.hashn(100, 1, 0xde000001, 0xde000001);
	print("success");
}).catch(err => print('Error loading WASM', err));


