
/*
!Q: Product of Array Except Self
    Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of 
    all the elements of nums except nums[i].
    Example:
    Input:  [1,2,3,4]
    Output: [24,12,8,6]
    Constraint: It's guaranteed that the product of the elements of any prefix or suffix of the array (including the whole array) fits in a 32 bit integer.

    Note: Please solve it without division and in O(n). 

In English:

    * the key to this problem is looking at everything but the current number when you're doing multiplication
    * to do this you have to look forwards and backwards right
    * [1,2,3,4,5] to find what the answer is at 3 you need 5 * 4 * 3 (going backwards) and 1 * 2 (going forwards)

Time Complexity:
    O(N)

Space Complexity:
    O(1)
*/

var productExceptSelf = function(nums) {
    let forward = [];
    let backward = [];
    let ret =[];
    
    forward[0] = 1;
    for(let i =1;i<nums.length;i++){
        forward[i] = nums[i-1] * forward[i-1];
    }
    
    backward[nums.length-1] = 1;
    for(let i = nums.length-2;i>=0;i--){
        backward[i] = nums[i+1] * backward[i+1];
    }
    // console.log(forward);
    // console.log(backward);
    
    for(let i = 0;i<nums.length;i++){
        ret[i]=forward[i] * backward[i];
    }
    
    return ret;
};
/*




*/
/*
!Q: Spiral Matrix
    Input:
    [
    [ 1, 2, 3 ],
    [ 4, 5, 6 ],
    [ 7, 8, 9 ]
    ]
    Output: [1,2,3,6,9,8,7,4,5]
In English:

    You are looping in a spiral fashion and moving boundaries inwards. 
    This question is all about boundaries

Time Complexity:
    O(MN) where M is num rows and N is num columns

Space Complexity:
    O(MN) because of return array

*/
var spiralOrder = function(matrix) {
    let res = [];
    if(!matrix.length){
        return res;
    }
    let beginRow = 0;
    let endRow = matrix.length-1;
    let beginCol = 0;
    let endCol = matrix[0].length-1;
    
    while(beginRow<=endRow && beginCol <= endCol){
        for(let i = beginCol;i<=endCol;i++){
            res.push(matrix[beginRow][i]);
        }
        beginRow++;
        for(let i = beginRow;i<=endRow;i++){
            res.push(matrix[i][endCol]);
        }
        endCol--;
        if(beginRow <= endRow){
            for(let i = endCol;i>=beginCol;i--){
                res.push(matrix[endRow][i]);
            }
        }
        endRow--;
        if(beginCol <= endCol){
            for(let i = endRow;i>=beginRow;i--){
                res.push(matrix[i][beginCol]);
            }
        }
        beginCol++;
    }
    return res;
};
/*




*/
/*
Q: Next Permutation
    Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.
    If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).
    The replacement must be in-place and use only constant extra memory.

In English:

    * most difficult thing about this question is understanding what lexographic sorting is in this sense lol
    * the little array animation on leetcode is pretty helpful
    1. process is to find the next greatest LEXOGRAPHIC permutation
    2. you want to start from the back and as soon as you see an element less than the one directly to the right of it, stop and mark as your i
    3. then go right to left from i and find the number just larger than nums[i] and swap
    4. then reverse every index after i

Time Complexity:
    O(N)

Space Complexity:
    O(1)

*/
var nextPermutation = function(nums) {
    let i = nums.length-2;
    while(i >=0 && nums[i+1] <= nums[i]){
        i--;
    }
    
    if(i >= 0){
        let j = nums.length-1;
        while(j>=0 && nums[j] <= nums[i]){
            j--;
        }
        [nums[i],nums[j]]=[nums[j],nums[i]]
    }
    
    rev(i+1);//you reverse because you know all of the numbers at this point are decreasing going left and you just made a greater permutation going right
    
    function rev(start){
        let i = start;
        let j = nums.length-1;
        while(i<j){
            [nums[i],nums[j]]=[nums[j],nums[i]]
            i++;
            j--;
        }
    }
};
/*




*/
