/*
 * simpleadd.c
 *
 * A simple test to try to compile to WASM, and expose a specific function
 * to the V8 JavaScript engine. We will be using emscripten to convert
 * this C file to WebAssembly.
 *
 */

typedef unsigned char byte;

int simpleadd(int a, int b) {
	return a + b;
}

int simpleinc(int a) {
	return a + 1;
}

int simpleminus(int a, int b) {
	return a - b;
}

int simpleconst() {
	return 168;
}

int simplenest(int a, int b) {
    int c = simpleinc(a);
    int d = simpleinc(b);
    return c * d;
}

