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

console.log("This is not good");

const bytes = new Uint8Array(
	[0,97,115,109,1,0,0,0,1,34,6,96,1,125,1,125,96,2,127,127,
		1,127,96,2,125,125,1,125,96,2,124,124,1,124,96,1,127,1,127,96,
		1,124,1,124,3,54,53,1,1,1,1,1,1,1,1,1,1,1,1,1,
		1,1,1,2,2,3,3,2,3,2,3,1,1,1,1,1,1,1,2,2,
		3,3,2,3,4,4,4,4,0,0,0,0,0,0,5,5,5,5,5,5,
		4,4,1,112,0,0,5,3,1,0,1,7,153,6,54,6,109,101,109,111,
		114,121,2,0,11,116,101,115,116,95,73,51,50,65,100,100,0,0,11,116,
		101,115,116,95,73,51,50,83,117,98,0,1,11,116,101,115,116,95,73,51,
		50,77,117,108,0,2,11,116,101,115,116,95,73,51,50,65,110,100,0,3,
		11,116,101,115,116,95,73,51,50,73,111,114,0,4,11,116,101,115,116,95,
		73,51,50,88,111,114,0,5,10,116,101,115,116,95,73,51,50,69,113,0,
		6,10,116,101,115,116,95,73,51,50,78,101,0,7,11,116,101,115,116,95,
		73,51,50,76,116,85,0,8,11,116,101,115,116,95,73,51,50,76,101,85,
		0,9,11,116,101,115,116,95,73,51,50,71,116,85,0,10,11,116,101,115,
		116,95,73,51,50,71,101,85,0,11,11,116,101,115,116,95,73,51,50,76,
		116,83,0,12,11,116,101,115,116,95,73,51,50,76,101,83,0,13,11,116,
		101,115,116,95,73,51,50,71,116,83,0,14,11,116,101,115,116,95,73,51,
		50,71,101,83,0,15,11,116,101,115,116,95,70,51,50,65,100,100,0,16,
		11,116,101,115,116,95,70,51,50,83,117,98,0,17,11,116,101,115,116,95,
		70,54,52,65,100,100,0,18,11,116,101,115,116,95,70,54,52,83,117,98,
		0,19,11,116,101,115,116,95,70,51,50,77,117,108,0,20,11,116,101,115,
		116,95,70,54,52,77,117,108,0,21,11,116,101,115,116,95,70,51,50,68,
		105,118,0,22,11,116,101,115,116,95,70,54,52,68,105,118,0,23,12,116,
		101,115,116,95,73,51,50,68,105,118,83,0,24,12,116,101,115,116,95,73,
		51,50,68,105,118,85,0,25,12,116,101,115,116,95,73,51,50,82,101,109,
		83,0,26,12,116,101,115,116,95,73,51,50,82,101,109,85,0,27,11,116,
		101,115,116,95,73,51,50,83,104,108,0,28,12,116,101,115,116,95,73,51,
		50,83,104,114,85,0,29,12,116,101,115,116,95,73,51,50,83,104,114,83,
		0,30,11,116,101,115,116,95,70,51,50,77,105,110,0,31,11,116,101,115,
		116,95,70,51,50,77,97,120,0,32,11,116,101,115,116,95,70,54,52,77,
		105,110,0,33,11,116,101,115,116,95,70,54,52,77,97,120,0,34,16,116,
		101,115,116,95,70,51,50,67,111,112,121,83,105,103,110,0,35,16,116,101,
		115,116,95,70,54,52,67,111,112,121,83,105,103,110,0,36,11,116,101,115,
		116,95,73,51,50,67,108,122,0,37,11,116,101,115,116,95,73,51,50,67,
		116,122,0,38,14,116,101,115,116,95,73,51,50,80,111,112,99,110,116,0,
		39,11,116,101,115,116,95,73,51,50,69,113,122,0,40,11,116,101,115,116,
		95,70,51,50,65,98,115,0,41,11,116,101,115,116,95,70,51,50,78,101,
		103,0,42,12,116,101,115,116,95,70,51,50,67,101,105,108,0,43,13,116,
		101,115,116,95,70,51,50,70,108,111,111,114,0,44,13,116,101,115,116,95,
		70,51,50,84,114,117,110,99,0,45,18,116,101,115,116,95,70,51,50,78,
		101,97,114,101,115,116,73,110,116,0,46,11,116,101,115,116,95,70,54,52,
		65,98,115,0,47,11,116,101,115,116,95,70,54,52,78,101,103,0,48,12,
		116,101,115,116,95,70,54,52,67,101,105,108,0,49,13,116,101,115,116,95,
		70,54,52,70,108,111,111,114,0,50,13,116,101,115,116,95,70,54,52,84,
		114,117,110,99,0,51,18,116,101,115,116,95,70,54,52,78,101,97,114,101,
		115,116,73,110,116,0,52,10,137,3,53,7,0,32,1,32,0,106,11,7,
		0,32,1,32,0,107,11,7,0,32,1,32,0,108,11,7,0,32,1,32,
		0,113,11,7,0,32,1,32,0,114,11,7,0,32,1,32,0,115,11,7,
		0,32,1,32,0,70,11,7,0,32,1,32,0,71,11,7,0,32,1,32,
		0,73,11,7,0,32,1,32,0,77,11,7,0,32,1,32,0,75,11,7,
		0,32,1,32,0,79,11,7,0,32,1,32,0,72,11,7,0,32,1,32,
		0,76,11,7,0,32,1,32,0,74,11,7,0,32,1,32,0,78,11,7,
		0,32,1,32,0,146,11,7,0,32,1,32,0,147,11,7,0,32,1,32,
		0,160,11,7,0,32,1,32,0,161,11,7,0,32,1,32,0,148,11,7,
		0,32,1,32,0,162,11,7,0,32,1,32,0,149,11,7,0,32,1,32,
		0,163,11,7,0,32,1,32,0,109,11,7,0,32,1,32,0,110,11,7,
		0,32,1,32,0,111,11,7,0,32,1,32,0,112,11,7,0,32,1,32,
		0,116,11,7,0,32,1,32,0,118,11,7,0,32,1,32,0,117,11,7,
		0,32,1,32,0,150,11,7,0,32,1,32,0,151,11,7,0,32,1,32,
		0,164,11,7,0,32,1,32,0,165,11,7,0,32,1,32,0,152,11,7,
		0,32,1,32,0,166,11,5,0,32,0,103,11,5,0,32,0,104,11,5,
		0,32,0,105,11,5,0,32,0,69,11,5,0,32,0,139,11,5,0,32,
		0,140,11,5,0,32,0,141,11,5,0,32,0,142,11,5,0,32,0,143,
		11,5,0,32,0,144,11,5,0,32,0,153,11,5,0,32,0,154,11,5,
		0,32,0,155,11,5,0,32,0,156,11,5,0,32,0,157,11,5,0,32,
		0,158,11]
		
);

