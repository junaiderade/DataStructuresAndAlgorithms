
/*
Q: Find Duplicate in file system

    Given a list of directory info including directory path, and all the files with contents in this directory, you need to find out all 
    the groups of duplicate files in the file system in terms of their paths.
    
    Input:
    ["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"]
    Output:  
    [["root/a/2.txt","root/c/d/4.txt","root/4.txt"],["root/a/1.txt","root/c/3.txt"]]

In English:

    Your goals is to make a hashmap of key: content, value: array of file paths
    Basic String methods are key to getting this question correct.
    you first split the string by ' ' so you can seprate the parent from the files
    the parent will always be at index 0
    then you have to split the string of the children by '(' and remove the ')' at the end to get the content vs child path
    then you populate hashmap and loop thru it

Time Complexity:
    O(n * x) : n string sof average length x

Space Complexity:
    O(n * x): map and res size grow based upon n * x

*/
var findDuplicate = function(paths) {
    let lookup = new Map();
    
    for(let path of paths){
        
        let vals = path.split(' ');
        
        for(let i = 1;i<vals.length;i++){
            let cont = vals[i].split('(');
            cont[1] = cont[1].replace(')','');
            if(!lookup.has(cont[1])){
                lookup.set(cont[1],[]);
            }
            lookup.get(cont[1]).push(vals[0]+'/'+cont[0]);
        }
    }
    
    let ret = [];
    for(let [key,val] of lookup){
        if(val.length > 1){
            ret.push(val);
        }
    }
    
    return ret;
};
/*
Q: Minimum Window Substring

In English:

    right pointer expands current window and left minimizes it
    keep expanding the window by moving right pointer. when the window has
    all the characters contrac it (if possible)
    leetocde has a good diagram on this
    you use a map to keep count of unique characters

Time Complexity:
    O(∣S∣+∣T∣) where |S| and |T| represent the lengths of strings SS and TT. In the worst case we might end up visiting every element of string SS 
    twice, once by left pointer and once by right pointer. |T|∣T∣ represents the length of string TT.

Space Complexity:
    O(∣S∣+∣T∣). |S|∣S∣ when the window size is equal to the entire string SS. |T|∣T∣ when TT has all unique characters.

*/
function minWindow(s, t) {
    var ans = '';
    
    // 1. process hashmap
    var map = {};
    t.split('').forEach(ch => map[ch] = (map[ch] || 0) + 1);
    var count = Object.keys(map).length;
    
    // 2. traverse s to find boundaries
    // both l & r are inclusive
    var l = 0;
    var r = -1;
    
    while (r < s.length) {
        if (count === 0) {
            // good condition
            // l~r contains t
            
            // update ans
            if (!ans || r - l + 1 < ans.length) {
                ans = s.slice(l, r + 1);
            }
            
            // get rid of curr ch and then move l
            if (map[s[l]] !== undefined) {
                map[s[l]]++;
            }
            if (map[s[l]] > 0) {
                count++;
            }
            l++;
            
        } else {
            // bad condition
            // l~r doesn't contain t
            
            // move r and add new ch
            r++;
            if (map[s[r]] !== undefined) {
                map[s[r]]--;
            }
            if (map[s[r]] === 0) {
                count--;
            }
        }
    }
    return ans;
}
/*




*/
/*
Q: Longest Consecutive Sequence
    Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

    Your algorithm should run in O(n) complexity.

    Example:

    Input: [100, 4, 200, 1, 3, 2]
Output: 4

In English:

    You put all your numbers in a map and when u see a number you check if number + 1 and -1 is in the map and you mark every number
    you see so you dont revisit it

Time Complexity:
    O(N) because you see each number twice only

Space Complexity:
    O(N) because of the hashmap

*/
var longestConsecutive = function(nums) {
    let lookup = new Map();
    let max = 0;
    for(let i of nums){
        lookup.set(i,0);
    }
    for( let [key,val] of lookup){//you go up and down and only see each number once
        if(val===1){
            continue;
        }
        let forward = key;
        let backward = key;
        let count = 1;
        while(lookup.has(forward+1)){
            lookup.set(forward+1,1);
            forward++;
            count++;
        }
        while(lookup.has(backward-1)){
            lookup.set(backward-1,1);
            backward--;
            count++;
        }
        lookup.set(key,1);
        max = Math.max(max,count);
    }
    return max;
};

/*
Q: Subarray Sum Equals K

    Given an array of integers and an integer k, you need to find the total number of continuous subarrays whose sum equals to k.

    Example 1:
    Input:nums = [1,1,1], k = 2
    Output: 2

In English:

    * You calculate a totalSum going forward and you know that it's a valid subarray if that sum minus
    the sum of a previous subarray is = to k
    * You were confused on how to only look back at previous subarrays but if you
    build a hashmap with (currentSum,frequency) as you go you'd only see previous subarrays
    * this covers the cases of negative numbers and zeros as well which is something you were worried about
    * as you iterate thru the array
    1) if the currentSum is K then increment count AND
    2) check the hashmap for currentSum-K and add however much the frequency is!

Time Complexity:
    O(N)

Space Complexity:
    O(N)

*/
var subarraySum = function(nums, k) {
    let count = 0;
    let map = new Map();
    let currentSum = 0;
    
    for(let i = 0;i<nums.length;i++){
        currentSum+=nums[i];
        if(currentSum===k){
            count++;
        }
        if(map.has(currentSum-k)){
            count+=map.get(currentSum-k);
        }
        map.set(currentSum,map.get(currentSum)+1 || 1);
    }
        
    return count;

};

//[-1,0,3,-2,1] 1
//currentSum
// -1,-1,2, 0, 1
//Hashmap
//(-1,2)
//(2,1)
//(0,1)
//(1,1)
