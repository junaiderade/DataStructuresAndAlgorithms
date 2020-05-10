/*
Description:

Uses:

Documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

Functions:
    .localeCompare(b)

*/


/*
Q: Minimum Remove to Make String Valid
    Given a string s of '(' , ')' and lowercase English characters. 
    Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.
    Formally, a parentheses string is valid if and only if:
        It is the empty string, contains only lowercase characters, or
        It can be written as AB (A concatenated with B), where A and B are valid strings, or
        It can be written as (A), where A is a valid string.    

In English:

    You can do this with stacks too but cleaner solution is w/ string. 
    You go left to right and add to an empty string everything except excess closing parentheses
    You then go right to left and add to an empty string everythign except excess open parentheses

Time Complexity:
    O(N) because you have 2 for loops and hit each character twice at most no matter the length. Linear.

Space Complexity:
    O(N) because you make 2 extra strings which can both be s.length long

*/

var minRemoveToMakeValid = function(s) {
    let res = "";
    let open = 0;
   for(let i of s){
       if(i == '('){
           open++;
       }else if (i == ')'){
           if(open===0){//checks for excess closing parentheses
               continue;
           }
           open--;
       }
       
        res+=i;//build string left to right
   }
   
   let res2 = "";
   for(let i = res.length-1;i >= 0;i--){//loop backwards
       if(res[i]==='(' && open > 0){//checks for excess opening parantheses
           open--;
           continue;//u don't wanna add any excess to string
           
       }
       res2=res[i]+res2;//build string right to left
   }
   
   return res2;
};

/*
Q:Longest Palindromic Substring
    Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

In English:

    You use a technique called "expand around center". This lets you check a multitude of strings as you traverse. Even and odd.
    You essentially use the palindrom technique and expand your pointers.

Time Complexity:
    O(N)^2 because for each element you can max scan the whole array twice which is 2n * n = O(N)^2

Space Complexity:
    O(1) because you only keep track of pointers
*/


var longestPalindrome = function(s) {
    let longest = '';
    for(let i = 0;i<s.length;i++){
        bt(i,i);//expand around center (odd length)
        bt(i,i+1);//go left and right (even length)
    }
    return longest;
    
    function bt(low,high){
        while(low >= 0 && high<s.length && s[low]===s[high]){
            if((high-low+1)>longest.length){//no need to use Math.max because of htis
                longest = s.substring(low,high+1);
            }
            high++;
            low--;
        }
    }
    
};

/*
Q: Integer to English Words
    Convert a non-negative integer to its english words representation. Given input is guaranteed to be less than 231 - 1.

In English:

    This works using an array to store the value at a digit and by basically caluclating 3 digits and then adding 'Billion" or 'Million' or 'Thousand'
    If you think about actual integers to english words then you know it's the same pattern for every set of 3 digits 
    So you get the string for 3 digits right most and do it in multiples of 3 until u reach the start of the array
    key thing here is to get remainder 1000
    You use recursion in the conversion function

Time Complexity:
    O(N). Intuitively the output is proportional to the number N of digits in the input.

Space Complexity:
    O(1) since output is just one string

*/

const LESS_THAN_20 = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const THOUSANDS = ["", "Thousand", "Million", "Billion"];

var numberToWords = function(num) {
    if(num === 0) {//edge case
        return 'Zero';
    }
    let thousandCounter = 0;
    let result = '';
    
    while(num > 0) {
        if(num % 1000 != 0) {
            result = numToString(num % 1000) + THOUSANDS[thousandCounter] + ' ' + result;//%1000 gets the last 3 digits the way %10 gets the last digit
        }
        num /= 1000;
        num = Math.trunc(num);//takes any decimal off
        thousandCounter++;
    }
    return result.trim();//important to remember this function
};

function numToString(num) {//uses recursion
    if (num === 0)
        return '';
    else if (num < 20)
        return LESS_THAN_20[num] + " ";
    else if (num < 100)
        return TENS[Math.trunc(num / 10)] + " " + numToString(num % 10);
    else
        return LESS_THAN_20[Math.trunc(num / 100)] + " Hundred " + numToString(num % 100);
}
/*
Q: Verifying Alien Dictionary
    In an alien language, surprisingly they also use english lowercase letters, but possibly in a different order. The order of the alphabet is some permutation of lowercase letters.

    Given a sequence of words written in the alien language, and the order of the alphabet, return true if and only if the given words are sorted lexicographicaly in this alien language.

    Example 1:

    Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
    Output: true
    Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.

In English:

    in this solution you just used the indexOf method in array but you could also use a hashmap to do the same thing
    you just compare the index in order for each letter of adjacent strings to make sure they are sorted lexographically 

Time Complexity:
    O(C) where C is the total content of words

Space Complexity:
    O(1)
*/
var isAlienSorted = function(words, order) {
    
    for(let i = 0; i < words.length-1; i++) {
        let length = Math.max(words[i].length, words[i+1].length);
        
        for(let j = 0; j < length; j++) {
            let a = order.indexOf(words[i][j]);
            let b = order.indexOf(words[i+1][j]);
         
            if(b < a) return false;
            else if(b > a)
                break;
            //if the value of the letters is equal, then continue
        }
    }
    return true;
};
/*
Q: Add Strings

In English:

    Do it how you would do regular addition. start from the end and if a carry is needed then add one.
    Basically when one string ends you just set the other to 0 and continue to add carry.

Time Complexity:
    O(N) where N is the length of the longer string

Space Complexity:
    O(1)

*/
var addStrings = function(num1, num2) {
    let i = num1.length-1; //4
    let j = num2.length-1; //2
    let carry = 0;
    let ret = "";
    while(i >= 0 || j >= 0){
        let n1 = 0;
        let n2 = 0;
        if(i>=0){
            n1 = parseInt(num1[i]);
        }
        if(j>=0){
            n2 = parseInt(num2[j]) 
        }
        let sum =  n1 + n2 + carry;
        
        if(sum>9){
            carry = 1;
            sum -=10;
        }else{
            carry = 0;
        }
        
        ret=sum+ret;
        i--;
        j--;
    }
    
    if(carry === 1){
        ret = '1' + ret;
    }
    
    return ret; 
    
};
//12345
//  890
//13235
