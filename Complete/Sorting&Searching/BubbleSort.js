/*
In English:
    * swaps adjacent elements if they are in the wrong order
    * it just swaps i & i+1 and by the end of 1 run the largest element is at the end
    * then on the next run it goes from start to end -1
    * this is an optimized version of bubble sort so you break if you havnt swapped that run which means the array is sorted
*/

/*
Time Complexity:
    * O(N)^2 because worst case you are running thru it n times and n-1 times each run
*/

/*
Space Complexity:
    * O(1) because all your doing is keeping track of pointers. Space doesnt change with input.

Top Leets: Unfeasible

*/

function bubbleSort(arr){
    for(let i = 0;i<arr.length-1;i++){
        let swapped = false;
        for(let j = 0;j<arr.length-1;j++){
            if(arr[j]>arr[i]){
                arr[j] = temp;
                arr[j] = arr[i];
                arr[i] = temp;
                swapped = true;
            }
        }
        if(!swapped) break;
    }
    return arr;
}

console.log(bubbleSort([9,8,7,6,5,4,3,2,1]));