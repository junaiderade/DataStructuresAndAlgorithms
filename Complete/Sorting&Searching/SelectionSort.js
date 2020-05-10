/*
In English:
    * each run it finds the min element in the array from i -> arr.length and puts it at where i is
    * the left side is the sorted subarray and right is unsorted subarray
*/

/*
Time Complexity:
    * O(n)^2 because given the number of inputs the operations increase exponentially
*/

/*
Space Complexity:
    * O(1) because alll you do is keep track of a few pointers

Top Leets: Unfeasible

*/

function selectionSort(arr){
    for(let i = 0;i<arr.length;i++){
        let min = i;
        for(let j = i+1;j<arr.length;j++){
            if(arr[j]<arr[min]){
                min = j;
            }
        }
        if (min!==i){
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }
    return arr;
}

console.log(selectionSort([9,7,2,4,6,2,3,6,9,1,8]));
