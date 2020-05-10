/*
DP Pattern: Min/Max Path to reach a target

Uses:
    Give a target to fin nimimum/maximum cost path/sum to reach target

General method:
    Choose minimum/maximum path among all possible paths before the current state, then add value for current state
    * ex1: routes[i] = min(routes[i-1], routes[i-2], ... , routes[i-k]) + cost[i]
    Generate optimal solutions for all values in the target and return the value for the target.
    * ex2: 
    for (int i = 1; i <= target; ++i) {
        for (int j = 0; j < ways.size(); ++j) {
            if (ways[j] <= i) {
                dp[i] = min(dp[i], dp[i - ways[j]] + cost / path / sum) ;
            }
        }
    }
 
    return dp[target]
*/

/*
Q: Minimum Path Sum
    Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers 
    along its path.

In English:
    * overlapping subproblems: basically you want to find what the min path to grid[i][j] is and set it to that sum
    * then you use that to calculate the next because the index above and to the left r the sum of the 2 previous 
    * important thing to note is you only have 2 options for previous paths (left or above), take the max
    * logic: the path to the current is the current + minimum of previous paths

Time Complexity:
    O(MN) because we only traverse the whole matrix once

Space Complexity:
    O(1) because we use no extra space

*/
var minPathSum = function(grid) { 
    for(let i=0; i<grid.length; i++){
        for(let j = 0;j<grid[i].length;j++){
            //edge cases
            if(i-1<0 && j-1<0){
                continue;
            }
            if(i-1<0){
                grid[i][j]=grid[i][j]+grid[i][j-1];
                continue;
            }
            if(j-1<0){
                grid[i][j]=grid[i][j]+grid[i-1][j];
                continue;
            }
            
            grid[i][j]=Math.min(grid[i][j]+grid[i-1][j],grid[i][j]+grid[i][j-1]);
        }
    }
    
    let len = grid.length;
    return grid[len-1][grid[len-1].length-1];
};

//console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]]))

/*
Q: Coin Change
    You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins
    that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

In English:
    * Watch youtube video by tushar roy
    * basically you use a loop that increments from 0 to amount and you increment by 1 each time.
    * you try each coin at each index with the formula min(dp[i],1 + dp[i-coins[j]])
    * this works because if you didnt find a solution already for amount-j, then adding the 1 coin j wont help u
    * but if j fits, then you take the min of what you already have in there and what you get when you add one coing
    * you default the array to be of length amount + 1 because if u make it amount index 0 messes things up and
      each value is amount because you will never really need more than amount number of coins to make amount because is coin is >=1
    * you DO build the next imputs based off previous

Time Complexity:
    O(S * n) where S is the amount and n is number of coins

Space Complexity:
    O(S) where S is the amount since your array will be as long as S

*/

var coinChange = function(coins, amount) {
    let dp = new Array(amount+1); //if ur amount is 11 then make an array with length of 12 and make each val 12;
    dp.fill(amount+1);
    dp[0] = 0;
    for(let i = 1;i<=amount;i++){//at each amount (starting from 1), test if any coins fit. 
        for(let j = 0;j < coins.length;j++){//loop thru ur coins
            if(coins[j] <= i){ //incase the coin wont fit
                dp[i] = Math.min(dp[i],dp[i-coins[j]]+1);
            }
        }
        console.log(dp);
    }
    console.log('--');
    return dp[amount] > amount ? -1 : dp[amount];
};

//console.log(coinChange([1,2,5],5));