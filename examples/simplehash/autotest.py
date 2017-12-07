import os

program_string = \
"""
const memory = new WebAssembly.Memory({{initial:256, maximum:256}});
const env = {{
	\'abortStackOverflow\': _ => {{throw new Error(\'overflow\');}},
	\'table\': new WebAssembly.Table({{initial: 0, maximum: 0, element: \'anyfunc\'}}),          
	\'tableBase\': 0,  
	\'memory\': memory,
	\'memoryBase\': 1024,
	\'STACKTOP\': 0, 
	\'STACK_MAX\': memory.buffer.byteLength,
}};
const importObject = {{env}};

const bytes = new Uint8Array(
	[0,97,115,109,1,0,0,0,1,147,128,128,128,0,3,96,3,127,127,127,
	1,127,96,1,127,1,127,96,2,127,127,1,127,3,132,128,128,128,0,3,
	0,1,2,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,
	0,1,6,129,128,128,128,0,0,7,163,128,128,128,0,4,6,109,101,109,
	111,114,121,2,0,3,109,105,120,0,0,8,116,101,115,116,104,97,115,104,
	0,1,5,104,97,115,104,110,0,2,10,247,129,128,128,0,3,128,129,128,
	128,0,0,32,2,32,0,32,1,107,32,2,107,32,2,65,13,117,115,34,
	0,107,32,1,32,2,107,32,0,107,32,0,65,8,116,115,34,2,107,32,
	2,65,13,117,115,34,1,32,0,32,2,107,32,1,107,32,1,65,12,117,
	115,34,0,107,32,2,32,1,107,32,0,107,32,0,65,16,116,115,34,2,
	107,32,2,65,5,117,115,34,1,32,0,32,2,107,32,1,107,32,1,65,
	3,117,115,34,0,107,32,2,32,1,107,32,0,107,32,0,65,10,116,115,
	34,2,107,32,2,65,15,117,115,11,183,128,128,128,0,1,3,127,32,0,
	65,228,0,106,33,2,65,156,127,33,1,32,0,33,3,3,64,32,3,32,
	0,32,1,106,32,2,16,0,33,3,32,2,65,127,106,33,2,32,1,65,
	1,106,34,1,13,0,11,32,3,11,176,128,128,128,0,1,1,127,2,64,
	32,1,65,1,72,13,0,65,0,33,2,3,64,32,0,32,2,65,0,32,
	2,107,16,0,33,0,32,2,65,1,106,34,2,32,1,71,13,0,11,11,
	32,0,11]
)

WebAssembly.instantiate(bytes, importObject).then(wa => {{
	const exports = wa.instance.exports;
	exports.hashn(100, 1, 0x{}000001, 0x{}000001);
}}).catch(err => print(\'Error loading WASM\', err));
"""

tmpfilename = "tmpprogram.js"
d8_command = "/Users/wfu/webasm/v8fresh/v8/out.gn/x64.release/d8"
d8_flags = "--wasm_taint --taint_random=8 --taint_log=results.log"
run_command = "{} {} {}".format(d8_command, d8_flags, tmpfilename)

def file_len(fname):
    return sum(1 for line in open(fname))


def run_test_for_prob(program, probability_str, num_tries=1000):
    
    os.system("touch results.log")
    text_file = open(tmpfilename, "w")
    text_file.write(program.format(probability_str, probability_str))
    text_file.close()
    
    for i in range(num_tries):
        os.system(run_command)
    
    num_lines = file_len('results.log')
    os.system('rm results.log')
    return num_lines



if __name__ == "__main__":
    print(run_test_for_prob(program_string, "aa"))
    """
    hexarr = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    results = []
    for a in hexarr:
        for b in hexarr:
            curr = a + b
            res = run_test_for_prob(program_string, curr, num_tries=1000)
            print("{}: {}".format(curr, res))
            results.append(res)
    print(results)
    """
    





