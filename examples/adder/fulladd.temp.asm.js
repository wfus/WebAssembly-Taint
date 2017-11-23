Module["asm"] =  (/** @suppress {uselessCode} */ function(global, env, buffer) {
'almost asm';


  var Int8View = global.Int8Array;
  var HEAP8 = new Int8View(buffer);
  var Int16View = global.Int16Array;
  var HEAP16 = new Int16View(buffer);
  var Int32View = global.Int32Array;
  var HEAP32 = new Int32View(buffer);
  var Uint8View = global.Uint8Array;
  var HEAPU8 = new Uint8View(buffer);
  var Uint16View = global.Uint16Array;
  var HEAPU16 = new Uint16View(buffer);
  var Uint32View = global.Uint32Array;
  var HEAPU32 = new Uint32View(buffer);
  var Float32View = global.Float32Array;
  var HEAPF32 = new Float32View(buffer);
  var Float64View = global.Float64Array;
  var HEAPF64 = new Float64View(buffer);
  var byteLength = global.byteLength;

  var DYNAMICTOP_PTR=env.DYNAMICTOP_PTR|0;
  var tempDoublePtr=env.tempDoublePtr|0;
  var ABORT=env.ABORT|0;
  var STACKTOP=env.STACKTOP|0;
  var STACK_MAX=env.STACK_MAX|0;

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
  var abortStackOverflow=env.abortStackOverflow;
  var nullFunc_ii=env.nullFunc_ii;
  var nullFunc_iiii=env.nullFunc_iiii;
  var nullFunc_vi=env.nullFunc_vi;
  var nullFunc_viiii=env.nullFunc_viiii;
  var nullFunc_viiiii=env.nullFunc_viiiii;
  var nullFunc_viiiiii=env.nullFunc_viiiiii;
  var invoke_ii=env.invoke_ii;
  var invoke_iiii=env.invoke_iiii;
  var invoke_vi=env.invoke_vi;
  var invoke_viiii=env.invoke_viiii;
  var invoke_viiiii=env.invoke_viiiii;
  var invoke_viiiiii=env.invoke_viiiiii;
  var __ZSt18uncaught_exceptionv=env.__ZSt18uncaught_exceptionv;
  var ___cxa_find_matching_catch=env.___cxa_find_matching_catch;
  var ___gxx_personality_v0=env.___gxx_personality_v0;
  var ___lock=env.___lock;
  var ___resumeException=env.___resumeException;
  var ___setErrNo=env.___setErrNo;
  var ___syscall140=env.___syscall140;
  var ___syscall146=env.___syscall146;
  var ___syscall54=env.___syscall54;
  var ___syscall6=env.___syscall6;
  var ___unlock=env.___unlock;
  var __embind_register_bool=env.__embind_register_bool;
  var __embind_register_emval=env.__embind_register_emval;
  var __embind_register_float=env.__embind_register_float;
  var __embind_register_integer=env.__embind_register_integer;
  var __embind_register_memory_view=env.__embind_register_memory_view;
  var __embind_register_std_string=env.__embind_register_std_string;
  var __embind_register_std_wstring=env.__embind_register_std_wstring;
  var __embind_register_void=env.__embind_register_void;
  var __emval_decref=env.__emval_decref;
  var __emval_register=env.__emval_register;
  var _embind_repr=env._embind_repr;
  var _emscripten_memcpy_big=env._emscripten_memcpy_big;
  var count_emval_handles=env.count_emval_handles;
  var createNamedFunction=env.createNamedFunction;
  var embind_init_charCodes=env.embind_init_charCodes;
  var extendError=env.extendError;
  var floatReadValueFromPointer=env.floatReadValueFromPointer;
  var getShiftFromSize=env.getShiftFromSize;
  var get_first_emval=env.get_first_emval;
  var init_emval=env.init_emval;
  var integerReadValueFromPointer=env.integerReadValueFromPointer;
  var makeLegalFunctionName=env.makeLegalFunctionName;
  var readLatin1String=env.readLatin1String;
  var registerType=env.registerType;
  var simpleReadValueFromPointer=env.simpleReadValueFromPointer;
  var throwBindingError=env.throwBindingError;
  var throwInternalError=env.throwInternalError;
  var whenDependentTypesAreResolved=env.whenDependentTypesAreResolved;
  var tempFloat = Math_fround(0);
  const f0 = Math_fround(0);

function _emscripten_replace_memory(newBuffer) {
  if ((byteLength(newBuffer) & 0xffffff || byteLength(newBuffer) <= 0xffffff) || byteLength(newBuffer) > 0x80000000) return false;
  HEAP8 = new Int8View(newBuffer);
  HEAP16 = new Int16View(newBuffer);
  HEAP32 = new Int32View(newBuffer);
  HEAPU8 = new Uint8View(newBuffer);
  HEAPU16 = new Uint16View(newBuffer);
  HEAPU32 = new Uint32View(newBuffer);
  HEAPF32 = new Float32View(newBuffer);
  HEAPF64 = new Float64View(newBuffer);
  buffer = newBuffer;
  return true;
}

// EMSCRIPTEN_START_FUNCS

function stackAlloc(size) {
  size = size|0;
  var ret = 0;
  ret = STACKTOP;
  STACKTOP = (STACKTOP + size)|0;
  STACKTOP = (STACKTOP + 15)&-16;
  if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(size|0);

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

function setTempRet0(value) {
  value = value|0;
  tempRet0 = value;
}
function getTempRet0() {
  return tempRet0|0;
}

function __GLOBAL__sub_I_bind_cpp() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 ___cxx_global_var_init();
 return;
}
function ___cxx_global_var_init() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 __ZN53EmscriptenBindingInitializer_native_and_builtin_typesC2Ev(4132);
 return;
}
function __ZN53EmscriptenBindingInitializer_native_and_builtin_typesC2Ev($this) {
 $this = $this|0;
 var $call = 0, $call2 = 0, $call3 = 0, $call4 = 0, $call5 = 0, $call6 = 0, $this$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $this$addr = $this;
 $call = (__ZN10emscripten8internal6TypeIDIvE3getEv()|0);
 __embind_register_void(($call|0),(1920|0));
 $call2 = (__ZN10emscripten8internal6TypeIDIbE3getEv()|0);
 __embind_register_bool(($call2|0),(1925|0),1,1,0);
 __ZN12_GLOBAL__N_1L16register_integerIcEEvPKc(1930);
 __ZN12_GLOBAL__N_1L16register_integerIaEEvPKc(1935);
 __ZN12_GLOBAL__N_1L16register_integerIhEEvPKc(1947);
 __ZN12_GLOBAL__N_1L16register_integerIsEEvPKc(1961);
 __ZN12_GLOBAL__N_1L16register_integerItEEvPKc(1967);
 __ZN12_GLOBAL__N_1L16register_integerIiEEvPKc(1982);
 __ZN12_GLOBAL__N_1L16register_integerIjEEvPKc(1986);
 __ZN12_GLOBAL__N_1L16register_integerIlEEvPKc(1999);
 __ZN12_GLOBAL__N_1L16register_integerImEEvPKc(2004);
 __ZN12_GLOBAL__N_1L14register_floatIfEEvPKc(2018);
 __ZN12_GLOBAL__N_1L14register_floatIdEEvPKc(2024);
 $call3 = (__ZN10emscripten8internal6TypeIDINSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEEE3getEv()|0);
 __embind_register_std_string(($call3|0),(2031|0));
 $call4 = (__ZN10emscripten8internal6TypeIDINSt3__212basic_stringIhNS2_11char_traitsIhEENS2_9allocatorIhEEEEE3getEv()|0);
 __embind_register_std_string(($call4|0),(2043|0));
 $call5 = (__ZN10emscripten8internal6TypeIDINSt3__212basic_stringIwNS2_11char_traitsIwEENS2_9allocatorIwEEEEE3getEv()|0);
 __embind_register_std_wstring(($call5|0),4,(2076|0));
 $call6 = (__ZN10emscripten8internal6TypeIDINS_3valEE3getEv()|0);
 __embind_register_emval(($call6|0),(2089|0));
 __ZN12_GLOBAL__N_1L20register_memory_viewIcEEvPKc(2105);
 __ZN12_GLOBAL__N_1L20register_memory_viewIaEEvPKc(2135);
 __ZN12_GLOBAL__N_1L20register_memory_viewIhEEvPKc(2172);
 __ZN12_GLOBAL__N_1L20register_memory_viewIsEEvPKc(2211);
 __ZN12_GLOBAL__N_1L20register_memory_viewItEEvPKc(2242);
 __ZN12_GLOBAL__N_1L20register_memory_viewIiEEvPKc(2282);
 __ZN12_GLOBAL__N_1L20register_memory_viewIjEEvPKc(2311);
 __ZN12_GLOBAL__N_1L20register_memory_viewIlEEvPKc(2349);
 __ZN12_GLOBAL__N_1L20register_memory_viewImEEvPKc(2379);
 __ZN12_GLOBAL__N_1L20register_memory_viewIaEEvPKc(2418);
 __ZN12_GLOBAL__N_1L20register_memory_viewIhEEvPKc(2450);
 __ZN12_GLOBAL__N_1L20register_memory_viewIsEEvPKc(2483);
 __ZN12_GLOBAL__N_1L20register_memory_viewItEEvPKc(2516);
 __ZN12_GLOBAL__N_1L20register_memory_viewIiEEvPKc(2550);
 __ZN12_GLOBAL__N_1L20register_memory_viewIjEEvPKc(2583);
 __ZN12_GLOBAL__N_1L20register_memory_viewIfEEvPKc(2617);
 __ZN12_GLOBAL__N_1L20register_memory_viewIdEEvPKc(2648);
 __ZN12_GLOBAL__N_1L20register_memory_viewIeEEvPKc(2680);
 STACKTOP = sp;return;
}
function __ZN10emscripten8internal6TypeIDIvE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDIvE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal6TypeIDIbE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDIbE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_1L16register_integerIcEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $conv = 0, $conv3 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDIcE3getEv()|0);
 $0 = $name$addr;
 $conv = -128 << 24 >> 24;
 $conv3 = 127 << 24 >> 24;
 __embind_register_integer(($call|0),($0|0),1,($conv|0),($conv3|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L16register_integerIaEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $conv = 0, $conv3 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDIaE3getEv()|0);
 $0 = $name$addr;
 $conv = -128 << 24 >> 24;
 $conv3 = 127 << 24 >> 24;
 __embind_register_integer(($call|0),($0|0),1,($conv|0),($conv3|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L16register_integerIhEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $conv = 0, $conv3 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDIhE3getEv()|0);
 $0 = $name$addr;
 $conv = 0;
 $conv3 = 255;
 __embind_register_integer(($call|0),($0|0),1,($conv|0),($conv3|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L16register_integerIsEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $conv = 0, $conv3 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDIsE3getEv()|0);
 $0 = $name$addr;
 $conv = -32768 << 16 >> 16;
 $conv3 = 32767 << 16 >> 16;
 __embind_register_integer(($call|0),($0|0),2,($conv|0),($conv3|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L16register_integerItEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $conv = 0, $conv3 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDItE3getEv()|0);
 $0 = $name$addr;
 $conv = 0;
 $conv3 = 65535;
 __embind_register_integer(($call|0),($0|0),2,($conv|0),($conv3|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L16register_integerIiEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDIiE3getEv()|0);
 $0 = $name$addr;
 __embind_register_integer(($call|0),($0|0),4,-2147483648,2147483647);
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L16register_integerIjEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDIjE3getEv()|0);
 $0 = $name$addr;
 __embind_register_integer(($call|0),($0|0),4,0,-1);
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L16register_integerIlEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDIlE3getEv()|0);
 $0 = $name$addr;
 __embind_register_integer(($call|0),($0|0),4,-2147483648,2147483647);
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L16register_integerImEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDImE3getEv()|0);
 $0 = $name$addr;
 __embind_register_integer(($call|0),($0|0),4,0,-1);
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L14register_floatIfEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDIfE3getEv()|0);
 $0 = $name$addr;
 __embind_register_float(($call|0),($0|0),4);
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L14register_floatIdEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDIdE3getEv()|0);
 $0 = $name$addr;
 __embind_register_float(($call|0),($0|0),8);
 STACKTOP = sp;return;
}
function __ZN10emscripten8internal6TypeIDINSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEEE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal6TypeIDINSt3__212basic_stringIhNS2_11char_traitsIhEENS2_9allocatorIhEEEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINSt3__212basic_stringIhNS2_11char_traitsIhEENS2_9allocatorIhEEEEE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal6TypeIDINSt3__212basic_stringIwNS2_11char_traitsIwEENS2_9allocatorIwEEEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINSt3__212basic_stringIwNS2_11char_traitsIwEENS2_9allocatorIwEEEEE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal6TypeIDINS_3valEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_3valEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_1L20register_memory_viewIcEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewIcEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexIcEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L20register_memory_viewIaEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewIaEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexIaEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L20register_memory_viewIhEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewIhEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexIhEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L20register_memory_viewIsEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewIsEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexIsEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L20register_memory_viewItEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewItEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexItEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L20register_memory_viewIiEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewIiEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexIiEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L20register_memory_viewIjEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewIjEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexIjEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L20register_memory_viewIlEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewIlEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexIlEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L20register_memory_viewImEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewImEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexImEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L20register_memory_viewIfEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewIfEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexIfEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L20register_memory_viewIdEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewIdEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexIdEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN12_GLOBAL__N_1L20register_memory_viewIeEEvPKc($name) {
 $name = $name|0;
 var $0 = 0, $call = 0, $call1 = 0, $name$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $name$addr = $name;
 $call = (__ZN10emscripten8internal6TypeIDINS_11memory_viewIeEEE3getEv()|0);
 $call1 = (__ZN12_GLOBAL__N_118getTypedArrayIndexIeEENS_15TypedArrayIndexEv()|0);
 $0 = $name$addr;
 __embind_register_memory_view(($call|0),($call1|0),($0|0));
 STACKTOP = sp;return;
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewIeEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewIeEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexIeEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 7;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewIeEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1024|0);
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewIdEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewIdEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexIdEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 7;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewIdEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1032|0);
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewIfEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewIfEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexIfEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 6;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewIfEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1040|0);
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewImEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewImEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexImEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 5;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewImEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1048|0);
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewIlEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewIlEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexIlEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 4;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewIlEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1056|0);
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewIjEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewIjEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexIjEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 5;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewIjEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1064|0);
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewIiEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewIiEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexIiEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 4;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewIiEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1072|0);
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewItEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewItEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexItEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 3;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewItEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1080|0);
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewIsEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewIsEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexIsEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 2;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewIsEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1088|0);
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewIhEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewIhEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexIhEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 1;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewIhEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1096|0);
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewIaEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewIaEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexIaEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 0;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewIaEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1104|0);
}
function __ZN10emscripten8internal6TypeIDINS_11memory_viewIcEEE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDINS_11memory_viewIcEEE3getEv()|0);
 return ($call|0);
}
function __ZN12_GLOBAL__N_118getTypedArrayIndexIcEENS_15TypedArrayIndexEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 0;
}
function __ZN10emscripten8internal11LightTypeIDINS_11memory_viewIcEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1112|0);
}
function __ZN10emscripten8internal11LightTypeIDINS_3valEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1120|0);
}
function __ZN10emscripten8internal11LightTypeIDINSt3__212basic_stringIwNS2_11char_traitsIwEENS2_9allocatorIwEEEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1128|0);
}
function __ZN10emscripten8internal11LightTypeIDINSt3__212basic_stringIhNS2_11char_traitsIhEENS2_9allocatorIhEEEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1160|0);
}
function __ZN10emscripten8internal11LightTypeIDINSt3__212basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEEE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1184|0);
}
function __ZN10emscripten8internal6TypeIDIdE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDIdE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal11LightTypeIDIdE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1376|0);
}
function __ZN10emscripten8internal6TypeIDIfE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDIfE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal11LightTypeIDIfE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1368|0);
}
function __ZN10emscripten8internal6TypeIDImE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDImE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal11LightTypeIDImE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1360|0);
}
function __ZN10emscripten8internal6TypeIDIlE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDIlE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal11LightTypeIDIlE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1352|0);
}
function __ZN10emscripten8internal6TypeIDIjE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDIjE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal11LightTypeIDIjE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1344|0);
}
function __ZN10emscripten8internal6TypeIDIiE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDIiE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal11LightTypeIDIiE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1336|0);
}
function __ZN10emscripten8internal6TypeIDItE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDItE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal11LightTypeIDItE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1328|0);
}
function __ZN10emscripten8internal6TypeIDIsE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDIsE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal11LightTypeIDIsE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1320|0);
}
function __ZN10emscripten8internal6TypeIDIhE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDIhE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal11LightTypeIDIhE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1304|0);
}
function __ZN10emscripten8internal6TypeIDIaE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDIaE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal11LightTypeIDIaE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1312|0);
}
function __ZN10emscripten8internal6TypeIDIcE3getEv() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10emscripten8internal11LightTypeIDIcE3getEv()|0);
 return ($call|0);
}
function __ZN10emscripten8internal11LightTypeIDIcE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1296|0);
}
function __ZN10emscripten8internal11LightTypeIDIbE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1288|0);
}
function __ZN10emscripten8internal11LightTypeIDIvE3getEv() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1280|0);
}
function ___getTypeName($ti) {
 $ti = $ti|0;
 var $0 = 0, $1 = 0, $__type_name$i = 0, $call1 = 0, $this$addr$i = 0, $this1$i = 0, $ti$addr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $ti$addr = $ti;
 $0 = $ti$addr;
 $this$addr$i = $0;
 $this1$i = $this$addr$i;
 $__type_name$i = ((($this1$i)) + 4|0);
 $1 = load4($__type_name$i);
 $call1 = (___strdup($1)|0);
 STACKTOP = sp;return ($call1|0);
}
function _malloc($bytes) {
 $bytes = $bytes|0;
 var $$pre = 0, $$pre$i = 0, $$pre$i$i = 0, $$pre$i133 = 0, $$pre$i186 = 0, $$pre$i27$i = 0, $$pre$phi$i$iZ2D = 0, $$pre$phi$i187Z2D = 0, $$pre$phi$i28$iZ2D = 0, $$pre$phi$iZ2D = 0, $$pre$phiZ2D = 0, $$sink$i = 0, $$sink$i$i = 0, $$sink$i166 = 0, $$sink2$i = 0, $$sink2$i183 = 0, $$sink4$i = 0, $$v$0$i = 0, $0 = 0, $1 = 0;
 var $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0;
 var $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0;
 var $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0;
 var $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0;
 var $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0;
 var $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0;
 var $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0;
 var $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0;
 var $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $F$0$i$i = 0, $F104$0 = 0, $F197$0$i = 0, $F224$0$i$i = 0, $F290$0$i = 0, $I252$0$i$i = 0, $I316$0$i = 0, $I57$0$i$i = 0, $K105$0$i$i = 0, $K305$0$i$i = 0, $K373$0$i = 0, $R$1$i = 0, $R$1$i$i = 0, $R$1$i175 = 0;
 var $R$3$i = 0, $R$3$i$i = 0, $R$3$i179 = 0, $RP$1$i = 0, $RP$1$i$i = 0, $RP$1$i174 = 0, $T$0$i = 0, $T$0$i$i = 0, $T$0$i29$i = 0, $add$i = 0, $add$i$i = 0, $add$i134 = 0, $add$i152 = 0, $add$ptr = 0, $add$ptr$i = 0, $add$ptr$i$i = 0, $add$ptr$i$i$i = 0, $add$ptr$i140 = 0, $add$ptr$i169 = 0, $add$ptr$i2$i$i = 0;
 var $add$ptr$i31$i = 0, $add$ptr$i38$i = 0, $add$ptr$i54$i = 0, $add$ptr14$i$i = 0, $add$ptr15$i$i = 0, $add$ptr16$i$i = 0, $add$ptr166 = 0, $add$ptr169 = 0, $add$ptr17$i$i = 0, $add$ptr178 = 0, $add$ptr181$i = 0, $add$ptr182 = 0, $add$ptr189$i = 0, $add$ptr190$i = 0, $add$ptr193 = 0, $add$ptr199 = 0, $add$ptr2$i$i = 0, $add$ptr205$i$i = 0, $add$ptr212$i$i = 0, $add$ptr225$i = 0;
 var $add$ptr227$i = 0, $add$ptr24$i$i = 0, $add$ptr262$i = 0, $add$ptr269$i = 0, $add$ptr273$i = 0, $add$ptr282$i = 0, $add$ptr3$i$i = 0, $add$ptr30$i$i = 0, $add$ptr369$i$i = 0, $add$ptr4$i$i = 0, $add$ptr4$i$i$i = 0, $add$ptr4$i36$i = 0, $add$ptr4$i43$i = 0, $add$ptr441$i = 0, $add$ptr5$i$i = 0, $add$ptr6$i$i = 0, $add$ptr6$i$i$i = 0, $add$ptr6$i47$i = 0, $add$ptr7$i$i = 0, $add$ptr81$i$i = 0;
 var $add$ptr95 = 0, $add$ptr98 = 0, $add10$i = 0, $add101$i = 0, $add110$i = 0, $add13$i = 0, $add14$i = 0, $add140$i = 0, $add144 = 0, $add150$i = 0, $add17$i = 0, $add17$i155 = 0, $add177$i = 0, $add18$i = 0, $add19$i = 0, $add2 = 0, $add20$i = 0, $add206$i$i = 0, $add212$i = 0, $add215$i = 0;
 var $add22$i = 0, $add246$i = 0, $add26$i$i = 0, $add268$i = 0, $add269$i$i = 0, $add274$i$i = 0, $add278$i$i = 0, $add280$i$i = 0, $add283$i$i = 0, $add337$i = 0, $add342$i = 0, $add346$i = 0, $add348$i = 0, $add351$i = 0, $add46$i = 0, $add50 = 0, $add51$i = 0, $add54 = 0, $add54$i = 0, $add58 = 0;
 var $add62 = 0, $add64 = 0, $add74$i$i = 0, $add77$i = 0, $add78$i = 0, $add79$i$i = 0, $add8 = 0, $add82$i = 0, $add83$i$i = 0, $add85$i$i = 0, $add86$i = 0, $add88$i$i = 0, $add9$i = 0, $add90$i = 0, $add92$i = 0, $and = 0, $and$i = 0, $and$i$i = 0, $and$i$i$i = 0, $and$i11$i = 0;
 var $and$i149 = 0, $and$i32$i = 0, $and$i39$i = 0, $and100$i = 0, $and103$i = 0, $and104$i = 0, $and106 = 0, $and11$add51$i = 0, $and11$i = 0, $and119$i$i = 0, $and12$i = 0, $and13$i = 0, $and13$i$i = 0, $and133$i$i = 0, $and14 = 0, $and145 = 0, $and17$i = 0, $and194$i = 0, $and194$i182 = 0, $and199$i = 0;
 var $and209$i$i = 0, $and21$i = 0, $and21$i156 = 0, $and227$i$i = 0, $and236$i = 0, $and264$i$i = 0, $and268$i$i = 0, $and273$i$i = 0, $and282$i$i = 0, $and29$i = 0, $and292$i = 0, $and295$i$i = 0, $and3$i = 0, $and3$i$i = 0, $and3$i$i$i = 0, $and3$i34$i = 0, $and3$i41$i = 0, $and30$i = 0, $and318$i$i = 0, $and32$i = 0;
 var $and32$i$i = 0, $and33$i$i = 0, $and331$i = 0, $and336$i = 0, $and341$i = 0, $and350$i = 0, $and363$i = 0, $and37$i$i = 0, $and387$i = 0, $and4 = 0, $and40$i$i = 0, $and41 = 0, $and42$i = 0, $and43 = 0, $and46 = 0, $and49 = 0, $and49$i = 0, $and49$i$i = 0, $and53 = 0, $and57 = 0;
 var $and6$i = 0, $and6$i$i = 0, $and6$i10$i = 0, $and6$i14$i = 0, $and61 = 0, $and64$i = 0, $and68$i = 0, $and69$i$i = 0, $and7 = 0, $and73$i = 0, $and73$i$i = 0, $and74 = 0, $and77$i = 0, $and78$i$i = 0, $and8$i = 0, $and80$i = 0, $and81$i = 0, $and85$i = 0, $and87$i$i = 0, $and89$i = 0;
 var $and9$i = 0, $and96$i$i = 0, $arrayidx = 0, $arrayidx$i = 0, $arrayidx$i$i = 0, $arrayidx$i157 = 0, $arrayidx$i50$i = 0, $arrayidx103 = 0, $arrayidx103$i$i = 0, $arrayidx106$i = 0, $arrayidx107$i$i = 0, $arrayidx113$i = 0, $arrayidx113$i167 = 0, $arrayidx121$i = 0, $arrayidx123$i$i = 0, $arrayidx126$i$i = 0, $arrayidx137$i = 0, $arrayidx143$i$i = 0, $arrayidx148$i = 0, $arrayidx151$i = 0;
 var $arrayidx151$i$i = 0, $arrayidx154$i = 0, $arrayidx155$i = 0, $arrayidx161$i = 0, $arrayidx165$i = 0, $arrayidx165$i177 = 0, $arrayidx178$i$i = 0, $arrayidx184$i = 0, $arrayidx184$i$i = 0, $arrayidx195$i$i = 0, $arrayidx196$i = 0, $arrayidx204$i = 0, $arrayidx212$i = 0, $arrayidx223$i$i = 0, $arrayidx228$i = 0, $arrayidx23$i = 0, $arrayidx232$i = 0, $arrayidx239$i = 0, $arrayidx245$i = 0, $arrayidx256$i = 0;
 var $arrayidx27$i = 0, $arrayidx275$i = 0, $arrayidx287$i$i = 0, $arrayidx289$i = 0, $arrayidx290$i$i = 0, $arrayidx325$i$i = 0, $arrayidx355$i = 0, $arrayidx358$i = 0, $arrayidx394$i = 0, $arrayidx40$i = 0, $arrayidx44$i = 0, $arrayidx61$i = 0, $arrayidx65$i = 0, $arrayidx66 = 0, $arrayidx71$i = 0, $arrayidx75$i = 0, $arrayidx91$i$i = 0, $arrayidx92$i$i = 0, $arrayidx94$i = 0, $arrayidx94$i165 = 0;
 var $arrayidx96$i$i = 0, $bk$i = 0, $bk$i$i = 0, $bk$i171 = 0, $bk$i22$i = 0, $bk102$i$i = 0, $bk122 = 0, $bk124 = 0, $bk139$i$i = 0, $bk145$i = 0, $bk158$i$i = 0, $bk161$i$i = 0, $bk18 = 0, $bk218$i = 0, $bk220$i = 0, $bk246$i$i = 0, $bk248$i$i = 0, $bk302$i$i = 0, $bk311$i = 0, $bk313$i = 0;
 var $bk338$i$i = 0, $bk357$i$i = 0, $bk360$i$i = 0, $bk370$i = 0, $bk407$i = 0, $bk429$i = 0, $bk432$i = 0, $bk55$i$i = 0, $bk56$i = 0, $bk67$i$i = 0, $bk74$i$i = 0, $bk85 = 0, $bk91$i$i = 0, $br$2$ph$i = 0, $call107$i = 0, $call131$i = 0, $call132$i = 0, $call275$i = 0, $call37$i = 0, $call68$i = 0;
 var $call83$i = 0, $child$i$i = 0, $child166$i$i = 0, $child289$i$i = 0, $child357$i = 0, $cmp = 0, $cmp$i = 0, $cmp$i$i$i = 0, $cmp$i12$i = 0, $cmp$i146 = 0, $cmp$i3$i$i = 0, $cmp$i33$i = 0, $cmp$i40$i = 0, $cmp$i52$i = 0, $cmp$i9$i = 0, $cmp1 = 0, $cmp1$i = 0, $cmp10 = 0, $cmp100$i$i = 0, $cmp102$i = 0;
 var $cmp104$i$i = 0, $cmp105$i = 0, $cmp106$i$i = 0, $cmp108$i = 0, $cmp108$i$i = 0, $cmp116$i = 0, $cmp118$i = 0, $cmp119$i = 0, $cmp12$i = 0, $cmp120$i$i = 0, $cmp120$i24$i = 0, $cmp123$i = 0, $cmp124$i$i = 0, $cmp126$i = 0, $cmp127$i = 0, $cmp128 = 0, $cmp128$i = 0, $cmp128$i$i = 0, $cmp133$i = 0, $cmp135$i = 0;
 var $cmp137$i = 0, $cmp138$i = 0, $cmp139 = 0, $cmp141$i = 0, $cmp146 = 0, $cmp147$i = 0, $cmp14795$i = 0, $cmp15$i = 0, $cmp151$i = 0, $cmp152$i = 0, $cmp155$i = 0, $cmp156 = 0, $cmp156$i = 0, $cmp156$i$i = 0, $cmp157$i = 0, $cmp159$i = 0, $cmp162 = 0, $cmp162$i = 0, $cmp162$i176 = 0, $cmp166$i = 0;
 var $cmp168$i$i = 0, $cmp174$i = 0, $cmp180$i = 0, $cmp185$i = 0, $cmp185$i$i = 0, $cmp186 = 0, $cmp186$i = 0, $cmp19$i = 0, $cmp190$i = 0, $cmp191$i = 0, $cmp2$i$i = 0, $cmp2$i$i$i = 0, $cmp20$i$i = 0, $cmp203$i = 0, $cmp209$i = 0, $cmp21$i = 0, $cmp215$i$i = 0, $cmp217$i = 0, $cmp218$i = 0, $cmp224$i = 0;
 var $cmp228$i = 0, $cmp229$i = 0, $cmp24$i = 0, $cmp24$i$i = 0, $cmp246$i = 0, $cmp254$i$i = 0, $cmp257$i = 0, $cmp258$i$i = 0, $cmp26$i = 0, $cmp265$i = 0, $cmp27$i$i = 0, $cmp28$i = 0, $cmp28$i$i = 0, $cmp284$i = 0, $cmp286$i = 0, $cmp29 = 0, $cmp3$i$i = 0, $cmp306$i$i = 0, $cmp31 = 0, $cmp319$i = 0;
 var $cmp319$i$i = 0, $cmp32$i = 0, $cmp32$i137 = 0, $cmp323$i = 0, $cmp327$i$i = 0, $cmp34$i = 0, $cmp34$i$i = 0, $cmp35$i = 0, $cmp36$i = 0, $cmp36$i$i = 0, $cmp374$i = 0, $cmp38$i = 0, $cmp38$i$i = 0, $cmp388$i = 0, $cmp396$i = 0, $cmp40$i = 0, $cmp43$i = 0, $cmp45$i = 0, $cmp46$i = 0, $cmp46$i$i = 0;
 var $cmp49$i = 0, $cmp5 = 0, $cmp55$i = 0, $cmp55$i161 = 0, $cmp57$i = 0, $cmp57$i162 = 0, $cmp59$i$i = 0, $cmp60$i = 0, $cmp62$i = 0, $cmp63$i = 0, $cmp63$i$i = 0, $cmp65$i = 0, $cmp66$i = 0, $cmp66$i139 = 0, $cmp69$i = 0, $cmp7$i$i = 0, $cmp70 = 0, $cmp72$i = 0, $cmp75$i$i = 0, $cmp76$i = 0;
 var $cmp81$i = 0, $cmp85$i = 0, $cmp89$i = 0, $cmp9$i$i = 0, $cmp90$i = 0, $cmp91$i = 0, $cmp93$i = 0, $cmp95$i = 0, $cmp96$i = 0, $cmp97$i = 0, $cmp97$i$i = 0, $cmp976$i = 0, $cmp99 = 0, $cond = 0, $cond$i = 0, $cond$i$i = 0, $cond$i$i$i = 0, $cond$i13$i = 0, $cond$i158 = 0, $cond$i35$i = 0;
 var $cond$i42$i = 0, $cond1$i$i = 0, $cond115$i$i = 0, $cond13$i$i = 0, $cond15$i$i = 0, $cond2$i = 0, $cond315$i$i = 0, $cond383$i = 0, $exitcond$i$i = 0, $fd$i = 0, $fd$i$i = 0, $fd$i172 = 0, $fd103$i$i = 0, $fd123 = 0, $fd140$i$i = 0, $fd146$i = 0, $fd148$i$i = 0, $fd160$i$i = 0, $fd219$i = 0, $fd247$i$i = 0;
 var $fd303$i$i = 0, $fd312$i = 0, $fd339$i$i = 0, $fd344$i$i = 0, $fd359$i$i = 0, $fd371$i = 0, $fd408$i = 0, $fd416$i = 0, $fd431$i = 0, $fd54$i$i = 0, $fd57$i = 0, $fd68$i$i = 0, $fd69 = 0, $fd78$i$i = 0, $fd9 = 0, $fd92$i$i = 0, $head = 0, $head$i = 0, $head$i$i = 0, $head$i$i$i = 0;
 var $head$i159 = 0, $head$i18$i = 0, $head$i37$i = 0, $head$i46$i = 0, $head118$i$i = 0, $head168 = 0, $head173 = 0, $head177 = 0, $head179 = 0, $head179$i = 0, $head182$i = 0, $head187$i = 0, $head189$i = 0, $head195 = 0, $head198 = 0, $head208$i$i = 0, $head211$i$i = 0, $head23$i$i = 0, $head25 = 0, $head26$i$i = 0;
 var $head265$i = 0, $head268$i = 0, $head271$i = 0, $head274$i = 0, $head279$i = 0, $head281$i = 0, $head29$i = 0, $head29$i$i = 0, $head317$i$i = 0, $head32$i$i = 0, $head34$i$i = 0, $head386$i = 0, $head7$i$i = 0, $head7$i$i$i = 0, $head7$i48$i = 0, $head94 = 0, $head97 = 0, $head99$i = 0, $i$01$i$i = 0, $idx$0$i = 0;
 var $inc$i$i = 0, $index$i = 0, $index$i$i = 0, $index$i180 = 0, $index$i25$i = 0, $index288$i$i = 0, $index356$i = 0, $magic$i$i = 0, $nb$0 = 0, $neg = 0, $neg$i = 0, $neg$i$i = 0, $neg$i136 = 0, $neg$i181 = 0, $neg103$i = 0, $neg13 = 0, $neg132$i$i = 0, $neg48$i = 0, $neg73 = 0, $next$i = 0;
 var $next$i$i = 0, $next$i$i$i = 0, $next231$i = 0, $not$cmp$i = 0, $not$cmp107$i = 0, $not$cmp114$i = 0, $not$cmp141$i = 0, $not$cmp144$i$i = 0, $not$cmp205$i = 0, $not$cmp3$i = 0, $not$cmp493$i = 0, $oldfirst$0$i$i = 0, $or$cond$i = 0, $or$cond$i163 = 0, $or$cond1$i = 0, $or$cond1$i160 = 0, $or$cond2$i = 0, $or$cond3$i = 0, $or$cond4$i = 0, $or$cond5$i = 0;
 var $or$cond7$i = 0, $or$cond7$not$i = 0, $or$cond8$i = 0, $or$cond93$i = 0, $or$cond94$i = 0, $or$i = 0, $or$i$i = 0, $or$i$i$i = 0, $or$i164 = 0, $or$i45$i = 0, $or101$i$i = 0, $or110 = 0, $or167 = 0, $or172 = 0, $or176 = 0, $or178$i = 0, $or180 = 0, $or183$i = 0, $or186$i = 0, $or188$i = 0;
 var $or19$i$i = 0, $or194 = 0, $or197 = 0, $or204$i = 0, $or210$i$i = 0, $or22$i$i = 0, $or23 = 0, $or232$i$i = 0, $or26 = 0, $or264$i = 0, $or267$i = 0, $or270$i = 0, $or275$i = 0, $or278$i = 0, $or28$i$i = 0, $or280$i = 0, $or297$i = 0, $or300$i$i = 0, $or33$i$i = 0, $or368$i = 0;
 var $or40 = 0, $or44$i$i = 0, $or93 = 0, $or96 = 0, $parent$i = 0, $parent$i$i = 0, $parent$i170 = 0, $parent$i23$i = 0, $parent135$i = 0, $parent138$i$i = 0, $parent149$i = 0, $parent162$i$i = 0, $parent165$i$i = 0, $parent166$i = 0, $parent179$i$i = 0, $parent196$i$i = 0, $parent226$i = 0, $parent240$i = 0, $parent257$i = 0, $parent301$i$i = 0;
 var $parent337$i$i = 0, $parent361$i$i = 0, $parent369$i = 0, $parent406$i = 0, $parent433$i = 0, $qsize$0$i$i = 0, $retval$0 = 0, $rsize$0$i = 0, $rsize$0$lcssa$i = 0, $rsize$07$i = 0, $rsize$1$i = 0, $rsize$3$i = 0, $rsize$4$lcssa$i = 0, $rsize$48$i = 0, $rst$0$i = 0, $rst$1$i = 0, $sflags193$i = 0, $sflags235$i = 0, $shl = 0, $shl$i = 0;
 var $shl$i$i = 0, $shl$i150 = 0, $shl$i49$i = 0, $shl102 = 0, $shl105 = 0, $shl116$i$i = 0, $shl12 = 0, $shl127$i$i = 0, $shl131$i$i = 0, $shl15$i = 0, $shl18$i = 0, $shl192$i = 0, $shl195$i = 0, $shl198$i = 0, $shl22 = 0, $shl222$i$i = 0, $shl226$i$i = 0, $shl265$i$i = 0, $shl270$i$i = 0, $shl276$i$i = 0;
 var $shl279$i$i = 0, $shl288$i = 0, $shl291$i = 0, $shl294$i$i = 0, $shl31$i = 0, $shl316$i$i = 0, $shl326$i$i = 0, $shl333$i = 0, $shl338$i = 0, $shl344$i = 0, $shl347$i = 0, $shl35 = 0, $shl362$i = 0, $shl37 = 0, $shl384$i = 0, $shl39$i$i = 0, $shl395$i = 0, $shl48$i$i = 0, $shl52$i = 0, $shl60$i = 0;
 var $shl65 = 0, $shl70$i$i = 0, $shl72 = 0, $shl75$i$i = 0, $shl81$i$i = 0, $shl84$i$i = 0, $shl9$i = 0, $shl90 = 0, $shl95$i$i = 0, $shr = 0, $shr$i = 0, $shr$i$i = 0, $shr$i145 = 0, $shr$i21$i = 0, $shr101 = 0, $shr11$i = 0, $shr11$i153 = 0, $shr110$i$i = 0, $shr12$i = 0, $shr124$i$i = 0;
 var $shr15$i = 0, $shr16$i = 0, $shr16$i154 = 0, $shr19$i = 0, $shr194$i = 0, $shr20$i = 0, $shr214$i$i = 0, $shr253$i$i = 0, $shr263$i$i = 0, $shr267$i$i = 0, $shr27$i = 0, $shr272$i$i = 0, $shr277$i$i = 0, $shr281$i$i = 0, $shr283$i = 0, $shr3 = 0, $shr310$i$i = 0, $shr318$i = 0, $shr323$i$i = 0, $shr330$i = 0;
 var $shr335$i = 0, $shr340$i = 0, $shr345$i = 0, $shr349$i = 0, $shr378$i = 0, $shr392$i = 0, $shr4$i = 0, $shr42$i = 0, $shr45 = 0, $shr47 = 0, $shr48 = 0, $shr5$i = 0, $shr5$i148 = 0, $shr51 = 0, $shr52 = 0, $shr55 = 0, $shr56 = 0, $shr58$i$i = 0, $shr59 = 0, $shr60 = 0;
 var $shr63 = 0, $shr68$i$i = 0, $shr7$i = 0, $shr7$i151 = 0, $shr72$i = 0, $shr72$i$i = 0, $shr75$i = 0, $shr76$i = 0, $shr77$i$i = 0, $shr79$i = 0, $shr8$i = 0, $shr80$i = 0, $shr82$i$i = 0, $shr83$i = 0, $shr84$i = 0, $shr86$i$i = 0, $shr87$i = 0, $shr88$i = 0, $shr91$i = 0, $size$i$i = 0;
 var $size$i$i$i = 0, $size188$i = 0, $size245$i = 0, $sizebits$0$i = 0, $sizebits$0$shl52$i = 0, $sp$0$i$i = 0, $sp$0$i$i$i = 0, $sp$0104$i = 0, $sp$1103$i = 0, $ssize$2$ph$i = 0, $sub = 0, $sub$i = 0, $sub$i135 = 0, $sub$i144 = 0, $sub$ptr$lhs$cast$i = 0, $sub$ptr$lhs$cast$i$i = 0, $sub$ptr$lhs$cast$i15$i = 0, $sub$ptr$rhs$cast$i = 0, $sub$ptr$rhs$cast$i$i = 0, $sub$ptr$rhs$cast$i16$i = 0;
 var $sub$ptr$sub$i = 0, $sub$ptr$sub$i$i = 0, $sub$ptr$sub$i17$i = 0, $sub$ptr$sub$tsize$4$i = 0, $sub10$i = 0, $sub101$i = 0, $sub101$rsize$4$i = 0, $sub112$i = 0, $sub113$i$i = 0, $sub118$i = 0, $sub14$i = 0, $sub16$i$i = 0, $sub160 = 0, $sub172$i = 0, $sub18$i$i = 0, $sub190 = 0, $sub2$i = 0, $sub22$i = 0, $sub260$i = 0, $sub262$i$i = 0;
 var $sub266$i$i = 0, $sub271$i$i = 0, $sub275$i$i = 0, $sub30$i = 0, $sub31$i = 0, $sub31$rsize$0$i = 0, $sub313$i$i = 0, $sub329$i = 0, $sub33$i = 0, $sub334$i = 0, $sub339$i = 0, $sub343$i = 0, $sub381$i = 0, $sub4$i = 0, $sub41$i = 0, $sub42 = 0, $sub44 = 0, $sub5$i$i = 0, $sub5$i$i$i = 0, $sub5$i44$i = 0;
 var $sub50$i = 0, $sub6$i = 0, $sub63$i = 0, $sub67$i = 0, $sub67$i$i = 0, $sub70$i = 0, $sub71$i$i = 0, $sub76$i$i = 0, $sub80$i$i = 0, $sub91 = 0, $sub99$i = 0, $t$0$i = 0, $t$2$i = 0, $t$4$ph$i = 0, $t$4$v$4$i = 0, $t$47$i = 0, $tbase$792$i = 0, $tobool$i$i = 0, $tobool107 = 0, $tobool195$i = 0;
 var $tobool200$i = 0, $tobool228$i$i = 0, $tobool237$i = 0, $tobool293$i = 0, $tobool296$i$i = 0, $tobool30$i = 0, $tobool364$i = 0, $tobool97$i$i = 0, $tsize$2617179$i = 0, $tsize$4$i = 0, $tsize$791$i = 0, $v$0$i = 0, $v$0$lcssa$i = 0, $v$08$i = 0, $v$1$i = 0, $v$3$i = 0, $v$4$lcssa$i = 0, $v$4$ph$i = 0, $v$49$i = 0, $xor$i$i = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $magic$i$i = sp;
 $cmp = ($bytes>>>0)<(245);
 do {
  if ($cmp) {
   $cmp1 = ($bytes>>>0)<(11);
   $add2 = (($bytes) + 11)|0;
   $and = $add2 & -8;
   $cond = $cmp1 ? 16 : $and;
   $shr = $cond >>> 3;
   $0 = load4(3560);
   $shr3 = $0 >>> $shr;
   $and4 = $shr3 & 3;
   $cmp5 = ($and4|0)==(0);
   if (!($cmp5)) {
    $neg = $shr3 & 1;
    $and7 = $neg ^ 1;
    $add8 = (($and7) + ($shr))|0;
    $shl = $add8 << 1;
    $arrayidx = (3600 + ($shl<<2)|0);
    $1 = ((($arrayidx)) + 8|0);
    $2 = load4($1);
    $fd9 = ((($2)) + 8|0);
    $3 = load4($fd9);
    $cmp10 = ($arrayidx|0)==($3|0);
    if ($cmp10) {
     $shl12 = 1 << $add8;
     $neg13 = $shl12 ^ -1;
     $and14 = $0 & $neg13;
     store4(3560,$and14);
    } else {
     $bk18 = ((($3)) + 12|0);
     store4($bk18,$arrayidx);
     store4($1,$3);
    }
    $shl22 = $add8 << 3;
    $or23 = $shl22 | 3;
    $head = ((($2)) + 4|0);
    store4($head,$or23);
    $add$ptr = (($2) + ($shl22)|0);
    $head25 = ((($add$ptr)) + 4|0);
    $4 = load4($head25);
    $or26 = $4 | 1;
    store4($head25,$or26);
    $retval$0 = $fd9;
    STACKTOP = sp;return ($retval$0|0);
   }
   $5 = load4((3568));
   $cmp29 = ($cond>>>0)>($5>>>0);
   if ($cmp29) {
    $cmp31 = ($shr3|0)==(0);
    if (!($cmp31)) {
     $shl35 = $shr3 << $shr;
     $shl37 = 2 << $shr;
     $sub = (0 - ($shl37))|0;
     $or40 = $shl37 | $sub;
     $and41 = $shl35 & $or40;
     $sub42 = (0 - ($and41))|0;
     $and43 = $and41 & $sub42;
     $sub44 = (($and43) + -1)|0;
     $shr45 = $sub44 >>> 12;
     $and46 = $shr45 & 16;
     $shr47 = $sub44 >>> $and46;
     $shr48 = $shr47 >>> 5;
     $and49 = $shr48 & 8;
     $add50 = $and49 | $and46;
     $shr51 = $shr47 >>> $and49;
     $shr52 = $shr51 >>> 2;
     $and53 = $shr52 & 4;
     $add54 = $add50 | $and53;
     $shr55 = $shr51 >>> $and53;
     $shr56 = $shr55 >>> 1;
     $and57 = $shr56 & 2;
     $add58 = $add54 | $and57;
     $shr59 = $shr55 >>> $and57;
     $shr60 = $shr59 >>> 1;
     $and61 = $shr60 & 1;
     $add62 = $add58 | $and61;
     $shr63 = $shr59 >>> $and61;
     $add64 = (($add62) + ($shr63))|0;
     $shl65 = $add64 << 1;
     $arrayidx66 = (3600 + ($shl65<<2)|0);
     $6 = ((($arrayidx66)) + 8|0);
     $7 = load4($6);
     $fd69 = ((($7)) + 8|0);
     $8 = load4($fd69);
     $cmp70 = ($arrayidx66|0)==($8|0);
     if ($cmp70) {
      $shl72 = 1 << $add64;
      $neg73 = $shl72 ^ -1;
      $and74 = $0 & $neg73;
      store4(3560,$and74);
      $10 = $and74;
     } else {
      $bk85 = ((($8)) + 12|0);
      store4($bk85,$arrayidx66);
      store4($6,$8);
      $10 = $0;
     }
     $shl90 = $add64 << 3;
     $sub91 = (($shl90) - ($cond))|0;
     $or93 = $cond | 3;
     $head94 = ((($7)) + 4|0);
     store4($head94,$or93);
     $add$ptr95 = (($7) + ($cond)|0);
     $or96 = $sub91 | 1;
     $head97 = ((($add$ptr95)) + 4|0);
     store4($head97,$or96);
     $add$ptr98 = (($add$ptr95) + ($sub91)|0);
     store4($add$ptr98,$sub91);
     $cmp99 = ($5|0)==(0);
     if (!($cmp99)) {
      $9 = load4((3580));
      $shr101 = $5 >>> 3;
      $shl102 = $shr101 << 1;
      $arrayidx103 = (3600 + ($shl102<<2)|0);
      $shl105 = 1 << $shr101;
      $and106 = $10 & $shl105;
      $tobool107 = ($and106|0)==(0);
      if ($tobool107) {
       $or110 = $10 | $shl105;
       store4(3560,$or110);
       $$pre = ((($arrayidx103)) + 8|0);
       $$pre$phiZ2D = $$pre;$F104$0 = $arrayidx103;
      } else {
       $11 = ((($arrayidx103)) + 8|0);
       $12 = load4($11);
       $$pre$phiZ2D = $11;$F104$0 = $12;
      }
      store4($$pre$phiZ2D,$9);
      $bk122 = ((($F104$0)) + 12|0);
      store4($bk122,$9);
      $fd123 = ((($9)) + 8|0);
      store4($fd123,$F104$0);
      $bk124 = ((($9)) + 12|0);
      store4($bk124,$arrayidx103);
     }
     store4((3568),$sub91);
     store4((3580),$add$ptr95);
     $retval$0 = $fd69;
     STACKTOP = sp;return ($retval$0|0);
    }
    $13 = load4((3564));
    $cmp128 = ($13|0)==(0);
    if ($cmp128) {
     $nb$0 = $cond;
    } else {
     $sub$i = (0 - ($13))|0;
     $and$i = $13 & $sub$i;
     $sub2$i = (($and$i) + -1)|0;
     $shr$i = $sub2$i >>> 12;
     $and3$i = $shr$i & 16;
     $shr4$i = $sub2$i >>> $and3$i;
     $shr5$i = $shr4$i >>> 5;
     $and6$i = $shr5$i & 8;
     $add$i = $and6$i | $and3$i;
     $shr7$i = $shr4$i >>> $and6$i;
     $shr8$i = $shr7$i >>> 2;
     $and9$i = $shr8$i & 4;
     $add10$i = $add$i | $and9$i;
     $shr11$i = $shr7$i >>> $and9$i;
     $shr12$i = $shr11$i >>> 1;
     $and13$i = $shr12$i & 2;
     $add14$i = $add10$i | $and13$i;
     $shr15$i = $shr11$i >>> $and13$i;
     $shr16$i = $shr15$i >>> 1;
     $and17$i = $shr16$i & 1;
     $add18$i = $add14$i | $and17$i;
     $shr19$i = $shr15$i >>> $and17$i;
     $add20$i = (($add18$i) + ($shr19$i))|0;
     $arrayidx$i = (3864 + ($add20$i<<2)|0);
     $14 = load4($arrayidx$i);
     $head$i = ((($14)) + 4|0);
     $15 = load4($head$i);
     $and21$i = $15 & -8;
     $sub22$i = (($and21$i) - ($cond))|0;
     $arrayidx232$i = ((($14)) + 16|0);
     $16 = load4($arrayidx232$i);
     $not$cmp3$i = ($16|0)==(0|0);
     $$sink4$i = $not$cmp3$i&1;
     $arrayidx275$i = (((($14)) + 16|0) + ($$sink4$i<<2)|0);
     $17 = load4($arrayidx275$i);
     $cmp286$i = ($17|0)==(0|0);
     if ($cmp286$i) {
      $rsize$0$lcssa$i = $sub22$i;$v$0$lcssa$i = $14;
     } else {
      $18 = $17;$rsize$07$i = $sub22$i;$v$08$i = $14;
      while(1) {
       $head29$i = ((($18)) + 4|0);
       $19 = load4($head29$i);
       $and30$i = $19 & -8;
       $sub31$i = (($and30$i) - ($cond))|0;
       $cmp32$i = ($sub31$i>>>0)<($rsize$07$i>>>0);
       $sub31$rsize$0$i = $cmp32$i ? $sub31$i : $rsize$07$i;
       $$v$0$i = $cmp32$i ? $18 : $v$08$i;
       $arrayidx23$i = ((($18)) + 16|0);
       $20 = load4($arrayidx23$i);
       $not$cmp$i = ($20|0)==(0|0);
       $$sink$i = $not$cmp$i&1;
       $arrayidx27$i = (((($18)) + 16|0) + ($$sink$i<<2)|0);
       $21 = load4($arrayidx27$i);
       $cmp28$i = ($21|0)==(0|0);
       if ($cmp28$i) {
        $rsize$0$lcssa$i = $sub31$rsize$0$i;$v$0$lcssa$i = $$v$0$i;
        break;
       } else {
        $18 = $21;$rsize$07$i = $sub31$rsize$0$i;$v$08$i = $$v$0$i;
       }
      }
     }
     $add$ptr$i = (($v$0$lcssa$i) + ($cond)|0);
     $cmp35$i = ($v$0$lcssa$i>>>0)<($add$ptr$i>>>0);
     if ($cmp35$i) {
      $parent$i = ((($v$0$lcssa$i)) + 24|0);
      $22 = load4($parent$i);
      $bk$i = ((($v$0$lcssa$i)) + 12|0);
      $23 = load4($bk$i);
      $cmp40$i = ($23|0)==($v$0$lcssa$i|0);
      do {
       if ($cmp40$i) {
        $arrayidx61$i = ((($v$0$lcssa$i)) + 20|0);
        $25 = load4($arrayidx61$i);
        $cmp62$i = ($25|0)==(0|0);
        if ($cmp62$i) {
         $arrayidx65$i = ((($v$0$lcssa$i)) + 16|0);
         $26 = load4($arrayidx65$i);
         $cmp66$i = ($26|0)==(0|0);
         if ($cmp66$i) {
          $R$3$i = 0;
          break;
         } else {
          $R$1$i = $26;$RP$1$i = $arrayidx65$i;
         }
        } else {
         $R$1$i = $25;$RP$1$i = $arrayidx61$i;
        }
        while(1) {
         $arrayidx71$i = ((($R$1$i)) + 20|0);
         $27 = load4($arrayidx71$i);
         $cmp72$i = ($27|0)==(0|0);
         if (!($cmp72$i)) {
          $R$1$i = $27;$RP$1$i = $arrayidx71$i;
          continue;
         }
         $arrayidx75$i = ((($R$1$i)) + 16|0);
         $28 = load4($arrayidx75$i);
         $cmp76$i = ($28|0)==(0|0);
         if ($cmp76$i) {
          break;
         } else {
          $R$1$i = $28;$RP$1$i = $arrayidx75$i;
         }
        }
        store4($RP$1$i,0);
        $R$3$i = $R$1$i;
       } else {
        $fd$i = ((($v$0$lcssa$i)) + 8|0);
        $24 = load4($fd$i);
        $bk56$i = ((($24)) + 12|0);
        store4($bk56$i,$23);
        $fd57$i = ((($23)) + 8|0);
        store4($fd57$i,$24);
        $R$3$i = $23;
       }
      } while(0);
      $cmp90$i = ($22|0)==(0|0);
      do {
       if (!($cmp90$i)) {
        $index$i = ((($v$0$lcssa$i)) + 28|0);
        $29 = load4($index$i);
        $arrayidx94$i = (3864 + ($29<<2)|0);
        $30 = load4($arrayidx94$i);
        $cmp95$i = ($v$0$lcssa$i|0)==($30|0);
        if ($cmp95$i) {
         store4($arrayidx94$i,$R$3$i);
         $cond$i = ($R$3$i|0)==(0|0);
         if ($cond$i) {
          $shl$i = 1 << $29;
          $neg$i = $shl$i ^ -1;
          $and103$i = $13 & $neg$i;
          store4((3564),$and103$i);
          break;
         }
        } else {
         $arrayidx113$i = ((($22)) + 16|0);
         $31 = load4($arrayidx113$i);
         $not$cmp114$i = ($31|0)!=($v$0$lcssa$i|0);
         $$sink2$i = $not$cmp114$i&1;
         $arrayidx121$i = (((($22)) + 16|0) + ($$sink2$i<<2)|0);
         store4($arrayidx121$i,$R$3$i);
         $cmp126$i = ($R$3$i|0)==(0|0);
         if ($cmp126$i) {
          break;
         }
        }
        $parent135$i = ((($R$3$i)) + 24|0);
        store4($parent135$i,$22);
        $arrayidx137$i = ((($v$0$lcssa$i)) + 16|0);
        $32 = load4($arrayidx137$i);
        $cmp138$i = ($32|0)==(0|0);
        if (!($cmp138$i)) {
         $arrayidx148$i = ((($R$3$i)) + 16|0);
         store4($arrayidx148$i,$32);
         $parent149$i = ((($32)) + 24|0);
         store4($parent149$i,$R$3$i);
        }
        $arrayidx154$i = ((($v$0$lcssa$i)) + 20|0);
        $33 = load4($arrayidx154$i);
        $cmp155$i = ($33|0)==(0|0);
        if (!($cmp155$i)) {
         $arrayidx165$i = ((($R$3$i)) + 20|0);
         store4($arrayidx165$i,$33);
         $parent166$i = ((($33)) + 24|0);
         store4($parent166$i,$R$3$i);
        }
       }
      } while(0);
      $cmp174$i = ($rsize$0$lcssa$i>>>0)<(16);
      if ($cmp174$i) {
       $add177$i = (($rsize$0$lcssa$i) + ($cond))|0;
       $or178$i = $add177$i | 3;
       $head179$i = ((($v$0$lcssa$i)) + 4|0);
       store4($head179$i,$or178$i);
       $add$ptr181$i = (($v$0$lcssa$i) + ($add177$i)|0);
       $head182$i = ((($add$ptr181$i)) + 4|0);
       $34 = load4($head182$i);
       $or183$i = $34 | 1;
       store4($head182$i,$or183$i);
      } else {
       $or186$i = $cond | 3;
       $head187$i = ((($v$0$lcssa$i)) + 4|0);
       store4($head187$i,$or186$i);
       $or188$i = $rsize$0$lcssa$i | 1;
       $head189$i = ((($add$ptr$i)) + 4|0);
       store4($head189$i,$or188$i);
       $add$ptr190$i = (($add$ptr$i) + ($rsize$0$lcssa$i)|0);
       store4($add$ptr190$i,$rsize$0$lcssa$i);
       $cmp191$i = ($5|0)==(0);
       if (!($cmp191$i)) {
        $35 = load4((3580));
        $shr194$i = $5 >>> 3;
        $shl195$i = $shr194$i << 1;
        $arrayidx196$i = (3600 + ($shl195$i<<2)|0);
        $shl198$i = 1 << $shr194$i;
        $and199$i = $0 & $shl198$i;
        $tobool200$i = ($and199$i|0)==(0);
        if ($tobool200$i) {
         $or204$i = $0 | $shl198$i;
         store4(3560,$or204$i);
         $$pre$i = ((($arrayidx196$i)) + 8|0);
         $$pre$phi$iZ2D = $$pre$i;$F197$0$i = $arrayidx196$i;
        } else {
         $36 = ((($arrayidx196$i)) + 8|0);
         $37 = load4($36);
         $$pre$phi$iZ2D = $36;$F197$0$i = $37;
        }
        store4($$pre$phi$iZ2D,$35);
        $bk218$i = ((($F197$0$i)) + 12|0);
        store4($bk218$i,$35);
        $fd219$i = ((($35)) + 8|0);
        store4($fd219$i,$F197$0$i);
        $bk220$i = ((($35)) + 12|0);
        store4($bk220$i,$arrayidx196$i);
       }
       store4((3568),$rsize$0$lcssa$i);
       store4((3580),$add$ptr$i);
      }
      $add$ptr225$i = ((($v$0$lcssa$i)) + 8|0);
      $retval$0 = $add$ptr225$i;
      STACKTOP = sp;return ($retval$0|0);
     } else {
      $nb$0 = $cond;
     }
    }
   } else {
    $nb$0 = $cond;
   }
  } else {
   $cmp139 = ($bytes>>>0)>(4294967231);
   if ($cmp139) {
    $nb$0 = -1;
   } else {
    $add144 = (($bytes) + 11)|0;
    $and145 = $add144 & -8;
    $38 = load4((3564));
    $cmp146 = ($38|0)==(0);
    if ($cmp146) {
     $nb$0 = $and145;
    } else {
     $sub$i144 = (0 - ($and145))|0;
     $shr$i145 = $add144 >>> 8;
     $cmp$i146 = ($shr$i145|0)==(0);
     if ($cmp$i146) {
      $idx$0$i = 0;
     } else {
      $cmp1$i = ($and145>>>0)>(16777215);
      if ($cmp1$i) {
       $idx$0$i = 31;
      } else {
       $sub4$i = (($shr$i145) + 1048320)|0;
       $shr5$i148 = $sub4$i >>> 16;
       $and$i149 = $shr5$i148 & 8;
       $shl$i150 = $shr$i145 << $and$i149;
       $sub6$i = (($shl$i150) + 520192)|0;
       $shr7$i151 = $sub6$i >>> 16;
       $and8$i = $shr7$i151 & 4;
       $add$i152 = $and8$i | $and$i149;
       $shl9$i = $shl$i150 << $and8$i;
       $sub10$i = (($shl9$i) + 245760)|0;
       $shr11$i153 = $sub10$i >>> 16;
       $and12$i = $shr11$i153 & 2;
       $add13$i = $add$i152 | $and12$i;
       $sub14$i = (14 - ($add13$i))|0;
       $shl15$i = $shl9$i << $and12$i;
       $shr16$i154 = $shl15$i >>> 15;
       $add17$i155 = (($sub14$i) + ($shr16$i154))|0;
       $shl18$i = $add17$i155 << 1;
       $add19$i = (($add17$i155) + 7)|0;
       $shr20$i = $and145 >>> $add19$i;
       $and21$i156 = $shr20$i & 1;
       $add22$i = $and21$i156 | $shl18$i;
       $idx$0$i = $add22$i;
      }
     }
     $arrayidx$i157 = (3864 + ($idx$0$i<<2)|0);
     $39 = load4($arrayidx$i157);
     $cmp24$i = ($39|0)==(0|0);
     L74: do {
      if ($cmp24$i) {
       $rsize$3$i = $sub$i144;$t$2$i = 0;$v$3$i = 0;
       label = 57;
      } else {
       $cmp26$i = ($idx$0$i|0)==(31);
       $shr27$i = $idx$0$i >>> 1;
       $sub30$i = (25 - ($shr27$i))|0;
       $cond$i158 = $cmp26$i ? 0 : $sub30$i;
       $shl31$i = $and145 << $cond$i158;
       $rsize$0$i = $sub$i144;$rst$0$i = 0;$sizebits$0$i = $shl31$i;$t$0$i = $39;$v$0$i = 0;
       while(1) {
        $head$i159 = ((($t$0$i)) + 4|0);
        $40 = load4($head$i159);
        $and32$i = $40 & -8;
        $sub33$i = (($and32$i) - ($and145))|0;
        $cmp34$i = ($sub33$i>>>0)<($rsize$0$i>>>0);
        if ($cmp34$i) {
         $cmp36$i = ($sub33$i|0)==(0);
         if ($cmp36$i) {
          $rsize$48$i = 0;$t$47$i = $t$0$i;$v$49$i = $t$0$i;
          label = 61;
          break L74;
         } else {
          $rsize$1$i = $sub33$i;$v$1$i = $t$0$i;
         }
        } else {
         $rsize$1$i = $rsize$0$i;$v$1$i = $v$0$i;
        }
        $arrayidx40$i = ((($t$0$i)) + 20|0);
        $41 = load4($arrayidx40$i);
        $shr42$i = $sizebits$0$i >>> 31;
        $arrayidx44$i = (((($t$0$i)) + 16|0) + ($shr42$i<<2)|0);
        $42 = load4($arrayidx44$i);
        $cmp45$i = ($41|0)==(0|0);
        $cmp46$i = ($41|0)==($42|0);
        $or$cond1$i160 = $cmp45$i | $cmp46$i;
        $rst$1$i = $or$cond1$i160 ? $rst$0$i : $41;
        $cmp49$i = ($42|0)==(0|0);
        $not$cmp493$i = $cmp49$i ^ 1;
        $shl52$i = $not$cmp493$i&1;
        $sizebits$0$shl52$i = $sizebits$0$i << $shl52$i;
        if ($cmp49$i) {
         $rsize$3$i = $rsize$1$i;$t$2$i = $rst$1$i;$v$3$i = $v$1$i;
         label = 57;
         break;
        } else {
         $rsize$0$i = $rsize$1$i;$rst$0$i = $rst$1$i;$sizebits$0$i = $sizebits$0$shl52$i;$t$0$i = $42;$v$0$i = $v$1$i;
        }
       }
      }
     } while(0);
     if ((label|0) == 57) {
      $cmp55$i161 = ($t$2$i|0)==(0|0);
      $cmp57$i162 = ($v$3$i|0)==(0|0);
      $or$cond$i163 = $cmp55$i161 & $cmp57$i162;
      if ($or$cond$i163) {
       $shl60$i = 2 << $idx$0$i;
       $sub63$i = (0 - ($shl60$i))|0;
       $or$i164 = $shl60$i | $sub63$i;
       $and64$i = $38 & $or$i164;
       $cmp65$i = ($and64$i|0)==(0);
       if ($cmp65$i) {
        $nb$0 = $and145;
        break;
       }
       $sub67$i = (0 - ($and64$i))|0;
       $and68$i = $and64$i & $sub67$i;
       $sub70$i = (($and68$i) + -1)|0;
       $shr72$i = $sub70$i >>> 12;
       $and73$i = $shr72$i & 16;
       $shr75$i = $sub70$i >>> $and73$i;
       $shr76$i = $shr75$i >>> 5;
       $and77$i = $shr76$i & 8;
       $add78$i = $and77$i | $and73$i;
       $shr79$i = $shr75$i >>> $and77$i;
       $shr80$i = $shr79$i >>> 2;
       $and81$i = $shr80$i & 4;
       $add82$i = $add78$i | $and81$i;
       $shr83$i = $shr79$i >>> $and81$i;
       $shr84$i = $shr83$i >>> 1;
       $and85$i = $shr84$i & 2;
       $add86$i = $add82$i | $and85$i;
       $shr87$i = $shr83$i >>> $and85$i;
       $shr88$i = $shr87$i >>> 1;
       $and89$i = $shr88$i & 1;
       $add90$i = $add86$i | $and89$i;
       $shr91$i = $shr87$i >>> $and89$i;
       $add92$i = (($add90$i) + ($shr91$i))|0;
       $arrayidx94$i165 = (3864 + ($add92$i<<2)|0);
       $43 = load4($arrayidx94$i165);
       $t$4$ph$i = $43;$v$4$ph$i = 0;
      } else {
       $t$4$ph$i = $t$2$i;$v$4$ph$i = $v$3$i;
      }
      $cmp976$i = ($t$4$ph$i|0)==(0|0);
      if ($cmp976$i) {
       $rsize$4$lcssa$i = $rsize$3$i;$v$4$lcssa$i = $v$4$ph$i;
      } else {
       $rsize$48$i = $rsize$3$i;$t$47$i = $t$4$ph$i;$v$49$i = $v$4$ph$i;
       label = 61;
      }
     }
     if ((label|0) == 61) {
      while(1) {
       label = 0;
       $head99$i = ((($t$47$i)) + 4|0);
       $44 = load4($head99$i);
       $and100$i = $44 & -8;
       $sub101$i = (($and100$i) - ($and145))|0;
       $cmp102$i = ($sub101$i>>>0)<($rsize$48$i>>>0);
       $sub101$rsize$4$i = $cmp102$i ? $sub101$i : $rsize$48$i;
       $t$4$v$4$i = $cmp102$i ? $t$47$i : $v$49$i;
       $arrayidx106$i = ((($t$47$i)) + 16|0);
       $45 = load4($arrayidx106$i);
       $not$cmp107$i = ($45|0)==(0|0);
       $$sink$i166 = $not$cmp107$i&1;
       $arrayidx113$i167 = (((($t$47$i)) + 16|0) + ($$sink$i166<<2)|0);
       $46 = load4($arrayidx113$i167);
       $cmp97$i = ($46|0)==(0|0);
       if ($cmp97$i) {
        $rsize$4$lcssa$i = $sub101$rsize$4$i;$v$4$lcssa$i = $t$4$v$4$i;
        break;
       } else {
        $rsize$48$i = $sub101$rsize$4$i;$t$47$i = $46;$v$49$i = $t$4$v$4$i;
        label = 61;
       }
      }
     }
     $cmp116$i = ($v$4$lcssa$i|0)==(0|0);
     if ($cmp116$i) {
      $nb$0 = $and145;
     } else {
      $47 = load4((3568));
      $sub118$i = (($47) - ($and145))|0;
      $cmp119$i = ($rsize$4$lcssa$i>>>0)<($sub118$i>>>0);
      if ($cmp119$i) {
       $add$ptr$i169 = (($v$4$lcssa$i) + ($and145)|0);
       $cmp123$i = ($v$4$lcssa$i>>>0)<($add$ptr$i169>>>0);
       if (!($cmp123$i)) {
        $retval$0 = 0;
        STACKTOP = sp;return ($retval$0|0);
       }
       $parent$i170 = ((($v$4$lcssa$i)) + 24|0);
       $48 = load4($parent$i170);
       $bk$i171 = ((($v$4$lcssa$i)) + 12|0);
       $49 = load4($bk$i171);
       $cmp128$i = ($49|0)==($v$4$lcssa$i|0);
       do {
        if ($cmp128$i) {
         $arrayidx151$i = ((($v$4$lcssa$i)) + 20|0);
         $51 = load4($arrayidx151$i);
         $cmp152$i = ($51|0)==(0|0);
         if ($cmp152$i) {
          $arrayidx155$i = ((($v$4$lcssa$i)) + 16|0);
          $52 = load4($arrayidx155$i);
          $cmp156$i = ($52|0)==(0|0);
          if ($cmp156$i) {
           $R$3$i179 = 0;
           break;
          } else {
           $R$1$i175 = $52;$RP$1$i174 = $arrayidx155$i;
          }
         } else {
          $R$1$i175 = $51;$RP$1$i174 = $arrayidx151$i;
         }
         while(1) {
          $arrayidx161$i = ((($R$1$i175)) + 20|0);
          $53 = load4($arrayidx161$i);
          $cmp162$i176 = ($53|0)==(0|0);
          if (!($cmp162$i176)) {
           $R$1$i175 = $53;$RP$1$i174 = $arrayidx161$i;
           continue;
          }
          $arrayidx165$i177 = ((($R$1$i175)) + 16|0);
          $54 = load4($arrayidx165$i177);
          $cmp166$i = ($54|0)==(0|0);
          if ($cmp166$i) {
           break;
          } else {
           $R$1$i175 = $54;$RP$1$i174 = $arrayidx165$i177;
          }
         }
         store4($RP$1$i174,0);
         $R$3$i179 = $R$1$i175;
        } else {
         $fd$i172 = ((($v$4$lcssa$i)) + 8|0);
         $50 = load4($fd$i172);
         $bk145$i = ((($50)) + 12|0);
         store4($bk145$i,$49);
         $fd146$i = ((($49)) + 8|0);
         store4($fd146$i,$50);
         $R$3$i179 = $49;
        }
       } while(0);
       $cmp180$i = ($48|0)==(0|0);
       do {
        if ($cmp180$i) {
         $64 = $38;
        } else {
         $index$i180 = ((($v$4$lcssa$i)) + 28|0);
         $55 = load4($index$i180);
         $arrayidx184$i = (3864 + ($55<<2)|0);
         $56 = load4($arrayidx184$i);
         $cmp185$i = ($v$4$lcssa$i|0)==($56|0);
         if ($cmp185$i) {
          store4($arrayidx184$i,$R$3$i179);
          $cond2$i = ($R$3$i179|0)==(0|0);
          if ($cond2$i) {
           $shl192$i = 1 << $55;
           $neg$i181 = $shl192$i ^ -1;
           $and194$i182 = $38 & $neg$i181;
           store4((3564),$and194$i182);
           $64 = $and194$i182;
           break;
          }
         } else {
          $arrayidx204$i = ((($48)) + 16|0);
          $57 = load4($arrayidx204$i);
          $not$cmp205$i = ($57|0)!=($v$4$lcssa$i|0);
          $$sink2$i183 = $not$cmp205$i&1;
          $arrayidx212$i = (((($48)) + 16|0) + ($$sink2$i183<<2)|0);
          store4($arrayidx212$i,$R$3$i179);
          $cmp217$i = ($R$3$i179|0)==(0|0);
          if ($cmp217$i) {
           $64 = $38;
           break;
          }
         }
         $parent226$i = ((($R$3$i179)) + 24|0);
         store4($parent226$i,$48);
         $arrayidx228$i = ((($v$4$lcssa$i)) + 16|0);
         $58 = load4($arrayidx228$i);
         $cmp229$i = ($58|0)==(0|0);
         if (!($cmp229$i)) {
          $arrayidx239$i = ((($R$3$i179)) + 16|0);
          store4($arrayidx239$i,$58);
          $parent240$i = ((($58)) + 24|0);
          store4($parent240$i,$R$3$i179);
         }
         $arrayidx245$i = ((($v$4$lcssa$i)) + 20|0);
         $59 = load4($arrayidx245$i);
         $cmp246$i = ($59|0)==(0|0);
         if ($cmp246$i) {
          $64 = $38;
         } else {
          $arrayidx256$i = ((($R$3$i179)) + 20|0);
          store4($arrayidx256$i,$59);
          $parent257$i = ((($59)) + 24|0);
          store4($parent257$i,$R$3$i179);
          $64 = $38;
         }
        }
       } while(0);
       $cmp265$i = ($rsize$4$lcssa$i>>>0)<(16);
       do {
        if ($cmp265$i) {
         $add268$i = (($rsize$4$lcssa$i) + ($and145))|0;
         $or270$i = $add268$i | 3;
         $head271$i = ((($v$4$lcssa$i)) + 4|0);
         store4($head271$i,$or270$i);
         $add$ptr273$i = (($v$4$lcssa$i) + ($add268$i)|0);
         $head274$i = ((($add$ptr273$i)) + 4|0);
         $60 = load4($head274$i);
         $or275$i = $60 | 1;
         store4($head274$i,$or275$i);
        } else {
         $or278$i = $and145 | 3;
         $head279$i = ((($v$4$lcssa$i)) + 4|0);
         store4($head279$i,$or278$i);
         $or280$i = $rsize$4$lcssa$i | 1;
         $head281$i = ((($add$ptr$i169)) + 4|0);
         store4($head281$i,$or280$i);
         $add$ptr282$i = (($add$ptr$i169) + ($rsize$4$lcssa$i)|0);
         store4($add$ptr282$i,$rsize$4$lcssa$i);
         $shr283$i = $rsize$4$lcssa$i >>> 3;
         $cmp284$i = ($rsize$4$lcssa$i>>>0)<(256);
         if ($cmp284$i) {
          $shl288$i = $shr283$i << 1;
          $arrayidx289$i = (3600 + ($shl288$i<<2)|0);
          $61 = load4(3560);
          $shl291$i = 1 << $shr283$i;
          $and292$i = $61 & $shl291$i;
          $tobool293$i = ($and292$i|0)==(0);
          if ($tobool293$i) {
           $or297$i = $61 | $shl291$i;
           store4(3560,$or297$i);
           $$pre$i186 = ((($arrayidx289$i)) + 8|0);
           $$pre$phi$i187Z2D = $$pre$i186;$F290$0$i = $arrayidx289$i;
          } else {
           $62 = ((($arrayidx289$i)) + 8|0);
           $63 = load4($62);
           $$pre$phi$i187Z2D = $62;$F290$0$i = $63;
          }
          store4($$pre$phi$i187Z2D,$add$ptr$i169);
          $bk311$i = ((($F290$0$i)) + 12|0);
          store4($bk311$i,$add$ptr$i169);
          $fd312$i = ((($add$ptr$i169)) + 8|0);
          store4($fd312$i,$F290$0$i);
          $bk313$i = ((($add$ptr$i169)) + 12|0);
          store4($bk313$i,$arrayidx289$i);
          break;
         }
         $shr318$i = $rsize$4$lcssa$i >>> 8;
         $cmp319$i = ($shr318$i|0)==(0);
         if ($cmp319$i) {
          $I316$0$i = 0;
         } else {
          $cmp323$i = ($rsize$4$lcssa$i>>>0)>(16777215);
          if ($cmp323$i) {
           $I316$0$i = 31;
          } else {
           $sub329$i = (($shr318$i) + 1048320)|0;
           $shr330$i = $sub329$i >>> 16;
           $and331$i = $shr330$i & 8;
           $shl333$i = $shr318$i << $and331$i;
           $sub334$i = (($shl333$i) + 520192)|0;
           $shr335$i = $sub334$i >>> 16;
           $and336$i = $shr335$i & 4;
           $add337$i = $and336$i | $and331$i;
           $shl338$i = $shl333$i << $and336$i;
           $sub339$i = (($shl338$i) + 245760)|0;
           $shr340$i = $sub339$i >>> 16;
           $and341$i = $shr340$i & 2;
           $add342$i = $add337$i | $and341$i;
           $sub343$i = (14 - ($add342$i))|0;
           $shl344$i = $shl338$i << $and341$i;
           $shr345$i = $shl344$i >>> 15;
           $add346$i = (($sub343$i) + ($shr345$i))|0;
           $shl347$i = $add346$i << 1;
           $add348$i = (($add346$i) + 7)|0;
           $shr349$i = $rsize$4$lcssa$i >>> $add348$i;
           $and350$i = $shr349$i & 1;
           $add351$i = $and350$i | $shl347$i;
           $I316$0$i = $add351$i;
          }
         }
         $arrayidx355$i = (3864 + ($I316$0$i<<2)|0);
         $index356$i = ((($add$ptr$i169)) + 28|0);
         store4($index356$i,$I316$0$i);
         $child357$i = ((($add$ptr$i169)) + 16|0);
         $arrayidx358$i = ((($child357$i)) + 4|0);
         store4($arrayidx358$i,0);
         store4($child357$i,0);
         $shl362$i = 1 << $I316$0$i;
         $and363$i = $64 & $shl362$i;
         $tobool364$i = ($and363$i|0)==(0);
         if ($tobool364$i) {
          $or368$i = $64 | $shl362$i;
          store4((3564),$or368$i);
          store4($arrayidx355$i,$add$ptr$i169);
          $parent369$i = ((($add$ptr$i169)) + 24|0);
          store4($parent369$i,$arrayidx355$i);
          $bk370$i = ((($add$ptr$i169)) + 12|0);
          store4($bk370$i,$add$ptr$i169);
          $fd371$i = ((($add$ptr$i169)) + 8|0);
          store4($fd371$i,$add$ptr$i169);
          break;
         }
         $65 = load4($arrayidx355$i);
         $cmp374$i = ($I316$0$i|0)==(31);
         $shr378$i = $I316$0$i >>> 1;
         $sub381$i = (25 - ($shr378$i))|0;
         $cond383$i = $cmp374$i ? 0 : $sub381$i;
         $shl384$i = $rsize$4$lcssa$i << $cond383$i;
         $K373$0$i = $shl384$i;$T$0$i = $65;
         while(1) {
          $head386$i = ((($T$0$i)) + 4|0);
          $66 = load4($head386$i);
          $and387$i = $66 & -8;
          $cmp388$i = ($and387$i|0)==($rsize$4$lcssa$i|0);
          if ($cmp388$i) {
           label = 97;
           break;
          }
          $shr392$i = $K373$0$i >>> 31;
          $arrayidx394$i = (((($T$0$i)) + 16|0) + ($shr392$i<<2)|0);
          $shl395$i = $K373$0$i << 1;
          $67 = load4($arrayidx394$i);
          $cmp396$i = ($67|0)==(0|0);
          if ($cmp396$i) {
           label = 96;
           break;
          } else {
           $K373$0$i = $shl395$i;$T$0$i = $67;
          }
         }
         if ((label|0) == 96) {
          store4($arrayidx394$i,$add$ptr$i169);
          $parent406$i = ((($add$ptr$i169)) + 24|0);
          store4($parent406$i,$T$0$i);
          $bk407$i = ((($add$ptr$i169)) + 12|0);
          store4($bk407$i,$add$ptr$i169);
          $fd408$i = ((($add$ptr$i169)) + 8|0);
          store4($fd408$i,$add$ptr$i169);
          break;
         }
         else if ((label|0) == 97) {
          $fd416$i = ((($T$0$i)) + 8|0);
          $68 = load4($fd416$i);
          $bk429$i = ((($68)) + 12|0);
          store4($bk429$i,$add$ptr$i169);
          store4($fd416$i,$add$ptr$i169);
          $fd431$i = ((($add$ptr$i169)) + 8|0);
          store4($fd431$i,$68);
          $bk432$i = ((($add$ptr$i169)) + 12|0);
          store4($bk432$i,$T$0$i);
          $parent433$i = ((($add$ptr$i169)) + 24|0);
          store4($parent433$i,0);
          break;
         }
        }
       } while(0);
       $add$ptr441$i = ((($v$4$lcssa$i)) + 8|0);
       $retval$0 = $add$ptr441$i;
       STACKTOP = sp;return ($retval$0|0);
      } else {
       $nb$0 = $and145;
      }
     }
    }
   }
  }
 } while(0);
 $69 = load4((3568));
 $cmp156 = ($69>>>0)<($nb$0>>>0);
 if (!($cmp156)) {
  $sub160 = (($69) - ($nb$0))|0;
  $70 = load4((3580));
  $cmp162 = ($sub160>>>0)>(15);
  if ($cmp162) {
   $add$ptr166 = (($70) + ($nb$0)|0);
   store4((3580),$add$ptr166);
   store4((3568),$sub160);
   $or167 = $sub160 | 1;
   $head168 = ((($add$ptr166)) + 4|0);
   store4($head168,$or167);
   $add$ptr169 = (($add$ptr166) + ($sub160)|0);
   store4($add$ptr169,$sub160);
   $or172 = $nb$0 | 3;
   $head173 = ((($70)) + 4|0);
   store4($head173,$or172);
  } else {
   store4((3568),0);
   store4((3580),0);
   $or176 = $69 | 3;
   $head177 = ((($70)) + 4|0);
   store4($head177,$or176);
   $add$ptr178 = (($70) + ($69)|0);
   $head179 = ((($add$ptr178)) + 4|0);
   $71 = load4($head179);
   $or180 = $71 | 1;
   store4($head179,$or180);
  }
  $add$ptr182 = ((($70)) + 8|0);
  $retval$0 = $add$ptr182;
  STACKTOP = sp;return ($retval$0|0);
 }
 $72 = load4((3572));
 $cmp186 = ($72>>>0)>($nb$0>>>0);
 if ($cmp186) {
  $sub190 = (($72) - ($nb$0))|0;
  store4((3572),$sub190);
  $73 = load4((3584));
  $add$ptr193 = (($73) + ($nb$0)|0);
  store4((3584),$add$ptr193);
  $or194 = $sub190 | 1;
  $head195 = ((($add$ptr193)) + 4|0);
  store4($head195,$or194);
  $or197 = $nb$0 | 3;
  $head198 = ((($73)) + 4|0);
  store4($head198,$or197);
  $add$ptr199 = ((($73)) + 8|0);
  $retval$0 = $add$ptr199;
  STACKTOP = sp;return ($retval$0|0);
 }
 $74 = load4(4032);
 $cmp$i = ($74|0)==(0);
 if ($cmp$i) {
  store4((4040),4096);
  store4((4036),4096);
  store4((4044),-1);
  store4((4048),-1);
  store4((4052),0);
  store4((4004),0);
  $75 = $magic$i$i;
  $xor$i$i = $75 & -16;
  $and6$i$i = $xor$i$i ^ 1431655768;
  store4($magic$i$i,$and6$i$i);
  store4(4032,$and6$i$i);
  $76 = 4096;
 } else {
  $$pre$i133 = load4((4040));
  $76 = $$pre$i133;
 }
 $add$i134 = (($nb$0) + 48)|0;
 $sub$i135 = (($nb$0) + 47)|0;
 $add9$i = (($76) + ($sub$i135))|0;
 $neg$i136 = (0 - ($76))|0;
 $and11$i = $add9$i & $neg$i136;
 $cmp12$i = ($and11$i>>>0)>($nb$0>>>0);
 if (!($cmp12$i)) {
  $retval$0 = 0;
  STACKTOP = sp;return ($retval$0|0);
 }
 $77 = load4((4000));
 $cmp15$i = ($77|0)==(0);
 if (!($cmp15$i)) {
  $78 = load4((3992));
  $add17$i = (($78) + ($and11$i))|0;
  $cmp19$i = ($add17$i>>>0)<=($78>>>0);
  $cmp21$i = ($add17$i>>>0)>($77>>>0);
  $or$cond1$i = $cmp19$i | $cmp21$i;
  if ($or$cond1$i) {
   $retval$0 = 0;
   STACKTOP = sp;return ($retval$0|0);
  }
 }
 $79 = load4((4004));
 $and29$i = $79 & 4;
 $tobool30$i = ($and29$i|0)==(0);
 L167: do {
  if ($tobool30$i) {
   $80 = load4((3584));
   $cmp32$i137 = ($80|0)==(0|0);
   L169: do {
    if ($cmp32$i137) {
     label = 118;
    } else {
     $sp$0$i$i = (4008);
     while(1) {
      $81 = load4($sp$0$i$i);
      $cmp$i52$i = ($81>>>0)>($80>>>0);
      if (!($cmp$i52$i)) {
       $size$i$i = ((($sp$0$i$i)) + 4|0);
       $82 = load4($size$i$i);
       $add$ptr$i54$i = (($81) + ($82)|0);
       $cmp2$i$i = ($add$ptr$i54$i>>>0)>($80>>>0);
       if ($cmp2$i$i) {
        break;
       }
      }
      $next$i$i = ((($sp$0$i$i)) + 8|0);
      $83 = load4($next$i$i);
      $cmp3$i$i = ($83|0)==(0|0);
      if ($cmp3$i$i) {
       label = 118;
       break L169;
      } else {
       $sp$0$i$i = $83;
      }
     }
     $add77$i = (($add9$i) - ($72))|0;
     $and80$i = $add77$i & $neg$i136;
     $cmp81$i = ($and80$i>>>0)<(2147483647);
     if ($cmp81$i) {
      $call83$i = (_sbrk(($and80$i|0))|0);
      $88 = load4($sp$0$i$i);
      $89 = load4($size$i$i);
      $add$ptr$i140 = (($88) + ($89)|0);
      $cmp85$i = ($call83$i|0)==($add$ptr$i140|0);
      if ($cmp85$i) {
       $cmp89$i = ($call83$i|0)==((-1)|0);
       if ($cmp89$i) {
        $tsize$2617179$i = $and80$i;
       } else {
        $tbase$792$i = $call83$i;$tsize$791$i = $and80$i;
        label = 135;
        break L167;
       }
      } else {
       $br$2$ph$i = $call83$i;$ssize$2$ph$i = $and80$i;
       label = 126;
      }
     } else {
      $tsize$2617179$i = 0;
     }
    }
   } while(0);
   do {
    if ((label|0) == 118) {
     $call37$i = (_sbrk(0)|0);
     $cmp38$i = ($call37$i|0)==((-1)|0);
     if ($cmp38$i) {
      $tsize$2617179$i = 0;
     } else {
      $84 = $call37$i;
      $85 = load4((4036));
      $sub41$i = (($85) + -1)|0;
      $and42$i = $sub41$i & $84;
      $cmp43$i = ($and42$i|0)==(0);
      $add46$i = (($sub41$i) + ($84))|0;
      $neg48$i = (0 - ($85))|0;
      $and49$i = $add46$i & $neg48$i;
      $sub50$i = (($and49$i) - ($84))|0;
      $add51$i = $cmp43$i ? 0 : $sub50$i;
      $and11$add51$i = (($add51$i) + ($and11$i))|0;
      $86 = load4((3992));
      $add54$i = (($and11$add51$i) + ($86))|0;
      $cmp55$i = ($and11$add51$i>>>0)>($nb$0>>>0);
      $cmp57$i = ($and11$add51$i>>>0)<(2147483647);
      $or$cond$i = $cmp55$i & $cmp57$i;
      if ($or$cond$i) {
       $87 = load4((4000));
       $cmp60$i = ($87|0)==(0);
       if (!($cmp60$i)) {
        $cmp63$i = ($add54$i>>>0)<=($86>>>0);
        $cmp66$i139 = ($add54$i>>>0)>($87>>>0);
        $or$cond2$i = $cmp63$i | $cmp66$i139;
        if ($or$cond2$i) {
         $tsize$2617179$i = 0;
         break;
        }
       }
       $call68$i = (_sbrk(($and11$add51$i|0))|0);
       $cmp69$i = ($call68$i|0)==($call37$i|0);
       if ($cmp69$i) {
        $tbase$792$i = $call37$i;$tsize$791$i = $and11$add51$i;
        label = 135;
        break L167;
       } else {
        $br$2$ph$i = $call68$i;$ssize$2$ph$i = $and11$add51$i;
        label = 126;
       }
      } else {
       $tsize$2617179$i = 0;
      }
     }
    }
   } while(0);
   do {
    if ((label|0) == 126) {
     $sub112$i = (0 - ($ssize$2$ph$i))|0;
     $cmp91$i = ($br$2$ph$i|0)!=((-1)|0);
     $cmp93$i = ($ssize$2$ph$i>>>0)<(2147483647);
     $or$cond5$i = $cmp93$i & $cmp91$i;
     $cmp96$i = ($add$i134>>>0)>($ssize$2$ph$i>>>0);
     $or$cond3$i = $cmp96$i & $or$cond5$i;
     if (!($or$cond3$i)) {
      $cmp118$i = ($br$2$ph$i|0)==((-1)|0);
      if ($cmp118$i) {
       $tsize$2617179$i = 0;
       break;
      } else {
       $tbase$792$i = $br$2$ph$i;$tsize$791$i = $ssize$2$ph$i;
       label = 135;
       break L167;
      }
     }
     $90 = load4((4040));
     $sub99$i = (($sub$i135) - ($ssize$2$ph$i))|0;
     $add101$i = (($sub99$i) + ($90))|0;
     $neg103$i = (0 - ($90))|0;
     $and104$i = $add101$i & $neg103$i;
     $cmp105$i = ($and104$i>>>0)<(2147483647);
     if (!($cmp105$i)) {
      $tbase$792$i = $br$2$ph$i;$tsize$791$i = $ssize$2$ph$i;
      label = 135;
      break L167;
     }
     $call107$i = (_sbrk(($and104$i|0))|0);
     $cmp108$i = ($call107$i|0)==((-1)|0);
     if ($cmp108$i) {
      (_sbrk(($sub112$i|0))|0);
      $tsize$2617179$i = 0;
      break;
     } else {
      $add110$i = (($and104$i) + ($ssize$2$ph$i))|0;
      $tbase$792$i = $br$2$ph$i;$tsize$791$i = $add110$i;
      label = 135;
      break L167;
     }
    }
   } while(0);
   $91 = load4((4004));
   $or$i = $91 | 4;
   store4((4004),$or$i);
   $tsize$4$i = $tsize$2617179$i;
   label = 133;
  } else {
   $tsize$4$i = 0;
   label = 133;
  }
 } while(0);
 if ((label|0) == 133) {
  $cmp127$i = ($and11$i>>>0)<(2147483647);
  if ($cmp127$i) {
   $call131$i = (_sbrk(($and11$i|0))|0);
   $call132$i = (_sbrk(0)|0);
   $cmp133$i = ($call131$i|0)!=((-1)|0);
   $cmp135$i = ($call132$i|0)!=((-1)|0);
   $or$cond4$i = $cmp133$i & $cmp135$i;
   $cmp137$i = ($call131$i>>>0)<($call132$i>>>0);
   $or$cond7$i = $cmp137$i & $or$cond4$i;
   $sub$ptr$lhs$cast$i = $call132$i;
   $sub$ptr$rhs$cast$i = $call131$i;
   $sub$ptr$sub$i = (($sub$ptr$lhs$cast$i) - ($sub$ptr$rhs$cast$i))|0;
   $add140$i = (($nb$0) + 40)|0;
   $cmp141$i = ($sub$ptr$sub$i>>>0)>($add140$i>>>0);
   $sub$ptr$sub$tsize$4$i = $cmp141$i ? $sub$ptr$sub$i : $tsize$4$i;
   $or$cond7$not$i = $or$cond7$i ^ 1;
   $cmp14795$i = ($call131$i|0)==((-1)|0);
   $not$cmp141$i = $cmp141$i ^ 1;
   $cmp147$i = $cmp14795$i | $not$cmp141$i;
   $or$cond93$i = $cmp147$i | $or$cond7$not$i;
   if (!($or$cond93$i)) {
    $tbase$792$i = $call131$i;$tsize$791$i = $sub$ptr$sub$tsize$4$i;
    label = 135;
   }
  }
 }
 if ((label|0) == 135) {
  $92 = load4((3992));
  $add150$i = (($92) + ($tsize$791$i))|0;
  store4((3992),$add150$i);
  $93 = load4((3996));
  $cmp151$i = ($add150$i>>>0)>($93>>>0);
  if ($cmp151$i) {
   store4((3996),$add150$i);
  }
  $94 = load4((3584));
  $cmp157$i = ($94|0)==(0|0);
  do {
   if ($cmp157$i) {
    $95 = load4((3576));
    $cmp159$i = ($95|0)==(0|0);
    $cmp162$i = ($tbase$792$i>>>0)<($95>>>0);
    $or$cond8$i = $cmp159$i | $cmp162$i;
    if ($or$cond8$i) {
     store4((3576),$tbase$792$i);
    }
    store4((4008),$tbase$792$i);
    store4((4012),$tsize$791$i);
    store4((4020),0);
    $96 = load4(4032);
    store4((3596),$96);
    store4((3592),-1);
    $i$01$i$i = 0;
    while(1) {
     $shl$i49$i = $i$01$i$i << 1;
     $arrayidx$i50$i = (3600 + ($shl$i49$i<<2)|0);
     $97 = ((($arrayidx$i50$i)) + 12|0);
     store4($97,$arrayidx$i50$i);
     $98 = ((($arrayidx$i50$i)) + 8|0);
     store4($98,$arrayidx$i50$i);
     $inc$i$i = (($i$01$i$i) + 1)|0;
     $exitcond$i$i = ($inc$i$i|0)==(32);
     if ($exitcond$i$i) {
      break;
     } else {
      $i$01$i$i = $inc$i$i;
     }
    }
    $sub172$i = (($tsize$791$i) + -40)|0;
    $add$ptr$i38$i = ((($tbase$792$i)) + 8|0);
    $99 = $add$ptr$i38$i;
    $and$i39$i = $99 & 7;
    $cmp$i40$i = ($and$i39$i|0)==(0);
    $100 = (0 - ($99))|0;
    $and3$i41$i = $100 & 7;
    $cond$i42$i = $cmp$i40$i ? 0 : $and3$i41$i;
    $add$ptr4$i43$i = (($tbase$792$i) + ($cond$i42$i)|0);
    $sub5$i44$i = (($sub172$i) - ($cond$i42$i))|0;
    store4((3584),$add$ptr4$i43$i);
    store4((3572),$sub5$i44$i);
    $or$i45$i = $sub5$i44$i | 1;
    $head$i46$i = ((($add$ptr4$i43$i)) + 4|0);
    store4($head$i46$i,$or$i45$i);
    $add$ptr6$i47$i = (($add$ptr4$i43$i) + ($sub5$i44$i)|0);
    $head7$i48$i = ((($add$ptr6$i47$i)) + 4|0);
    store4($head7$i48$i,40);
    $101 = load4((4048));
    store4((3588),$101);
   } else {
    $sp$0104$i = (4008);
    while(1) {
     $102 = load4($sp$0104$i);
     $size188$i = ((($sp$0104$i)) + 4|0);
     $103 = load4($size188$i);
     $add$ptr189$i = (($102) + ($103)|0);
     $cmp190$i = ($tbase$792$i|0)==($add$ptr189$i|0);
     if ($cmp190$i) {
      label = 145;
      break;
     }
     $next$i = ((($sp$0104$i)) + 8|0);
     $104 = load4($next$i);
     $cmp186$i = ($104|0)==(0|0);
     if ($cmp186$i) {
      break;
     } else {
      $sp$0104$i = $104;
     }
    }
    if ((label|0) == 145) {
     $sflags193$i = ((($sp$0104$i)) + 12|0);
     $105 = load4($sflags193$i);
     $and194$i = $105 & 8;
     $tobool195$i = ($and194$i|0)==(0);
     if ($tobool195$i) {
      $cmp203$i = ($94>>>0)>=($102>>>0);
      $cmp209$i = ($94>>>0)<($tbase$792$i>>>0);
      $or$cond94$i = $cmp209$i & $cmp203$i;
      if ($or$cond94$i) {
       $add212$i = (($103) + ($tsize$791$i))|0;
       store4($size188$i,$add212$i);
       $106 = load4((3572));
       $add$ptr$i31$i = ((($94)) + 8|0);
       $107 = $add$ptr$i31$i;
       $and$i32$i = $107 & 7;
       $cmp$i33$i = ($and$i32$i|0)==(0);
       $108 = (0 - ($107))|0;
       $and3$i34$i = $108 & 7;
       $cond$i35$i = $cmp$i33$i ? 0 : $and3$i34$i;
       $add$ptr4$i36$i = (($94) + ($cond$i35$i)|0);
       $add215$i = (($tsize$791$i) - ($cond$i35$i))|0;
       $sub5$i$i = (($106) + ($add215$i))|0;
       store4((3584),$add$ptr4$i36$i);
       store4((3572),$sub5$i$i);
       $or$i$i = $sub5$i$i | 1;
       $head$i37$i = ((($add$ptr4$i36$i)) + 4|0);
       store4($head$i37$i,$or$i$i);
       $add$ptr6$i$i = (($add$ptr4$i36$i) + ($sub5$i$i)|0);
       $head7$i$i = ((($add$ptr6$i$i)) + 4|0);
       store4($head7$i$i,40);
       $109 = load4((4048));
       store4((3588),$109);
       break;
      }
     }
    }
    $110 = load4((3576));
    $cmp218$i = ($tbase$792$i>>>0)<($110>>>0);
    if ($cmp218$i) {
     store4((3576),$tbase$792$i);
    }
    $add$ptr227$i = (($tbase$792$i) + ($tsize$791$i)|0);
    $sp$1103$i = (4008);
    while(1) {
     $111 = load4($sp$1103$i);
     $cmp228$i = ($111|0)==($add$ptr227$i|0);
     if ($cmp228$i) {
      label = 153;
      break;
     }
     $next231$i = ((($sp$1103$i)) + 8|0);
     $112 = load4($next231$i);
     $cmp224$i = ($112|0)==(0|0);
     if ($cmp224$i) {
      break;
     } else {
      $sp$1103$i = $112;
     }
    }
    if ((label|0) == 153) {
     $sflags235$i = ((($sp$1103$i)) + 12|0);
     $113 = load4($sflags235$i);
     $and236$i = $113 & 8;
     $tobool237$i = ($and236$i|0)==(0);
     if ($tobool237$i) {
      store4($sp$1103$i,$tbase$792$i);
      $size245$i = ((($sp$1103$i)) + 4|0);
      $114 = load4($size245$i);
      $add246$i = (($114) + ($tsize$791$i))|0;
      store4($size245$i,$add246$i);
      $add$ptr$i$i = ((($tbase$792$i)) + 8|0);
      $115 = $add$ptr$i$i;
      $and$i11$i = $115 & 7;
      $cmp$i12$i = ($and$i11$i|0)==(0);
      $116 = (0 - ($115))|0;
      $and3$i$i = $116 & 7;
      $cond$i13$i = $cmp$i12$i ? 0 : $and3$i$i;
      $add$ptr4$i$i = (($tbase$792$i) + ($cond$i13$i)|0);
      $add$ptr5$i$i = ((($add$ptr227$i)) + 8|0);
      $117 = $add$ptr5$i$i;
      $and6$i14$i = $117 & 7;
      $cmp7$i$i = ($and6$i14$i|0)==(0);
      $118 = (0 - ($117))|0;
      $and13$i$i = $118 & 7;
      $cond15$i$i = $cmp7$i$i ? 0 : $and13$i$i;
      $add$ptr16$i$i = (($add$ptr227$i) + ($cond15$i$i)|0);
      $sub$ptr$lhs$cast$i15$i = $add$ptr16$i$i;
      $sub$ptr$rhs$cast$i16$i = $add$ptr4$i$i;
      $sub$ptr$sub$i17$i = (($sub$ptr$lhs$cast$i15$i) - ($sub$ptr$rhs$cast$i16$i))|0;
      $add$ptr17$i$i = (($add$ptr4$i$i) + ($nb$0)|0);
      $sub18$i$i = (($sub$ptr$sub$i17$i) - ($nb$0))|0;
      $or19$i$i = $nb$0 | 3;
      $head$i18$i = ((($add$ptr4$i$i)) + 4|0);
      store4($head$i18$i,$or19$i$i);
      $cmp20$i$i = ($add$ptr16$i$i|0)==($94|0);
      do {
       if ($cmp20$i$i) {
        $119 = load4((3572));
        $add$i$i = (($119) + ($sub18$i$i))|0;
        store4((3572),$add$i$i);
        store4((3584),$add$ptr17$i$i);
        $or22$i$i = $add$i$i | 1;
        $head23$i$i = ((($add$ptr17$i$i)) + 4|0);
        store4($head23$i$i,$or22$i$i);
       } else {
        $120 = load4((3580));
        $cmp24$i$i = ($add$ptr16$i$i|0)==($120|0);
        if ($cmp24$i$i) {
         $121 = load4((3568));
         $add26$i$i = (($121) + ($sub18$i$i))|0;
         store4((3568),$add26$i$i);
         store4((3580),$add$ptr17$i$i);
         $or28$i$i = $add26$i$i | 1;
         $head29$i$i = ((($add$ptr17$i$i)) + 4|0);
         store4($head29$i$i,$or28$i$i);
         $add$ptr30$i$i = (($add$ptr17$i$i) + ($add26$i$i)|0);
         store4($add$ptr30$i$i,$add26$i$i);
         break;
        }
        $head32$i$i = ((($add$ptr16$i$i)) + 4|0);
        $122 = load4($head32$i$i);
        $and33$i$i = $122 & 3;
        $cmp34$i$i = ($and33$i$i|0)==(1);
        if ($cmp34$i$i) {
         $and37$i$i = $122 & -8;
         $shr$i21$i = $122 >>> 3;
         $cmp38$i$i = ($122>>>0)<(256);
         L237: do {
          if ($cmp38$i$i) {
           $fd$i$i = ((($add$ptr16$i$i)) + 8|0);
           $123 = load4($fd$i$i);
           $bk$i22$i = ((($add$ptr16$i$i)) + 12|0);
           $124 = load4($bk$i22$i);
           $cmp46$i$i = ($124|0)==($123|0);
           if ($cmp46$i$i) {
            $shl48$i$i = 1 << $shr$i21$i;
            $neg$i$i = $shl48$i$i ^ -1;
            $125 = load4(3560);
            $and49$i$i = $125 & $neg$i$i;
            store4(3560,$and49$i$i);
            break;
           } else {
            $bk67$i$i = ((($123)) + 12|0);
            store4($bk67$i$i,$124);
            $fd68$i$i = ((($124)) + 8|0);
            store4($fd68$i$i,$123);
            break;
           }
          } else {
           $parent$i23$i = ((($add$ptr16$i$i)) + 24|0);
           $126 = load4($parent$i23$i);
           $bk74$i$i = ((($add$ptr16$i$i)) + 12|0);
           $127 = load4($bk74$i$i);
           $cmp75$i$i = ($127|0)==($add$ptr16$i$i|0);
           do {
            if ($cmp75$i$i) {
             $child$i$i = ((($add$ptr16$i$i)) + 16|0);
             $arrayidx96$i$i = ((($child$i$i)) + 4|0);
             $129 = load4($arrayidx96$i$i);
             $cmp97$i$i = ($129|0)==(0|0);
             if ($cmp97$i$i) {
              $130 = load4($child$i$i);
              $cmp100$i$i = ($130|0)==(0|0);
              if ($cmp100$i$i) {
               $R$3$i$i = 0;
               break;
              } else {
               $R$1$i$i = $130;$RP$1$i$i = $child$i$i;
              }
             } else {
              $R$1$i$i = $129;$RP$1$i$i = $arrayidx96$i$i;
             }
             while(1) {
              $arrayidx103$i$i = ((($R$1$i$i)) + 20|0);
              $131 = load4($arrayidx103$i$i);
              $cmp104$i$i = ($131|0)==(0|0);
              if (!($cmp104$i$i)) {
               $R$1$i$i = $131;$RP$1$i$i = $arrayidx103$i$i;
               continue;
              }
              $arrayidx107$i$i = ((($R$1$i$i)) + 16|0);
              $132 = load4($arrayidx107$i$i);
              $cmp108$i$i = ($132|0)==(0|0);
              if ($cmp108$i$i) {
               break;
              } else {
               $R$1$i$i = $132;$RP$1$i$i = $arrayidx107$i$i;
              }
             }
             store4($RP$1$i$i,0);
             $R$3$i$i = $R$1$i$i;
            } else {
             $fd78$i$i = ((($add$ptr16$i$i)) + 8|0);
             $128 = load4($fd78$i$i);
             $bk91$i$i = ((($128)) + 12|0);
             store4($bk91$i$i,$127);
             $fd92$i$i = ((($127)) + 8|0);
             store4($fd92$i$i,$128);
             $R$3$i$i = $127;
            }
           } while(0);
           $cmp120$i24$i = ($126|0)==(0|0);
           if ($cmp120$i24$i) {
            break;
           }
           $index$i25$i = ((($add$ptr16$i$i)) + 28|0);
           $133 = load4($index$i25$i);
           $arrayidx123$i$i = (3864 + ($133<<2)|0);
           $134 = load4($arrayidx123$i$i);
           $cmp124$i$i = ($add$ptr16$i$i|0)==($134|0);
           do {
            if ($cmp124$i$i) {
             store4($arrayidx123$i$i,$R$3$i$i);
             $cond1$i$i = ($R$3$i$i|0)==(0|0);
             if (!($cond1$i$i)) {
              break;
             }
             $shl131$i$i = 1 << $133;
             $neg132$i$i = $shl131$i$i ^ -1;
             $135 = load4((3564));
             $and133$i$i = $135 & $neg132$i$i;
             store4((3564),$and133$i$i);
             break L237;
            } else {
             $arrayidx143$i$i = ((($126)) + 16|0);
             $136 = load4($arrayidx143$i$i);
             $not$cmp144$i$i = ($136|0)!=($add$ptr16$i$i|0);
             $$sink$i$i = $not$cmp144$i$i&1;
             $arrayidx151$i$i = (((($126)) + 16|0) + ($$sink$i$i<<2)|0);
             store4($arrayidx151$i$i,$R$3$i$i);
             $cmp156$i$i = ($R$3$i$i|0)==(0|0);
             if ($cmp156$i$i) {
              break L237;
             }
            }
           } while(0);
           $parent165$i$i = ((($R$3$i$i)) + 24|0);
           store4($parent165$i$i,$126);
           $child166$i$i = ((($add$ptr16$i$i)) + 16|0);
           $137 = load4($child166$i$i);
           $cmp168$i$i = ($137|0)==(0|0);
           if (!($cmp168$i$i)) {
            $arrayidx178$i$i = ((($R$3$i$i)) + 16|0);
            store4($arrayidx178$i$i,$137);
            $parent179$i$i = ((($137)) + 24|0);
            store4($parent179$i$i,$R$3$i$i);
           }
           $arrayidx184$i$i = ((($child166$i$i)) + 4|0);
           $138 = load4($arrayidx184$i$i);
           $cmp185$i$i = ($138|0)==(0|0);
           if ($cmp185$i$i) {
            break;
           }
           $arrayidx195$i$i = ((($R$3$i$i)) + 20|0);
           store4($arrayidx195$i$i,$138);
           $parent196$i$i = ((($138)) + 24|0);
           store4($parent196$i$i,$R$3$i$i);
          }
         } while(0);
         $add$ptr205$i$i = (($add$ptr16$i$i) + ($and37$i$i)|0);
         $add206$i$i = (($and37$i$i) + ($sub18$i$i))|0;
         $oldfirst$0$i$i = $add$ptr205$i$i;$qsize$0$i$i = $add206$i$i;
        } else {
         $oldfirst$0$i$i = $add$ptr16$i$i;$qsize$0$i$i = $sub18$i$i;
        }
        $head208$i$i = ((($oldfirst$0$i$i)) + 4|0);
        $139 = load4($head208$i$i);
        $and209$i$i = $139 & -2;
        store4($head208$i$i,$and209$i$i);
        $or210$i$i = $qsize$0$i$i | 1;
        $head211$i$i = ((($add$ptr17$i$i)) + 4|0);
        store4($head211$i$i,$or210$i$i);
        $add$ptr212$i$i = (($add$ptr17$i$i) + ($qsize$0$i$i)|0);
        store4($add$ptr212$i$i,$qsize$0$i$i);
        $shr214$i$i = $qsize$0$i$i >>> 3;
        $cmp215$i$i = ($qsize$0$i$i>>>0)<(256);
        if ($cmp215$i$i) {
         $shl222$i$i = $shr214$i$i << 1;
         $arrayidx223$i$i = (3600 + ($shl222$i$i<<2)|0);
         $140 = load4(3560);
         $shl226$i$i = 1 << $shr214$i$i;
         $and227$i$i = $140 & $shl226$i$i;
         $tobool228$i$i = ($and227$i$i|0)==(0);
         if ($tobool228$i$i) {
          $or232$i$i = $140 | $shl226$i$i;
          store4(3560,$or232$i$i);
          $$pre$i27$i = ((($arrayidx223$i$i)) + 8|0);
          $$pre$phi$i28$iZ2D = $$pre$i27$i;$F224$0$i$i = $arrayidx223$i$i;
         } else {
          $141 = ((($arrayidx223$i$i)) + 8|0);
          $142 = load4($141);
          $$pre$phi$i28$iZ2D = $141;$F224$0$i$i = $142;
         }
         store4($$pre$phi$i28$iZ2D,$add$ptr17$i$i);
         $bk246$i$i = ((($F224$0$i$i)) + 12|0);
         store4($bk246$i$i,$add$ptr17$i$i);
         $fd247$i$i = ((($add$ptr17$i$i)) + 8|0);
         store4($fd247$i$i,$F224$0$i$i);
         $bk248$i$i = ((($add$ptr17$i$i)) + 12|0);
         store4($bk248$i$i,$arrayidx223$i$i);
         break;
        }
        $shr253$i$i = $qsize$0$i$i >>> 8;
        $cmp254$i$i = ($shr253$i$i|0)==(0);
        do {
         if ($cmp254$i$i) {
          $I252$0$i$i = 0;
         } else {
          $cmp258$i$i = ($qsize$0$i$i>>>0)>(16777215);
          if ($cmp258$i$i) {
           $I252$0$i$i = 31;
           break;
          }
          $sub262$i$i = (($shr253$i$i) + 1048320)|0;
          $shr263$i$i = $sub262$i$i >>> 16;
          $and264$i$i = $shr263$i$i & 8;
          $shl265$i$i = $shr253$i$i << $and264$i$i;
          $sub266$i$i = (($shl265$i$i) + 520192)|0;
          $shr267$i$i = $sub266$i$i >>> 16;
          $and268$i$i = $shr267$i$i & 4;
          $add269$i$i = $and268$i$i | $and264$i$i;
          $shl270$i$i = $shl265$i$i << $and268$i$i;
          $sub271$i$i = (($shl270$i$i) + 245760)|0;
          $shr272$i$i = $sub271$i$i >>> 16;
          $and273$i$i = $shr272$i$i & 2;
          $add274$i$i = $add269$i$i | $and273$i$i;
          $sub275$i$i = (14 - ($add274$i$i))|0;
          $shl276$i$i = $shl270$i$i << $and273$i$i;
          $shr277$i$i = $shl276$i$i >>> 15;
          $add278$i$i = (($sub275$i$i) + ($shr277$i$i))|0;
          $shl279$i$i = $add278$i$i << 1;
          $add280$i$i = (($add278$i$i) + 7)|0;
          $shr281$i$i = $qsize$0$i$i >>> $add280$i$i;
          $and282$i$i = $shr281$i$i & 1;
          $add283$i$i = $and282$i$i | $shl279$i$i;
          $I252$0$i$i = $add283$i$i;
         }
        } while(0);
        $arrayidx287$i$i = (3864 + ($I252$0$i$i<<2)|0);
        $index288$i$i = ((($add$ptr17$i$i)) + 28|0);
        store4($index288$i$i,$I252$0$i$i);
        $child289$i$i = ((($add$ptr17$i$i)) + 16|0);
        $arrayidx290$i$i = ((($child289$i$i)) + 4|0);
        store4($arrayidx290$i$i,0);
        store4($child289$i$i,0);
        $143 = load4((3564));
        $shl294$i$i = 1 << $I252$0$i$i;
        $and295$i$i = $143 & $shl294$i$i;
        $tobool296$i$i = ($and295$i$i|0)==(0);
        if ($tobool296$i$i) {
         $or300$i$i = $143 | $shl294$i$i;
         store4((3564),$or300$i$i);
         store4($arrayidx287$i$i,$add$ptr17$i$i);
         $parent301$i$i = ((($add$ptr17$i$i)) + 24|0);
         store4($parent301$i$i,$arrayidx287$i$i);
         $bk302$i$i = ((($add$ptr17$i$i)) + 12|0);
         store4($bk302$i$i,$add$ptr17$i$i);
         $fd303$i$i = ((($add$ptr17$i$i)) + 8|0);
         store4($fd303$i$i,$add$ptr17$i$i);
         break;
        }
        $144 = load4($arrayidx287$i$i);
        $cmp306$i$i = ($I252$0$i$i|0)==(31);
        $shr310$i$i = $I252$0$i$i >>> 1;
        $sub313$i$i = (25 - ($shr310$i$i))|0;
        $cond315$i$i = $cmp306$i$i ? 0 : $sub313$i$i;
        $shl316$i$i = $qsize$0$i$i << $cond315$i$i;
        $K305$0$i$i = $shl316$i$i;$T$0$i29$i = $144;
        while(1) {
         $head317$i$i = ((($T$0$i29$i)) + 4|0);
         $145 = load4($head317$i$i);
         $and318$i$i = $145 & -8;
         $cmp319$i$i = ($and318$i$i|0)==($qsize$0$i$i|0);
         if ($cmp319$i$i) {
          label = 194;
          break;
         }
         $shr323$i$i = $K305$0$i$i >>> 31;
         $arrayidx325$i$i = (((($T$0$i29$i)) + 16|0) + ($shr323$i$i<<2)|0);
         $shl326$i$i = $K305$0$i$i << 1;
         $146 = load4($arrayidx325$i$i);
         $cmp327$i$i = ($146|0)==(0|0);
         if ($cmp327$i$i) {
          label = 193;
          break;
         } else {
          $K305$0$i$i = $shl326$i$i;$T$0$i29$i = $146;
         }
        }
        if ((label|0) == 193) {
         store4($arrayidx325$i$i,$add$ptr17$i$i);
         $parent337$i$i = ((($add$ptr17$i$i)) + 24|0);
         store4($parent337$i$i,$T$0$i29$i);
         $bk338$i$i = ((($add$ptr17$i$i)) + 12|0);
         store4($bk338$i$i,$add$ptr17$i$i);
         $fd339$i$i = ((($add$ptr17$i$i)) + 8|0);
         store4($fd339$i$i,$add$ptr17$i$i);
         break;
        }
        else if ((label|0) == 194) {
         $fd344$i$i = ((($T$0$i29$i)) + 8|0);
         $147 = load4($fd344$i$i);
         $bk357$i$i = ((($147)) + 12|0);
         store4($bk357$i$i,$add$ptr17$i$i);
         store4($fd344$i$i,$add$ptr17$i$i);
         $fd359$i$i = ((($add$ptr17$i$i)) + 8|0);
         store4($fd359$i$i,$147);
         $bk360$i$i = ((($add$ptr17$i$i)) + 12|0);
         store4($bk360$i$i,$T$0$i29$i);
         $parent361$i$i = ((($add$ptr17$i$i)) + 24|0);
         store4($parent361$i$i,0);
         break;
        }
       }
      } while(0);
      $add$ptr369$i$i = ((($add$ptr4$i$i)) + 8|0);
      $retval$0 = $add$ptr369$i$i;
      STACKTOP = sp;return ($retval$0|0);
     }
    }
    $sp$0$i$i$i = (4008);
    while(1) {
     $148 = load4($sp$0$i$i$i);
     $cmp$i$i$i = ($148>>>0)>($94>>>0);
     if (!($cmp$i$i$i)) {
      $size$i$i$i = ((($sp$0$i$i$i)) + 4|0);
      $149 = load4($size$i$i$i);
      $add$ptr$i$i$i = (($148) + ($149)|0);
      $cmp2$i$i$i = ($add$ptr$i$i$i>>>0)>($94>>>0);
      if ($cmp2$i$i$i) {
       break;
      }
     }
     $next$i$i$i = ((($sp$0$i$i$i)) + 8|0);
     $150 = load4($next$i$i$i);
     $sp$0$i$i$i = $150;
    }
    $add$ptr2$i$i = ((($add$ptr$i$i$i)) + -47|0);
    $add$ptr3$i$i = ((($add$ptr2$i$i)) + 8|0);
    $151 = $add$ptr3$i$i;
    $and$i$i = $151 & 7;
    $cmp$i9$i = ($and$i$i|0)==(0);
    $152 = (0 - ($151))|0;
    $and6$i10$i = $152 & 7;
    $cond$i$i = $cmp$i9$i ? 0 : $and6$i10$i;
    $add$ptr7$i$i = (($add$ptr2$i$i) + ($cond$i$i)|0);
    $add$ptr81$i$i = ((($94)) + 16|0);
    $cmp9$i$i = ($add$ptr7$i$i>>>0)<($add$ptr81$i$i>>>0);
    $cond13$i$i = $cmp9$i$i ? $94 : $add$ptr7$i$i;
    $add$ptr14$i$i = ((($cond13$i$i)) + 8|0);
    $add$ptr15$i$i = ((($cond13$i$i)) + 24|0);
    $sub16$i$i = (($tsize$791$i) + -40)|0;
    $add$ptr$i2$i$i = ((($tbase$792$i)) + 8|0);
    $153 = $add$ptr$i2$i$i;
    $and$i$i$i = $153 & 7;
    $cmp$i3$i$i = ($and$i$i$i|0)==(0);
    $154 = (0 - ($153))|0;
    $and3$i$i$i = $154 & 7;
    $cond$i$i$i = $cmp$i3$i$i ? 0 : $and3$i$i$i;
    $add$ptr4$i$i$i = (($tbase$792$i) + ($cond$i$i$i)|0);
    $sub5$i$i$i = (($sub16$i$i) - ($cond$i$i$i))|0;
    store4((3584),$add$ptr4$i$i$i);
    store4((3572),$sub5$i$i$i);
    $or$i$i$i = $sub5$i$i$i | 1;
    $head$i$i$i = ((($add$ptr4$i$i$i)) + 4|0);
    store4($head$i$i$i,$or$i$i$i);
    $add$ptr6$i$i$i = (($add$ptr4$i$i$i) + ($sub5$i$i$i)|0);
    $head7$i$i$i = ((($add$ptr6$i$i$i)) + 4|0);
    store4($head7$i$i$i,40);
    $155 = load4((4048));
    store4((3588),$155);
    $head$i$i = ((($cond13$i$i)) + 4|0);
    store4($head$i$i,27);
    ; store8($add$ptr14$i$i,load8((4008),4),4); store8($add$ptr14$i$i+8 | 0,load8((4008)+8 | 0,4),4);
    store4((4008),$tbase$792$i);
    store4((4012),$tsize$791$i);
    store4((4020),0);
    store4((4016),$add$ptr14$i$i);
    $156 = $add$ptr15$i$i;
    while(1) {
     $add$ptr24$i$i = ((($156)) + 4|0);
     store4($add$ptr24$i$i,7);
     $head26$i$i = ((($156)) + 8|0);
     $cmp27$i$i = ($head26$i$i>>>0)<($add$ptr$i$i$i>>>0);
     if ($cmp27$i$i) {
      $156 = $add$ptr24$i$i;
     } else {
      break;
     }
    }
    $cmp28$i$i = ($cond13$i$i|0)==($94|0);
    if (!($cmp28$i$i)) {
     $sub$ptr$lhs$cast$i$i = $cond13$i$i;
     $sub$ptr$rhs$cast$i$i = $94;
     $sub$ptr$sub$i$i = (($sub$ptr$lhs$cast$i$i) - ($sub$ptr$rhs$cast$i$i))|0;
     $157 = load4($head$i$i);
     $and32$i$i = $157 & -2;
     store4($head$i$i,$and32$i$i);
     $or33$i$i = $sub$ptr$sub$i$i | 1;
     $head34$i$i = ((($94)) + 4|0);
     store4($head34$i$i,$or33$i$i);
     store4($cond13$i$i,$sub$ptr$sub$i$i);
     $shr$i$i = $sub$ptr$sub$i$i >>> 3;
     $cmp36$i$i = ($sub$ptr$sub$i$i>>>0)<(256);
     if ($cmp36$i$i) {
      $shl$i$i = $shr$i$i << 1;
      $arrayidx$i$i = (3600 + ($shl$i$i<<2)|0);
      $158 = load4(3560);
      $shl39$i$i = 1 << $shr$i$i;
      $and40$i$i = $158 & $shl39$i$i;
      $tobool$i$i = ($and40$i$i|0)==(0);
      if ($tobool$i$i) {
       $or44$i$i = $158 | $shl39$i$i;
       store4(3560,$or44$i$i);
       $$pre$i$i = ((($arrayidx$i$i)) + 8|0);
       $$pre$phi$i$iZ2D = $$pre$i$i;$F$0$i$i = $arrayidx$i$i;
      } else {
       $159 = ((($arrayidx$i$i)) + 8|0);
       $160 = load4($159);
       $$pre$phi$i$iZ2D = $159;$F$0$i$i = $160;
      }
      store4($$pre$phi$i$iZ2D,$94);
      $bk$i$i = ((($F$0$i$i)) + 12|0);
      store4($bk$i$i,$94);
      $fd54$i$i = ((($94)) + 8|0);
      store4($fd54$i$i,$F$0$i$i);
      $bk55$i$i = ((($94)) + 12|0);
      store4($bk55$i$i,$arrayidx$i$i);
      break;
     }
     $shr58$i$i = $sub$ptr$sub$i$i >>> 8;
     $cmp59$i$i = ($shr58$i$i|0)==(0);
     if ($cmp59$i$i) {
      $I57$0$i$i = 0;
     } else {
      $cmp63$i$i = ($sub$ptr$sub$i$i>>>0)>(16777215);
      if ($cmp63$i$i) {
       $I57$0$i$i = 31;
      } else {
       $sub67$i$i = (($shr58$i$i) + 1048320)|0;
       $shr68$i$i = $sub67$i$i >>> 16;
       $and69$i$i = $shr68$i$i & 8;
       $shl70$i$i = $shr58$i$i << $and69$i$i;
       $sub71$i$i = (($shl70$i$i) + 520192)|0;
       $shr72$i$i = $sub71$i$i >>> 16;
       $and73$i$i = $shr72$i$i & 4;
       $add74$i$i = $and73$i$i | $and69$i$i;
       $shl75$i$i = $shl70$i$i << $and73$i$i;
       $sub76$i$i = (($shl75$i$i) + 245760)|0;
       $shr77$i$i = $sub76$i$i >>> 16;
       $and78$i$i = $shr77$i$i & 2;
       $add79$i$i = $add74$i$i | $and78$i$i;
       $sub80$i$i = (14 - ($add79$i$i))|0;
       $shl81$i$i = $shl75$i$i << $and78$i$i;
       $shr82$i$i = $shl81$i$i >>> 15;
       $add83$i$i = (($sub80$i$i) + ($shr82$i$i))|0;
       $shl84$i$i = $add83$i$i << 1;
       $add85$i$i = (($add83$i$i) + 7)|0;
       $shr86$i$i = $sub$ptr$sub$i$i >>> $add85$i$i;
       $and87$i$i = $shr86$i$i & 1;
       $add88$i$i = $and87$i$i | $shl84$i$i;
       $I57$0$i$i = $add88$i$i;
      }
     }
     $arrayidx91$i$i = (3864 + ($I57$0$i$i<<2)|0);
     $index$i$i = ((($94)) + 28|0);
     store4($index$i$i,$I57$0$i$i);
     $arrayidx92$i$i = ((($94)) + 20|0);
     store4($arrayidx92$i$i,0);
     store4($add$ptr81$i$i,0);
     $161 = load4((3564));
     $shl95$i$i = 1 << $I57$0$i$i;
     $and96$i$i = $161 & $shl95$i$i;
     $tobool97$i$i = ($and96$i$i|0)==(0);
     if ($tobool97$i$i) {
      $or101$i$i = $161 | $shl95$i$i;
      store4((3564),$or101$i$i);
      store4($arrayidx91$i$i,$94);
      $parent$i$i = ((($94)) + 24|0);
      store4($parent$i$i,$arrayidx91$i$i);
      $bk102$i$i = ((($94)) + 12|0);
      store4($bk102$i$i,$94);
      $fd103$i$i = ((($94)) + 8|0);
      store4($fd103$i$i,$94);
      break;
     }
     $162 = load4($arrayidx91$i$i);
     $cmp106$i$i = ($I57$0$i$i|0)==(31);
     $shr110$i$i = $I57$0$i$i >>> 1;
     $sub113$i$i = (25 - ($shr110$i$i))|0;
     $cond115$i$i = $cmp106$i$i ? 0 : $sub113$i$i;
     $shl116$i$i = $sub$ptr$sub$i$i << $cond115$i$i;
     $K105$0$i$i = $shl116$i$i;$T$0$i$i = $162;
     while(1) {
      $head118$i$i = ((($T$0$i$i)) + 4|0);
      $163 = load4($head118$i$i);
      $and119$i$i = $163 & -8;
      $cmp120$i$i = ($and119$i$i|0)==($sub$ptr$sub$i$i|0);
      if ($cmp120$i$i) {
       label = 216;
       break;
      }
      $shr124$i$i = $K105$0$i$i >>> 31;
      $arrayidx126$i$i = (((($T$0$i$i)) + 16|0) + ($shr124$i$i<<2)|0);
      $shl127$i$i = $K105$0$i$i << 1;
      $164 = load4($arrayidx126$i$i);
      $cmp128$i$i = ($164|0)==(0|0);
      if ($cmp128$i$i) {
       label = 215;
       break;
      } else {
       $K105$0$i$i = $shl127$i$i;$T$0$i$i = $164;
      }
     }
     if ((label|0) == 215) {
      store4($arrayidx126$i$i,$94);
      $parent138$i$i = ((($94)) + 24|0);
      store4($parent138$i$i,$T$0$i$i);
      $bk139$i$i = ((($94)) + 12|0);
      store4($bk139$i$i,$94);
      $fd140$i$i = ((($94)) + 8|0);
      store4($fd140$i$i,$94);
      break;
     }
     else if ((label|0) == 216) {
      $fd148$i$i = ((($T$0$i$i)) + 8|0);
      $165 = load4($fd148$i$i);
      $bk158$i$i = ((($165)) + 12|0);
      store4($bk158$i$i,$94);
      store4($fd148$i$i,$94);
      $fd160$i$i = ((($94)) + 8|0);
      store4($fd160$i$i,$165);
      $bk161$i$i = ((($94)) + 12|0);
      store4($bk161$i$i,$T$0$i$i);
      $parent162$i$i = ((($94)) + 24|0);
      store4($parent162$i$i,0);
      break;
     }
    }
   }
  } while(0);
  $166 = load4((3572));
  $cmp257$i = ($166>>>0)>($nb$0>>>0);
  if ($cmp257$i) {
   $sub260$i = (($166) - ($nb$0))|0;
   store4((3572),$sub260$i);
   $167 = load4((3584));
   $add$ptr262$i = (($167) + ($nb$0)|0);
   store4((3584),$add$ptr262$i);
   $or264$i = $sub260$i | 1;
   $head265$i = ((($add$ptr262$i)) + 4|0);
   store4($head265$i,$or264$i);
   $or267$i = $nb$0 | 3;
   $head268$i = ((($167)) + 4|0);
   store4($head268$i,$or267$i);
   $add$ptr269$i = ((($167)) + 8|0);
   $retval$0 = $add$ptr269$i;
   STACKTOP = sp;return ($retval$0|0);
  }
 }
 $call275$i = (___errno_location()|0);
 store4($call275$i,12);
 $retval$0 = 0;
 STACKTOP = sp;return ($retval$0|0);
}
function _free($mem) {
 $mem = $mem|0;
 var $$pre = 0, $$pre$phiZ2D = 0, $$sink = 0, $$sink4 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0;
 var $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0;
 var $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $F510$0 = 0, $I534$0 = 0, $K583$0 = 0;
 var $R$1 = 0, $R$3 = 0, $R332$1 = 0, $R332$3 = 0, $RP$1 = 0, $RP360$1 = 0, $T$0 = 0, $add$ptr = 0, $add$ptr16 = 0, $add$ptr217 = 0, $add$ptr261 = 0, $add$ptr482 = 0, $add$ptr498 = 0, $add$ptr6 = 0, $add17 = 0, $add246 = 0, $add258 = 0, $add267 = 0, $add550 = 0, $add555 = 0;
 var $add559 = 0, $add561 = 0, $add564 = 0, $and12 = 0, $and140 = 0, $and210 = 0, $and215 = 0, $and232 = 0, $and240 = 0, $and266 = 0, $and301 = 0, $and410 = 0, $and46 = 0, $and495 = 0, $and5 = 0, $and512 = 0, $and545 = 0, $and549 = 0, $and554 = 0, $and563 = 0;
 var $and574 = 0, $and592 = 0, $and8 = 0, $arrayidx108 = 0, $arrayidx113 = 0, $arrayidx130 = 0, $arrayidx149 = 0, $arrayidx157 = 0, $arrayidx182 = 0, $arrayidx188 = 0, $arrayidx198 = 0, $arrayidx362 = 0, $arrayidx374 = 0, $arrayidx379 = 0, $arrayidx400 = 0, $arrayidx419 = 0, $arrayidx427 = 0, $arrayidx454 = 0, $arrayidx460 = 0, $arrayidx470 = 0;
 var $arrayidx509 = 0, $arrayidx567 = 0, $arrayidx570 = 0, $arrayidx599 = 0, $arrayidx99 = 0, $bk = 0, $bk275 = 0, $bk321 = 0, $bk333 = 0, $bk355 = 0, $bk529 = 0, $bk531 = 0, $bk580 = 0, $bk611 = 0, $bk631 = 0, $bk634 = 0, $bk66 = 0, $bk73 = 0, $bk94 = 0, $child = 0;
 var $child171 = 0, $child361 = 0, $child443 = 0, $child569 = 0, $cmp = 0, $cmp$i = 0, $cmp100 = 0, $cmp104 = 0, $cmp109 = 0, $cmp114 = 0, $cmp127 = 0, $cmp13 = 0, $cmp131 = 0, $cmp162 = 0, $cmp173 = 0, $cmp18 = 0, $cmp189 = 0, $cmp211 = 0, $cmp22 = 0, $cmp228 = 0;
 var $cmp243 = 0, $cmp249 = 0, $cmp25 = 0, $cmp255 = 0, $cmp269 = 0, $cmp296 = 0, $cmp334 = 0, $cmp363 = 0, $cmp368 = 0, $cmp375 = 0, $cmp380 = 0, $cmp395 = 0, $cmp401 = 0, $cmp42 = 0, $cmp432 = 0, $cmp445 = 0, $cmp461 = 0, $cmp484 = 0, $cmp502 = 0, $cmp536 = 0;
 var $cmp540 = 0, $cmp584 = 0, $cmp593 = 0, $cmp601 = 0, $cmp640 = 0, $cmp74 = 0, $cond = 0, $cond255 = 0, $cond256 = 0, $dec = 0, $fd = 0, $fd273 = 0, $fd322 = 0, $fd338 = 0, $fd356 = 0, $fd530 = 0, $fd581 = 0, $fd612 = 0, $fd620 = 0, $fd633 = 0;
 var $fd67 = 0, $fd78 = 0, $fd95 = 0, $head209 = 0, $head216 = 0, $head231 = 0, $head248 = 0, $head260 = 0, $head4 = 0, $head481 = 0, $head497 = 0, $head591 = 0, $idx$neg = 0, $index = 0, $index399 = 0, $index568 = 0, $neg = 0, $neg139 = 0, $neg300 = 0, $neg409 = 0;
 var $next4$i = 0, $not$cmp150 = 0, $not$cmp420 = 0, $or = 0, $or247 = 0, $or259 = 0, $or480 = 0, $or496 = 0, $or516 = 0, $or578 = 0, $p$1 = 0, $parent = 0, $parent170 = 0, $parent183 = 0, $parent199 = 0, $parent331 = 0, $parent442 = 0, $parent455 = 0, $parent471 = 0, $parent579 = 0;
 var $parent610 = 0, $parent635 = 0, $psize$1 = 0, $psize$2 = 0, $shl138 = 0, $shl299 = 0, $shl408 = 0, $shl45 = 0, $shl508 = 0, $shl511 = 0, $shl546 = 0, $shl551 = 0, $shl557 = 0, $shl560 = 0, $shl573 = 0, $shl590 = 0, $shl600 = 0, $shr = 0, $shr268 = 0, $shr501 = 0;
 var $shr535 = 0, $shr544 = 0, $shr548 = 0, $shr553 = 0, $shr558 = 0, $shr562 = 0, $shr586 = 0, $shr597 = 0, $sp$0$i = 0, $sp$0$in$i = 0, $sub = 0, $sub547 = 0, $sub552 = 0, $sub556 = 0, $sub589 = 0, $tobool233 = 0, $tobool241 = 0, $tobool513 = 0, $tobool575 = 0, $tobool9 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 $cmp = ($mem|0)==(0|0);
 if ($cmp) {
  return;
 }
 $add$ptr = ((($mem)) + -8|0);
 $0 = load4((3576));
 $head4 = ((($mem)) + -4|0);
 $1 = load4($head4);
 $and5 = $1 & -8;
 $add$ptr6 = (($add$ptr) + ($and5)|0);
 $and8 = $1 & 1;
 $tobool9 = ($and8|0)==(0);
 do {
  if ($tobool9) {
   $2 = load4($add$ptr);
   $and12 = $1 & 3;
   $cmp13 = ($and12|0)==(0);
   if ($cmp13) {
    return;
   }
   $idx$neg = (0 - ($2))|0;
   $add$ptr16 = (($add$ptr) + ($idx$neg)|0);
   $add17 = (($2) + ($and5))|0;
   $cmp18 = ($add$ptr16>>>0)<($0>>>0);
   if ($cmp18) {
    return;
   }
   $3 = load4((3580));
   $cmp22 = ($add$ptr16|0)==($3|0);
   if ($cmp22) {
    $head209 = ((($add$ptr6)) + 4|0);
    $20 = load4($head209);
    $and210 = $20 & 3;
    $cmp211 = ($and210|0)==(3);
    if (!($cmp211)) {
     $21 = $add$ptr16;$p$1 = $add$ptr16;$psize$1 = $add17;
     break;
    }
    $add$ptr217 = (($add$ptr16) + ($add17)|0);
    $head216 = ((($add$ptr16)) + 4|0);
    $or = $add17 | 1;
    $and215 = $20 & -2;
    store4((3568),$add17);
    store4($head209,$and215);
    store4($head216,$or);
    store4($add$ptr217,$add17);
    return;
   }
   $shr = $2 >>> 3;
   $cmp25 = ($2>>>0)<(256);
   if ($cmp25) {
    $fd = ((($add$ptr16)) + 8|0);
    $4 = load4($fd);
    $bk = ((($add$ptr16)) + 12|0);
    $5 = load4($bk);
    $cmp42 = ($5|0)==($4|0);
    if ($cmp42) {
     $shl45 = 1 << $shr;
     $neg = $shl45 ^ -1;
     $6 = load4(3560);
     $and46 = $6 & $neg;
     store4(3560,$and46);
     $21 = $add$ptr16;$p$1 = $add$ptr16;$psize$1 = $add17;
     break;
    } else {
     $bk66 = ((($4)) + 12|0);
     store4($bk66,$5);
     $fd67 = ((($5)) + 8|0);
     store4($fd67,$4);
     $21 = $add$ptr16;$p$1 = $add$ptr16;$psize$1 = $add17;
     break;
    }
   }
   $parent = ((($add$ptr16)) + 24|0);
   $7 = load4($parent);
   $bk73 = ((($add$ptr16)) + 12|0);
   $8 = load4($bk73);
   $cmp74 = ($8|0)==($add$ptr16|0);
   do {
    if ($cmp74) {
     $child = ((($add$ptr16)) + 16|0);
     $arrayidx99 = ((($child)) + 4|0);
     $10 = load4($arrayidx99);
     $cmp100 = ($10|0)==(0|0);
     if ($cmp100) {
      $11 = load4($child);
      $cmp104 = ($11|0)==(0|0);
      if ($cmp104) {
       $R$3 = 0;
       break;
      } else {
       $R$1 = $11;$RP$1 = $child;
      }
     } else {
      $R$1 = $10;$RP$1 = $arrayidx99;
     }
     while(1) {
      $arrayidx108 = ((($R$1)) + 20|0);
      $12 = load4($arrayidx108);
      $cmp109 = ($12|0)==(0|0);
      if (!($cmp109)) {
       $R$1 = $12;$RP$1 = $arrayidx108;
       continue;
      }
      $arrayidx113 = ((($R$1)) + 16|0);
      $13 = load4($arrayidx113);
      $cmp114 = ($13|0)==(0|0);
      if ($cmp114) {
       break;
      } else {
       $R$1 = $13;$RP$1 = $arrayidx113;
      }
     }
     store4($RP$1,0);
     $R$3 = $R$1;
    } else {
     $fd78 = ((($add$ptr16)) + 8|0);
     $9 = load4($fd78);
     $bk94 = ((($9)) + 12|0);
     store4($bk94,$8);
     $fd95 = ((($8)) + 8|0);
     store4($fd95,$9);
     $R$3 = $8;
    }
   } while(0);
   $cmp127 = ($7|0)==(0|0);
   if ($cmp127) {
    $21 = $add$ptr16;$p$1 = $add$ptr16;$psize$1 = $add17;
   } else {
    $index = ((($add$ptr16)) + 28|0);
    $14 = load4($index);
    $arrayidx130 = (3864 + ($14<<2)|0);
    $15 = load4($arrayidx130);
    $cmp131 = ($add$ptr16|0)==($15|0);
    if ($cmp131) {
     store4($arrayidx130,$R$3);
     $cond255 = ($R$3|0)==(0|0);
     if ($cond255) {
      $shl138 = 1 << $14;
      $neg139 = $shl138 ^ -1;
      $16 = load4((3564));
      $and140 = $16 & $neg139;
      store4((3564),$and140);
      $21 = $add$ptr16;$p$1 = $add$ptr16;$psize$1 = $add17;
      break;
     }
    } else {
     $arrayidx149 = ((($7)) + 16|0);
     $17 = load4($arrayidx149);
     $not$cmp150 = ($17|0)!=($add$ptr16|0);
     $$sink = $not$cmp150&1;
     $arrayidx157 = (((($7)) + 16|0) + ($$sink<<2)|0);
     store4($arrayidx157,$R$3);
     $cmp162 = ($R$3|0)==(0|0);
     if ($cmp162) {
      $21 = $add$ptr16;$p$1 = $add$ptr16;$psize$1 = $add17;
      break;
     }
    }
    $parent170 = ((($R$3)) + 24|0);
    store4($parent170,$7);
    $child171 = ((($add$ptr16)) + 16|0);
    $18 = load4($child171);
    $cmp173 = ($18|0)==(0|0);
    if (!($cmp173)) {
     $arrayidx182 = ((($R$3)) + 16|0);
     store4($arrayidx182,$18);
     $parent183 = ((($18)) + 24|0);
     store4($parent183,$R$3);
    }
    $arrayidx188 = ((($child171)) + 4|0);
    $19 = load4($arrayidx188);
    $cmp189 = ($19|0)==(0|0);
    if ($cmp189) {
     $21 = $add$ptr16;$p$1 = $add$ptr16;$psize$1 = $add17;
    } else {
     $arrayidx198 = ((($R$3)) + 20|0);
     store4($arrayidx198,$19);
     $parent199 = ((($19)) + 24|0);
     store4($parent199,$R$3);
     $21 = $add$ptr16;$p$1 = $add$ptr16;$psize$1 = $add17;
    }
   }
  } else {
   $21 = $add$ptr;$p$1 = $add$ptr;$psize$1 = $and5;
  }
 } while(0);
 $cmp228 = ($21>>>0)<($add$ptr6>>>0);
 if (!($cmp228)) {
  return;
 }
 $head231 = ((($add$ptr6)) + 4|0);
 $22 = load4($head231);
 $and232 = $22 & 1;
 $tobool233 = ($and232|0)==(0);
 if ($tobool233) {
  return;
 }
 $and240 = $22 & 2;
 $tobool241 = ($and240|0)==(0);
 if ($tobool241) {
  $23 = load4((3584));
  $cmp243 = ($add$ptr6|0)==($23|0);
  $24 = load4((3580));
  if ($cmp243) {
   $25 = load4((3572));
   $add246 = (($25) + ($psize$1))|0;
   store4((3572),$add246);
   store4((3584),$p$1);
   $or247 = $add246 | 1;
   $head248 = ((($p$1)) + 4|0);
   store4($head248,$or247);
   $cmp249 = ($p$1|0)==($24|0);
   if (!($cmp249)) {
    return;
   }
   store4((3580),0);
   store4((3568),0);
   return;
  }
  $cmp255 = ($add$ptr6|0)==($24|0);
  if ($cmp255) {
   $26 = load4((3568));
   $add258 = (($26) + ($psize$1))|0;
   store4((3568),$add258);
   store4((3580),$21);
   $or259 = $add258 | 1;
   $head260 = ((($p$1)) + 4|0);
   store4($head260,$or259);
   $add$ptr261 = (($21) + ($add258)|0);
   store4($add$ptr261,$add258);
   return;
  }
  $and266 = $22 & -8;
  $add267 = (($and266) + ($psize$1))|0;
  $shr268 = $22 >>> 3;
  $cmp269 = ($22>>>0)<(256);
  do {
   if ($cmp269) {
    $fd273 = ((($add$ptr6)) + 8|0);
    $27 = load4($fd273);
    $bk275 = ((($add$ptr6)) + 12|0);
    $28 = load4($bk275);
    $cmp296 = ($28|0)==($27|0);
    if ($cmp296) {
     $shl299 = 1 << $shr268;
     $neg300 = $shl299 ^ -1;
     $29 = load4(3560);
     $and301 = $29 & $neg300;
     store4(3560,$and301);
     break;
    } else {
     $bk321 = ((($27)) + 12|0);
     store4($bk321,$28);
     $fd322 = ((($28)) + 8|0);
     store4($fd322,$27);
     break;
    }
   } else {
    $parent331 = ((($add$ptr6)) + 24|0);
    $30 = load4($parent331);
    $bk333 = ((($add$ptr6)) + 12|0);
    $31 = load4($bk333);
    $cmp334 = ($31|0)==($add$ptr6|0);
    do {
     if ($cmp334) {
      $child361 = ((($add$ptr6)) + 16|0);
      $arrayidx362 = ((($child361)) + 4|0);
      $33 = load4($arrayidx362);
      $cmp363 = ($33|0)==(0|0);
      if ($cmp363) {
       $34 = load4($child361);
       $cmp368 = ($34|0)==(0|0);
       if ($cmp368) {
        $R332$3 = 0;
        break;
       } else {
        $R332$1 = $34;$RP360$1 = $child361;
       }
      } else {
       $R332$1 = $33;$RP360$1 = $arrayidx362;
      }
      while(1) {
       $arrayidx374 = ((($R332$1)) + 20|0);
       $35 = load4($arrayidx374);
       $cmp375 = ($35|0)==(0|0);
       if (!($cmp375)) {
        $R332$1 = $35;$RP360$1 = $arrayidx374;
        continue;
       }
       $arrayidx379 = ((($R332$1)) + 16|0);
       $36 = load4($arrayidx379);
       $cmp380 = ($36|0)==(0|0);
       if ($cmp380) {
        break;
       } else {
        $R332$1 = $36;$RP360$1 = $arrayidx379;
       }
      }
      store4($RP360$1,0);
      $R332$3 = $R332$1;
     } else {
      $fd338 = ((($add$ptr6)) + 8|0);
      $32 = load4($fd338);
      $bk355 = ((($32)) + 12|0);
      store4($bk355,$31);
      $fd356 = ((($31)) + 8|0);
      store4($fd356,$32);
      $R332$3 = $31;
     }
    } while(0);
    $cmp395 = ($30|0)==(0|0);
    if (!($cmp395)) {
     $index399 = ((($add$ptr6)) + 28|0);
     $37 = load4($index399);
     $arrayidx400 = (3864 + ($37<<2)|0);
     $38 = load4($arrayidx400);
     $cmp401 = ($add$ptr6|0)==($38|0);
     if ($cmp401) {
      store4($arrayidx400,$R332$3);
      $cond256 = ($R332$3|0)==(0|0);
      if ($cond256) {
       $shl408 = 1 << $37;
       $neg409 = $shl408 ^ -1;
       $39 = load4((3564));
       $and410 = $39 & $neg409;
       store4((3564),$and410);
       break;
      }
     } else {
      $arrayidx419 = ((($30)) + 16|0);
      $40 = load4($arrayidx419);
      $not$cmp420 = ($40|0)!=($add$ptr6|0);
      $$sink4 = $not$cmp420&1;
      $arrayidx427 = (((($30)) + 16|0) + ($$sink4<<2)|0);
      store4($arrayidx427,$R332$3);
      $cmp432 = ($R332$3|0)==(0|0);
      if ($cmp432) {
       break;
      }
     }
     $parent442 = ((($R332$3)) + 24|0);
     store4($parent442,$30);
     $child443 = ((($add$ptr6)) + 16|0);
     $41 = load4($child443);
     $cmp445 = ($41|0)==(0|0);
     if (!($cmp445)) {
      $arrayidx454 = ((($R332$3)) + 16|0);
      store4($arrayidx454,$41);
      $parent455 = ((($41)) + 24|0);
      store4($parent455,$R332$3);
     }
     $arrayidx460 = ((($child443)) + 4|0);
     $42 = load4($arrayidx460);
     $cmp461 = ($42|0)==(0|0);
     if (!($cmp461)) {
      $arrayidx470 = ((($R332$3)) + 20|0);
      store4($arrayidx470,$42);
      $parent471 = ((($42)) + 24|0);
      store4($parent471,$R332$3);
     }
    }
   }
  } while(0);
  $or480 = $add267 | 1;
  $head481 = ((($p$1)) + 4|0);
  store4($head481,$or480);
  $add$ptr482 = (($21) + ($add267)|0);
  store4($add$ptr482,$add267);
  $43 = load4((3580));
  $cmp484 = ($p$1|0)==($43|0);
  if ($cmp484) {
   store4((3568),$add267);
   return;
  } else {
   $psize$2 = $add267;
  }
 } else {
  $and495 = $22 & -2;
  store4($head231,$and495);
  $or496 = $psize$1 | 1;
  $head497 = ((($p$1)) + 4|0);
  store4($head497,$or496);
  $add$ptr498 = (($21) + ($psize$1)|0);
  store4($add$ptr498,$psize$1);
  $psize$2 = $psize$1;
 }
 $shr501 = $psize$2 >>> 3;
 $cmp502 = ($psize$2>>>0)<(256);
 if ($cmp502) {
  $shl508 = $shr501 << 1;
  $arrayidx509 = (3600 + ($shl508<<2)|0);
  $44 = load4(3560);
  $shl511 = 1 << $shr501;
  $and512 = $44 & $shl511;
  $tobool513 = ($and512|0)==(0);
  if ($tobool513) {
   $or516 = $44 | $shl511;
   store4(3560,$or516);
   $$pre = ((($arrayidx509)) + 8|0);
   $$pre$phiZ2D = $$pre;$F510$0 = $arrayidx509;
  } else {
   $45 = ((($arrayidx509)) + 8|0);
   $46 = load4($45);
   $$pre$phiZ2D = $45;$F510$0 = $46;
  }
  store4($$pre$phiZ2D,$p$1);
  $bk529 = ((($F510$0)) + 12|0);
  store4($bk529,$p$1);
  $fd530 = ((($p$1)) + 8|0);
  store4($fd530,$F510$0);
  $bk531 = ((($p$1)) + 12|0);
  store4($bk531,$arrayidx509);
  return;
 }
 $shr535 = $psize$2 >>> 8;
 $cmp536 = ($shr535|0)==(0);
 if ($cmp536) {
  $I534$0 = 0;
 } else {
  $cmp540 = ($psize$2>>>0)>(16777215);
  if ($cmp540) {
   $I534$0 = 31;
  } else {
   $sub = (($shr535) + 1048320)|0;
   $shr544 = $sub >>> 16;
   $and545 = $shr544 & 8;
   $shl546 = $shr535 << $and545;
   $sub547 = (($shl546) + 520192)|0;
   $shr548 = $sub547 >>> 16;
   $and549 = $shr548 & 4;
   $add550 = $and549 | $and545;
   $shl551 = $shl546 << $and549;
   $sub552 = (($shl551) + 245760)|0;
   $shr553 = $sub552 >>> 16;
   $and554 = $shr553 & 2;
   $add555 = $add550 | $and554;
   $sub556 = (14 - ($add555))|0;
   $shl557 = $shl551 << $and554;
   $shr558 = $shl557 >>> 15;
   $add559 = (($sub556) + ($shr558))|0;
   $shl560 = $add559 << 1;
   $add561 = (($add559) + 7)|0;
   $shr562 = $psize$2 >>> $add561;
   $and563 = $shr562 & 1;
   $add564 = $and563 | $shl560;
   $I534$0 = $add564;
  }
 }
 $arrayidx567 = (3864 + ($I534$0<<2)|0);
 $index568 = ((($p$1)) + 28|0);
 store4($index568,$I534$0);
 $child569 = ((($p$1)) + 16|0);
 $arrayidx570 = ((($p$1)) + 20|0);
 store4($arrayidx570,0);
 store4($child569,0);
 $47 = load4((3564));
 $shl573 = 1 << $I534$0;
 $and574 = $47 & $shl573;
 $tobool575 = ($and574|0)==(0);
 do {
  if ($tobool575) {
   $or578 = $47 | $shl573;
   store4((3564),$or578);
   store4($arrayidx567,$p$1);
   $parent579 = ((($p$1)) + 24|0);
   store4($parent579,$arrayidx567);
   $bk580 = ((($p$1)) + 12|0);
   store4($bk580,$p$1);
   $fd581 = ((($p$1)) + 8|0);
   store4($fd581,$p$1);
  } else {
   $48 = load4($arrayidx567);
   $cmp584 = ($I534$0|0)==(31);
   $shr586 = $I534$0 >>> 1;
   $sub589 = (25 - ($shr586))|0;
   $cond = $cmp584 ? 0 : $sub589;
   $shl590 = $psize$2 << $cond;
   $K583$0 = $shl590;$T$0 = $48;
   while(1) {
    $head591 = ((($T$0)) + 4|0);
    $49 = load4($head591);
    $and592 = $49 & -8;
    $cmp593 = ($and592|0)==($psize$2|0);
    if ($cmp593) {
     label = 73;
     break;
    }
    $shr597 = $K583$0 >>> 31;
    $arrayidx599 = (((($T$0)) + 16|0) + ($shr597<<2)|0);
    $shl600 = $K583$0 << 1;
    $50 = load4($arrayidx599);
    $cmp601 = ($50|0)==(0|0);
    if ($cmp601) {
     label = 72;
     break;
    } else {
     $K583$0 = $shl600;$T$0 = $50;
    }
   }
   if ((label|0) == 72) {
    store4($arrayidx599,$p$1);
    $parent610 = ((($p$1)) + 24|0);
    store4($parent610,$T$0);
    $bk611 = ((($p$1)) + 12|0);
    store4($bk611,$p$1);
    $fd612 = ((($p$1)) + 8|0);
    store4($fd612,$p$1);
    break;
   }
   else if ((label|0) == 73) {
    $fd620 = ((($T$0)) + 8|0);
    $51 = load4($fd620);
    $bk631 = ((($51)) + 12|0);
    store4($bk631,$p$1);
    store4($fd620,$p$1);
    $fd633 = ((($p$1)) + 8|0);
    store4($fd633,$51);
    $bk634 = ((($p$1)) + 12|0);
    store4($bk634,$T$0);
    $parent635 = ((($p$1)) + 24|0);
    store4($parent635,0);
    break;
   }
  }
 } while(0);
 $52 = load4((3592));
 $dec = (($52) + -1)|0;
 store4((3592),$dec);
 $cmp640 = ($dec|0)==(0);
 if ($cmp640) {
  $sp$0$in$i = (4016);
 } else {
  return;
 }
 while(1) {
  $sp$0$i = load4($sp$0$in$i);
  $cmp$i = ($sp$0$i|0)==(0|0);
  $next4$i = ((($sp$0$i)) + 8|0);
  if ($cmp$i) {
   break;
  } else {
   $sp$0$in$i = $next4$i;
  }
 }
 store4((3592),-1);
 return;
}
function _emscripten_get_global_libc() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (4056|0);
}
function ___stdio_close($f) {
 $f = $f|0;
 var $0 = 0, $call = 0, $call1 = 0, $call2 = 0, $fd = 0, $vararg_buffer = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $vararg_buffer = sp;
 $fd = ((($f)) + 60|0);
 $0 = load4($fd);
 $call = (_dummy($0)|0);
 store4($vararg_buffer,$call);
 $call1 = (___syscall6(6,($vararg_buffer|0))|0);
 $call2 = (___syscall_ret($call1)|0);
 STACKTOP = sp;return ($call2|0);
}
function ___stdio_write($f,$buf,$len) {
 $f = $f|0;
 $buf = $buf|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $add = 0, $add$ptr = 0, $add$ptr32 = 0, $buf8 = 0, $buf_size = 0, $call = 0, $call40 = 0;
 var $call7 = 0, $call741 = 0, $call746 = 0, $cmp = 0, $cmp12 = 0, $cmp17 = 0, $cmp24 = 0, $cmp42 = 0, $cnt$0 = 0, $dec = 0, $fd = 0, $incdec$ptr = 0, $iov$043 = 0, $iov$1 = 0, $iov_base2 = 0, $iov_len = 0, $iov_len19 = 0, $iov_len23 = 0, $iov_len3 = 0, $iov_len36 = 0;
 var $iovcnt$045 = 0, $iovcnt$1 = 0, $iovs = 0, $or = 0, $rem$044 = 0, $retval$0 = 0, $sub = 0, $sub$ptr$sub = 0, $sub21 = 0, $sub28 = 0, $sub37 = 0, $vararg_buffer = 0, $vararg_buffer3 = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr6 = 0, $vararg_ptr7 = 0, $wbase = 0, $wend = 0, $wend14 = 0;
 var $wpos = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(48|0);
 $vararg_buffer3 = sp + 16|0;
 $vararg_buffer = sp;
 $iovs = sp + 32|0;
 $wbase = ((($f)) + 28|0);
 $0 = load4($wbase);
 store4($iovs,$0);
 $iov_len = ((($iovs)) + 4|0);
 $wpos = ((($f)) + 20|0);
 $1 = load4($wpos);
 $sub$ptr$sub = (($1) - ($0))|0;
 store4($iov_len,$sub$ptr$sub);
 $iov_base2 = ((($iovs)) + 8|0);
 store4($iov_base2,$buf);
 $iov_len3 = ((($iovs)) + 12|0);
 store4($iov_len3,$len);
 $add = (($sub$ptr$sub) + ($len))|0;
 $fd = ((($f)) + 60|0);
 $2 = load4($fd);
 $3 = $iovs;
 store4($vararg_buffer,$2);
 $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
 store4($vararg_ptr1,$3);
 $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
 store4($vararg_ptr2,2);
 $call40 = (___syscall146(146,($vararg_buffer|0))|0);
 $call741 = (___syscall_ret($call40)|0);
 $cmp42 = ($add|0)==($call741|0);
 L1: do {
  if ($cmp42) {
   label = 3;
  } else {
   $call746 = $call741;$iov$043 = $iovs;$iovcnt$045 = 2;$rem$044 = $add;
   while(1) {
    $cmp12 = ($call746|0)<(0);
    if ($cmp12) {
     break;
    }
    $sub21 = (($rem$044) - ($call746))|0;
    $iov_len23 = ((($iov$043)) + 4|0);
    $8 = load4($iov_len23);
    $cmp24 = ($call746>>>0)>($8>>>0);
    $incdec$ptr = ((($iov$043)) + 8|0);
    $iov$1 = $cmp24 ? $incdec$ptr : $iov$043;
    $dec = $cmp24 << 31 >> 31;
    $iovcnt$1 = (($dec) + ($iovcnt$045))|0;
    $sub28 = $cmp24 ? $8 : 0;
    $cnt$0 = (($call746) - ($sub28))|0;
    $9 = load4($iov$1);
    $add$ptr32 = (($9) + ($cnt$0)|0);
    store4($iov$1,$add$ptr32);
    $iov_len36 = ((($iov$1)) + 4|0);
    $10 = load4($iov_len36);
    $sub37 = (($10) - ($cnt$0))|0;
    store4($iov_len36,$sub37);
    $11 = load4($fd);
    $12 = $iov$1;
    store4($vararg_buffer3,$11);
    $vararg_ptr6 = ((($vararg_buffer3)) + 4|0);
    store4($vararg_ptr6,$12);
    $vararg_ptr7 = ((($vararg_buffer3)) + 8|0);
    store4($vararg_ptr7,$iovcnt$1);
    $call = (___syscall146(146,($vararg_buffer3|0))|0);
    $call7 = (___syscall_ret($call)|0);
    $cmp = ($sub21|0)==($call7|0);
    if ($cmp) {
     label = 3;
     break L1;
    } else {
     $call746 = $call7;$iov$043 = $iov$1;$iovcnt$045 = $iovcnt$1;$rem$044 = $sub21;
    }
   }
   $wend14 = ((($f)) + 16|0);
   store4($wend14,0);
   store4($wbase,0);
   store4($wpos,0);
   $6 = load4($f);
   $or = $6 | 32;
   store4($f,$or);
   $cmp17 = ($iovcnt$045|0)==(2);
   if ($cmp17) {
    $retval$0 = 0;
   } else {
    $iov_len19 = ((($iov$043)) + 4|0);
    $7 = load4($iov_len19);
    $sub = (($len) - ($7))|0;
    $retval$0 = $sub;
   }
  }
 } while(0);
 if ((label|0) == 3) {
  $buf8 = ((($f)) + 44|0);
  $4 = load4($buf8);
  $buf_size = ((($f)) + 48|0);
  $5 = load4($buf_size);
  $add$ptr = (($4) + ($5)|0);
  $wend = ((($f)) + 16|0);
  store4($wend,$add$ptr);
  store4($wbase,$4);
  store4($wpos,$4);
  $retval$0 = $len;
 }
 STACKTOP = sp;return ($retval$0|0);
}
function ___stdio_seek($f,$off,$whence) {
 $f = $f|0;
 $off = $off|0;
 $whence = $whence|0;
 var $$pre = 0, $0 = 0, $1 = 0, $2 = 0, $call = 0, $call1 = 0, $cmp = 0, $fd = 0, $ret = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, $vararg_ptr4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $vararg_buffer = sp;
 $ret = sp + 20|0;
 $fd = ((($f)) + 60|0);
 $0 = load4($fd);
 $1 = $ret;
 store4($vararg_buffer,$0);
 $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
 store4($vararg_ptr1,0);
 $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
 store4($vararg_ptr2,$off);
 $vararg_ptr3 = ((($vararg_buffer)) + 12|0);
 store4($vararg_ptr3,$1);
 $vararg_ptr4 = ((($vararg_buffer)) + 16|0);
 store4($vararg_ptr4,$whence);
 $call = (___syscall140(140,($vararg_buffer|0))|0);
 $call1 = (___syscall_ret($call)|0);
 $cmp = ($call1|0)<(0);
 if ($cmp) {
  store4($ret,-1);
  $2 = -1;
 } else {
  $$pre = load4($ret);
  $2 = $$pre;
 }
 STACKTOP = sp;return ($2|0);
}
function ___syscall_ret($r) {
 $r = $r|0;
 var $call = 0, $cmp = 0, $retval$0 = 0, $sub = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $cmp = ($r>>>0)>(4294963200);
 if ($cmp) {
  $sub = (0 - ($r))|0;
  $call = (___errno_location()|0);
  store4($call,$sub);
  $retval$0 = -1;
 } else {
  $retval$0 = $r;
 }
 return ($retval$0|0);
}
function ___errno_location() {
 var $call = 0, $errno_val = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (___pthread_self_583()|0);
 $errno_val = ((($call)) + 64|0);
 return ($errno_val|0);
}
function ___pthread_self_583() {
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (_pthread_self()|0);
 return ($call|0);
}
function _pthread_self() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1400|0);
}
function _dummy($fd) {
 $fd = $fd|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return ($fd|0);
}
function ___stdout_write($f,$buf,$len) {
 $f = $f|0;
 $buf = $buf|0;
 $len = $len|0;
 var $0 = 0, $1 = 0, $2 = 0, $and = 0, $call = 0, $call3 = 0, $fd = 0, $lbf = 0, $tobool = 0, $tobool2 = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $write = 0, $wsz = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $vararg_buffer = sp;
 $wsz = sp + 16|0;
 $write = ((($f)) + 36|0);
 store4($write,22);
 $0 = load4($f);
 $and = $0 & 64;
 $tobool = ($and|0)==(0);
 if ($tobool) {
  $fd = ((($f)) + 60|0);
  $1 = load4($fd);
  $2 = $wsz;
  store4($vararg_buffer,$1);
  $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
  store4($vararg_ptr1,21523);
  $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
  store4($vararg_ptr2,$2);
  $call = (___syscall54(54,($vararg_buffer|0))|0);
  $tobool2 = ($call|0)==(0);
  if (!($tobool2)) {
   $lbf = ((($f)) + 75|0);
   store1($lbf,-1);
  }
 }
 $call3 = (___stdio_write($f,$buf,$len)|0);
 STACKTOP = sp;return ($call3|0);
}
function _strlen($s) {
 $s = $s|0;
 var $$pn = 0, $$pre = 0, $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $and = 0, $and3 = 0, $incdec$ptr = 0, $incdec$ptr1323 = 0, $incdec$ptr7 = 0, $lnot = 0, $neg = 0, $rem = 0, $rem13 = 0, $s$addr$0$lcssa = 0, $s$addr$015 = 0, $s$addr$1$lcssa = 0;
 var $sub = 0, $sub$ptr$lhs$cast15 = 0, $sub$ptr$lhs$cast15$sink = 0, $sub$ptr$sub17 = 0, $tobool = 0, $tobool1 = 0, $tobool10 = 0, $tobool1021 = 0, $tobool14 = 0, $w$0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $s;
 $rem13 = $0 & 3;
 $tobool14 = ($rem13|0)==(0);
 L1: do {
  if ($tobool14) {
   $s$addr$0$lcssa = $s;
   label = 4;
  } else {
   $5 = $0;$s$addr$015 = $s;
   while(1) {
    $1 = load1($s$addr$015);
    $tobool1 = ($1<<24>>24)==(0);
    if ($tobool1) {
     $sub$ptr$lhs$cast15$sink = $5;
     break L1;
    }
    $incdec$ptr = ((($s$addr$015)) + 1|0);
    $2 = $incdec$ptr;
    $rem = $2 & 3;
    $tobool = ($rem|0)==(0);
    if ($tobool) {
     $s$addr$0$lcssa = $incdec$ptr;
     label = 4;
     break;
    } else {
     $5 = $2;$s$addr$015 = $incdec$ptr;
    }
   }
  }
 } while(0);
 if ((label|0) == 4) {
  $w$0 = $s$addr$0$lcssa;
  while(1) {
   $3 = load4($w$0);
   $sub = (($3) + -16843009)|0;
   $neg = $3 & -2139062144;
   $and = $neg ^ -2139062144;
   $and3 = $and & $sub;
   $lnot = ($and3|0)==(0);
   $incdec$ptr7 = ((($w$0)) + 4|0);
   if ($lnot) {
    $w$0 = $incdec$ptr7;
   } else {
    break;
   }
  }
  $4 = $3&255;
  $tobool1021 = ($4<<24>>24)==(0);
  if ($tobool1021) {
   $s$addr$1$lcssa = $w$0;
  } else {
   $$pn = $w$0;
   while(1) {
    $incdec$ptr1323 = ((($$pn)) + 1|0);
    $$pre = load1($incdec$ptr1323);
    $tobool10 = ($$pre<<24>>24)==(0);
    if ($tobool10) {
     $s$addr$1$lcssa = $incdec$ptr1323;
     break;
    } else {
     $$pn = $incdec$ptr1323;
    }
   }
  }
  $sub$ptr$lhs$cast15 = $s$addr$1$lcssa;
  $sub$ptr$lhs$cast15$sink = $sub$ptr$lhs$cast15;
 }
 $sub$ptr$sub17 = (($sub$ptr$lhs$cast15$sink) - ($0))|0;
 return ($sub$ptr$sub17|0);
}
function ___strdup($s) {
 $s = $s|0;
 var $add = 0, $call = 0, $call1 = 0, $retval$0 = 0, $tobool = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (_strlen($s)|0);
 $add = (($call) + 1)|0;
 $call1 = (_malloc($add)|0);
 $tobool = ($call1|0)==(0|0);
 if ($tobool) {
  $retval$0 = 0;
 } else {
  _memcpy(($call1|0),($s|0),($add|0))|0;
  $retval$0 = $call1;
 }
 return ($retval$0|0);
}
function ___lockfile($f) {
 $f = $f|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 0;
}
function ___unlockfile($f) {
 $f = $f|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return;
}
function _fflush($f) {
 $f = $f|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $call = 0, $call1 = 0, $call11 = 0, $call118 = 0, $call17 = 0, $call23 = 0, $call7 = 0, $cmp = 0, $cmp15 = 0, $cmp21 = 0, $cond10 = 0, $cond20 = 0, $f$addr$0 = 0, $f$addr$019 = 0;
 var $f$addr$022 = 0, $lock = 0, $lock14 = 0, $next = 0, $or = 0, $phitmp = 0, $r$0$lcssa = 0, $r$021 = 0, $r$1 = 0, $retval$0 = 0, $tobool = 0, $tobool12 = 0, $tobool1220 = 0, $tobool25 = 0, $tobool5 = 0, $wbase = 0, $wpos = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $tobool = ($f|0)==(0|0);
 do {
  if ($tobool) {
   $1 = load4(1768);
   $tobool5 = ($1|0)==(0|0);
   if ($tobool5) {
    $cond10 = 0;
   } else {
    $2 = load4(1768);
    $call7 = (_fflush($2)|0);
    $cond10 = $call7;
   }
   $call11 = (___ofl_lock()|0);
   $f$addr$019 = load4($call11);
   $tobool1220 = ($f$addr$019|0)==(0|0);
   if ($tobool1220) {
    $r$0$lcssa = $cond10;
   } else {
    $f$addr$022 = $f$addr$019;$r$021 = $cond10;
    while(1) {
     $lock14 = ((($f$addr$022)) + 76|0);
     $3 = load4($lock14);
     $cmp15 = ($3|0)>(-1);
     if ($cmp15) {
      $call17 = (___lockfile($f$addr$022)|0);
      $cond20 = $call17;
     } else {
      $cond20 = 0;
     }
     $wpos = ((($f$addr$022)) + 20|0);
     $4 = load4($wpos);
     $wbase = ((($f$addr$022)) + 28|0);
     $5 = load4($wbase);
     $cmp21 = ($4>>>0)>($5>>>0);
     if ($cmp21) {
      $call23 = (___fflush_unlocked($f$addr$022)|0);
      $or = $call23 | $r$021;
      $r$1 = $or;
     } else {
      $r$1 = $r$021;
     }
     $tobool25 = ($cond20|0)==(0);
     if (!($tobool25)) {
      ___unlockfile($f$addr$022);
     }
     $next = ((($f$addr$022)) + 56|0);
     $f$addr$0 = load4($next);
     $tobool12 = ($f$addr$0|0)==(0|0);
     if ($tobool12) {
      $r$0$lcssa = $r$1;
      break;
     } else {
      $f$addr$022 = $f$addr$0;$r$021 = $r$1;
     }
    }
   }
   ___ofl_unlock();
   $retval$0 = $r$0$lcssa;
  } else {
   $lock = ((($f)) + 76|0);
   $0 = load4($lock);
   $cmp = ($0|0)>(-1);
   if (!($cmp)) {
    $call118 = (___fflush_unlocked($f)|0);
    $retval$0 = $call118;
    break;
   }
   $call = (___lockfile($f)|0);
   $phitmp = ($call|0)==(0);
   $call1 = (___fflush_unlocked($f)|0);
   if ($phitmp) {
    $retval$0 = $call1;
   } else {
    ___unlockfile($f);
    $retval$0 = $call1;
   }
  }
 } while(0);
 return ($retval$0|0);
}
function ___ofl_lock() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 ___lock((4120|0));
 return (4128|0);
}
function ___ofl_unlock() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 ___unlock((4120|0));
 return;
}
function ___fflush_unlocked($f) {
 $f = $f|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $cmp = 0, $cmp4 = 0, $rend = 0, $retval$0 = 0, $rpos = 0, $seek = 0, $sub$ptr$lhs$cast = 0, $sub$ptr$rhs$cast = 0, $sub$ptr$sub = 0, $tobool = 0, $wbase = 0, $wend = 0, $wpos = 0;
 var $write = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $wpos = ((($f)) + 20|0);
 $0 = load4($wpos);
 $wbase = ((($f)) + 28|0);
 $1 = load4($wbase);
 $cmp = ($0>>>0)>($1>>>0);
 if ($cmp) {
  $write = ((($f)) + 36|0);
  $2 = load4($write);
  (FUNCTION_TABLE_iiii[$2 & 31]($f,0,0)|0);
  $3 = load4($wpos);
  $tobool = ($3|0)==(0|0);
  if ($tobool) {
   $retval$0 = -1;
  } else {
   label = 3;
  }
 } else {
  label = 3;
 }
 if ((label|0) == 3) {
  $rpos = ((($f)) + 4|0);
  $4 = load4($rpos);
  $rend = ((($f)) + 8|0);
  $5 = load4($rend);
  $cmp4 = ($4>>>0)<($5>>>0);
  if ($cmp4) {
   $sub$ptr$lhs$cast = $4;
   $sub$ptr$rhs$cast = $5;
   $sub$ptr$sub = (($sub$ptr$lhs$cast) - ($sub$ptr$rhs$cast))|0;
   $seek = ((($f)) + 40|0);
   $6 = load4($seek);
   (FUNCTION_TABLE_iiii[$6 & 31]($f,$sub$ptr$sub,1)|0);
  }
  $wend = ((($f)) + 16|0);
  store4($wend,0);
  store4($wbase,0);
  store4($wpos,0);
  store4($rend,0);
  store4($rpos,0);
  $retval$0 = 0;
 }
 return ($retval$0|0);
}
function __ZN10__cxxabiv116__shim_type_infoD2Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return;
}
function __ZN10__cxxabiv117__class_type_infoD0Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 __ZN10__cxxabiv116__shim_type_infoD2Ev($this);
 __ZdlPv($this);
 return;
}
function __ZNK10__cxxabiv116__shim_type_info5noop1Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return;
}
function __ZNK10__cxxabiv116__shim_type_info5noop2Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return;
}
function __ZNK10__cxxabiv117__class_type_info9can_catchEPKNS_16__shim_type_infoERPv($this,$thrown_type,$adjustedPtr) {
 $this = $this|0;
 $thrown_type = $thrown_type|0;
 $adjustedPtr = $adjustedPtr|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $call = 0, $cmp = 0, $cmp4 = 0, $dst_ptr_leading_to_static_ptr = 0, $info = 0, $number_of_dst_type = 0, $path_dst_ptr_to_static_ptr = 0, $retval$0 = 0, $retval$2 = 0, $src2dst_offset = 0, $static_type = 0, $vfn = 0, $vtable = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(64|0);
 $info = sp;
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$thrown_type,0)|0);
 if ($call) {
  $retval$2 = 1;
 } else {
  $0 = ($thrown_type|0)==(0|0);
  if ($0) {
   $retval$2 = 0;
  } else {
   $1 = (___dynamic_cast($thrown_type,1224,1208,0)|0);
   $cmp = ($1|0)==(0|0);
   if ($cmp) {
    $retval$2 = 0;
   } else {
    $2 = ((($info)) + 4|0);
    ; store8($2,i64_const(0,0),4); store8($2+8|0,i64_const(0,0),4); store8($2+16|0,i64_const(0,0),4); store8($2+24|0,i64_const(0,0),4); store8($2+32|0,i64_const(0,0),4); store8($2+40|0,i64_const(0,0),4); store4($2+48|0,0,4);
    store4($info,$1);
    $static_type = ((($info)) + 8|0);
    store4($static_type,$this);
    $src2dst_offset = ((($info)) + 12|0);
    store4($src2dst_offset,-1);
    $number_of_dst_type = ((($info)) + 48|0);
    store4($number_of_dst_type,1);
    $vtable = load4($1);
    $vfn = ((($vtable)) + 28|0);
    $3 = load4($vfn);
    $4 = load4($adjustedPtr);
    FUNCTION_TABLE_viiii[$3 & 31]($1,$info,$4,1);
    $path_dst_ptr_to_static_ptr = ((($info)) + 24|0);
    $5 = load4($path_dst_ptr_to_static_ptr);
    $cmp4 = ($5|0)==(1);
    if ($cmp4) {
     $dst_ptr_leading_to_static_ptr = ((($info)) + 16|0);
     $6 = load4($dst_ptr_leading_to_static_ptr);
     store4($adjustedPtr,$6);
     $retval$0 = 1;
    } else {
     $retval$0 = 0;
    }
    $retval$2 = $retval$0;
   }
  }
 }
 STACKTOP = sp;return ($retval$2|0);
}
function __ZNK10__cxxabiv117__class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib($this,$info,$dst_ptr,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $dst_ptr = $dst_ptr|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $call = 0, $static_type = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $static_type = ((($info)) + 8|0);
 $0 = load4($static_type);
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$0,$use_strcmp)|0);
 if ($call) {
  __ZNK10__cxxabiv117__class_type_info29process_static_type_above_dstEPNS_19__dynamic_cast_infoEPKvS4_i(0,$info,$dst_ptr,$current_ptr,$path_below);
 }
 return;
}
function __ZNK10__cxxabiv117__class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib($this,$info,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $add = 0, $call = 0, $call3 = 0, $cmp = 0, $cmp12 = 0, $cmp13 = 0, $cmp5 = 0, $cmp7 = 0, $dst_ptr_leading_to_static_ptr = 0, $dst_ptr_not_leading_to_static_ptr = 0, $is_dst_type_derived_from_static_type = 0, $number_to_dst_ptr = 0, $number_to_static_ptr = 0;
 var $path_dst_ptr_to_static_ptr = 0, $path_dynamic_ptr_to_dst_ptr = 0, $search_done = 0, $static_type = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $static_type = ((($info)) + 8|0);
 $0 = load4($static_type);
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$0,$use_strcmp)|0);
 do {
  if ($call) {
   __ZNK10__cxxabiv117__class_type_info29process_static_type_below_dstEPNS_19__dynamic_cast_infoEPKvi(0,$info,$current_ptr,$path_below);
  } else {
   $1 = load4($info);
   $call3 = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$1,$use_strcmp)|0);
   if ($call3) {
    $dst_ptr_leading_to_static_ptr = ((($info)) + 16|0);
    $2 = load4($dst_ptr_leading_to_static_ptr);
    $cmp = ($2|0)==($current_ptr|0);
    $path_dynamic_ptr_to_dst_ptr = ((($info)) + 32|0);
    if (!($cmp)) {
     $dst_ptr_not_leading_to_static_ptr = ((($info)) + 20|0);
     $3 = load4($dst_ptr_not_leading_to_static_ptr);
     $cmp5 = ($3|0)==($current_ptr|0);
     if (!($cmp5)) {
      store4($path_dynamic_ptr_to_dst_ptr,$path_below);
      store4($dst_ptr_not_leading_to_static_ptr,$current_ptr);
      $number_to_dst_ptr = ((($info)) + 40|0);
      $4 = load4($number_to_dst_ptr);
      $add = (($4) + 1)|0;
      store4($number_to_dst_ptr,$add);
      $number_to_static_ptr = ((($info)) + 36|0);
      $5 = load4($number_to_static_ptr);
      $cmp12 = ($5|0)==(1);
      if ($cmp12) {
       $path_dst_ptr_to_static_ptr = ((($info)) + 24|0);
       $6 = load4($path_dst_ptr_to_static_ptr);
       $cmp13 = ($6|0)==(2);
       if ($cmp13) {
        $search_done = ((($info)) + 54|0);
        store1($search_done,1);
       }
      }
      $is_dst_type_derived_from_static_type = ((($info)) + 44|0);
      store4($is_dst_type_derived_from_static_type,4);
      break;
     }
    }
    $cmp7 = ($path_below|0)==(1);
    if ($cmp7) {
     store4($path_dynamic_ptr_to_dst_ptr,1);
    }
   }
  }
 } while(0);
 return;
}
function __ZNK10__cxxabiv117__class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi($this,$info,$adjustedPtr,$path_below) {
 $this = $this|0;
 $info = $info|0;
 $adjustedPtr = $adjustedPtr|0;
 $path_below = $path_below|0;
 var $0 = 0, $call = 0, $static_type = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $static_type = ((($info)) + 8|0);
 $0 = load4($static_type);
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$0,0)|0);
 if ($call) {
  __ZNK10__cxxabiv117__class_type_info24process_found_base_classEPNS_19__dynamic_cast_infoEPvi(0,$info,$adjustedPtr,$path_below);
 }
 return;
}
function __ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($x,$y,$0) {
 $x = $x|0;
 $y = $y|0;
 $0 = $0|0;
 var $cmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $cmp = ($x|0)==($y|0);
 return ($cmp|0);
}
function __ZNK10__cxxabiv117__class_type_info24process_found_base_classEPNS_19__dynamic_cast_infoEPvi($this,$info,$adjustedPtr,$path_below) {
 $this = $this|0;
 $info = $info|0;
 $adjustedPtr = $adjustedPtr|0;
 $path_below = $path_below|0;
 var $0 = 0, $1 = 0, $2 = 0, $add = 0, $cmp = 0, $cmp4 = 0, $cmp7 = 0, $dst_ptr_leading_to_static_ptr = 0, $number_to_static_ptr = 0, $path_dst_ptr_to_static_ptr = 0, $search_done = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $dst_ptr_leading_to_static_ptr = ((($info)) + 16|0);
 $0 = load4($dst_ptr_leading_to_static_ptr);
 $cmp = ($0|0)==(0|0);
 $number_to_static_ptr = ((($info)) + 36|0);
 $path_dst_ptr_to_static_ptr = ((($info)) + 24|0);
 do {
  if ($cmp) {
   store4($dst_ptr_leading_to_static_ptr,$adjustedPtr);
   store4($path_dst_ptr_to_static_ptr,$path_below);
   store4($number_to_static_ptr,1);
  } else {
   $cmp4 = ($0|0)==($adjustedPtr|0);
   if (!($cmp4)) {
    $2 = load4($number_to_static_ptr);
    $add = (($2) + 1)|0;
    store4($number_to_static_ptr,$add);
    store4($path_dst_ptr_to_static_ptr,2);
    $search_done = ((($info)) + 54|0);
    store1($search_done,1);
    break;
   }
   $1 = load4($path_dst_ptr_to_static_ptr);
   $cmp7 = ($1|0)==(2);
   if ($cmp7) {
    store4($path_dst_ptr_to_static_ptr,$path_below);
   }
  }
 } while(0);
 return;
}
function __ZNK10__cxxabiv117__class_type_info29process_static_type_below_dstEPNS_19__dynamic_cast_infoEPKvi($this,$info,$current_ptr,$path_below) {
 $this = $this|0;
 $info = $info|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 var $0 = 0, $1 = 0, $cmp = 0, $cmp2 = 0, $path_dynamic_ptr_to_static_ptr = 0, $static_ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $static_ptr = ((($info)) + 4|0);
 $0 = load4($static_ptr);
 $cmp = ($0|0)==($current_ptr|0);
 if ($cmp) {
  $path_dynamic_ptr_to_static_ptr = ((($info)) + 28|0);
  $1 = load4($path_dynamic_ptr_to_static_ptr);
  $cmp2 = ($1|0)==(1);
  if (!($cmp2)) {
   store4($path_dynamic_ptr_to_static_ptr,$path_below);
  }
 }
 return;
}
function __ZNK10__cxxabiv117__class_type_info29process_static_type_above_dstEPNS_19__dynamic_cast_infoEPKvS4_i($this,$info,$dst_ptr,$current_ptr,$path_below) {
 $this = $this|0;
 $info = $info|0;
 $dst_ptr = $dst_ptr|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $add = 0, $cmp = 0, $cmp10 = 0, $cmp13 = 0, $cmp18 = 0, $cmp2 = 0, $cmp21 = 0, $cmp5 = 0, $cmp7 = 0, $dst_ptr_leading_to_static_ptr = 0, $found_any_static_type = 0, $found_our_static_ptr = 0, $number_of_dst_type = 0;
 var $number_to_static_ptr = 0, $or$cond = 0, $or$cond19 = 0, $path_dst_ptr_to_static_ptr = 0, $search_done = 0, $static_ptr = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $found_any_static_type = ((($info)) + 53|0);
 store1($found_any_static_type,1);
 $static_ptr = ((($info)) + 4|0);
 $0 = load4($static_ptr);
 $cmp = ($0|0)==($current_ptr|0);
 do {
  if ($cmp) {
   $found_our_static_ptr = ((($info)) + 52|0);
   store1($found_our_static_ptr,1);
   $dst_ptr_leading_to_static_ptr = ((($info)) + 16|0);
   $1 = load4($dst_ptr_leading_to_static_ptr);
   $cmp2 = ($1|0)==(0|0);
   $search_done = ((($info)) + 54|0);
   $number_of_dst_type = ((($info)) + 48|0);
   $path_dst_ptr_to_static_ptr = ((($info)) + 24|0);
   $number_to_static_ptr = ((($info)) + 36|0);
   if ($cmp2) {
    store4($dst_ptr_leading_to_static_ptr,$dst_ptr);
    store4($path_dst_ptr_to_static_ptr,$path_below);
    store4($number_to_static_ptr,1);
    $2 = load4($number_of_dst_type);
    $cmp5 = ($2|0)==(1);
    $cmp7 = ($path_below|0)==(1);
    $or$cond = $cmp5 & $cmp7;
    if (!($or$cond)) {
     break;
    }
    store1($search_done,1);
    break;
   }
   $cmp10 = ($1|0)==($dst_ptr|0);
   if (!($cmp10)) {
    $6 = load4($number_to_static_ptr);
    $add = (($6) + 1)|0;
    store4($number_to_static_ptr,$add);
    store1($search_done,1);
    break;
   }
   $3 = load4($path_dst_ptr_to_static_ptr);
   $cmp13 = ($3|0)==(2);
   if ($cmp13) {
    store4($path_dst_ptr_to_static_ptr,$path_below);
    $5 = $path_below;
   } else {
    $5 = $3;
   }
   $4 = load4($number_of_dst_type);
   $cmp18 = ($4|0)==(1);
   $cmp21 = ($5|0)==(1);
   $or$cond19 = $cmp18 & $cmp21;
   if ($or$cond19) {
    store1($search_done,1);
   }
  }
 } while(0);
 return;
}
function ___dynamic_cast($static_ptr,$static_type,$dst_type,$src2dst_offset) {
 $static_ptr = $static_ptr|0;
 $static_type = $static_type|0;
 $dst_type = $dst_type|0;
 $src2dst_offset = $src2dst_offset|0;
 var $$ = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $add$ptr = 0, $add$ptr$ = 0, $arrayidx = 0;
 var $arrayidx1 = 0, $call = 0, $cmp = 0, $cmp14 = 0, $cmp16 = 0, $cmp19 = 0, $cmp25 = 0, $cmp27 = 0, $cmp30 = 0, $cmp33 = 0, $dst_ptr$0 = 0, $dst_ptr_leading_to_static_ptr = 0, $dst_ptr_not_leading_to_static_ptr = 0, $info = 0, $number_of_dst_type = 0, $number_to_dst_ptr = 0, $number_to_static_ptr = 0, $or$cond = 0, $or$cond15 = 0, $or$cond16 = 0;
 var $or$cond17 = 0, $path_dst_ptr_to_static_ptr = 0, $path_dynamic_ptr_to_dst_ptr = 0, $path_dynamic_ptr_to_static_ptr = 0, $src2dst_offset5 = 0, $static_ptr3 = 0, $static_type4 = 0, $vfn = 0, $vfn11 = 0, $vtable10 = 0, $vtable7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(64|0);
 $info = sp;
 $0 = load4($static_ptr);
 $arrayidx = ((($0)) + -8|0);
 $1 = load4($arrayidx);
 $add$ptr = (($static_ptr) + ($1)|0);
 $arrayidx1 = ((($0)) + -4|0);
 $2 = load4($arrayidx1);
 store4($info,$dst_type);
 $static_ptr3 = ((($info)) + 4|0);
 store4($static_ptr3,$static_ptr);
 $static_type4 = ((($info)) + 8|0);
 store4($static_type4,$static_type);
 $src2dst_offset5 = ((($info)) + 12|0);
 store4($src2dst_offset5,$src2dst_offset);
 $dst_ptr_leading_to_static_ptr = ((($info)) + 16|0);
 $dst_ptr_not_leading_to_static_ptr = ((($info)) + 20|0);
 $path_dst_ptr_to_static_ptr = ((($info)) + 24|0);
 $path_dynamic_ptr_to_static_ptr = ((($info)) + 28|0);
 $path_dynamic_ptr_to_dst_ptr = ((($info)) + 32|0);
 $number_to_dst_ptr = ((($info)) + 40|0);
 ; store8($dst_ptr_leading_to_static_ptr,i64_const(0,0),4); store8($dst_ptr_leading_to_static_ptr+8|0,i64_const(0,0),4); store8($dst_ptr_leading_to_static_ptr+16|0,i64_const(0,0),4); store8($dst_ptr_leading_to_static_ptr+24|0,i64_const(0,0),4); store4($dst_ptr_leading_to_static_ptr+32|0,0,4); store2($dst_ptr_leading_to_static_ptr+36|0,0,2); store1($dst_ptr_leading_to_static_ptr+38|0,0,1);
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($2,$dst_type,0)|0);
 L1: do {
  if ($call) {
   $number_of_dst_type = ((($info)) + 48|0);
   store4($number_of_dst_type,1);
   $vtable7 = load4($2);
   $vfn = ((($vtable7)) + 20|0);
   $3 = load4($vfn);
   FUNCTION_TABLE_viiiiii[$3 & 31]($2,$info,$add$ptr,$add$ptr,1,0);
   $4 = load4($path_dst_ptr_to_static_ptr);
   $cmp = ($4|0)==(1);
   $add$ptr$ = $cmp ? $add$ptr : 0;
   $dst_ptr$0 = $add$ptr$;
  } else {
   $number_to_static_ptr = ((($info)) + 36|0);
   $vtable10 = load4($2);
   $vfn11 = ((($vtable10)) + 24|0);
   $5 = load4($vfn11);
   FUNCTION_TABLE_viiiii[$5 & 31]($2,$info,$add$ptr,1,0);
   $6 = load4($number_to_static_ptr);
   switch ($6|0) {
   case 0:  {
    $7 = load4($number_to_dst_ptr);
    $cmp14 = ($7|0)==(1);
    $8 = load4($path_dynamic_ptr_to_static_ptr);
    $cmp16 = ($8|0)==(1);
    $or$cond = $cmp14 & $cmp16;
    $9 = load4($path_dynamic_ptr_to_dst_ptr);
    $cmp19 = ($9|0)==(1);
    $or$cond15 = $or$cond & $cmp19;
    $10 = load4($dst_ptr_not_leading_to_static_ptr);
    $$ = $or$cond15 ? $10 : 0;
    $dst_ptr$0 = $$;
    break L1;
    break;
   }
   case 1:  {
    break;
   }
   default: {
    $dst_ptr$0 = 0;
    break L1;
   }
   }
   $11 = load4($path_dst_ptr_to_static_ptr);
   $cmp25 = ($11|0)==(1);
   if (!($cmp25)) {
    $12 = load4($number_to_dst_ptr);
    $cmp27 = ($12|0)==(0);
    $13 = load4($path_dynamic_ptr_to_static_ptr);
    $cmp30 = ($13|0)==(1);
    $or$cond16 = $cmp27 & $cmp30;
    $14 = load4($path_dynamic_ptr_to_dst_ptr);
    $cmp33 = ($14|0)==(1);
    $or$cond17 = $or$cond16 & $cmp33;
    if (!($or$cond17)) {
     $dst_ptr$0 = 0;
     break;
    }
   }
   $15 = load4($dst_ptr_leading_to_static_ptr);
   $dst_ptr$0 = $15;
  }
 } while(0);
 STACKTOP = sp;return ($dst_ptr$0|0);
}
function __ZN10__cxxabiv120__si_class_type_infoD0Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 __ZN10__cxxabiv116__shim_type_infoD2Ev($this);
 __ZdlPv($this);
 return;
}
function __ZNK10__cxxabiv120__si_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib($this,$info,$dst_ptr,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $dst_ptr = $dst_ptr|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $1 = 0, $2 = 0, $__base_type = 0, $call = 0, $static_type = 0, $vfn = 0, $vtable = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $static_type = ((($info)) + 8|0);
 $0 = load4($static_type);
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$0,$use_strcmp)|0);
 if ($call) {
  __ZNK10__cxxabiv117__class_type_info29process_static_type_above_dstEPNS_19__dynamic_cast_infoEPKvS4_i(0,$info,$dst_ptr,$current_ptr,$path_below);
 } else {
  $__base_type = ((($this)) + 8|0);
  $1 = load4($__base_type);
  $vtable = load4($1);
  $vfn = ((($vtable)) + 20|0);
  $2 = load4($vfn);
  FUNCTION_TABLE_viiiiii[$2 & 31]($1,$info,$dst_ptr,$current_ptr,$path_below,$use_strcmp);
 }
 return;
}
function __ZNK10__cxxabiv120__si_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib($this,$info,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $__base_type = 0, $add = 0, $call = 0, $call3 = 0, $cmp = 0, $cmp11 = 0;
 var $cmp26 = 0, $cmp27 = 0, $cmp5 = 0, $cmp7 = 0, $dst_ptr_leading_to_static_ptr = 0, $dst_ptr_not_leading_to_static_ptr = 0, $found_any_static_type = 0, $found_our_static_ptr = 0, $is_dst_type_derived_from_static_type = 0, $is_dst_type_derived_from_static_type13$0$off032 = 0, $is_dst_type_derived_from_static_type13$0$off033 = 0, $not$tobool19 = 0, $number_to_dst_ptr = 0, $number_to_static_ptr = 0, $path_dst_ptr_to_static_ptr = 0, $path_dynamic_ptr_to_dst_ptr = 0, $search_done = 0, $static_type = 0, $tobool16 = 0, $vfn = 0;
 var $vfn42 = 0, $vtable = 0, $vtable41 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $static_type = ((($info)) + 8|0);
 $0 = load4($static_type);
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$0,$use_strcmp)|0);
 do {
  if ($call) {
   __ZNK10__cxxabiv117__class_type_info29process_static_type_below_dstEPNS_19__dynamic_cast_infoEPKvi(0,$info,$current_ptr,$path_below);
  } else {
   $1 = load4($info);
   $call3 = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$1,$use_strcmp)|0);
   $__base_type = ((($this)) + 8|0);
   if (!($call3)) {
    $12 = load4($__base_type);
    $vtable41 = load4($12);
    $vfn42 = ((($vtable41)) + 24|0);
    $13 = load4($vfn42);
    FUNCTION_TABLE_viiiii[$13 & 31]($12,$info,$current_ptr,$path_below,$use_strcmp);
    break;
   }
   $dst_ptr_leading_to_static_ptr = ((($info)) + 16|0);
   $2 = load4($dst_ptr_leading_to_static_ptr);
   $cmp = ($2|0)==($current_ptr|0);
   $path_dynamic_ptr_to_dst_ptr = ((($info)) + 32|0);
   if (!($cmp)) {
    $dst_ptr_not_leading_to_static_ptr = ((($info)) + 20|0);
    $3 = load4($dst_ptr_not_leading_to_static_ptr);
    $cmp5 = ($3|0)==($current_ptr|0);
    if (!($cmp5)) {
     store4($path_dynamic_ptr_to_dst_ptr,$path_below);
     $is_dst_type_derived_from_static_type = ((($info)) + 44|0);
     $4 = load4($is_dst_type_derived_from_static_type);
     $cmp11 = ($4|0)==(4);
     if ($cmp11) {
      break;
     }
     $found_our_static_ptr = ((($info)) + 52|0);
     store1($found_our_static_ptr,0);
     $found_any_static_type = ((($info)) + 53|0);
     store1($found_any_static_type,0);
     $5 = load4($__base_type);
     $vtable = load4($5);
     $vfn = ((($vtable)) + 20|0);
     $6 = load4($vfn);
     FUNCTION_TABLE_viiiiii[$6 & 31]($5,$info,$current_ptr,$current_ptr,1,$use_strcmp);
     $7 = load1($found_any_static_type);
     $tobool16 = ($7<<24>>24)==(0);
     if ($tobool16) {
      $is_dst_type_derived_from_static_type13$0$off032 = 4;
      label = 11;
     } else {
      $8 = load1($found_our_static_ptr);
      $not$tobool19 = ($8<<24>>24)==(0);
      if ($not$tobool19) {
       $is_dst_type_derived_from_static_type13$0$off032 = 3;
       label = 11;
      } else {
       $is_dst_type_derived_from_static_type13$0$off033 = 3;
      }
     }
     if ((label|0) == 11) {
      store4($dst_ptr_not_leading_to_static_ptr,$current_ptr);
      $number_to_dst_ptr = ((($info)) + 40|0);
      $9 = load4($number_to_dst_ptr);
      $add = (($9) + 1)|0;
      store4($number_to_dst_ptr,$add);
      $number_to_static_ptr = ((($info)) + 36|0);
      $10 = load4($number_to_static_ptr);
      $cmp26 = ($10|0)==(1);
      if ($cmp26) {
       $path_dst_ptr_to_static_ptr = ((($info)) + 24|0);
       $11 = load4($path_dst_ptr_to_static_ptr);
       $cmp27 = ($11|0)==(2);
       if ($cmp27) {
        $search_done = ((($info)) + 54|0);
        store1($search_done,1);
        $is_dst_type_derived_from_static_type13$0$off033 = $is_dst_type_derived_from_static_type13$0$off032;
       } else {
        $is_dst_type_derived_from_static_type13$0$off033 = $is_dst_type_derived_from_static_type13$0$off032;
       }
      } else {
       $is_dst_type_derived_from_static_type13$0$off033 = $is_dst_type_derived_from_static_type13$0$off032;
      }
     }
     store4($is_dst_type_derived_from_static_type,$is_dst_type_derived_from_static_type13$0$off033);
     break;
    }
   }
   $cmp7 = ($path_below|0)==(1);
   if ($cmp7) {
    store4($path_dynamic_ptr_to_dst_ptr,1);
   }
  }
 } while(0);
 return;
}
function __ZNK10__cxxabiv120__si_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi($this,$info,$adjustedPtr,$path_below) {
 $this = $this|0;
 $info = $info|0;
 $adjustedPtr = $adjustedPtr|0;
 $path_below = $path_below|0;
 var $0 = 0, $1 = 0, $2 = 0, $__base_type = 0, $call = 0, $static_type = 0, $vfn = 0, $vtable = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $static_type = ((($info)) + 8|0);
 $0 = load4($static_type);
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$0,0)|0);
 if ($call) {
  __ZNK10__cxxabiv117__class_type_info24process_found_base_classEPNS_19__dynamic_cast_infoEPvi(0,$info,$adjustedPtr,$path_below);
 } else {
  $__base_type = ((($this)) + 8|0);
  $1 = load4($__base_type);
  $vtable = load4($1);
  $vfn = ((($vtable)) + 28|0);
  $2 = load4($vfn);
  FUNCTION_TABLE_viiii[$2 & 31]($1,$info,$adjustedPtr,$path_below);
 }
 return;
}
function __ZdlPv($ptr) {
 $ptr = $ptr|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 _free($ptr);
 return;
}
function __ZNSt9type_infoD2Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return;
}
function __ZN10__cxxabiv123__fundamental_type_infoD0Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 __ZN10__cxxabiv116__shim_type_infoD2Ev($this);
 __ZdlPv($this);
 return;
}
function __ZNK10__cxxabiv123__fundamental_type_info9can_catchEPKNS_16__shim_type_infoERPv($this,$thrown_type,$0) {
 $this = $this|0;
 $thrown_type = $thrown_type|0;
 $0 = $0|0;
 var $call = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$thrown_type,0)|0);
 return ($call|0);
}
function __ZN10__cxxabiv121__vmi_class_type_infoD0Ev($this) {
 $this = $this|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 __ZN10__cxxabiv116__shim_type_infoD2Ev($this);
 __ZdlPv($this);
 return;
}
function __ZNK10__cxxabiv121__vmi_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib($this,$info,$dst_ptr,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $dst_ptr = $dst_ptr|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $__base_count = 0, $__flags = 0, $add$ptr = 0, $and = 0, $and30 = 0, $arraydecay = 0, $call = 0, $cmp = 0, $cmp19 = 0, $cmp40 = 0;
 var $found_any_static_type5 = 0, $found_our_static_ptr2 = 0, $incdec$ptr = 0, $incdec$ptr39 = 0, $p$0 = 0, $path_dst_ptr_to_static_ptr = 0, $search_done = 0, $static_type = 0, $tobool14 = 0, $tobool17 = 0, $tobool22 = 0, $tobool27 = 0, $tobool31 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $static_type = ((($info)) + 8|0);
 $0 = load4($static_type);
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$0,$use_strcmp)|0);
 if ($call) {
  __ZNK10__cxxabiv117__class_type_info29process_static_type_above_dstEPNS_19__dynamic_cast_infoEPKvS4_i(0,$info,$dst_ptr,$current_ptr,$path_below);
 } else {
  $found_our_static_ptr2 = ((($info)) + 52|0);
  $1 = load1($found_our_static_ptr2);
  $found_any_static_type5 = ((($info)) + 53|0);
  $2 = load1($found_any_static_type5);
  $arraydecay = ((($this)) + 16|0);
  $__base_count = ((($this)) + 12|0);
  $3 = load4($__base_count);
  $add$ptr = (((($this)) + 16|0) + ($3<<3)|0);
  store1($found_our_static_ptr2,0);
  store1($found_any_static_type5,0);
  __ZNK10__cxxabiv122__base_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib($arraydecay,$info,$dst_ptr,$current_ptr,$path_below,$use_strcmp);
  $cmp = ($3|0)>(1);
  L4: do {
   if ($cmp) {
    $incdec$ptr = ((($this)) + 24|0);
    $path_dst_ptr_to_static_ptr = ((($info)) + 24|0);
    $search_done = ((($info)) + 54|0);
    $__flags = ((($this)) + 8|0);
    $p$0 = $incdec$ptr;
    while(1) {
     $4 = load1($search_done);
     $tobool14 = ($4<<24>>24)==(0);
     if (!($tobool14)) {
      break L4;
     }
     $5 = load1($found_our_static_ptr2);
     $tobool17 = ($5<<24>>24)==(0);
     if ($tobool17) {
      $8 = load1($found_any_static_type5);
      $tobool27 = ($8<<24>>24)==(0);
      if (!($tobool27)) {
       $9 = load4($__flags);
       $and30 = $9 & 1;
       $tobool31 = ($and30|0)==(0);
       if ($tobool31) {
        break L4;
       }
      }
     } else {
      $6 = load4($path_dst_ptr_to_static_ptr);
      $cmp19 = ($6|0)==(1);
      if ($cmp19) {
       break L4;
      }
      $7 = load4($__flags);
      $and = $7 & 2;
      $tobool22 = ($and|0)==(0);
      if ($tobool22) {
       break L4;
      }
     }
     store1($found_our_static_ptr2,0);
     store1($found_any_static_type5,0);
     __ZNK10__cxxabiv122__base_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib($p$0,$info,$dst_ptr,$current_ptr,$path_below,$use_strcmp);
     $incdec$ptr39 = ((($p$0)) + 8|0);
     $cmp40 = ($incdec$ptr39>>>0)<($add$ptr>>>0);
     if ($cmp40) {
      $p$0 = $incdec$ptr39;
     } else {
      break;
     }
    }
   }
  } while(0);
  store1($found_our_static_ptr2,$1);
  store1($found_any_static_type5,$2);
 }
 return;
}
function __ZNK10__cxxabiv121__vmi_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib($this,$info,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $3 = 0, $4 = 0;
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $__base_count = 0, $__flags = 0, $add = 0, $add$ptr = 0, $add$ptr64 = 0, $and = 0, $and35 = 0, $and73 = 0, $and88 = 0, $arraydecay = 0, $call = 0, $call3 = 0, $cmp = 0, $cmp100 = 0, $cmp106 = 0;
 var $cmp11 = 0, $cmp115 = 0, $cmp121 = 0, $cmp16 = 0, $cmp27 = 0, $cmp44 = 0, $cmp46 = 0, $cmp5 = 0, $cmp7 = 0, $cmp70 = 0, $cmp77 = 0, $cmp85 = 0, $cmp97 = 0, $does_dst_type_point_to_our_static_type$0$off0 = 0, $does_dst_type_point_to_our_static_type$1$off0 = 0, $dst_ptr_leading_to_static_ptr = 0, $dst_ptr_not_leading_to_static_ptr = 0, $found_any_static_type = 0, $found_our_static_ptr = 0, $incdec$ptr = 0;
 var $incdec$ptr105 = 0, $incdec$ptr120 = 0, $incdec$ptr69 = 0, $incdec$ptr84 = 0, $is_dst_type_derived_from_static_type = 0, $is_dst_type_derived_from_static_type13$0$off0 = 0, $is_dst_type_derived_from_static_type13$1$off0 = 0, $is_dst_type_derived_from_static_type13$2$off0 = 0, $number_to_dst_ptr = 0, $number_to_static_ptr = 0, $p$0 = 0, $p65$0 = 0, $p65$1 = 0, $p65$2 = 0, $path_dst_ptr_to_static_ptr45 = 0, $path_dynamic_ptr_to_dst_ptr = 0, $search_done48 = 0, $static_type = 0, $tobool111 = 0, $tobool18 = 0;
 var $tobool22 = 0, $tobool25 = 0, $tobool30 = 0, $tobool36 = 0, $tobool74 = 0, $tobool80 = 0, $tobool89 = 0, $tobool93 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $static_type = ((($info)) + 8|0);
 $0 = load4($static_type);
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$0,$use_strcmp)|0);
 L1: do {
  if ($call) {
   __ZNK10__cxxabiv117__class_type_info29process_static_type_below_dstEPNS_19__dynamic_cast_infoEPKvi(0,$info,$current_ptr,$path_below);
  } else {
   $1 = load4($info);
   $call3 = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$1,$use_strcmp)|0);
   $__base_count = ((($this)) + 12|0);
   $path_dst_ptr_to_static_ptr45 = ((($info)) + 24|0);
   $number_to_static_ptr = ((($info)) + 36|0);
   $search_done48 = ((($info)) + 54|0);
   $__flags = ((($this)) + 8|0);
   $arraydecay = ((($this)) + 16|0);
   if (!($call3)) {
    $16 = load4($__base_count);
    $add$ptr64 = (((($this)) + 16|0) + ($16<<3)|0);
    __ZNK10__cxxabiv122__base_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib($arraydecay,$info,$current_ptr,$path_below,$use_strcmp);
    $incdec$ptr69 = ((($this)) + 24|0);
    $cmp70 = ($16|0)>(1);
    if (!($cmp70)) {
     break;
    }
    $17 = load4($__flags);
    $and73 = $17 & 2;
    $tobool74 = ($and73|0)==(0);
    if ($tobool74) {
     $18 = load4($number_to_static_ptr);
     $cmp77 = ($18|0)==(1);
     if ($cmp77) {
      $p65$0 = $incdec$ptr69;
     } else {
      $and88 = $17 & 1;
      $tobool89 = ($and88|0)==(0);
      if ($tobool89) {
       $p65$2 = $incdec$ptr69;
       while(1) {
        $23 = load1($search_done48);
        $tobool111 = ($23<<24>>24)==(0);
        if (!($tobool111)) {
         break L1;
        }
        $24 = load4($number_to_static_ptr);
        $cmp115 = ($24|0)==(1);
        if ($cmp115) {
         break L1;
        }
        __ZNK10__cxxabiv122__base_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib($p65$2,$info,$current_ptr,$path_below,$use_strcmp);
        $incdec$ptr120 = ((($p65$2)) + 8|0);
        $cmp121 = ($incdec$ptr120>>>0)<($add$ptr64>>>0);
        if ($cmp121) {
         $p65$2 = $incdec$ptr120;
        } else {
         break L1;
        }
       }
      } else {
       $p65$1 = $incdec$ptr69;
      }
      while(1) {
       $20 = load1($search_done48);
       $tobool93 = ($20<<24>>24)==(0);
       if (!($tobool93)) {
        break L1;
       }
       $21 = load4($number_to_static_ptr);
       $cmp97 = ($21|0)==(1);
       if ($cmp97) {
        $22 = load4($path_dst_ptr_to_static_ptr45);
        $cmp100 = ($22|0)==(1);
        if ($cmp100) {
         break L1;
        }
       }
       __ZNK10__cxxabiv122__base_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib($p65$1,$info,$current_ptr,$path_below,$use_strcmp);
       $incdec$ptr105 = ((($p65$1)) + 8|0);
       $cmp106 = ($incdec$ptr105>>>0)<($add$ptr64>>>0);
       if ($cmp106) {
        $p65$1 = $incdec$ptr105;
       } else {
        break L1;
       }
      }
     }
    } else {
     $p65$0 = $incdec$ptr69;
    }
    while(1) {
     $19 = load1($search_done48);
     $tobool80 = ($19<<24>>24)==(0);
     if (!($tobool80)) {
      break L1;
     }
     __ZNK10__cxxabiv122__base_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib($p65$0,$info,$current_ptr,$path_below,$use_strcmp);
     $incdec$ptr84 = ((($p65$0)) + 8|0);
     $cmp85 = ($incdec$ptr84>>>0)<($add$ptr64>>>0);
     if ($cmp85) {
      $p65$0 = $incdec$ptr84;
     } else {
      break L1;
     }
    }
   }
   $dst_ptr_leading_to_static_ptr = ((($info)) + 16|0);
   $2 = load4($dst_ptr_leading_to_static_ptr);
   $cmp = ($2|0)==($current_ptr|0);
   $path_dynamic_ptr_to_dst_ptr = ((($info)) + 32|0);
   if (!($cmp)) {
    $dst_ptr_not_leading_to_static_ptr = ((($info)) + 20|0);
    $3 = load4($dst_ptr_not_leading_to_static_ptr);
    $cmp5 = ($3|0)==($current_ptr|0);
    if (!($cmp5)) {
     store4($path_dynamic_ptr_to_dst_ptr,$path_below);
     $is_dst_type_derived_from_static_type = ((($info)) + 44|0);
     $4 = load4($is_dst_type_derived_from_static_type);
     $cmp11 = ($4|0)==(4);
     if ($cmp11) {
      break;
     }
     $5 = load4($__base_count);
     $add$ptr = (((($this)) + 16|0) + ($5<<3)|0);
     $found_our_static_ptr = ((($info)) + 52|0);
     $found_any_static_type = ((($info)) + 53|0);
     $does_dst_type_point_to_our_static_type$0$off0 = 0;$is_dst_type_derived_from_static_type13$0$off0 = 0;$p$0 = $arraydecay;
     L29: while(1) {
      $cmp16 = ($p$0>>>0)<($add$ptr>>>0);
      if (!($cmp16)) {
       $is_dst_type_derived_from_static_type13$2$off0 = $is_dst_type_derived_from_static_type13$0$off0;
       label = 18;
       break;
      }
      store1($found_our_static_ptr,0);
      store1($found_any_static_type,0);
      __ZNK10__cxxabiv122__base_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib($p$0,$info,$current_ptr,$current_ptr,1,$use_strcmp);
      $6 = load1($search_done48);
      $tobool18 = ($6<<24>>24)==(0);
      if (!($tobool18)) {
       $is_dst_type_derived_from_static_type13$2$off0 = $is_dst_type_derived_from_static_type13$0$off0;
       label = 18;
       break;
      }
      $7 = load1($found_any_static_type);
      $tobool22 = ($7<<24>>24)==(0);
      do {
       if ($tobool22) {
        $does_dst_type_point_to_our_static_type$1$off0 = $does_dst_type_point_to_our_static_type$0$off0;$is_dst_type_derived_from_static_type13$1$off0 = $is_dst_type_derived_from_static_type13$0$off0;
       } else {
        $8 = load1($found_our_static_ptr);
        $tobool25 = ($8<<24>>24)==(0);
        if ($tobool25) {
         $11 = load4($__flags);
         $and35 = $11 & 1;
         $tobool36 = ($and35|0)==(0);
         if ($tobool36) {
          $is_dst_type_derived_from_static_type13$2$off0 = 1;
          label = 18;
          break L29;
         } else {
          $does_dst_type_point_to_our_static_type$1$off0 = $does_dst_type_point_to_our_static_type$0$off0;$is_dst_type_derived_from_static_type13$1$off0 = 1;
          break;
         }
        }
        $9 = load4($path_dst_ptr_to_static_ptr45);
        $cmp27 = ($9|0)==(1);
        if ($cmp27) {
         label = 23;
         break L29;
        }
        $10 = load4($__flags);
        $and = $10 & 2;
        $tobool30 = ($and|0)==(0);
        if ($tobool30) {
         label = 23;
         break L29;
        } else {
         $does_dst_type_point_to_our_static_type$1$off0 = 1;$is_dst_type_derived_from_static_type13$1$off0 = 1;
        }
       }
      } while(0);
      $incdec$ptr = ((($p$0)) + 8|0);
      $does_dst_type_point_to_our_static_type$0$off0 = $does_dst_type_point_to_our_static_type$1$off0;$is_dst_type_derived_from_static_type13$0$off0 = $is_dst_type_derived_from_static_type13$1$off0;$p$0 = $incdec$ptr;
     }
     do {
      if ((label|0) == 18) {
       if (!($does_dst_type_point_to_our_static_type$0$off0)) {
        store4($dst_ptr_not_leading_to_static_ptr,$current_ptr);
        $number_to_dst_ptr = ((($info)) + 40|0);
        $12 = load4($number_to_dst_ptr);
        $add = (($12) + 1)|0;
        store4($number_to_dst_ptr,$add);
        $13 = load4($number_to_static_ptr);
        $cmp44 = ($13|0)==(1);
        if ($cmp44) {
         $14 = load4($path_dst_ptr_to_static_ptr45);
         $cmp46 = ($14|0)==(2);
         if ($cmp46) {
          store1($search_done48,1);
          if ($is_dst_type_derived_from_static_type13$2$off0) {
           label = 23;
           break;
          } else {
           $15 = 4;
           break;
          }
         }
        }
       }
       if ($is_dst_type_derived_from_static_type13$2$off0) {
        label = 23;
       } else {
        $15 = 4;
       }
      }
     } while(0);
     if ((label|0) == 23) {
      $15 = 3;
     }
     store4($is_dst_type_derived_from_static_type,$15);
     break;
    }
   }
   $cmp7 = ($path_below|0)==(1);
   if ($cmp7) {
    store4($path_dynamic_ptr_to_dst_ptr,1);
   }
  }
 } while(0);
 return;
}
function __ZNK10__cxxabiv121__vmi_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi($this,$info,$adjustedPtr,$path_below) {
 $this = $this|0;
 $info = $info|0;
 $adjustedPtr = $adjustedPtr|0;
 $path_below = $path_below|0;
 var $0 = 0, $1 = 0, $2 = 0, $__base_count = 0, $add$ptr = 0, $arraydecay = 0, $call = 0, $cmp = 0, $cmp7 = 0, $incdec$ptr = 0, $incdec$ptr6 = 0, $p$0 = 0, $search_done = 0, $static_type = 0, $tobool = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $static_type = ((($info)) + 8|0);
 $0 = load4($static_type);
 $call = (__ZN10__cxxabiv18is_equalEPKSt9type_infoS2_b($this,$0,0)|0);
 L1: do {
  if ($call) {
   __ZNK10__cxxabiv117__class_type_info24process_found_base_classEPNS_19__dynamic_cast_infoEPvi(0,$info,$adjustedPtr,$path_below);
  } else {
   $arraydecay = ((($this)) + 16|0);
   $__base_count = ((($this)) + 12|0);
   $1 = load4($__base_count);
   $add$ptr = (((($this)) + 16|0) + ($1<<3)|0);
   __ZNK10__cxxabiv122__base_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi($arraydecay,$info,$adjustedPtr,$path_below);
   $cmp = ($1|0)>(1);
   if ($cmp) {
    $incdec$ptr = ((($this)) + 24|0);
    $search_done = ((($info)) + 54|0);
    $p$0 = $incdec$ptr;
    while(1) {
     __ZNK10__cxxabiv122__base_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi($p$0,$info,$adjustedPtr,$path_below);
     $2 = load1($search_done);
     $tobool = ($2<<24>>24)==(0);
     if (!($tobool)) {
      break L1;
     }
     $incdec$ptr6 = ((($p$0)) + 8|0);
     $cmp7 = ($incdec$ptr6>>>0)<($add$ptr>>>0);
     if ($cmp7) {
      $p$0 = $incdec$ptr6;
     } else {
      break;
     }
    }
   }
  }
 } while(0);
 return;
}
function __ZNK10__cxxabiv122__base_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi($this,$info,$adjustedPtr,$path_below) {
 $this = $this|0;
 $info = $info|0;
 $adjustedPtr = $adjustedPtr|0;
 $path_below = $path_below|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $__offset_flags = 0, $add$ptr = 0, $add$ptr4 = 0, $and = 0, $and6 = 0, $cond = 0, $offset_to_base$0 = 0, $shr = 0, $tobool = 0, $tobool7 = 0, $vfn = 0, $vtable3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $__offset_flags = ((($this)) + 4|0);
 $0 = load4($__offset_flags);
 $shr = $0 >> 8;
 $and = $0 & 1;
 $tobool = ($and|0)==(0);
 if ($tobool) {
  $offset_to_base$0 = $shr;
 } else {
  $1 = load4($adjustedPtr);
  $add$ptr = (($1) + ($shr)|0);
  $2 = load4($add$ptr);
  $offset_to_base$0 = $2;
 }
 $3 = load4($this);
 $vtable3 = load4($3);
 $vfn = ((($vtable3)) + 28|0);
 $4 = load4($vfn);
 $add$ptr4 = (($adjustedPtr) + ($offset_to_base$0)|0);
 $and6 = $0 & 2;
 $tobool7 = ($and6|0)!=(0);
 $cond = $tobool7 ? $path_below : 2;
 FUNCTION_TABLE_viiii[$4 & 31]($3,$info,$add$ptr4,$cond);
 return;
}
function __ZNK10__cxxabiv122__base_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib($this,$info,$dst_ptr,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $dst_ptr = $dst_ptr|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $__offset_flags = 0, $add$ptr = 0, $add$ptr4 = 0, $and = 0, $and6 = 0, $cond = 0, $offset_to_base$0 = 0, $shr = 0, $tobool = 0, $tobool7 = 0, $vfn = 0, $vtable3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $__offset_flags = ((($this)) + 4|0);
 $0 = load4($__offset_flags);
 $shr = $0 >> 8;
 $and = $0 & 1;
 $tobool = ($and|0)==(0);
 if ($tobool) {
  $offset_to_base$0 = $shr;
 } else {
  $1 = load4($current_ptr);
  $add$ptr = (($1) + ($shr)|0);
  $2 = load4($add$ptr);
  $offset_to_base$0 = $2;
 }
 $3 = load4($this);
 $vtable3 = load4($3);
 $vfn = ((($vtable3)) + 20|0);
 $4 = load4($vfn);
 $add$ptr4 = (($current_ptr) + ($offset_to_base$0)|0);
 $and6 = $0 & 2;
 $tobool7 = ($and6|0)!=(0);
 $cond = $tobool7 ? $path_below : 2;
 FUNCTION_TABLE_viiiiii[$4 & 31]($3,$info,$dst_ptr,$add$ptr4,$cond,$use_strcmp);
 return;
}
function __ZNK10__cxxabiv122__base_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib($this,$info,$current_ptr,$path_below,$use_strcmp) {
 $this = $this|0;
 $info = $info|0;
 $current_ptr = $current_ptr|0;
 $path_below = $path_below|0;
 $use_strcmp = $use_strcmp|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $__offset_flags = 0, $add$ptr = 0, $add$ptr4 = 0, $and = 0, $and6 = 0, $cond = 0, $offset_to_base$0 = 0, $shr = 0, $tobool = 0, $tobool7 = 0, $vfn = 0, $vtable3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $__offset_flags = ((($this)) + 4|0);
 $0 = load4($__offset_flags);
 $shr = $0 >> 8;
 $and = $0 & 1;
 $tobool = ($and|0)==(0);
 if ($tobool) {
  $offset_to_base$0 = $shr;
 } else {
  $1 = load4($current_ptr);
  $add$ptr = (($1) + ($shr)|0);
  $2 = load4($add$ptr);
  $offset_to_base$0 = $2;
 }
 $3 = load4($this);
 $vtable3 = load4($3);
 $vfn = ((($vtable3)) + 24|0);
 $4 = load4($vfn);
 $add$ptr4 = (($current_ptr) + ($offset_to_base$0)|0);
 $and6 = $0 & 2;
 $tobool7 = ($and6|0)!=(0);
 $cond = $tobool7 ? $path_below : 2;
 FUNCTION_TABLE_viiiii[$4 & 31]($3,$info,$add$ptr4,$cond,$use_strcmp);
 return;
}
function runPostSets() {
}
function _memcpy(dest, src, num) {
    dest = dest|0; src = src|0; num = num|0;
    var ret = 0;
    var aligned_dest_end = 0;
    var block_aligned_dest_end = 0;
    var dest_end = 0;
    // Test against a benchmarked cutoff limit for when HEAPU8.set() becomes faster to use.
    if ((num|0) >=
      8192
    ) {
      return _emscripten_memcpy_big(dest|0, src|0, num|0)|0;
    }

    ret = dest|0;
    dest_end = (dest + num)|0;
    if ((dest&3) == (src&3)) {
      // The initial unaligned < 4-byte front.
      while (dest & 3) {
        if ((num|0) == 0) return ret|0;
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
        dest = (dest+1)|0;
        src = (src+1)|0;
        num = (num-1)|0;
      }
      aligned_dest_end = (dest_end & -4)|0;
      block_aligned_dest_end = (aligned_dest_end - 64)|0;
      while ((dest|0) <= (block_aligned_dest_end|0) ) {
        HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
        HEAP32[(((dest)+(4))>>2)]=((HEAP32[(((src)+(4))>>2)])|0);
        HEAP32[(((dest)+(8))>>2)]=((HEAP32[(((src)+(8))>>2)])|0);
        HEAP32[(((dest)+(12))>>2)]=((HEAP32[(((src)+(12))>>2)])|0);
        HEAP32[(((dest)+(16))>>2)]=((HEAP32[(((src)+(16))>>2)])|0);
        HEAP32[(((dest)+(20))>>2)]=((HEAP32[(((src)+(20))>>2)])|0);
        HEAP32[(((dest)+(24))>>2)]=((HEAP32[(((src)+(24))>>2)])|0);
        HEAP32[(((dest)+(28))>>2)]=((HEAP32[(((src)+(28))>>2)])|0);
        HEAP32[(((dest)+(32))>>2)]=((HEAP32[(((src)+(32))>>2)])|0);
        HEAP32[(((dest)+(36))>>2)]=((HEAP32[(((src)+(36))>>2)])|0);
        HEAP32[(((dest)+(40))>>2)]=((HEAP32[(((src)+(40))>>2)])|0);
        HEAP32[(((dest)+(44))>>2)]=((HEAP32[(((src)+(44))>>2)])|0);
        HEAP32[(((dest)+(48))>>2)]=((HEAP32[(((src)+(48))>>2)])|0);
        HEAP32[(((dest)+(52))>>2)]=((HEAP32[(((src)+(52))>>2)])|0);
        HEAP32[(((dest)+(56))>>2)]=((HEAP32[(((src)+(56))>>2)])|0);
        HEAP32[(((dest)+(60))>>2)]=((HEAP32[(((src)+(60))>>2)])|0);
        dest = (dest+64)|0;
        src = (src+64)|0;
      }
      while ((dest|0) < (aligned_dest_end|0) ) {
        HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
        dest = (dest+4)|0;
        src = (src+4)|0;
      }
    } else {
      // In the unaligned copy case, unroll a bit as well.
      aligned_dest_end = (dest_end - 4)|0;
      while ((dest|0) < (aligned_dest_end|0) ) {
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
        HEAP8[(((dest)+(1))>>0)]=((HEAP8[(((src)+(1))>>0)])|0);
        HEAP8[(((dest)+(2))>>0)]=((HEAP8[(((src)+(2))>>0)])|0);
        HEAP8[(((dest)+(3))>>0)]=((HEAP8[(((src)+(3))>>0)])|0);
        dest = (dest+4)|0;
        src = (src+4)|0;
      }
    }
    // The remaining unaligned < 4 byte tail.
    while ((dest|0) < (dest_end|0)) {
      HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
      dest = (dest+1)|0;
      src = (src+1)|0;
    }
    return ret|0;
}
function _memset(ptr, value, num) {
    ptr = ptr|0; value = value|0; num = num|0;
    var end = 0, aligned_end = 0, block_aligned_end = 0, value4 = 0;
    end = (ptr + num)|0;

    value = value & 0xff;
    if ((num|0) >= 67 /* 64 bytes for an unrolled loop + 3 bytes for unaligned head*/) {
      while ((ptr&3) != 0) {
        HEAP8[((ptr)>>0)]=value;
        ptr = (ptr+1)|0;
      }

      aligned_end = (end & -4)|0;
      block_aligned_end = (aligned_end - 64)|0;
      value4 = value | (value << 8) | (value << 16) | (value << 24);

      while((ptr|0) <= (block_aligned_end|0)) {
        HEAP32[((ptr)>>2)]=value4;
        HEAP32[(((ptr)+(4))>>2)]=value4;
        HEAP32[(((ptr)+(8))>>2)]=value4;
        HEAP32[(((ptr)+(12))>>2)]=value4;
        HEAP32[(((ptr)+(16))>>2)]=value4;
        HEAP32[(((ptr)+(20))>>2)]=value4;
        HEAP32[(((ptr)+(24))>>2)]=value4;
        HEAP32[(((ptr)+(28))>>2)]=value4;
        HEAP32[(((ptr)+(32))>>2)]=value4;
        HEAP32[(((ptr)+(36))>>2)]=value4;
        HEAP32[(((ptr)+(40))>>2)]=value4;
        HEAP32[(((ptr)+(44))>>2)]=value4;
        HEAP32[(((ptr)+(48))>>2)]=value4;
        HEAP32[(((ptr)+(52))>>2)]=value4;
        HEAP32[(((ptr)+(56))>>2)]=value4;
        HEAP32[(((ptr)+(60))>>2)]=value4;
        ptr = (ptr + 64)|0;
      }

      while ((ptr|0) < (aligned_end|0) ) {
        HEAP32[((ptr)>>2)]=value4;
        ptr = (ptr+4)|0;
      }
    }
    // The remaining bytes.
    while ((ptr|0) < (end|0)) {
      HEAP8[((ptr)>>0)]=value;
      ptr = (ptr+1)|0;
    }
    return (end-num)|0;
}
function _sbrk(increment) {
    increment = increment|0;
    var oldDynamicTop = 0;
    var oldDynamicTopOnChange = 0;
    var newDynamicTop = 0;
    var totalMemory = 0;
    increment = ((increment + 15) & -16)|0;
    oldDynamicTop = HEAP32[DYNAMICTOP_PTR>>2]|0;
    newDynamicTop = oldDynamicTop + increment | 0;

    if (((increment|0) > 0 & (newDynamicTop|0) < (oldDynamicTop|0)) // Detect and fail if we would wrap around signed 32-bit int.
      | (newDynamicTop|0) < 0) { // Also underflow, sbrk() should be able to be used to subtract.
      abortOnCannotGrowMemory()|0;
      ___setErrNo(12);
      return -1;
    }

    HEAP32[DYNAMICTOP_PTR>>2] = newDynamicTop;
    totalMemory = getTotalMemory()|0;
    if ((newDynamicTop|0) > (totalMemory|0)) {
      if ((enlargeMemory()|0) == 0) {
        HEAP32[DYNAMICTOP_PTR>>2] = oldDynamicTop;
        ___setErrNo(12);
        return -1;
      }
    }
    return oldDynamicTop|0;
}

  
function dynCall_ii(index,a1) {
  index = index|0;
  a1=a1|0;
  return FUNCTION_TABLE_ii[index&1](a1|0)|0;
}


