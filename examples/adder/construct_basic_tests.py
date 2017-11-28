import re
import random

uint32_t = "uint32_t"
uint64_t = "uint64_t"
int32_t = "int32_t"
int64_t = "int64_t"
float = "float"
double = "double"

function_prefix = "test"
print_prefix = "console.log("

def simple_binop_to_cpp(binop_triple):
	name, ctype, op = binop_triple
	func = "{} {}_{}({} a, {} b) {{\n".format(ctype, function_prefix, name, ctype, ctype)
	func += "\t return a {} b;\n".format(op)
	func += "}\n"
	func += "\n"
	func += "\n"
	return func

def other_binop_to_cpp(binop_triple):
    name, ctype, op = binop_triple
    func = "{} {}_{}({} a, {} b) {{\n".format(ctype, function_prefix, name, ctype, ctype)
    func += "\t return {}(a,b);\n".format(op)
    func += "}\n"
    func += "\n"
    func += "\n"
    return func

def other_unop_to_cpp(binop_triple):
    name, ctype, op = binop_triple
    func = "{} {}_{}({} a) {{\n".format(ctype, function_prefix, name, ctype)
    func += "\t return {}(a);\n".format(op)
    func += "}\n"
    func += "\n"
    func += "\n"
    return func

def binop_to_javascript(binop_lst):
	teststr = ""
	INT_MAX = (1 << 31) - 1
	for name, _, _ in binop_lst:
		rand1 = random.randint(1, 10)
		rand2 = random.randint(1, 10)
		teststr += "{}exports.{}_{}".format(print_prefix, function_prefix, name)
		teststr += "({}, {}));\n".format(rand1, rand2)
	return teststr

def unop_to_javascript(binop_lst):
    teststr = ""
    INT_MAX = (1 << 31) - 1
    for name, _, _ in binop_lst:
        rand = random.randint(1, 10)
        teststr += "{}exports.{}_{}".format(print_prefix, function_prefix, name)
        teststr += "({}));\n".format(rand)
    return teststr


simple_binop_list = [
    ("I32Add", uint32_t, "+"),
    ("I32Sub", uint32_t, "-"),
    ("I32Mul", uint32_t, "*"),
    ("I32And", uint32_t, "&"),
    ("I32Ior", uint32_t, "|"),
    ("I32Xor", uint32_t, "^"),
    ("I32Eq", uint32_t, "=="),
    ("I32Ne", uint32_t, "!="),
    ("I32LtU", uint32_t, "<"),
    ("I32LeU", uint32_t, "<="),
    ("I32GtU", uint32_t, ">"),
    ("I32GeU", uint32_t, ">="),
    ("I32LtS", int32_t, "<") ,
    ("I32LeS", int32_t, "<="),
    ("I32GtS", int32_t, ">") ,
    ("I32GeS", int32_t, ">="),
    #("I64Add", uint64_t, "+"),
    #("I64Sub", uint64_t, "-"),
    #("I64Mul", uint64_t, "*"),
    #("I64And", uint64_t, "&"),
    #("I64Ior", uint64_t, "|"),
    #("I64Xor", uint64_t, "^"),
    #("I64Eq", uint64_t, "=="),
    #("I64Ne", uint64_t, "!="),
    #("I64LtU", uint64_t, "<"),
    #("I64LeU", uint64_t, "<="),
    #("I64GtU", uint64_t, ">"),
    #("I64GeU", uint64_t, ">="),
    #("I64LtS", int64_t, "<") ,
    #("I64LeS", int64_t, "<="),
    #("I64GtS", int64_t, ">") ,
    #("I64GeS", int64_t, ">="),
    ("F32Add", float, "+")   ,
    ("F32Sub", float, "-")   ,
    ("F32Eq", float, "==")   ,
    ("F32Ne", float, "!=")   ,
    ("F32Lt", float, "<")    ,
    ("F32Le", float, "<=")   ,
    ("F32Gt", float, ">")    ,
    ("F32Ge", float, ">=")   ,
    ("F64Add", double, "+")  ,
    ("F64Sub", double, "-")  ,
    ("F64Eq", double, "==")  ,
    ("F64Ne", double, "!=")  ,
    ("F64Lt", double, "<")   ,
    ("F64Le", double, "<=")  ,
    ("F64Gt", double, ">")   ,
    ("F64Ge", double, ">=")  ,
    ("F32Mul", float, "*")   ,
    ("F64Mul", double, "*")  ,
    ("F32Div", float, "/")   ,
    ("F64Div", double, "/")  ,
    ("I32DivS", int32_t, "/"),
    ("I32DivU", uint32_t, "/"),
    ("I32RemS", int32_t, "%"),
    ("I32RemU", uint32_t, "%"),
    ("I32Shl", uint32_t, "<<"),
    ("I32ShrU", uint32_t, ">>"),
    ("I32ShrS", int32_t,">>"),
    #("I64DivS", int64_t, "/"),
    #("I64DivU", uint64_t, "/"),
    #("I64RemS", int64_t, "%"),
    #("I64RemU", uint64_t, "%"),
    #("I64Shl", uint64_t, "<<"),
    #("I64ShrU", uint64_t,">>"),
    #("I64ShrS", int64_t,">>")
]


