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
createWebAssembly('fulladd.wasm', importObject).then(wa => {
	const exports = wa.instance.exports;
	console.log(exports);
	console.log(exports.test_I32Add(7, 5));
	console.log(exports.test_I32Sub(9, 8));
	console.log(exports.test_I32Mul(10, 7));
	console.log(exports.test_I32And(9, 4));
	console.log(exports.test_I32Ior(2, 2));
	console.log(exports.test_I32Xor(7, 7));
	console.log(exports.test_I32Eq(8, 1));
	console.log(exports.test_I32Ne(8, 8));
	console.log(exports.test_I32LtU(4, 5));
	console.log(exports.test_I32LeU(3, 4));
	console.log(exports.test_I32GtU(10, 4));
	console.log(exports.test_I32GeU(3, 8));
	console.log(exports.test_I32LtS(5, 7));
	console.log(exports.test_I32LeS(5, 4));
	console.log(exports.test_I32GtS(5, 4));
	console.log(exports.test_I32GeS(5, 2));
/*	console.log(exports.test_I64Add(5, 5));
	console.log(exports.test_I64Sub(2, 3));
	console.log(exports.test_I64Mul(4, 6));
	console.log(exports.test_I64And(5, 4));
	console.log(exports.test_I64Ior(9, 8));
	console.log(exports.test_I64Xor(9, 1));
	console.log(exports.test_I64Eq(1, 7));
	console.log(exports.test_I64Ne(2, 8));
	console.log(exports.test_I64LtU(2, 9));
	console.log(exports.test_I64LeU(2, 7));
	console.log(exports.test_I64GtU(7, 6));
	console.log(exports.test_I64GeU(8, 7));
	console.log(exports.test_I64LtS(4, 10));
	console.log(exports.test_I64LeS(9, 10));
	console.log(exports.test_I64GtS(2, 1));
	console.log(exports.test_I64GeS(5, 10)); */
	console.log(exports.test_F32Add(8, 6));
	console.log(exports.test_F32Sub(4, 7));
	console.log(exports.test_F32Eq(5, 6));
	console.log(exports.test_F32Ne(5, 9));
	console.log(exports.test_F32Lt(10, 4));
	console.log(exports.test_F32Le(4, 9));
	console.log(exports.test_F32Gt(5, 9));
	console.log(exports.test_F32Ge(1, 3));
	console.log(exports.test_F64Add(7, 3));
	console.log(exports.test_F64Sub(4, 6));
	console.log(exports.test_F64Eq(6, 6));
	console.log(exports.test_F64Ne(2, 2));
	console.log(exports.test_F64Lt(7, 2));
	console.log(exports.test_F64Le(9, 8));
	console.log(exports.test_F64Gt(3, 6));
	console.log(exports.test_F64Ge(6, 1));
	console.log(exports.test_F32Mul(6, 5));
	console.log(exports.test_F64Mul(4, 8));
	console.log(exports.test_F32Div(2, 4));
	console.log(exports.test_F64Div(10, 6));

}).catch(err => console.log('Error loading WASM', err));



console.log("Got down here!\n");



