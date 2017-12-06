import re
import random

uint32_t = "uint32_t"
uint64_t = "uint64_t"
int32_t = "int32_t"
int64_t = "int64_t"
float = "float"
double = "double"

function_prefix = "test"
print_prefix = "print("

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
        rand3 = random.randint(1, 10000)
        rand4 = random.randint(1, 10000)
        teststr += "{}exports.{}_{}".format(print_prefix, function_prefix, name)
        teststr += "({}, {}, {}, {}));\n".format(rand1, rand2, rand3, rand4)
    return teststr

def unop_to_javascript(binop_lst):
    teststr = ""
    INT_MAX = (1 << 31) - 1
    for name, _, _ in binop_lst:
        rand1 = random.randint(1, 10)
        rand2 = random.randint(1, 10000)
        teststr += "{}exports.{}_{}".format(print_prefix, function_prefix, name)
        teststr += "({}, {}));\n".format(rand1, rand2)
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
]


other_binop_list = [
    ("F32Min", float, "std::min"),
    ("F32Max", float, "std::max"),
    ("F64Min", double, "std::min"),
    ("F64Max", double, "std::max"),
]

other_unop_list = [
    ("F32Abs", float, "std::abs"),
    ("F32Ceil", float, "ceilf"),
    ("F32Floor", float, "floorf"),
    ("F32Trunc", float, "truncf"),
    ("F32NearestInt", float, "nearbyintf"),
    ("F64Abs", double, "std::abs"),
    ("F64Ceil", double, "ceil"),
    ("F64Floor", double, "floor"),
    ("F64Trunc", double, "trunc"),
    ("F64NearestInt", double, "nearbyint"),
    ("I32SConvertF32", float, "static_cast<int32_t>"),
    ("I32SConvertF64", double, "static_cast<int32_t>"),
    ("I32UConvertF32", float, "static_cast<uint32_t>"),
    ("I32UConvertF64", double, "static_cast<uint32_t>"),
    ("F32SConvertI32", int32_t, "static_cast<float>"),
    ("F32UConvertI32", uint32_t, "static_cast<float>"),
    ("F32ConvertF64", double, "static_cast<float>"),
    ("F32ReinterpretI32", int32_t, "static_cast<float>"),
    ("F64SConvertI32", int32_t, "static_cast<double>"),
    ("F64UConvertI32", uint32_t, "static_cast<double>"),
    ("F64SConvertI64", int64_t, "static_cast<double>"),
    ("F64UConvertI64", uint64_t, "static_cast<double>"),
    ("F64ConvertF32", float, "static_cast<double>"),
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
