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
	[0,97,115,109,1,0,0,0,1,171,128,128,128,0,3,96,10,127,127,127,
		127,127,127,127,127,127,127,1,127,96,10,125,125,125,125,125,125,125,125,125,
		125,1,127,96,10,124,124,124,124,124,124,124,124,124,124,1,127,3,132,128,
		128,128,0,3,0,1,2,4,132,128,128,128,0,1,112,0,0,5,131,128,
		128,128,0,1,0,1,6,129,128,128,128,0,0,7,173,128,128,128,0,4,
		6,109,101,109,111,114,121,2,0,7,109,97,105,110,105,110,116,0,0,9,
		109,97,105,110,102,108,111,97,116,0,1,10,109,97,105,110,100,111,117,98,
		108,101,0,2,10,156,128,128,128,0,3,132,128,128,128,0,0,65,0,11,
		132,128,128,128,0,0,65,0,11,132,128,128,128,0,0,65,0,11]
);

// console.log(bytes);

/* Load in our wasm file and try to activate functions */
WebAssembly.instantiate(bytes, importObject).then(wa => {
	const exports = wa.instance.exports;
	for (var i = 0; i < 1000000; i++){	
		exports.mainint(651, 480, 621, 313, 276, 318, 446, 441, 536, 141, 564, 140, 813, 600, 594, 490, 363, 636, 670, 243, 269);
		//exports.mainfloat(438, 981, 546, 181, 994, 614, 982, 189, 616, 484, 245, 571, 904, 865, 395, 614, 209, 459, 625, 511, 101);
		//exports.maindouble(392, 61, 884, 939, 995, 728, 690, 231, 569, 205, 924, 366, 287, 152, 835, 411, 771, 840, 236, 839, 743);
}
}).catch(err => console.log('Error loading WASM', err));

