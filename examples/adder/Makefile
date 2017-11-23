export EMCC_DEBUG=1

all: simpleadd fulladd

simpleadd: simpleadd.c
	emcc simpleadd.c -Os -s WASM=1 -s SIDE_MODULE=1 -o simpleadd.wasm

fulladd: fulladd.c
	em++ --bind --std=c++11 fulladd.c -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -o fulladd.js

clean:
	rm *.wasm
