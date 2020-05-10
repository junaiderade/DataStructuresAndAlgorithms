/*
Uses:
    * used for problems that are "find all combinations"
    * backtracking IS a brute force algorithm
    
General Method: 
    1. you create a data structure to output (ex: return array)
    2. you call a backtrack method on the output data structure with some initial data (ex: empty string param)
    3. there are some possible decisions you can make (ex: do you want to add a '(' or a ')')
    4. when you hit a base case push to output data structure and return

Resources: 
    * Leetcode Guide: https://leetcode.com/problems/combination-sum/discuss/16502/A-general-approach-to-backtracking-questions-in-Java-(Subsets-Permutations-Combination-Sum-Palindrome-Partitioning)
*/

//----------------------------------------------------------------------

/*
Q: Generate Parentheses
    Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

In English:
    * there are 2 types for matching parentheses: nested or next to eachother
    * no closing braces before opening braces
    * when the length of the string is twice n you return because then you have all matching parentheses
    * each time you call the function it recursively gets called and there are 2 options. either '(' or ')' get added 
    * and it is called again

Time Complexity:
    * O(4^N/sqrt(N)) Leetcode said the analysis is out of the scope of the article

Space Complexity:
    * O(4^N/sqrt(N)). 
*/

function generateParentheses(n){
    let res = [];
    backtrack(res,'',0,0,n);
    return res;

    function backtrack(arr,current,numOpen,numClosed,numPairs){
        if(current.length === numPairs*2){//base case
            arr.push(current);
            return;
        }
        if(numOpen < numPairs){//decision (your number of opening parentheses will be the same as numPairs)
            backtrack(arr,current+'(',numOpen+1,numClosed,numPairs);
        }
        if(numClosed < numOpen){//decision (you cannot have closing parentheses before open ones)
            backtrack(arr,current+')',numOpen,numClosed+1,numPairs);
        }
    }
}

//console.log(generateParentheses(3));
/*









*/
/*
Q: Word Search
    Given a 2D board and a word, find if the word exists in the grid.The word can be constructed from letters of 
    sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same 
    letter cell may not be used more than once.

In English:
    * walk through 2d array, at each step mark your choice before moving on to next step, at the end of each step revert your mark so 
    * you can have a clean slate to try another direction. This exploration is done via dfs (you go as far as possible before you try next direction)
    * skeleton of algo is a loop that iterates through each cell in grid and for each cell we invoke the backtracking function and see if it can obtain a solution
     
Time Complexity:
    * O(N * 4^L) where N is the number of cells in the board and L is the length of the word. it is 4^L because you exapnd your DFS in 4 directions. Backtrack
    * goes in 4 directions then for each of those directions it can go in 4 directions and so on 

Space Complexity:
    * O(L) where L is the length of the string to be matched. The main consumption of memory is in the recursion call. Max length of the stack would be length of the word.
*/

function wordSearch(board,word){
    for(let i = 0;i<board.length;i++){
        for(let j = 0;j<board[i].length;j++){
            if(backtrack(i,j,0)){
                return true;
            }
        }
    }
    return false;

    function backtrack(i,j,letter){
        if(i < 0 || i >= board.length || j < 0 || j >= board[i].length || board[i][j]!==word[letter]){
            return false;//note that in this version of backtracking you ARE returning something
        }

        board[i][j] = '-';

        if(letter === word.length-1){
            return true;
        }

        if(
            backtrack(i+1,j,letter+1) ||
            backtrack(i,j+1,letter+1) ||
            backtrack(i-1,j,letter+1) ||
            backtrack(i,j-1,letter+1)
        ){
            return true;
        }else{
            board[i][j]=word[letter]; //if this path turned out false set it back to what it was
            return false;
        }
    }
}

// console.log(wordSearch([
//     ['A','B','C','E'],
//     ['S','F','C','S'],
//     ['A','D','E','E']
//   ],'ABCCED'));
// console.log(wordSearch([
//     ['A','B','C','E'],
//     ['S','F','C','S'],
//     ['A','D','E','E']
//   ],'ABCCEu'));

/*









*/
/*
Q: Letter combinations of a phone number
    Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.
    A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

In English:
    * make an array where each index corresponds to the letters at a digit
    * write a nested backtracking function where you 1) get the string of the digit at the current INDEX
    * and then you loop thru that string with a for loop calling backtracking each time and adding the current index. This gives you all paths

Time Complexity:
    * O(3^N + 4^M) where is n is the number of digits with 3 letters and m is the number of digits with 4 letters

Space Complexity:
    * O(3^N + 4^M) because you have to keep that many solutions
*/

