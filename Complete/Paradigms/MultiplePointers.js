/*
Uses:
    * this pattern means creating pointers or values that correspond to an index or position and move towards the beginning, end, or middle based on a certain condition
    * it is very efficient for solving problems with minimal space complexity

General method:

*/

/*
Q: Longest Substring without repeating characters
    Given a string, find the length of the longest substring without repeating characters.

In English:
    You use a hashmap to keep track of unique values. Once u see a value the next time around you delete it from the hashmap.
    i is used to keep track of start and j of end. Each time you see a unique character you subtract i from j and compare it
    with the last longest string.

Time Complexity:
    O(N) because worst case each character will be visited twice

Space Complexity:
    O(min(N,M)) where N is the size of the string and M is the size of the character set. ex: if there were only 4 characters in
    the alphabet then the min(N,M) would be M
*/

var lengthOfLongestSubstring = function(s) {
    let lookup = new Map();
    let longest = 0;
    let i = 0;//where a unique substring starts
    let j = 0;//where a unique substring ends
    while(i<s.length && j <s.length){
        if(!lookup.has(s[j])){
            //if the Map doesnt have s[j] then move j forward and add s[j+1] to Map
            
            lookup.set(s[j++]);//IMPORTANT: the ++ operator increments AFTER the operation so really you're adding s[j] to the Map
            longest = Math.max(longest,j-i);
        }else{
            lookup.delete(s[i++]);//you delete s[i] from the map and increment i
        }
    }
    return longest;
};

console.log(lengthOfLongestSubstring("oiuweoiewrowieu"));//rowieu
//rowieu

/*
Q:3sum
    Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? 
    Find all unique triplets in the array which gives the sum of zero.

In English:
    The way to think about it is since it's 3 sum, there's only going to be 3 numbers. So to find the combinations of 3 numbers,
    he is iterating through the list with the first pointer, and then trying to find two extra numbers to sum to 0. Since the list
    is ordered, the right pointer will always be higher than the middle pointer. So if the sum is too large, you can move the right
    pointer back one. On the other hand, if the sum is too small (below 0), then move the middle pointer up one.    

Time Complexity:
    O(N^2) because remember this is a 1d array and worst case, you're going over the whole thing with each iteration

Space Complexity:
    O(Result) and if you're not including the result then O(n)
*/

function threeSum(nums) {
    nums.sort(function(a,b){return a - b}); 
    let res = [];
    
    for(let i = 0;i<nums.length-2;i++){
        if(nums[i]>0) break;//remember the array is sorted so if everything after a number including itself is > 0 then we dont have a hit
        
        if(i>0 && nums[i]===nums[i-1]) continue;//dont wanna test the same combination twice
        
        let j = i+1;
        let k = nums.length-1;
        while(j < k){
            let sum = nums[i]+nums[j]+nums[k];
            if(sum===0){
                res.push([nums[i],nums[j],nums[k]]);
                while(j < k && nums[j]===nums[j+1]){ //at this point since u r stil testing for combination u want to get rid of duplicates
                    j++;
                }
                while(j < k && nums[k]===nums[k-1]){
                    k--;
                }
                j++;
                k--;
            }else if(sum > 0){
                k--;
            }else{
                j++;
            }
        }
    }
    
    return res;
}

//console.log(threeSum([-1, 0, 1, 2, -1, -4]));

/*
Q:Trapping rain water
    Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

In English:
    You have the dynamic programming solution below the actual solution because the DP solution is the basis for mult pointers.
    The animation in official solution is helpful too.
    You solve this problem index by index. 


Time Complexity:
    O(N) time because you really only visit each index once

Space Complexity:
    O(1) because you're only keeping track of a few pointers

*/

var trap = function(height) {
    let left = 0;
    let right = height.length-1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;
   
    while(left < right){//makes sure u havnt crossed boundaries
        if(height[left] < height[right]){//you've seen everything on the left already and if it's less than right than u know this is min(leftmax,rightmax)
            if(height[left] >= leftMax){//keep track of the maximum
                leftMax = height[left];
            }else{
                water+= leftMax - height[left];
            }
            left++;
        }else{
            if(height[right] >= rightMax){//if right right sice is less u bounce over to other side
                rightMax = height[right];
            }else{
                water+= rightMax - height[right];
            }
            right--;
        }
    }
    return water;
};




//DYNAMIC PROGRAMMING SOLUTION
//the point is to build an array to hold the highest point from the left to an index (including that index)
//and to build an array from the right doing the same
//and then finding the amount of what at that index specifically by seeing the minimum of the left and right arrays mine the height at the index
//O(N) time and O(N) space
var trapDP = function(height) {
    
    if(!height.length){
        return 0;
    }
    
    let water = 0;
    
    let left = [];
    let right = [];
    
    left[0] = height[0];
    for(let i = 1;i<height.length-1;i++){
        left[i]=Math.max(height[i],left[i-1]);
    }
    
    right[height.length-1] = height[height.length-1];
    for(let i = height.length-2;i>=0;i--){
        right[i] = Math.max(height[i],right[i+1]);
    }
    
    // console.log(left)
    // console.log(right)
    
    for(let i = 1;i<height.length-1;i++){
        water+= Math.min(left[i],right[i])-height[i];
    }
    
    return water;
    
};
/*
example: 

left          : [0,1,1,2,2,2,2,3,3,3,3,3]
original array: [0,1,0,2,1,0,1,3,2,1,2,1]
right         : [3,3,3,3,3,3,3,3,2,2,2,1]
water at index: [0,0,1,0,1,2,1,0,0,1,0,0] //add all those up and you get 6
*/