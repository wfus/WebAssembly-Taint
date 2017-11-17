
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
	[0,97,115,109,1,0,0,0,0,12,6,100,121,108,105,
	110,107,128,128,192,2,0,1,19,4,96,2,127,
	127,1,127,96,1,127,1,127,96,0,1,127,96,0,
	0,2,65,4,3,101,110,118,10,109,101,109,111,
	114,121,66,97,115,101,3,127,0,3,101,110,118,
	6,109,101,109,111,114,121,2,0,128,2,3,101,110,
	118,5,116,97,98,108,101,1,112,0,0,3,101,110,
	118,9,116,97,98,108,101,66,97,115,101,3,127,
	0,3,7,6,0,1,0,2,3,3,6,11,2,127,1,65,0,11,127,
	1,65,0,11,7,92,6,12,95,115,105,109,112,108,101,
	109,105,110,117,115,0,2,11,114,117,110,80,111,
	115,116,83,101,116,115,0,4,12,95,115,105,109,
	112,108,101,99,111,110,115,116,0,3,18,95,95,
	112,111,115,116,95,105,110,115,116,97,110,116,
	105,97,116,101,0,5,10,95,115,105,109,112,108,101,
	97,100,100,0,0,10,95,115,105,109,112,108,101,105,
	110,99,0,1,9,1,0,10,54,6,7,0,32,1,32,0,106,11,7,0,
	32,0,65,1,106,11,7,0,32,0,32,1,107,11,5,0,65,168,
	1,11,3,0,1,11,18,0,35,0,36,2,35,2,65,128,128,192,2,
	106,36,3,16,4,11]
);

// print(bytes);

/* Load in our wasm file and try to activate functions */
WebAssembly.instantiate(bytes, importObject).then(wa => {
	const exports = wa.instance.exports;
	print("Got the exports");
	print("1 plus 1 = ");
	print(exports._simpleadd(2, 3));
	print(exports._simpleinc(419));
	quit()
}).catch(err => print('Error loading WASM', err));


