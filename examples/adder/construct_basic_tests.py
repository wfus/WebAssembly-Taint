import re



Simple_Binops = [
    (I32Add, uint32_t, "+"),
    (I32Sub, uint32_t, "-"),
    (I32Mul, uint32_t, "*"),
    (I32And, uint32_t, "&"),
    (I32Ior, uint32_t, "|"),
    (I32Xor, uint32_t, "^"),
    (I32Eq, uint32_t, "=="),
    (I32Ne, uint32_t, "!="),
    (I32LtU, uint32_t, "<"),
    (I32LeU, uint32_t, "<="),       
    (I32GtU, uint32_t, ">"),
    (I32GeU, uint32_t, ">="),       
    (I32LtS, int32_t, "<") ,
    (I32LeS, int32_t, "<="),
    (I32GtS, int32_t, ">") ,
    (I32GeS, int32_t, ">="),
    (I64Add, uint64_t, "+"),
    (I64Sub, uint64_t, "-"),
    (I64Mul, uint64_t, "*"),
    (I64And, uint64_t, "&"),
    (I64Ior, uint64_t, "|"),
    (I64Xor, uint64_t, "^"),
    (I64Eq, uint64_t, "=="),
    (I64Ne, uint64_t, "!="),
    (I64LtU, uint64_t, "<"),
    (I64LeU, uint64_t, "<="),       
    (I64GtU, uint64_t, ">"),
    (I64GeU, uint64_t, ">="),       
    (I64LtS, int64_t, "<") ,
    (I64LeS, int64_t, "<="),
    (I64GtS, int64_t, ">") ,
    (I64GeS, int64_t, ">="),
    (F32Add, float, "+")   ,
    (F32Sub, float, "-")   ,
    (F32Eq, float, "==")   ,
    (F32Ne, float, "!=")   ,
    (F32Lt, float, "<")    ,
    (F32Le, float, "<=")   ,
    (F32Gt, float, ">")    ,
    (F32Ge, float, ">=")   ,
    (F64Add, double, "+")  ,
    (F64Sub, double, "-")  ,
    (F64Eq, double, "==")  ,
    (F64Ne, double, "!=")  ,
    (F64Lt, double, "<")   ,
    (F64Le, double, "<=")  ,
    (F64Gt, double, ">")   ,
    (F64Ge, double, ">=")  ,
    (F32Mul, float, "*")   ,
    (F64Mul, double, "*")  ,
    (F32Div, float, "/")   ,
    (F64Div, double, "/")
]



