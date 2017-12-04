#include <stdio.h>
#include <time.h>
#include <stdlib.h>



void quicksortInt(int *array, int start, int end) {
    if (start >= end) return;
    int pivot = array[end];
    int left = 0;
    int right = 0;
    while (left + right < end - start) {
        int num = array[start+left];
        if (num < pivot) {
            left++;
        } else {
            array[start+left] = array[end-right-1];
            array[end-right-1] = pivot;
            array[end-right] = num;
            right++;
        }
    }
    quicksortInt(array, start, start+left-1);
    quicksortInt(array, start+left+1, end);
}


int main(int argc, char** argv) {
	
	srand(time(NULL));
	int array_size = 10;
	int array[array_size];
	for (int i = 0; i < array_size; i++) {
		array[i]=rand()%100;	
	}
	
	for (int i = 0; i < array_size; i++) {
		printf("%d ", array[i]);
	}
	printf("\n");

	quicksortInt(array, 0, array_size -1);	
	
	for (int i = 0; i < array_size; i++) {
		printf("%d ", array[i]);
	}
	printf("\n");
	return 0;
}



