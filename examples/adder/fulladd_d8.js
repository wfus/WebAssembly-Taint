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

print("This is not good");

const bytes = new Uint8Array(
[0,97,115,109,1,0,0,0,1,153,128,128,128,0,4,96,2,127,127,1,
127,96,2,126,126,1,126,96,2,125,125,1,125,96,2,124,124,1,124,3,
181,128,128,128,0,52,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,
2,2,2,2,2,2,3,3,3,3,3,3,3,3,2,3,2,3,4,132,
128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,
128,128,0,0,7,210,133,128,128,0,53,6,109,101,109,111,114,121,2,0,
11,116,101,115,116,95,73,51,50,65,100,100,0,0,11,116,101,115,116,95,
73,51,50,83,117,98,0,1,11,116,101,115,116,95,73,51,50,77,117,108,
0,2,11,116,101,115,116,95,73,51,50,65,110,100,0,3,11,116,101,115,
116,95,73,51,50,73,111,114,0,4,11,116,101,115,116,95,73,51,50,88,
111,114,0,5,10,116,101,115,116,95,73,51,50,69,113,0,6,10,116,101,
115,116,95,73,51,50,78,101,0,7,11,116,101,115,116,95,73,51,50,76,
116,85,0,8,11,116,101,115,116,95,73,51,50,76,101,85,0,9,11,116,
101,115,116,95,73,51,50,71,116,85,0,10,11,116,101,115,116,95,73,51,
50,71,101,85,0,11,11,116,101,115,116,95,73,51,50,76,116,83,0,12,
11,116,101,115,116,95,73,51,50,76,101,83,0,13,11,116,101,115,116,95,
73,51,50,71,116,83,0,14,11,116,101,115,116,95,73,51,50,71,101,83,
0,15,11,116,101,115,116,95,73,54,52,65,100,100,0,16,11,116,101,115,
116,95,73,54,52,83,117,98,0,17,11,116,101,115,116,95,73,54,52,77,
117,108,0,18,11,116,101,115,116,95,73,54,52,65,110,100,0,19,11,116,
101,115,116,95,73,54,52,73,111,114,0,20,11,116,101,115,116,95,73,54,
52,88,111,114,0,21,10,116,101,115,116,95,73,54,52,69,113,0,22,10,
116,101,115,116,95,73,54,52,78,101,0,23,11,116,101,115,116,95,73,54,
52,76,116,85,0,24,11,116,101,115,116,95,73,54,52,76,101,85,0,25,
11,116,101,115,116,95,73,54,52,71,116,85,0,26,11,116,101,115,116,95,
73,54,52,71,101,85,0,27,11,116,101,115,116,95,73,54,52,76,116,83,
0,28,11,116,101,115,116,95,73,54,52,76,101,83,0,29,11,116,101,115,
116,95,73,54,52,71,116,83,0,30,11,116,101,115,116,95,73,54,52,71,
101,83,0,31,11,116,101,115,116,95,70,51,50,65,100,100,0,32,11,116,
101,115,116,95,70,51,50,83,117,98,0,33,10,116,101,115,116,95,70,51,
50,69,113,0,34,10,116,101,115,116,95,70,51,50,78,101,0,35,10,116,
101,115,116,95,70,51,50,76,116,0,36,10,116,101,115,116,95,70,51,50,
76,101,0,37,10,116,101,115,116,95,70,51,50,71,116,0,38,10,116,101,
115,116,95,70,51,50,71,101,0,39,11,116,101,115,116,95,70,54,52,65,
100,100,0,40,11,116,101,115,116,95,70,54,52,83,117,98,0,41,10,116,
101,115,116,95,70,54,52,69,113,0,42,10,116,101,115,116,95,70,54,52,
78,101,0,43,10,116,101,115,116,95,70,54,52,76,116,0,44,10,116,101,
115,116,95,70,54,52,76,101,0,45,10,116,101,115,116,95,70,54,52,71,
116,0,46,10,116,101,115,116,95,70,54,52,71,101,0,47,11,116,101,115,
116,95,70,51,50,77,117,108,0,48,11,116,101,115,116,95,70,54,52,77,
117,108,0,49,11,116,101,115,116,95,70,51,50,68,105,118,0,50,11,116,
101,115,116,95,70,54,52,68,105,118,0,51,10,175,134,128,128,0,52,135,
128,128,128,0,0,32,1,32,0,106,11,135,128,128,128,0,0,32,0,32,
1,107,11,135,128,128,128,0,0,32,1,32,0,108,11,135,128,128,128,0,
0,32,1,32,0,113,11,135,128,128,128,0,0,32,1,32,0,114,11,135,
128,128,128,0,0,32,1,32,0,115,11,135,128,128,128,0,0,32,0,32,
1,70,11,135,128,128,128,0,0,32,0,32,1,71,11,135,128,128,128,0,
0,32,0,32,1,73,11,135,128,128,128,0,0,32,0,32,1,77,11,135,
128,128,128,0,0,32,0,32,1,75,11,135,128,128,128,0,0,32,0,32,
1,79,11,135,128,128,128,0,0,32,0,32,1,72,11,135,128,128,128,0,
0,32,0,32,1,76,11,135,128,128,128,0,0,32,0,32,1,74,11,135,
128,128,128,0,0,32,0,32,1,78,11,135,128,128,128,0,0,32,1,32,
0,124,11,135,128,128,128,0,0,32,0,32,1,125,11,135,128,128,128,0,
0,32,1,32,0,126,11,135,128,128,128,0,0,32,1,32,0,131,11,135,
128,128,128,0,0,32,1,32,0,132,11,135,128,128,128,0,0,32,1,32,
0,133,11,136,128,128,128,0,0,32,0,32,1,81,173,11,136,128,128,128,
0,0,32,0,32,1,82,173,11,136,128,128,128,0,0,32,0,32,1,84,
173,11,136,128,128,128,0,0,32,0,32,1,88,173,11,136,128,128,128,0,
0,32,0,32,1,86,173,11,136,128,128,128,0,0,32,0,32,1,90,173,
11,136,128,128,128,0,0,32,0,32,1,83,173,11,136,128,128,128,0,0,
32,0,32,1,87,173,11,136,128,128,128,0,0,32,0,32,1,85,173,11,
136,128,128,128,0,0,32,0,32,1,89,173,11,135,128,128,128,0,0,32,
0,32,1,146,11,135,128,128,128,0,0,32,0,32,1,147,11,146,128,128,
128,0,0,67,0,0,128,63,67,0,0,0,0,32,0,32,1,91,27,11,
146,128,128,128,0,0,67,0,0,128,63,67,0,0,0,0,32,0,32,1,
92,27,11,146,128,128,128,0,0,67,0,0,128,63,67,0,0,0,0,32,
0,32,1,93,27,11,146,128,128,128,0,0,67,0,0,128,63,67,0,0,
0,0,32,0,32,1,95,27,11,146,128,128,128,0,0,67,0,0,128,63,
67,0,0,0,0,32,0,32,1,94,27,11,146,128,128,128,0,0,67,0,
0,128,63,67,0,0,0,0,32,0,32,1,96,27,11,135,128,128,128,0,
0,32,0,32,1,160,11,135,128,128,128,0,0,32,0,32,1,161,11,154,
128,128,128,0,0,68,0,0,0,0,0,0,240,63,68,0,0,0,0,0,
0,0,0,32,0,32,1,97,27,11,154,128,128,128,0,0,68,0,0,0,
0,0,0,240,63,68,0,0,0,0,0,0,0,0,32,0,32,1,98,27,
11,154,128,128,128,0,0,68,0,0,0,0,0,0,240,63,68,0,0,0,
0,0,0,0,0,32,0,32,1,99,27,11,154,128,128,128,0,0,68,0,
0,0,0,0,0,240,63,68,0,0,0,0,0,0,0,0,32,0,32,1,
101,27,11,154,128,128,128,0,0,68,0,0,0,0,0,0,240,63,68,0,
0,0,0,0,0,0,0,32,0,32,1,100,27,11,154,128,128,128,0,0,
68,0,0,0,0,0,0,240,63,68,0,0,0,0,0,0,0,0,32,0,
32,1,102,27,11,135,128,128,128,0,0,32,0,32,1,148,11,135,128,128,
128,0,0,32,0,32,1,162,11,135,128,128,128,0,0,32,0,32,1,149,
11,135,128,128,128,0,0,32,0,32,1,163,11]
);

