#ifndef __WASM_TAINT_H_IMPORTED
#define __WASM_TAINT_H_IMPORTED


#define TAINT_EMAIL     0x1
#define TAINT_CCINFO    0x2
#define TAINT_PASSWORD  0x4
#define TAINT_SWAP      0x8
#define TAINT_TEMP      0x10
#define TAINT_DRUGS     0x20
#define TAINT_MEDICAL   0x40
#define TAINT_OTHER     0x80

#define DEBUGGING_DIR "/tmp/wasm.log"
#define STRING(s) #s

#include "wasm-value.h"

namespace taintlog
{
    void print_bytes_of_object(v8::internal::wasm::WasmValue *wasm, const char *wtype);
    void log_binop(v8::internal::wasm::WasmValue l, v8::internal::wasm::WasmValue r,
                   v8::internal::wasm::WasmValue res, const char* wtype, const char* wop);
    void log_unop(v8::internal::wasm::WasmValue v, v8::internal::wasm::WasmValue res, const char* wtype,
                  const char* wop);
    void log_string(const char* str);
}


#endif