// console.log(bytes);

/* Load in our wasm file and try to activate functions */
WebAssembly.instantiate(bytes, importObject).then(wa => {
	const exports = wa.instance.exports;	
	console.log(exports.test_I32Add(5, 2, 1923, 4389));
	console.log(exports.test_I32Sub(4, 1, 3544, 1630));
	console.log(exports.test_I32Mul(10, 7, 2911, 4710));
	console.log(exports.test_I32And(7, 9, 3459, 5714));
	console.log(exports.test_I32Ior(4, 10, 1694, 2489));
	console.log(exports.test_I32Xor(1, 4, 2201, 1062));
	console.log(exports.test_I32Eq(5, 8, 2082, 4175));
	console.log(exports.test_I32Ne(4, 1, 3484, 9201));
	console.log(exports.test_I32LtU(7, 8, 3987, 7803));
	console.log(exports.test_I32LeU(2, 3, 155, 4074));
	console.log(exports.test_I32GtU(1, 10, 5733, 2834));
	console.log(exports.test_I32GeU(7, 9, 2600, 1602));
	console.log(exports.test_I32LtS(8, 1, 5380, 8184));
	console.log(exports.test_I32LeS(10, 10, 4832, 8469));
	console.log(exports.test_I32GtS(10, 8, 6415, 6316));
	console.log(exports.test_I32GeS(8, 8, 2631, 5086));
	console.log(exports.test_F32Add(5, 3, 6954, 1344));
	console.log(exports.test_F32Sub(4, 6, 7108, 7491));
	console.log(exports.test_F64Add(7, 9, 2449, 1227));
	console.log(exports.test_F64Sub(2, 7, 9656, 6078));
	console.log(exports.test_F32Mul(3, 9, 6489, 9590));
	console.log(exports.test_F64Mul(10, 7, 6721, 413));
	console.log(exports.test_F32Div(1, 10, 3327, 6075));
	console.log(exports.test_F64Div(3, 5, 2086, 2096));
	console.log(exports.test_I32DivS(1, 4, 1123, 650));
	console.log(exports.test_I32DivU(6, 3, 9839, 7418));
	console.log(exports.test_I32RemS(4, 7, 1076, 3579));
	console.log(exports.test_I32RemU(8, 3, 2953, 7755));
	console.log(exports.test_I32Shl(8, 2, 7502, 9109));
	console.log(exports.test_I32ShrU(8, 7, 8126, 5081));
	console.log(exports.test_I32ShrS(5, 2, 7096, 7697));
	console.log(exports.test_F32Min(9, 1, 368, 7677));
	console.log(exports.test_F32Max(7, 2, 3283, 8483));
	console.log(exports.test_F64Min(4, 9, 7824, 8624));
	console.log(exports.test_F64Max(1, 2, 6177, 593));
	console.log(exports.test_F32CopySign(8, 10, 6331, 5656));
	console.log(exports.test_F64CopySign(5, 3, 5910, 1815));
	console.log(exports.test_I32Clz(10, 7644));
	console.log(exports.test_I32Ctz(4, 1267));
	console.log(exports.test_I32Popcnt(4, 4076));
	console.log(exports.test_I32Eqz(5, 7039));
	console.log(exports.test_F32Abs(3, 9920));
	console.log(exports.test_F32Neg(1, 7958));
	console.log(exports.test_F32Ceil(8, 7373));
	console.log(exports.test_F32Floor(4, 8792));
	console.log(exports.test_F32Trunc(8, 965));
	console.log(exports.test_F32NearestInt(10, 4263));
	console.log(exports.test_F64Abs(9, 6213));
	console.log(exports.test_F64Neg(5, 9482));
	console.log(exports.test_F64Ceil(1, 3047));
	console.log(exports.test_F64Floor(9, 9972));
	console.log(exports.test_F64Trunc(1, 66));
	console.log(exports.test_F64NearestInt(10, 6681));
}).catch(err => console.log('Error loading WASM', err));
console.log("Reached end of file");
