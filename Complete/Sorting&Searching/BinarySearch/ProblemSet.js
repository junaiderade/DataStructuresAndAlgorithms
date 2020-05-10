/*
Q: Find median of 2 sorted arrays
    There are two sorted arrays nums1 and nums2 of size m and n respectively.
    Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
    You may assume nums1 and nums2 cannot be both empty.

In English:

    * Partition nums1 and nums 2 into 2 halves such that half1 nums1 + half1 nums2 = half 2 nums1 + half2 nums2
    * number of elements in each half should be the same
    * once you find such a partition then you've ensured that we can divide all the elements in nums1.concat(nums2)
    * into two parts with equal length and one part is always greater than the other
        * so median is (max(leftPart) + min(rightPart))/2
    * your goal is to find the middle 2 elements (if array is even) or max(leftPart) if array is odd


Time Complexity:
     O(logN) because you are essentially performing a binary search

Space Complexity:
    O(1) because you are only keeping track of a few pointers
*/

var findMedianSortedArrays = function(nums1, nums2) {

    if(nums1.length > nums2.length){//you want nums1 to be the shorter array;
        let temp = nums1;
        nums1 = nums2;
        nums2 = temp;
    }
    let iMin = 0; //for binary search on shorter array
    let iMax = nums1.length;
    let halfLen = Math.floor((nums1.length+nums2.length+1)/2); //the mindpoint of lengths of both combined
    
    while(iMin <= iMax){
        let i = Math.floor((iMin + iMax)/2);//find midPoint (partition) in shorter array
        let j = halfLen - i;//partition point in longer array
        if(i < iMax && nums2[j-1] > nums1[i]){  //u need everything to the left of the partition on nums2 to be less than midpoint of nums1 which is i
            iMin = i+1;//so this tels u i is too small (move i to right and j to left)
        }else if(i > iMin && nums1[i-1] > nums2[j]){//i is too big
            iMax = i-1;
        }else{//partition on both sides is perfect
            let maxLeft = 0;
            if(i===0){
                maxLeft = nums2[j-1];
                
            }else if (j == 0){
                maxLeft = nums1[i-1];
            }else{
                maxLeft = Math.max(nums1[i-1],nums2[j-1]);
            }
            
            if((nums1.length + nums2.length) % 2 === 1){
                return maxLeft;
            }
            
            let minRight = 0;
            if(i===nums1.length){
                minRight = nums2[j];
            }else if (j === nums2.length){
                minRight = nums1[i];
            }else{
                minRight = Math.min(nums2[j],nums1[i]);
            }
            
            return (maxLeft + minRight) /2.0
        }
    }
    return 0.0;
};

//console.log(findMedianSortedArrays([1,2,3,10,15,20],[0,10,13])); //0,1,2,3, |10| ,10,13,15,20

/*
Q: Search in a Rotated Sorted Array
    Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
    (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).
    You are given a target value to search. If found in the array return its index, otherwise return -1.
    You may assume no duplicate exists in the array.
    Your algorithm's runtime complexity must be in the order of O(log n).

In English:

    * You wanna do binary search with ur start, middle, and end. The middle is ofc calculated by Math.round((start+end)/2)
    * Since its rotated uk one side at the start is gonna be in order and one wont.
    U want to check
    1. which side is in order
    2. is target in the ordered side (use <= && >= to find this)?
        if so: then make the new middle where the opposite pointer was + or - 1
        if not: then make the new middle where the current pointer is + or -1

    * what u learned from this problem is to really understand boundaries of binary search
    * your first correct leetcode submission on 4/2 is the clearest to understand but not cleanly written
    * one side of the array will always be sorted

Time Complexity:
    O(logN) because you're doing a binary search

Space Complexity:
    O(1) since u r only keeping track of pointers
*/

var search = function(nums, target) {
    let start = 0;
    let end = nums.length-1;
    
    while(start <= end){
        let mid = Math.floor((start+end)/2);
        
        if(nums[mid] === target){
            return mid;
        }
        if(nums[mid] >= nums[start]){ //this means this side is sorted
            if(target >=nums[start] && target < nums[mid]){ //if target is within this range then binary search this range
                end = mid - 1;
            }else{//search the other side
                start = mid + 1;
            }
        }else{
            if(target <= nums[end] && target > nums[mid]){//is target in this range
                start = mid + 1;
            }else{//search the other side
                end = mid - 1;
            }
        }
    }
    return -1;
};

/*
Q: Find First and Last Position of Element in Sorted Array

In English:

    * Important: you noted that in most cases you should always use Math.floor
    * Basically you have a nested function which returns the first index of target if a bool passed to it is true
    * and it returns the last index of target if bool passed to it is false
    * to get leftmost:
        * the idea is that if mid = target, then you make the new hi what mid is
            * and if there is an earlier occurence of the target when the new mid is calculated it will catch it and repeat the proccess
            * if not then you will keep moving lo forward because the element will be less than target
    * to get rightmost:
        * 

Time Complexity:
    O(logN) because binary search cuts the search space in half each iteration and binary search is invoked twice.

Space Complexity:
    O(1) since u r only keeping track of a few pointers
*/
var searchRange = function(nums, target) {
    let ret = [-1,-1];
    ret[0] = findFirst();
    ret[1] = findLast();
    return ret;
    
    function findFirst(){
        let i = 0;
        let j = nums.length-1;
        let first = -1;
        
        while(i <= j){
            let mid = i + Math.floor((j-i)/2);
            if(nums[mid]>=target){
                j = mid-1;
            }else{
                i = mid +1;
            }
  
            if(nums[mid]===target) first = mid;
        }
        
        return first;
    }
    
    function findLast(){
        let i = 0;
        let j = nums.length-1;
        let last = -1;
        
        while(i <= j){
            let mid = i + Math.floor((j-i)/2);
            if(nums[mid]<=target){
                i = mid+1;
            }else{
                j = mid-1;
            }
            if(nums[mid]===target) last = mid;
        }
        return last;
    }
};


//find if a number is in a set of sorted intervals

/*
Q: Peak index in mountain array

In English:

    * you want to return when start and end are at the same place! main takeway
    * basically you are constantly comparing middle to the idx after it
    * if the idx after it is greater than it move start to equal that idx
    * if the idx after it is less than it, move end to middle (because you know that is a potential correct peak)

Time Complexity:
    O(LogN)

Space Complexity:
    O(1)

*/
var peakIndexInMountainArray = function(A) {
    let s = 0;
    let e = A.length-1;
    
    while(s < e){
        let mid = Math.floor(s + (e-s)/2);//this is the way you should be doin it
        console.log(s,mid,e);
        if(A[mid] < A[mid+1]){
            s = mid+1;
        }else{
            e = mid;
        }
    }
    console.log(s,e);
    return s;

};
