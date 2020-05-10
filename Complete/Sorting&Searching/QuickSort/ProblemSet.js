/*
Q: Find Kth Largest

In English:
    Basically just quick select
    You wrote this in a simpler way! reading this helps understand quick sort

Time Complexity:
    O(N) average and O(N^2) worst case

Space Complexity:
    O(1)

*/

var findKthLargest = function(nums, k,start = 0, end = nums.length-1) {
    let idx = nums.length - k; //the index of the element you're looking for in a sorted version of this array
    let pivot = quickSelect(start,end);
    
    if(pivot === idx){
        return nums[pivot];
    }else if(pivot < idx){
        return findKthLargest(nums,k,pivot+1,end);
    }else{
        return findKthLargest(nums,k,start,pivot-1);
    }
    
    function quickSelect(start,end){
        let left = start;//the whole concept of this is that you partition around the end and you use multiple pointers to move nums < than nums[end]
        for(let i = start;i<end;i++){
            if(nums[i] < nums[end]){
                let temp = nums[left];
                nums[left] = nums[i];
                nums[i] = temp;
                left++;
            }
        }
        let temp = nums[end];//you swap at the end because you're current left index is where this nums[end] belongs
        nums[end] = nums[left];
        nums[left] = temp;
        return left;
    }
    
};

var kClosest = function(points, K) {
    quickSelect(points, K, 0, points.length - 1)
    return points.slice(0, K)
};

function quickSelect(points, K, low, high) {
    if (low >= high) {
        return;
    }
    
    const partPoint = partition(points, low, high);
    
    if (partPoint === K - 1) {
        return;
    }
    if (partPoint < K - 1) {
        quickSelect(points, K, partPoint + 1, high);
    } else {
        quickSelect(points, K, low, partPoint - 1);
    }
}


/*
Q: K Closest points to Origin
    We have a list of points on the plane.  Find the K closest points to the origin (0, 0).

    (Here, the distance between two points on a plane is the Euclidean distance.)

    You may return the answer in any order.  The answer is guaranteed to be unique (except for the order that it is in.)    

In English:
    * The distance from a point to the origin can be found with a^2 + b^2 = c^2
    * if you do a quick select and find index K as a pivot you know that you have the answer before everything
    before K is less than it and everything after is greater.
    * you can only do this because you don't have to return the points in any specific order

Time Complexity:
    O(N) average, O(N)^2 worst case because this is essentially quicksort

Space Complexity:
    O(N)
*/
var kClosest = function(points, K) {
    quickSelect(points, K, 0, points.length - 1)
    return points.slice(0, K)
};

function quickSelect(points, K, low, high) {
    if (low >= high) {
        return;
    }
    
    const partPoint = partition(points, low, high);
    
    if (partPoint === K - 1) {
        return;
    }
    if (partPoint < K - 1) {
        quickSelect(points, K, partPoint + 1, high);
    } else {
        quickSelect(points, K, low, partPoint - 1);
    }
}

function partition(points, low, high) {
    const pivot = points[high];
    let i = low;
    let j = low;
    while (i < high) {
        if (getDist(points[i]) < getDist(pivot)) {
            swap(points, i, j);
            j++;
        }
        i++;
    }
    swap(points, high, j);
    return j;
}

function getDist(point) {
    return point[0] * point[0] + point[1] * point[1];
}

function swap(arr, i, j) {
    const temp = arr[i]; 
    arr[i] = arr[j];
    arr[j] = temp;
}