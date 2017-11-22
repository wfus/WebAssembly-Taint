/*
 * fulladd.c
 *
 * A simple test to try to compile to WASM, and expose a specific function
 * to the V8 JavaScript engine. We will be using emscripten to convert
 * this C file to WebAssembly.
 *
 */

#include <stdint.h>

uint32_t test_I32Add(uint32_t a, uint32_t b) {
	 return a + b;
}


uint32_t test_I32Sub(uint32_t a, uint32_t b) {
	 return a - b;
}


uint32_t test_I32Mul(uint32_t a, uint32_t b) {
	 return a * b;
}


uint32_t test_I32And(uint32_t a, uint32_t b) {
	 return a & b;
}


uint32_t test_I32Ior(uint32_t a, uint32_t b) {
	 return a | b;
}


uint32_t test_I32Xor(uint32_t a, uint32_t b) {
	 return a ^ b;
}


uint32_t test_I32Eq(uint32_t a, uint32_t b) {
	 return a == b;
}


uint32_t test_I32Ne(uint32_t a, uint32_t b) {
	 return a != b;
}


uint32_t test_I32LtU(uint32_t a, uint32_t b) {
	 return a < b;
}


uint32_t test_I32LeU(uint32_t a, uint32_t b) {
	 return a <= b;
}


uint32_t test_I32GtU(uint32_t a, uint32_t b) {
	 return a > b;
}


uint32_t test_I32GeU(uint32_t a, uint32_t b) {
	 return a >= b;
}


int32_t test_I32LtS(int32_t a, int32_t b) {
	 return a < b;
}


int32_t test_I32LeS(int32_t a, int32_t b) {
	 return a <= b;
}


int32_t test_I32GtS(int32_t a, int32_t b) {
	 return a > b;
}


int32_t test_I32GeS(int32_t a, int32_t b) {
	 return a >= b;
}


uint64_t test_I64Add(uint64_t a, uint64_t b) {
	 return a + b;
}


uint64_t test_I64Sub(uint64_t a, uint64_t b) {
	 return a - b;
}


uint64_t test_I64Mul(uint64_t a, uint64_t b) {
	 return a * b;
}


uint64_t test_I64And(uint64_t a, uint64_t b) {
	 return a & b;
}


uint64_t test_I64Ior(uint64_t a, uint64_t b) {
	 return a | b;
}


uint64_t test_I64Xor(uint64_t a, uint64_t b) {
	 return a ^ b;
}


uint64_t test_I64Eq(uint64_t a, uint64_t b) {
	 return a == b;
}


uint64_t test_I64Ne(uint64_t a, uint64_t b) {
	 return a != b;
}


uint64_t test_I64LtU(uint64_t a, uint64_t b) {
	 return a < b;
}


uint64_t test_I64LeU(uint64_t a, uint64_t b) {
	 return a <= b;
}


uint64_t test_I64GtU(uint64_t a, uint64_t b) {
	 return a > b;
}


uint64_t test_I64GeU(uint64_t a, uint64_t b) {
	 return a >= b;
}


int64_t test_I64LtS(int64_t a, int64_t b) {
	 return a < b;
}


int64_t test_I64LeS(int64_t a, int64_t b) {
	 return a <= b;
}


int64_t test_I64GtS(int64_t a, int64_t b) {
	 return a > b;
}


int64_t test_I64GeS(int64_t a, int64_t b) {
	 return a >= b;
}


float test_F32Add(float a, float b) {
	 return a + b;
}


float test_F32Sub(float a, float b) {
	 return a - b;
}


float test_F32Eq(float a, float b) {
	 return a == b;
}


float test_F32Ne(float a, float b) {
	 return a != b;
}


float test_F32Lt(float a, float b) {
	 return a < b;
}


float test_F32Le(float a, float b) {
	 return a <= b;
}


float test_F32Gt(float a, float b) {
	 return a > b;
}


float test_F32Ge(float a, float b) {
	 return a >= b;
}


double test_F64Add(double a, double b) {
	 return a + b;
}


double test_F64Sub(double a, double b) {
	 return a - b;
}


double test_F64Eq(double a, double b) {
	 return a == b;
}


double test_F64Ne(double a, double b) {
	 return a != b;
}


double test_F64Lt(double a, double b) {
	 return a < b;
}


double test_F64Le(double a, double b) {
	 return a <= b;
}


double test_F64Gt(double a, double b) {
	 return a > b;
}


double test_F64Ge(double a, double b) {
	 return a >= b;
}


float test_F32Mul(float a, float b) {
	 return a * b;
}


double test_F64Mul(double a, double b) {
	 return a * b;
}


float test_F32Div(float a, float b) {
	 return a / b;
}


double test_F64Div(double a, double b) {
	 return a / b;
}



