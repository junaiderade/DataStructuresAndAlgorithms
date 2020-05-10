/*
In English:

    * This gives the answer to the maximum subarray problem
    * a subarray is a set of contiguous elements, has to be adjacent
    * The idea is to check the maximum subarray ending at every index rather than checking every subarray
    * check if the element at the current index is greater than your sum, if it is then discard your current sum
    and add the element at the current index
    * the current sum is always Math.max(nums[i],currentSum+nums[i])

Time Complexity:
    O(N)

Space Complexity:
    O(1)
Resources:

*/

var maxSubArray = function(nums) {
    let maxCurrent = nums[0];
    let maxGlobal = maxCurrent;
    
    for(let i = 1;i<nums.length;i++){
        maxCurrent = Math.max(nums[i],nums[i]+maxCurrent);
        maxGlobal = Math.max(maxGlobal,maxCurrent);
    }
    
    return maxGlobal;
};