other_binop_list = [
    #("I32Ror", int32_t)
    #("I32Rol", int32_t),
    #("I64Ror", int64_t),
    #("I64Rol", int64_t),
    ("F32Min", float, "std::min"),
    ("F32Max", float, "std::max"),
    ("F64Min", double, "std::min"),
    ("F64Max", double, "std::max"),
    #("I32AsmjsDivS", int32_t),
    #("I32AsmjsDivU", uint32_t),
    #("I32AsmjsRemS", int32_t),
    #("I32AsmjsRemU", uint32_t),
    #("F32CopySign", Float32),
    #("F64CopySign", Float64)
]

other_unop_list = [
    #("I32Clz", uint32_t),
    #("I32Ctz", uint32_t),
    #("I32Popcnt", uint32_t),
    #("I32Eqz", uint32_t),
    #("I64Clz", uint64_t),
    #("I64Ctz", uint64_t),
    #("I64Popcnt", uint64_t),
    #("I64Eqz", uint64_t),
    ("F32Abs", float, "std::abs"),
    #("F32Neg", float),
    ("F32Ceil", float, "ceilf"),
    ("F32Floor", float, "floorf"),
    ("F32Trunc", float, "truncf"),
    ("F32NearestInt", float, "nearbyintf"),
    ("F64Abs", double, "std::abs"),
    #("F64Neg", double),
    ("F64Ceil", double, "ceil"),
    ("F64Floor", double, "floor"),
    ("F64Trunc", double, "trunc"),
    ("F64NearestInt", double, "nearbyint"),
    ("I32SConvertF32", float, "static_cast<int32_t>"),
    ("I32SConvertF64", double, "static_cast<int32_t>"),
    ("I32UConvertF32", float, "static_cast<uint32_t>"),
    ("I32UConvertF64", double, "static_cast<uint32_t>"),
    #("I32ConvertI64", int64_t),
    #("I64SConvertF32", float),
    #("I64SConvertF64", double),
    #("I64UConvertF32", float),
    #("I64UConvertF64", double),
    #("I64SConvertI32", int32_t),
    #("I64UConvertI32", uint32_t),
    ("F32SConvertI32", int32_t, "static_cast<float>"),
    ("F32UConvertI32", uint32_t, "static_cast<float>"),
    #("F32SConvertI64", int64_t),
    #("F32UConvertI64", uint64_t),
    ("F32ConvertF64", double, "static_cast<float>"),
    ("F32ReinterpretI32", int32_t, "static_cast<float>"),
    ("F64SConvertI32", int32_t, "static_cast<double>"),
    ("F64UConvertI32", uint32_t, "static_cast<double>"),
    ("F64SConvertI64", int64_t, "static_cast<double>"),
    ("F64UConvertI64", uint64_t, "static_cast<double>"),
    ("F64ConvertF32", float, "static_cast<double>"),
    #("F64ReinterpretI64", int64_t),
    #("I32AsmjsSConvertF32", float),
    #("I32AsmjsUConvertF32", float),
    #("I32AsmjsSConvertF64", double),
    #("I32AsmjsUConvertF64", double),
    ("F32Sqrt", float, "sqrtf"),
    ("F64Sqrt", double, "sqrt")
]

if __name__ == "__main__":
    prog = ""
    for binop in simple_binop_list:
        prog += simple_binop_to_cpp(binop)
    for binop in other_binop_list:
        prog += other_binop_to_cpp(binop)
    for unop in other_unop_list:
        prog += other_unop_to_cpp(unop)
    prog += binop_to_javascript(simple_binop_list)
    prog += binop_to_javascript(other_binop_list)
    prog += unop_to_javascript(other_unop_list)
    print(prog)
