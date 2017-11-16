#include <iostream>
#include <fstream>
#include <stdio.h>
#include <cstring>

#define DEFAULT_BUF_SZ 256
#define INTS_IN_LINE 20


/* Read file in binary, outputting a Uint8 for each byte */
void print_wasm_hex(char* fname) {
	int counter = 0;
	std::cout << "[";
	std::ifstream infile;
	infile.open(fname, std::ios::binary);
	while(infile) {
		unsigned char b;
		infile >> std::noskipws >>  b;
		printf("%x,", b);
		counter++;
		if (counter % INTS_IN_LINE == 0) {
			std::cout << std::endl;
		}
	}
	std::cout << "]" << std::endl << std::endl;
}



/* Read file in binary, outputting a Uint8 for each byte */
void print_wasm_uint(char* fname) {
	int counter = 0;
	std::cout << "[";
	
	std::ifstream infile;
	infile.open(fname, std::ios::binary);
	while(infile) {
		unsigned char b;
		infile >> std::noskipws >> b;
		printf("%u,", b);
		counter++;
		if (counter % INTS_IN_LINE == 0) {
			std::cout << std::endl;
		}
	}
	std::cout << "]" << std::endl << std::endl;
}




int main(int argc, char** argv) {

	if (argc != 2) {
		printf("Usage: ./wasm2uint8 <.wasm file>\n");
		return 1;
	}
	char fname[DEFAULT_BUF_SZ];
	std::strncpy(fname, argv[1], DEFAULT_BUF_SZ);
	
	print_wasm_uint(fname);		
	print_wasm_hex(fname);

	return 0;
}
