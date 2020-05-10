/*
Uses:
    * follows the approach of making locally optimal choice at each stage
    * Dijkstra's is a greedy algorithm
    * the problems where choosing locally optimal also leads to the global solution are best for greedy

General method:
    * we make whatever choice seems best at the moment in hopes it will lead to globally optimal solution (it does always)
    * it is different from dynamic programming because DP is mainly an optimization over plain recursion
    * You are given an array A of integers, where each element indicates the time a thing takes for completion. You want to calculate the
    maximum number of things that you can do in the limited time that you have.This is a simple Greedy-algorithm problem. In each
    iteration, you have to greedily select the things which will take the minimum amount of time to complete while maintaining two variables currentTime and numberOfThings.
    * These problems are often a lot easier than they seem

Resources: https://www.hackerearth.com/practice/algorithms/greedy/basics-of-greedy-algorithms/tutorial/
*/

//----------------------------------------------------------------------

/*
Q: Meeting rooms II
    Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

In English:

    The key to this problem is to think about how you would do it if it was a real like situation. You'd just read the list and see what meetings dont collide with eachother.
    Another takeaway and mistake you were making is you keep thinking the solution is a perfect algorithm. Greedy algos rnt perfect and only work in some cases.
    Naive solution:
        This runs in O(N)^2 time and involves you first sorting the array and then going thru for each index and seeing which intervals have a starting time after the current. 
        if they do then you mark their starting time so you dont recount them and modify the ending time of the current to keep going on with loop. Look at submission on 3/28
    Optimal Solution:
        You want to sort the intervals in increasing order. This isolates start times. Then you create a priority queue and push the end time of the first meeting.
        Basically the root of your minheap is the meeting you're on. loop and everytime you see a meeting with a start aftet the current end time. 
        remove the current root and push the new end time for the current meeting.
        
Time Complexity:
    O(NlogN). The sorting of the array takes O(NlogN). Also you loop thru the array so that's O(N) and each time you extract a root that takes O(NlogN)

Space Complexity:
    O(N) because we construct a min heap
*/

const { MinHeap } = require('@datastructures-js/heap');

function minMeetingRooms(intervals){

    if(intervals.length===0){
        return 0;
    }

    let pq = new MinHeap();
    intervals.sort((a,b) => a[0]===b[0] ? a[1]-b[1] : a[0]-b[0]);
    pq.insert(intervals[0][1]);

    for(let i = 1;i<intervals.length;i++){
        if(intervals[i][0] >= pq.root().getKey()){
            pq.extractRoot();//when you see a meeting with a start time after the current's end time. You combine them.
        }
    pq.insert(intervals[i][1]);//reset the end time or add a new end time. The earliest end time is always first
    }
    return pq.size();
}
// console.log(minMeetingRooms([[0, 30],[5, 10],[15, 20]]));
// console.log(minMeetingRooms([[7,10],[2,4]]));
// console.log(minMeetingRooms([[1,3],[5,20],[19,30],[35,40]]))



/*
Q: Minimum Domino Rotations for Equal Row
    In a row of dominoes, A[i] and B[i] represent the top and bottom halves of the i-th domino.  (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)
    We may rotate the i-th domino, so that A[i] and B[i] swap values. Return the minimum number of rotations so that all the values in A are the same, or all the values in B are the same.
    If it cannot be done, return -1.

In English:
    * You know a few things:
        * every donimo in a row A or row B must be the same as either A[0] or B[0] for this to be true
        * one potential problem is what if minimum number of swaps involves swapping A[0] & B[0]? ex([1,2,2,2,2,2],[3,1,1,1,1,1])
    * The idea of this is to look at the opposite array and see when it has A/B[0] and count that as a rotation
    * You do this by getting a value (either A[0] or B[0]) and then looping thru both arrays at the same time
    and counting how many rotations it would take to get the value to fill either row (if a val can fill row A then you can flip that and it'll fill row B)
    * you do this with the 2 known values

Time Complexity:
    O(N) since the check function is essentially called twice and takes O(N) time

Space Complexity:
    O(1) since you're only keeping track of a few pointers
*/

