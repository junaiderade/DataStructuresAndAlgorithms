/*
Description:
    * Last in First out data structure
    * You can use the built in JS array to replicate this  
*/
let stack = [];
stack.push(1);//time: O(1)
stack.push(2);
stack.push(3);
let peek = stack[0];//time: O(1)
stack.pop();

/*
Q: Decode String
    Given an encoded string, return its decoded string.
    The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.
    You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.
    Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].
    s = "3[a]2[bc]", return "aaabcbc".
    s = "3[a2[c]]", return "accaccacc".
    s = "2[abc]3[cd]ef", return "abcabccdcdcdef".

In English:
    Basically you want to use 2 stacks one to keep track of strings and one to keep track of numbers.
    when you see a number you push it to the number stack
    when you see a letter you keep add it to res, which is the current string
    when you see a '[', you push your current string to the stack and reset the current string to ''
    when you see a ']' you pop from ur string stack and add res to it the number of times which you get from popping from you rnumber stack
    then you set res to the popped string after its been modified

Time Complexity:
    O(N) becuase you essentially visit each character one and add it and pop it from a stack

Space Complexity:
    O(N) because the size of each stack will not exceed n

*/

var decodeString = function(s) {
    let counts = [];
    let result = [];
    let res = "";
    let idx  = 0;
    while(idx < s.length){//There r 4 types of characters u'll see. Numbers, letters, and brackets
        console.log(counts,result,res,idx)
        if(s[idx] >= '0' && s[idx] <='9'){//the last number u saw is how much u should multiply res by next time you see a ']'
            let count = 0;
            while(s[idx] >= '0' && s[idx] <='9'){ //to account for a number like 361
                count = 10 * count + (s[idx]-0);
                idx++;
            }
            counts.push(count);
        }else if (s[idx] === '['){//even if you saw a [ inside a [ then it would push the current result to the stack and build a new one!
            result.push(res);
            res = "";
            idx ++;
        }else if (s[idx] === ']'){//when u see closing bracket u know it's time to pop the last res and idx
            let poppedStr = result.pop();
            let poppedCount = counts.pop();
            for(let i = 0;i<poppedCount;i++){
                poppedStr+=res;
            }
            res = poppedStr
            idx++;
        }else{
            res += s[idx];
            idx ++;
        }
    }
    return res;
};

//console.log(decodeString("3[a2[c]]"));

/*
Q: Asteroid Collision
    We are given an array asteroids of integers representing asteroids in a row.
    For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). 
    Each asteroid moves at the same speed.
    Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. 
    If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

In English:
    * The simple thing about this problem is that collisions result in the existence of one of the original and the destruction of the other.
    * You use the stack to keep track of the current asteroid.
    * Remember and asteroid going <- and and asteroid going -> cannont collide. only -> <- can collide
    * if the asteroid you're on is CURRENTLY not colliding with anything then push to stack (asteroids going right aren't colliding until you see
    the counterpart on the left)
    * when  you see a negative and you look at ur stack and there is a positive asteroid there are 2 choices
        1. if positive is bigger dont add it to the stack and keep going (u return the stack at the end)
        2. if negative is bigger pop from the stack and keep going, dont increment i so u can pop off more smaller positive asteroids
        3. if theyre the same size pop off from stack and increment i


Time Complexity:
    O(n) because you are iterating over each element and popping or pushing once. This is linear.

Space Complexity:
    O(n) because the stack can be the size of the original array worst case.

*/

var asteroidCollision = function(a) {
    let i = 0;
    let stack = [];
      
    while (i < a.length) {
        //console.log(stack);
      if (a[i] >= 0 || !stack.length || stack[stack.length - 1] < 0) { 
        stack.push(a[i++]);//remember, this increments AFTER operation
      } else if (a[i] + stack[stack.length - 1] < 0) { // current negative is bigger than previous positive
        stack.pop();
      } else if (a[i] + stack[stack.length - 1] === 0) { // same size
        stack.pop();
        i++;
      } else { // current negative is smaller than previous positive
        i++;
      }
    }
    
    return stack;
  };

  console.log(asteroidCollision([10, 2, -5]));


  /*
Q: Simplify Path
    Given an absolute path for a file (Unix-style), simplify it. Or in other words, convert it to the canonical path.
    In a UNIX-style file system, a period . refers to the current directory. Furthermore, a double period .. moves the directory up a level.
    Note that the returned canonical path must always begin with a slash /, and there must be only a single slash / between two directory names. 
    The last directory name (if it exists) must not end with a trailing /. Also, the canonical path must be the shortest string representing the absolute path.

In English:

    * This question really only confused me because I didnt know what to expect in the output lol
    * this helps lol https://superuser.com/questions/153165/what-does-represent-while-giving-path
    * 

Time Complexity:
  O(N)

Space Complexity:
  O(N)

*/
  var simplifyPath = function(path) {
    let stack = [];
    path = path.split('/');
    
    for (let i=0;i<path.length;i++) {//you start from the front
        console.log(stack);
        if (path[i]=='.' || path[i]=='') continue;//because . just means ur in the same directory
        if (path[i]=='..') stack.pop();//..means you go to the parent directory
        else stack.push(path[i]);
    }
    
    return '/'+stack.join('/');//you need a / at the front
};
/*
Q:Basic Calulator

    Implement a basic calculator to evaluate a simple expression string.
    The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .

In English:

    * this question isnt totally just about the stack. It works based on the variable result. You only use the stack between parentheses
    * You handle + or - by always multiplying and using addition
    * process:
        1) see a number? while s[i] is a number keep adding to the string of that number
        2) then multiply it by the current sign and add it to result and set result equal to the new sum
        3) see an open parenthese? then push current result and sign to stack to use for later
            * then start building a new result
            * when you see the closing parenthese multily the current result by whatever u pushed to the operation stack
            * then pop from stack and add it

Time Complexity:
    O(N)

Space Complexity:
    O(N)
*/
var calculate = function(s) {
    let result = 0, sign = 1;
    const stack = [], opStack = [];
    
    for(let i = 0; i < s.length; i++){
        console.log(stack);
        console.log(opStack);
        console.log('------');
        const curr = s.charAt(i);
        if(curr === ' '){ 
            continue;
        } else if(curr === '+'){ //switch the current sign
            sign = 1;
        } else if(curr === '-'){ 
            sign = -1;
        } else if(curr >= '0' && curr <= '9'){//this is to handle the case of a number like 167
            let num = curr;
            while(i+1 < s.length && s.charAt(i+1) >= '0' && s.charAt(i+1) <= '9'){
                num += s.charAt(i+1);
                i++;
            }
            result += sign * parseInt(num);//give it the correct sign (this is important because it's how u go forward without the stack)
        } else if(curr === '('){
            stack.push(result);  //save current result for later
            result = 0;  
            opStack.push(sign);//when you see an open parenthese you know that you have to save the last sign you saw for later  
            sign = 1;
        } else if(curr === ')'){
            result = opStack.pop() * result + stack.pop();  //when ur at the end of ur parantheses you can pop what the result was before and either add or subtract
            sign = 1;//reset the sign 
        }
    }
    return result;
};


//"(25+(4+19+3)-10)+(167+8)"
//you passed 27/35 cases, your edge case was multiple digit numbers