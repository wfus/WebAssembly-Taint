Module["asm"] =  (/** @suppress {uselessCode} */ function(global, env, buffer) {
'almost asm';


  var HEAP8 = new global.Int8Array(buffer);
  var HEAP16 = new global.Int16Array(buffer);
  var HEAP32 = new global.Int32Array(buffer);
  var HEAPU8 = new global.Uint8Array(buffer);
  var HEAPU16 = new global.Uint16Array(buffer);
  var HEAPU32 = new global.Uint32Array(buffer);
  var HEAPF32 = new global.Float32Array(buffer);
  var HEAPF64 = new global.Float64Array(buffer);

  var DYNAMICTOP_PTR=env.DYNAMICTOP_PTR|0;
  var tempDoublePtr=env.tempDoublePtr|0;
  var ABORT=env.ABORT|0;
  var memoryBase=env.memoryBase|0;
  var tableBase=env.tableBase|0;

  var STACKTOP = 0, STACK_MAX = 0;

  var __THREW__ = 0;
  var threwValue = 0;
  var setjmpId = 0;
  var undef = 0;
  var nan = global.NaN, inf = global.Infinity;
  var tempInt = 0, tempBigInt = 0, tempBigIntS = 0, tempValue = 0, tempDouble = 0.0;
  var tempRet0 = 0;

  var Math_floor=global.Math.floor;
  var Math_abs=global.Math.abs;
  var Math_sqrt=global.Math.sqrt;
  var Math_pow=global.Math.pow;
  var Math_cos=global.Math.cos;
  var Math_sin=global.Math.sin;
  var Math_tan=global.Math.tan;
  var Math_acos=global.Math.acos;
  var Math_asin=global.Math.asin;
  var Math_atan=global.Math.atan;
  var Math_atan2=global.Math.atan2;
  var Math_exp=global.Math.exp;
  var Math_log=global.Math.log;
  var Math_ceil=global.Math.ceil;
  var Math_imul=global.Math.imul;
  var Math_min=global.Math.min;
  var Math_max=global.Math.max;
  var Math_clz32=global.Math.clz32;
  var Math_fround=global.Math.fround;
  var abort=env.abort;
  var assert=env.assert;
  var enlargeMemory=env.enlargeMemory;
  var getTotalMemory=env.getTotalMemory;
  var abortOnCannotGrowMemory=env.abortOnCannotGrowMemory;
  var setTempRet0=env.setTempRet0;
  var getTempRet0=env.getTempRet0;
  var tempFloat = Math_fround(0);
  const f0 = Math_fround(0);

// EMSCRIPTEN_START_FUNCS

function stackAlloc(size) {
  size = size|0;
  var ret = 0;
  ret = STACKTOP;
  STACKTOP = (STACKTOP + size)|0;
  STACKTOP = (STACKTOP + 15)&-16;

  return ret|0;
}
function stackSave() {
  return STACKTOP|0;
}
function stackRestore(top) {
  top = top|0;
  STACKTOP = top;
}
function establishStackSpace(stackBase, stackMax) {
  stackBase = stackBase|0;
  stackMax = stackMax|0;
  STACKTOP = stackBase;
  STACK_MAX = stackMax;
}

function setThrew(threw, value) {
  threw = threw|0;
  value = value|0;
  if ((__THREW__|0) == 0) {
    __THREW__ = threw;
    threwValue = value;
  }
}

function _simpleadd($a,$b) {
 $a = $a|0;
 $b = $b|0;
 var $add = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $add = (($b) + ($a))|0;
 return ($add|0);
}
function _simpleinc($a) {
 $a = $a|0;
 var $add = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $add = (($a) + 1)|0;
 return ($add|0);
}
function _simpleminus($a,$b) {
 $a = $a|0;
 $b = $b|0;
 var $sub = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $sub = (($a) - ($b))|0;
 return ($sub|0);
}
function _simpleconst() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 168;
}
function runPostSets() {
 var temp = 0;
}
function __post_instantiate() {
 STACKTOP = (memoryBase + (0) | 0);
 STACK_MAX = STACKTOP + 5242880 | 0;
 runPostSets();
}

  


// EMSCRIPTEN_END_FUNCS


  return { __post_instantiate: __post_instantiate, _simpleadd: _simpleadd, _simpleconst: _simpleconst, _simpleinc: _simpleinc, _simpleminus: _simpleminus, runPostSets: runPostSets };
})
;