// print(bytes);

/* Load in our wasm file and try to activate functions */
WebAssembly.instantiate(bytes, importObject).then(wa => {
	const exports = wa.instance.exports;
	// var taint1 = 3 << 24;
	// var taint2 = 4 << 24;	
	print(exports);
	print(exports.test_I32Add(7, 5));
	print(exports.test_I32Sub(9, 8));
	print(exports.test_I32Mul(10, 7));
	print(exports.test_I32And(9, 4));
	print(exports.test_I32Ior(2, 2));
	print(exports.test_I32Xor(7, 7));
	print(exports.test_I32Eq(8, 1));
	print(exports.test_I32Ne(8, 8));
	print(exports.test_I32LtU(4, 5));
	print(exports.test_I32LeU(3, 4));
	print(exports.test_I32GtU(10, 4));
	print(exports.test_I32GeU(3, 8));
	print(exports.test_I32LtS(5, 7));
	print(exports.test_I32LeS(5, 4));
	print(exports.test_I32GtS(5, 4));
	print(exports.test_I32GeS(5, 2));
	print(exports.test_I64Add(5, 5));
	print(exports.test_I64Sub(2, 3));
	print(exports.test_I64Mul(4, 6));
	print(exports.test_I64And(5, 4));
	print(exports.test_I64Ior(9, 8));
	print(exports.test_I64Xor(9, 1));
	print(exports.test_I64Eq(1, 7));
	print(exports.test_I64Ne(2, 8));
	print(exports.test_I64LtU(2, 9));
	print(exports.test_I64LeU(2, 7));
	print(exports.test_I64GtU(7, 6));
	print(exports.test_I64GeU(8, 7));
	print(exports.test_I64LtS(4, 10));
	print(exports.test_I64LeS(9, 10));
	print(exports.test_I64GtS(2, 1));
	print(exports.test_I64GeS(5, 10));
	print(exports.test_F32Add(8, 6));
	print(exports.test_F32Sub(4, 7));
	print(exports.test_F32Eq(5, 6));
	print(exports.test_F32Ne(5, 9));
	print(exports.test_F32Lt(10, 4));
	print(exports.test_F32Le(4, 9));
	print(exports.test_F32Gt(5, 9));
	print(exports.test_F32Ge(1, 3));
	print(exports.test_F64Add(7, 3));
	print(exports.test_F64Sub(4, 6));
	print(exports.test_F64Eq(6, 6));
	print(exports.test_F64Ne(2, 2));
	print(exports.test_F64Lt(7, 2));
	print(exports.test_F64Le(9, 8));
	print(exports.test_F64Gt(3, 6));
	print(exports.test_F64Ge(6, 1));
	print(exports.test_F32Mul(6, 5));
	print(exports.test_F64Mul(4, 8));
	print(exports.test_F32Div(2, 4));
	print(exports.test_F64Div(10, 6));
	quit()
}).catch(err => print('Error loading WASM', err));
print("Reached end of file");

