/*
In English:
    You basically break your array down into cells recursively and merge those cells toegther in pairs of 2 then pairs of 4 until you reach N

Time Complexity:
    O(NLogN)

Space Complexity:
    O(N) since you have a results array

*/


function merge(arr1,arr2){ //this is the function just to merge 2 arrays, no the entire mergeSort, the params must be ORDERED arrays
    let results = [];
    let i = 0;
    let j = 0;
    while(i < arr1.length && j < arr2.length){ 
        if(arr2[j] >= arr1[i]){ //notice that here it is greater than OR equal to to capture the case of equality
            results.push(arr1[i]);
            i++;
        }
        else{
            results.push(arr2[j])
            j++;
        }
    }

    while (i<arr1.length){
        results.push(arr1[i]);
        i++;
    }
    while (j<arr2.length){
        results.push(arr2[j]);
        j++;
    }
    return results;
}

function mergeSort(arr){ //this is recursive
if (arr.length<=1){
    return arr;
}
let mid = Math.floor(arr.length/2); //finds midpoint
let left = mergeSort(arr.slice(0,mid)); //does merge sort on left half
let right = mergeSort(arr.slice(mid)); //does merge sort on right half
return merge(left,right);
}

console.log(mergeSort([10,3,25,1]));
