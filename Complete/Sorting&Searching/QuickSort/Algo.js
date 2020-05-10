/*
Algorithm: Quick Sort
In English:
    * this is a divide and conquer algorithm
    * it picks an element as a pivot and partitions the array around the given pivot
    * to partition means the left of the array will be less than pivot and right will be greater than it. The pivot will end up in its correct spot.
    * you can implement this algo in different ways: always pick first element as pivot, always pick last, pick random, pick median
*/

/*
Time Complexity:
    * General: O(LogN) 
    * Worst Case:
        * The worst case time complexity of a typical implementation of QuickSort is O(n2). The worst case occurs when the picked pivot 
        * is always an extreme (smallest or largest) element. This happens when input array is sorted or reverse sorted and either first 
        * or last element is picked as pivot.
*/

/*
Space Complexity:
    * O(1) because you are only keeping track of a few pointers no matter the input size. It is in-place.
    * might be O(logN) because of the call stack
*/

function partition(arr,start,end){//the start & end intervals. end is also where the pivot is
    console.log('Before: ' +arr, 'Start: '+ start, 'End: '+end);
    let pivot = arr[end];//you actually do NOTHING to the pivot till the end, you just sort the array based on its value
    let i = start-1;//note: i is NOT the same a pivot
    for(let j = start;j<end;j++){//this for loop uses multiple pointers to make all the numbers < pivot go to the front!
        if(arr[j]<pivot){//if current element is < than pivot (which starts as end), we swap it with pivot
            i++;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
                        
    let temp = arr[i+1];//i was the last position of a number less than pivot so pivot belongs in i + 1
    arr[i+1] = arr[end];
    arr[end] = temp;
    console.log('After: '+arr,'Pivot: ' + pivot);
    return i + 1;//it returns the index after the correct position of the pivot
}

function quickSort(arr,start,end){
    if(start<end){//when start = end our interval is over
        let idx = partition(arr,start,end); //this gives us our index to partition from
        quickSort(arr,start,idx-1);//sorts everything to the left of idx
        quickSort(arr,idx+1,end);//sorts everything to the right of idx
    }
    return arr;
}

console.log(quickSort([9,3,7,1,1,5],0,5));

/*
Algorithm: Quick Select

In English:
    Used to find the kth smallest or largest element in an undordered list. Related to quick sort.
    The difference is that instead of recurring for both sides (after finding pivot), it recurs only the part that contains the k smallest element
    Logic:
        * if the index of a partitioned element is more than k, we recur the left part
        * if the index of a partitioned element is the same as k, we have found the smallest element and we return
        * if index is less than k, we recur for the right part
        * this reduces the expected complexity

Time Complexity:
    * O(n), doesnt have to be O(NLogN) like quick sort because we keep looking only at one side. Worst case is O(N^2)

Space Complexity:
    * O(1) because we only keep track of a few pointers
*/

function selectPartition(arr,start,end){
    console.log('Before: '+arr,start,end);
    let pivot = arr[end]
    let pivotloc = start;
    for(let i = start;i<=end;i++){
        if(arr[i] < pivot){
            let temp = arr[i];
            arr[i] = arr[pivotloc];
            arr[pivotloc] = temp;
            pivotloc++;
        }
    }
    let temp = arr[end];
    arr[end] = arr[pivotloc];
    arr[pivotloc] = temp;
    console.log('After: '+arr)+',Pivot: '+pivotloc;
    return pivotloc;
}

function kthSmallest(arr,start,end,k){
    let pivot = selectPartition(arr,start,end);

    if(pivot === k){
        return arr[pivot];
    }else if(pivot < k){
        return kthSmallest(arr,pivot+1,end,k);
    }else{
        return kthSmallest(arr,start,pivot-1,k);
    }
}

//console.log(kthSmallest([8,3,5,1,2,7],0,5,4));//remember, k is the position

