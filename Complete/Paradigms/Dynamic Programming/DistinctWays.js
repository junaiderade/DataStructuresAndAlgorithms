/*
Uses:
    Given a target find a distinct number of ways to reach the target
General method:
    Sum all possible ways to reach the current state
    * ex1: routes[i] = routes[i-1] + routes[i-2], ... , + routes[i-k]
    Generate sum for all values in the target and return the value for the target.
    * ex2: 
    for (int i = 1; i <= target; ++i) {
        for (int j = 0; j < ways.size(); ++j) {
            if (ways[j] <= i) {
                dp[i] += dp[i - ways[j]];
            }
        }
    }
    return dp[target]   

*/

/*
Q: Unique Paths
    A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
    The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
    How many possible unique paths are there?

In English:
    to find the number of paths at arr[i][j] the answer is the number of paths for the cell above and the cell to the left.
    for your starting points you know there's only 1 path to get there

Time Complexity:
    O(M*N) because you iterate over an M * N array

Space Complexity:
    O(M*N) because you build an M * N array

*/

var uniquePaths = function(m, n) {
    let arr = new Array(m);
    for(let i = 0;i<m;i++){
        arr[i] = new Array(n).fill(1);
    }
    
    for(let i = 1;i<m;i++){
        for(let j = 1;j<n;j++){
            arr[i][j] = arr[i-1][j] + arr[i][j-1];
        }
    }
    return arr[m-1][n-1];  
};

/*
!Q: Number of Dice Rolls With Target Sum
    You have d dice, and each die has f faces numbered 1, 2, ..., f.
    Return the number of possible ways (out of fd total ways) modulo 10^9 + 7 to roll the dice so the sum of the face up numbers
    equals target.

In English:
    As an initial example, pretend we have 5 dice with 6 faces each and we want to determine how many ways to make 18.
    In other words, what is dp(5, 6, 18)?

    At first glance, this is seems difficult and overwhelming. But if we make one simple observation, we can reduce this big problem into several smaller sub-problems. 
    We have 5 dice, but let's first just look at ONE of these dice (say the last one). This die can take on f different values (1, ... , f), 
    so we can consider what happens when we fix its value to any of these possibilities. In this case, f= 6.

    Case 1: The last die is a 1. The remaining 4 dice must sum to 18-1=17. This can happen dp(4, 6, 17) ways.
    Case 2: The last die is a 2. The remaining 4 dice must sum to 18-2=16. This can happen dp(4, 6, 16) ways.
    Case 3: The last die is a 3. The remaining 4 dice must sum to 18-3=15. This can happen dp(4, 6, 15) ways.
    Case 4: The last die is a 4. The remaining 4 dice must sum to 18-4=14. This can happen dp(4, 6, 14) ways.
    Case 5: The last die is a 5. The remaining 4 dice must sum to 18-5=13. This can happen dp(4, 6, 13) ways.
    Case 6: The last die is a 6. The remaining 4 dice must sum to 18-6=12. This can happen dp(4, 6, 12) ways.

    dp(5, 6, 18) = dp(4, 6, 17) + dp(4, 6, 16) + dp(4, 6, 15) + dp(4, 6, 14) + dp(4, 6, 13) + dp(4, 6, 12)

    We sum up the solutions for each of these 6 cases to arrive at our result. Of course, each of these cases branches off into 6 cases 
    of its own, and the recursion only resolves when d=0. The handling of this base case is explained below.


    The general relation is:
        dp(d, f, target) = dp(d-1, f, target-1) + dp(d-1, f, target-2) + ... + dp(d-1, f, target-f)
    The base case occurs when d = 0. We can make target=0 with 0 dice, but nothing else.
        So dp(0, f, t) = 0 iff t != 0, and dp(0, f, 0) = 1.

    Use memoization to avoid repeated calculations and don't conisider negative targets.

    Synopsis:

        Take the top-down solution with memoization and turn it upside-down, starting at the base case, and building upon it, 
        one dice as a time.

        Base case: with 0 dice, there is 1 way to reach target of 0. With 0 dice, for all target values > 0, there are 0 ways to reach 
        each of those targets. The default value 0 is used when constructing a vector of integers, so only explicitly set dp[0][0] = 1.
        Recurrence relation: with i dice, the number of ways to reach j target is equal to the number of ways with one less die to reach 
        the target j minus each possible f face value of the current die.
        Optimizations:

        if j-k < 0, then the target has been surpassed, there is no need to further iterate through the remaining k values of f since 
        k is monotonically increasing only the previous row's values are needed to calculate the current row's values

Time Complexity:
    O(d * t * f);

Space Complexity:
    O(d * t);
*/

function numRollsToTarget (d, f, t) {
    let dp = [...Array(d + 1)].map(() => Array(t + 1).fill(0));
    dp[0][0] = 1;//each index corresponds to the number of ways you can get to that position
    for (let i=1; i <= d; i++)//number of dice
        for (let j=1; j <= t; j++)//amount
            for (let k=1; k <= f; k++)//number of sides
                if (j - k >= 0)//current amount has to be greater than or equal to the number on current side
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - k]) % (1e9 + 7);//how many ways witht he previous die could you reach this amount before adding the current die
    console.log(dp);
    return dp[d][t];
};

//console.log(numRollsToTarget(2,6,7));//2 dice, 6 sides each, how many ways to reach a sum of 7?

/*
Q: Decode Ways
    A message containing letters from A-Z is being encoded to numbers using the following mapping:

    'A' -> 1
    'B' -> 2
    ...
    'Z' -> 26
    Given a non-empty string containing only digits, determine the total number of ways to decode it.

In English:
    * This problem is really climbing stairs or house robber in disguise and you almost! got it right on your first try!! had the right idea but not code :(
    * This style is called bottom up processing
    * at each index you have to look at 2 numbers to decode s[i] & s[i]+s[i-1] for ex: if you had 122 and i was 1, the you gott look at 2 & 22
    * so you look at how many ways you could get to an index using s[i] & s[i]+s[i-1] separately so build a DP array
    * what tripped u up is thinking you have to not just add the previous 2 but add 2 more ways on top of that to account for each but that's not the case

Time Complexity:
        O(N)

Space Complexity:
        O(N)

Resources: Kevin Naughton Video

*/

var numDecodings = function(s) {
    let dp = new Array(s.length+1).fill(0);//you need to know how many ways you can get to the length, not length -1
    dp[0] = 1; //if you have no input string your result is "" which is 1 way
    dp[1] = s[0] === '0' ? 0 : 1; //as long as your s is of length 1 and it is not = to 0, you can get to it 1 way
    for(let i = 2;i <=s.length;i++){
        let oneDigit = parseInt(s.substring(i-1,i)); //you do i-1 because in the string the second letter is idx 1 
        let twoDigits = parseInt(s.substring(i-2,i));
        console.log(oneDigit,twoDigits);
        if(oneDigit >= 1){
            dp[i]+=dp[i-1];//see how many ways you can get there if the one digit is valid
        }
        if(twoDigits >=10 && twoDigits <= 26){
            dp[i]+=dp[i-2];//see how many ways you can get there if 2 is valid
        }
    }
    console.log(dp);
    return dp[s.length];
};

console.log(numDecodings("122612"))