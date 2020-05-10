/*
Uses: 
    * The general problem statement for this pattern is for given situation decide whether to use or not to use the current state. So, the problem requires you to make a decision at a current state.
    * Given a set of values find an answer with an option to choose or ignore the current value.
    
General method:
    * If you decide to choose the current value use the previous result where the value was ignored; vice-versa, if you decide to ignore the current value use previous result where value was used.
    // i - indexing a set of values
    // j - options to ignore j values
    for (int i = 1; i < n; ++i) {
    for (int j = 1; j <= k; ++j) {
        dp[i][j] = max({dp[i][j], dp[i-1][j] + arr[i], dp[i-1][j-1]});
        dp[i][j-1] = max({dp[i][j-1], dp[i-1][j-1] + arr[i], arr[i]});
    }
    }
*/

/*
Q:House Robber
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each 
of them is that adjacent houses have security system connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given a list of non-negative integers representing the amount of money of each house, determine the maximum amount of money you can rob tonight without alerting the police.    

In English:
    You use a dp array and for each house you get the max of how much you can make at that house and not include the previous and the previous

Time Complexity:
    O(N) because this a single for loop and linear

Space Complexity:
    O(N) because you have a dp array

*/

var rob = function(nums) {
    if(!nums.length){
        return 0;
    }
    let dp = [];
    dp[0]=nums[0];
    dp[1]=Math.max(nums[0],nums[1]);
    for(let i = 2;i<nums.length;i++){
        dp[i]=Math.max(dp[i-2]+nums[i],dp[i-1]);
    }
    return dp[nums.length-1];
};

/*
Q: Best Time to Buy and Sell Stock
    Say you have an array for which the ith element is the price of a given stock on day i.
    If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.
    Note that you cannot sell a stock before you buy one.

In English:

    you set a var called buy to prices[0] and loop thru the array.
    if you see a number greater than buy than u use math.max to comapre that to ur current profit and reset it
    if buy is greater than a current number then that means you see a cheaper price so you reset buy to prices[i]

Time Complexity:
    O(N)
    
Space Complexity:
    O(1)

*/
function maxProfit(prices) {
        let buy = prices[0];
        prices[0] = 0; 
        let profit = 0; 
        for(let i = 1; i < prices.length; i++){
            if(buy > prices[i]){ //if the price u buy it at is greater than the price listed at that day then u know u shouldnt have bought it at that price
                buy = prices[i];//so you buy it at the lower price
                prices[i] = 0;//you are changing the array as you go
            } else {
                profit = Math.max(prices[i]-buy, profit);//you are comparing profit each time 
            }//if prices[i] = 0, profit wont change
        }
        return profit;
    };