function letterCombinations(digits) {
    if(!digits.length){
        return [];
    }
    let mapping = [0,0,'abc','def','ghi','jkl','mno','pqrs','tuv','wxyz']//each index of the array corresponds to the phone number
    let res = [];
    bt(0,'');
    return res;
    
    function bt(idx,string){
        if(string.length===digits.length){
            res.push(string);
            return;
        }
        let digit = digits[idx];//get the letters at the current digit
        for(let i = 0;i<mapping[digit].length;i++){
            bt(idx+1,string+mapping[digit][i]);//tries all paths for each index. if you had 'abc' it would start a path with each letter
        }
    }
};

//console.log(letterCombinations('23'));

/*









*/
/*
Q: Remove Invalid Parentheses
    Remove the minimum number of invalid parentheses in order to make the input string valid. Return all possible results.

    Note: The input string may contain letters other than the parentheses ( and ).

    Example 1:

    Input: "()())()"
    Output: ["()()()", "(())()"]

In English:
    * You know that you can see 3 possible characters in this string
        1. a letter
        2. (
        3. )
    * you have 2 choices when u see a parenthese, you can either remove it from the solution, or keep it in
    * your goal is to remove as little as possible
    * the brute force is to try all parantheses combinations and then check each if is valid
    and then get the ones that are maximum length and return those.... a lot of brute fore
    * The answer to this question is simply an optimization regular backtracking
    * what you do is you place params in you backtracking function to:
            1. check if string is valid
            2. check if you see a valid string longer than the longest you've seen so far

Time Complexity:
    O(2^N)
Space Complexity:
    O(N) . We have to go to a maximum recursion depth of NN before hitting the base case. Note that we are not considering the space required to store the valid expressions. 
    We only count the intermediate space here.
*/

var removeInvalidParentheses = function(s) {
    if(s.length<1){
        return [""];
    }
    let res = new Set();
    let minIgnored = s.length;//this helps you only keep the longest in the set
    bt(0,0,0,"",0)
    return Array.from(res);//important method
    
    function bt(i,lCount,rCount,curr,numIgnored){
        if(i===s.length){
            if(lCount===rCount && numIgnored <= minIgnored){//if left is != to right, the parentheses are invalid
                if(numIgnored < minIgnored){//if you see a longer valid answer you can get rid of all prev solutions
                    res = new Set();
                    minIgnored = numIgnored;
                }
                res.add(curr);
            }
            return;
        }
        else{
            if(s[i]==='('){//you either ignore or add the (
                bt(i+1,lCount+1,rCount,curr+'(',numIgnored);
                bt(i+1,lCount,rCount,curr,numIgnored+1);
            }else if(s[i]===')'){
                if(rCount+1 <= lCount){//if you have more rights than lefts this string is invalid
                    bt(i+1,lCount,rCount+1,curr+')',numIgnored);
                }
                bt(i+1,lCount,rCount,curr,numIgnored+1);
            }else{//if s[i] is a letter
                bt(i+1,lCount,rCount,curr+s[i],numIgnored);
            }
        }
    }
};

//console.log(removeInvalidParentheses("()())()"));

/*
Q: Combination sum
    Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

    The same repeated number may be chosen from candidates unlimited number of times.   

In English:
    * The hard part of this problem is that the number can be repeated
    * you solve this by decision making, you can either choose to include the current number or not

Time Complexity:
    * O((n+k)!), where n is the size of candidates, and k is the max repeated times for each candidates

Space Complexity:
    * space complexity O(m) where m is the size of array for the solution.
Resources:

*/
function combinationSum(candidates, target) {
    candidates.sort((a, b) => a - b);//this helps because you'd max out your sum faster
  
    var length = candidates.length;
    var res = [];
    search(0, [], target);
    return res;
  
    function search(idx, prefix, target) {
      if (target === 0) res.push(prefix.slice());
      if (idx === length) return;
      if (target <= 0) return;
  
      prefix.push(candidates[idx]);
      search(idx, prefix, target - candidates[idx]);//for some reason this is a hell of a lot faster than the for loop 89% vs 20%
      prefix.pop();
      search(idx + 1, prefix, target);
    }
  };