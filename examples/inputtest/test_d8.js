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
	[0,97,115,109,1,0,0,0,1,174,128,128,128,0,3,96,11,127,127,127,
		127,127,127,127,127,127,127,127,1,127,96,11,125,125,125,125,125,125,125,125,
		125,125,125,1,127,96,11,124,124,124,124,124,124,124,124,124,124,124,1,127,
		3,132,128,128,128,0,3,0,1,2,4,132,128,128,128,0,1,112,0,0,
		5,131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,173,128,128,
		128,0,4,6,109,101,109,111,114,121,2,0,7,109,97,105,110,105,110,116,
		0,0,9,109,97,105,110,102,108,111,97,116,0,1,10,109,97,105,110,100,
		111,117,98,108,101,0,2,10,156,128,128,128,0,3,132,128,128,128,0,0,
		65,0,11,132,128,128,128,0,0,65,0,11,132,128,128,128,0,0,65,0,
		11]
);

// console.log(bytes);

/* Load in our wasm file and try to activate functions */
WebAssembly.instantiate(bytes, importObject).then(wa => {
	const exports = wa.instance.exports;
	for (var i = 0; i < 1000000; i++){	
		//exports.mainint(26, 580, 835, 44, 210, 246, 362, 136, 705, 80, 200, 264, 478, 263, 254, 957, 432, 714, 507, 406, 801, 172);
		//exports.mainfloat(207, 639, 387, 712, 957, 331, 308, 604, 343, 669, 665, 262, 927, 479, 166, 997, 690, 239, 302, 706, 805, 737);
		exports.maindouble(253, 50, 92, 890, 933, 869, 783, 771, 588, 754, 869, 81, 1000, 275, 608, 116, 609, 239, 594, 270, 892, 495);
}
}).catch(err => console.log('Error loading WASM', err));

