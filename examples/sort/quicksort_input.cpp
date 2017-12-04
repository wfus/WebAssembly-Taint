#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <iostream>



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
	int n;
    bool lol = true;
    srand(time(NULL));
    int array[1000000];
    while (lol) { 
	    std::cin >> n;
        if (n == 0) break; 

        for (int i = 0; i < n; i++) {
            array[i] = rand() % n;
        }
	    for (int i = 0; i < n; i++) {
            printf("%d ", array[i]); 
        }
        printf("\n");
        quicksortInt(array, 0, n-1);	
	
	    for (int i = 0; i < n; i++) {
		    printf("%d ", array[i]);
	    }
	    printf("\n");
    }
	return 0;
}



