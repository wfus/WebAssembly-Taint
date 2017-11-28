var fs = require('fs');

/* Loads the WebAssembly from file if running on server */
async function createWebAssembly(path, importObject) {
	const bytes = fs.readFileSync(path);
	console.log(bytes);
	console.log(new Uint8Array(bytes));
	return WebAssembly.instantiate(new Uint8Array(bytes), importObject);
}

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


/* Load in our wasm file and try to activate functions */
createWebAssembly('simpleadd.wasm', importObject).then(wa => {
	const exports = wa.instance.exports;
	console.log("Got the exports", exports);
	console.log("1 plus 1 = ");
	console.log(exports._simpleadd(2, 3));
	console.log(exports._simpleinc(419));
}).catch(err => console.log('Error loading WASM', err));



console.log("Got down here!\n");