function dynCall_iiii(index,a1,a2,a3) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0;
  return FUNCTION_TABLE_iiii[index&31](a1|0,a2|0,a3|0)|0;
}


function dynCall_vi(index,a1) {
  index = index|0;
  a1=a1|0;
  FUNCTION_TABLE_vi[index&31](a1|0);
}


function dynCall_viiii(index,a1,a2,a3,a4) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0;
  FUNCTION_TABLE_viiii[index&31](a1|0,a2|0,a3|0,a4|0);
}


function dynCall_viiiii(index,a1,a2,a3,a4,a5) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0;
  FUNCTION_TABLE_viiiii[index&31](a1|0,a2|0,a3|0,a4|0,a5|0);
}


function dynCall_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0; a4=a4|0; a5=a5|0; a6=a6|0;
  FUNCTION_TABLE_viiiiii[index&31](a1|0,a2|0,a3|0,a4|0,a5|0,a6|0);
}

function b0(p0) {
 p0 = p0|0; nullFunc_ii(0);return 0;
}
function b1(p0,p1,p2) {
 p0 = p0|0;p1 = p1|0;p2 = p2|0; nullFunc_iiii(1);return 0;
}
function b2(p0) {
 p0 = p0|0; nullFunc_vi(2);
}
function b3(p0,p1,p2,p3) {
 p0 = p0|0;p1 = p1|0;p2 = p2|0;p3 = p3|0; nullFunc_viiii(3);
}
function b4(p0,p1,p2,p3,p4) {
 p0 = p0|0;p1 = p1|0;p2 = p2|0;p3 = p3|0;p4 = p4|0; nullFunc_viiiii(4);
}
function b5(p0,p1,p2,p3,p4,p5) {
 p0 = p0|0;p1 = p1|0;p2 = p2|0;p3 = p3|0;p4 = p4|0;p5 = p5|0; nullFunc_viiiiii(5);
}