"""
#define FOREACH_SIMPLE_BINOP(V) \
  V(I32Add, uint32_t, +)        \
  V(I32Sub, uint32_t, -)        \
  V(I32Mul, uint32_t, *)        \
  V(I32And, uint32_t, &)        \
  V(I32Ior, uint32_t, |)        \
  V(I32Xor, uint32_t, ^)        \
  V(I32Eq, uint32_t, ==)        \
  V(I32Ne, uint32_t, !=)        \
  V(I32LtU, uint32_t, <)        \
  V(I32LeU, uint32_t, <=)       \
  V(I32GtU, uint32_t, >)        \
  V(I32GeU, uint32_t, >=)       \
  V(I32LtS, int32_t, <)         \
  V(I32LeS, int32_t, <=)        \
  V(I32GtS, int32_t, >)         \
  V(I32GeS, int32_t, >=)        \
  V(I64Add, uint64_t, +)        \
  V(I64Sub, uint64_t, -)        \
  V(I64Mul, uint64_t, *)        \
  V(I64And, uint64_t, &)        \
  V(I64Ior, uint64_t, |)        \
  V(I64Xor, uint64_t, ^)        \
  V(I64Eq, uint64_t, ==)        \
  V(I64Ne, uint64_t, !=)        \
  V(I64LtU, uint64_t, <)        \
  V(I64LeU, uint64_t, <=)       \
  V(I64GtU, uint64_t, >)        \
  V(I64GeU, uint64_t, >=)       \
  V(I64LtS, int64_t, <)         \
  V(I64LeS, int64_t, <=)        \
  V(I64GtS, int64_t, >)         \
  V(I64GeS, int64_t, >=)        \
  V(F32Add, float, +)           \
  V(F32Sub, float, -)           \
  V(F32Eq, float, ==)           \
  V(F32Ne, float, !=)           \
  V(F32Lt, float, <)            \
  V(F32Le, float, <=)           \
  V(F32Gt, float, >)            \
  V(F32Ge, float, >=)           \
  V(F64Add, double, +)          \
  V(F64Sub, double, -)          \
  V(F64Eq, double, ==)          \
  V(F64Ne, double, !=)          \
  V(F64Lt, double, <)           \
  V(F64Le, double, <=)          \
  V(F64Gt, double, >)           \
  V(F64Ge, double, >=)          \
  V(F32Mul, float, *)           \
  V(F64Mul, double, *)          \
  V(F32Div, float, /)           \
  V(F64Div, double, /)

#define FOREACH_OTHER_BINOP(V) \
  V(I32DivS, int32_t)          \
  V(I32DivU, uint32_t)         \
  V(I32RemS, int32_t)          \
  V(I32RemU, uint32_t)         \
  V(I32Shl, uint32_t)          \
  V(I32ShrU, uint32_t)         \
  V(I32ShrS, int32_t)          \
  V(I64DivS, int64_t)          \
  V(I64DivU, uint64_t)         \
  V(I64RemS, int64_t)          \
  V(I64RemU, uint64_t)         \
  V(I64Shl, uint64_t)          \
  V(I64ShrU, uint64_t)         \
  V(I64ShrS, int64_t)          \
  V(I32Ror, int32_t)           \
  V(I32Rol, int32_t)           \
  V(I64Ror, int64_t)           \
  V(I64Rol, int64_t)           \
  V(F32Min, float)             \
  V(F32Max, float)             \
  V(F64Min, double)            \
  V(F64Max, double)            \
  V(I32AsmjsDivS, int32_t)     \
  V(I32AsmjsDivU, uint32_t)    \
  V(I32AsmjsRemS, int32_t)     \
  V(I32AsmjsRemU, uint32_t)    \
  V(F32CopySign, Float32)      \
  V(F64CopySign, Float64)

#define FOREACH_OTHER_UNOP(V)    \
  V(I32Clz, uint32_t)            \
  V(I32Ctz, uint32_t)            \
  V(I32Popcnt, uint32_t)         \
  V(I32Eqz, uint32_t)            \
  V(I64Clz, uint64_t)            \
  V(I64Ctz, uint64_t)            \
  V(I64Popcnt, uint64_t)         \
  V(I64Eqz, uint64_t)            \
  V(F32Abs, Float32)             \
  V(F32Neg, Float32)             \
  V(F32Ceil, float)              \
  V(F32Floor, float)             \
  V(F32Trunc, float)             \
  V(F32NearestInt, float)        \
  V(F64Abs, Float64)             \
  V(F64Neg, Float64)             \
  V(F64Ceil, double)             \
  V(F64Floor, double)            \
  V(F64Trunc, double)            \
  V(F64NearestInt, double)       \
  V(I32SConvertF32, float)       \
  V(I32SConvertF64, double)      \
  V(I32UConvertF32, float)       \
  V(I32UConvertF64, double)      \
  V(I32ConvertI64, int64_t)      \
  V(I64SConvertF32, float)       \
  V(I64SConvertF64, double)      \
  V(I64UConvertF32, float)       \
  V(I64UConvertF64, double)      \
  V(I64SConvertI32, int32_t)     \
  V(I64UConvertI32, uint32_t)    \
  V(F32SConvertI32, int32_t)     \
  V(F32UConvertI32, uint32_t)    \
  V(F32SConvertI64, int64_t)     \
  V(F32UConvertI64, uint64_t)    \
  V(F32ConvertF64, double)       \
  V(F32ReinterpretI32, int32_t)  \
  V(F64SConvertI32, int32_t)     \
  V(F64UConvertI32, uint32_t)    \
  V(F64SConvertI64, int64_t)     \
  V(F64UConvertI64, uint64_t)    \
  V(F64ConvertF32, float)        \
  V(F64ReinterpretI64, int64_t)  \
  V(I32AsmjsSConvertF32, float)  \
  V(I32AsmjsUConvertF32, float)  \
  V(I32AsmjsSConvertF64, double) \
  V(I32AsmjsUConvertF64, double) \
  V(F32Sqrt, float)              \
  V(F64Sqrt, double)"""
