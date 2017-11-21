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
	exports._test_I32Add(1281388364, 515037763);
	exports._test_I32Sub(803299690, 1328775078);
	exports._test_I32Mul(1673495688, 1942486985);
	exports._test_I32And(75054813, 2048703368);
	exports._test_I32Ior(338452705, 426312001);
	exports._test_I32Xor(1044084890, 1089940194);
	exports._test_I32Eq(85615198, 1144484999);
	exports._test_I32Ne(458554798, 1612455924);
	exports._test_I32LtU(312018956, 1974812713);
	exports._test_I32LeU(343196378, 135300462);
	exports._test_I32GtU(943156675, 1771430484);
	exports._test_I32GeU(1636247551, 549358702);
	exports._test_I32LtS(1175206017, 1063826161);
	exports._test_I32LeS(235337870, 1864289523);
	exports._test_I32GtS(1444762556, 1205583413);
	exports._test_I32GeS(2005735644, 1459950260);
	exports._test_I64Add(123305060, 1226347861);
	exports._test_I64Sub(1069989623, 1684759340);
	exports._test_I64Mul(288020689, 290196301);
	exports._test_I64And(1398397881, 1808241708);
	exports._test_I64Ior(1274754345, 1290304335);
	exports._test_I64Xor(1835221546, 382388563);
	exports._test_I64Eq(1453890223, 2021524959);
	exports._test_I64Ne(157904332, 675065414);
	exports._test_I64LtU(866842235, 1719010264);
	exports._test_I64LeU(1634005039, 1305521432);
	exports._test_I64GtU(1517012312, 1548408341);
	exports._test_I64GeU(1678790509, 1185545962);
	exports._test_I64LtS(1271926613, 1668373147);
	exports._test_I64LeS(1393442763, 623541848);
	exports._test_I64GtS(801406066, 900516837);
	exports._test_I64GeS(878564765, 1995489156);
	exports._test_F32Add(1665112442, 2030379006);
	exports._test_F32Sub(1171981605, 2037765656);
	exports._test_F32Eq(163059360, 1197844632);
	exports._test_F32Ne(1521801933, 1768270737);
	exports._test_F32Lt(1657181216, 393052340);
	exports._test_F32Le(1297809818, 1848808226);
	exports._test_F32Gt(1409877099, 569396353);
	exports._test_F32Ge(770855283, 1901601232);
	exports._test_F64Add(1288734476, 292798957);
	exports._test_F64Sub(1486877151, 338395254);
	exports._test_F64Eq(1761634023, 395888321);
	exports._test_F64Ne(93154340, 1706770300);
	exports._test_F64Lt(1543808851, 1113407314);
	exports._test_F64Le(692322872, 642910143);
	exports._test_F64Gt(354102529, 1022889757);
	exports._test_F64Ge(1063439997, 1306435860);
	exports._test_F32Mul(573182147, 1599129370);
	exports._test_F64Mul(835272037, 1471975529);
	exports._test_F32Div(359165414, 587545410);
	exports._test_F64Div(1540571082, 810927730);
}).catch(err => console.log('Error loading WASM', err));



console.log("Got down here!\n");