function minSwaps(A, B) {
    let rotations = check(A[0],A,B);
    
    if(rotations !== -1 || A[0] === B[0]){ 
        return rotations;
    }else{
        return check(B[0],A,B);
    }
    
    function check(val,A,B){//check if all the elements in A or B can be equal to val
        let rotationsA = 0;
        let rotationsB = 0;
        
        for(let i = 0;i<A.length;i++){
            if(A[i] !== val && B[i]!==val){
                return -1;
            }
            if(A[i]!==val){//given the above if statement we know either A[i] or B[i] are val
                rotationsA++;
            }else if(B[i]!==val){
                rotationsB++;
            }
        }
        return Math.min(rotationsA,rotationsB);
    }
};

//console.log(minSwaps([2,1,2,4,2,2],[5,2,6,2,3,2]));

/*
Q:Jump game II
    Given an array of non-negative integers, you are initially positioned at the first index of the array.
    Each element in the array represents your maximum jump length at that position.
    Your goal is to reach the last index in the minimum number of jumps.

In English:

    The main point here is that you always want to keep track of your max jump. You have 2 pointers, 1 tells you 
    when the next time you jump is (maxSteps) and 1 tells you what your max jump so far is(maxPos). Again remember, greedy algos 
    are not perfect but they work in this situation. You start off at whatever your first index tells you. For example, if your first
    index is 2 then you know you're max jump so far is 0 + 2 and the next time you jump is when you move past index 2.
    If you had a 3 right after then you see that the max jump you can make now is to index 4 because 1 + 3
    and you know the next time you need to make a jump is at that index.
    If you reach length-1 at any point in your jumps you know you wont be making any more jumps

Time Complexity:
    O(n). You only make one pass through.

Space Complexity:
    O(1). The number of pointers doesnt change with the number of inputs.

*/

function jump(nums) {
    if(nums.length<2){
        return 0;
    }
    let maxPos = nums[0];//maximum position you can go to from start
    let maxSteps = nums[0];//
    
    let jumps = 1;
    
    for(let i = 1;i<nums.length;i++){//remember, you still loop thru EVERY element
        if(maxSteps < i){//you only jump when u surpass ur max steps from an index
            jumps++
            maxSteps = maxPos;//you don't jump again till you reach whatever your maximum position before was
        }
        maxPos = Math.max(maxPos, nums[i]+i);//but you test the max jump from every index so that doesnt change
    }
    return jumps;
};

//console.log(jump([2,3,1,1,5]));

/*
Q: Maximum Swap

In English:

    * to solve this problem successfully you have to swap the earliest number (from the left) with the greatest number
    after it in the last position of that number
    * ex: 21883984 -> 91883284
    * to do this you save the last position of every number in an array where the index is the digit and the value is the last
    position in that array the number occurs
    * you then look at numbers left to right (in form of a string array) and loop thru all possible 
    digits an see if there is a greater digit and use the array you built to see the last position of that greater digit

Time Complexity:
    O(N)

Space Complexity:
    O(1) since your char array will be a maximum of 10 elements
*/
var maximumSwap = function(num) {
    let chars = num+'';
    chars = chars.split('');
    let last = new Array(10).fill(-1);//adding the -1 instead of leaving it null shot the runtime up to 96% from 53%
    for(let i = 0;i<chars.length;i++){//in order to get the maximum number after swapping you need to swap the firstmost digit you can with the last occurence of the greatest digit after it
        last[parseInt(chars[i])] = i; //last place you saw this number
    }
    for(let i = 0;i < chars.length;i++){
        for(let d = 9; d > chars[i];d--){
            if(last[d] > i){
                let temp = chars[i];
                chars[i] = chars[last[d]]; //since last records the last occurence of the number which is its index (0-9)
                chars[last[d]] = temp;
                return parseInt(chars.join(''));
            }
        }
    }
    return num;
};