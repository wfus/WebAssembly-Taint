/*
 * fulladd.c
 *
 * A simple test to try to compile to WASM, and expose a specific function
 * to the V8 JavaScript engine. We will be using emscripten to convert
 * this C file to WebAssembly.
 *
 */

#include <math.h>
#include <algorithm>
#include <functional>

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


int32_t test_I32DivS(int32_t a, int32_t b) {
    return a / b;
}


uint32_t test_I32DivU(uint32_t a, uint32_t b) {
    return a / b;
}


int32_t test_I32RemS(int32_t a, int32_t b) {
    return a % b;
}


uint32_t test_I32RemU(uint32_t a, uint32_t b) {
    return a % b;
}


uint32_t test_I32Shl(uint32_t a, uint32_t b) {
    return a << b;
}


uint32_t test_I32ShrU(uint32_t a, uint32_t b) {
    return a >> b;
}


int32_t test_I32ShrS(int32_t a, int32_t b) {
    return a >> b;
}


float test_F32Min(float a, float b) {
    return std::min(a,b);
}


float test_F32Max(float a, float b) {
    return std::max(a,b);
}


double test_F64Min(double a, double b) {
    return std::min(a,b);
}


double test_F64Max(double a, double b) {
    return std::max(a,b);
}


float test_F32Abs(float a) {
    return std::abs(a);
}


float test_F32Ceil(float a) {
    return ceilf(a);
}


float test_F32Floor(float a) {
    return floorf(a);
}


float test_F32Trunc(float a) {
    return truncf(a);
}


float test_F32NearestInt(float a) {
    return nearbyintf(a);
}


double test_F64Abs(double a) {
    return std::abs(a);
}


double test_F64Ceil(double a) {
    return ceil(a);
}


double test_F64Floor(double a) {
    return floor(a);
}


double test_F64Trunc(double a) {
    return trunc(a);
}


double test_F64NearestInt(double a) {
    return nearbyint(a);
}


float test_I32SConvertF32(float a) {
    return static_cast<int32_t>(a);
}


double test_I32SConvertF64(double a) {
    return static_cast<int32_t>(a);
}


float test_I32UConvertF32(float a) {
    return static_cast<uint32_t>(a);
}


double test_I32UConvertF64(double a) {
    return static_cast<uint32_t>(a);
}


int32_t test_F32SConvertI32(int32_t a) {
    return static_cast<float>(a);
}


uint32_t test_F32UConvertI32(uint32_t a) {
    return static_cast<float>(a);
}


double test_F32ConvertF64(double a) {
    return static_cast<float>(a);
}


int32_t test_F32ReinterpretI32(int32_t a) {
    return static_cast<float>(a);
}


int32_t test_F64SConvertI32(int32_t a) {
    return static_cast<double>(a);
}


uint32_t test_F64UConvertI32(uint32_t a) {
    return static_cast<double>(a);
}


int64_t test_F64SConvertI64(int64_t a) {
    return static_cast<double>(a);
}


uint64_t test_F64UConvertI64(uint64_t a) {
    return static_cast<double>(a);
}


float test_F64ConvertF32(float a) {
    return static_cast<double>(a);
}


float test_F32Sqrt(float a) {
    return sqrtf(a);
}


double test_F64Sqrt(double a) {
    return sqrt(a);
}