// EMSCRIPTEN_END_FUNCS
var FUNCTION_TABLE_ii = [b0,___stdio_close];
var FUNCTION_TABLE_iiii = [b1,b1,___stdout_write,___stdio_seek,b1,b1,b1,b1,__ZNK10__cxxabiv117__class_type_info9can_catchEPKNS_16__shim_type_infoERPv,b1,b1,b1,b1,b1,b1,b1,b1,__ZNK10__cxxabiv123__fundamental_type_info9can_catchEPKNS_16__shim_type_infoERPv,b1,b1,b1,b1,___stdio_write,b1,b1,b1,b1,b1,b1
,b1,b1,b1];
var FUNCTION_TABLE_vi = [b2,b2,b2,b2,__ZN10__cxxabiv116__shim_type_infoD2Ev,__ZN10__cxxabiv117__class_type_infoD0Ev,__ZNK10__cxxabiv116__shim_type_info5noop1Ev,__ZNK10__cxxabiv116__shim_type_info5noop2Ev,b2,b2,b2,b2,__ZN10__cxxabiv120__si_class_type_infoD0Ev,b2,b2,b2,__ZN10__cxxabiv123__fundamental_type_infoD0Ev,b2,__ZN10__cxxabiv121__vmi_class_type_infoD0Ev,b2,b2,b2,b2,b2,b2,b2,b2,b2,b2
,b2,b2,b2];
var FUNCTION_TABLE_viiii = [b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,b3,__ZNK10__cxxabiv117__class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi,b3,b3,b3,__ZNK10__cxxabiv120__si_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi,b3,b3,b3,b3,b3,__ZNK10__cxxabiv121__vmi_class_type_info27has_unambiguous_public_baseEPNS_19__dynamic_cast_infoEPvi,b3,b3,b3,b3,b3,b3,b3
,b3,b3,b3];
var FUNCTION_TABLE_viiiii = [b4,b4,b4,b4,b4,b4,b4,b4,b4,b4,__ZNK10__cxxabiv117__class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib,b4,b4,b4,__ZNK10__cxxabiv120__si_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib,b4,b4,b4,b4,b4,__ZNK10__cxxabiv121__vmi_class_type_info16search_below_dstEPNS_19__dynamic_cast_infoEPKvib,b4,b4,b4,b4,b4,b4,b4,b4
,b4,b4,b4];
var FUNCTION_TABLE_viiiiii = [b5,b5,b5,b5,b5,b5,b5,b5,b5,__ZNK10__cxxabiv117__class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib,b5,b5,b5,__ZNK10__cxxabiv120__si_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib,b5,b5,b5,b5,b5,__ZNK10__cxxabiv121__vmi_class_type_info16search_above_dstEPNS_19__dynamic_cast_infoEPKvS4_ib,b5,b5,b5,b5,b5,b5,b5,b5,b5
,b5,b5,b5];

  return { __GLOBAL__sub_I_bind_cpp: __GLOBAL__sub_I_bind_cpp, ___errno_location: ___errno_location, ___getTypeName: ___getTypeName, _emscripten_get_global_libc: _emscripten_get_global_libc, _emscripten_replace_memory: _emscripten_replace_memory, _fflush: _fflush, _free: _free, _malloc: _malloc, _memcpy: _memcpy, _memset: _memset, _sbrk: _sbrk, dynCall_ii: dynCall_ii, dynCall_iiii: dynCall_iiii, dynCall_vi: dynCall_vi, dynCall_viiii: dynCall_viiii, dynCall_viiiii: dynCall_viiiii, dynCall_viiiiii: dynCall_viiiiii, establishStackSpace: establishStackSpace, getTempRet0: getTempRet0, runPostSets: runPostSets, setTempRet0: setTempRet0, setThrew: setThrew, stackAlloc: stackAlloc, stackRestore: stackRestore, stackSave: stackSave };
})
;