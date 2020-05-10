/*
Uses:
    General problem statement for this pattern can vary but most of the time you are given two strings where lengths of those strings are not big
    Given two strings s1 and s2, return some result.
General method:
    * Most of the problems on this pattern requires a solution that can be accepted in O(n^2) complexity.

        // i - indexing string s1
        // j - indexing string s2
        for (int i = 1; i <= n; ++i) {
        for (int j = 1; j <= m; ++j) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = <code>;
                } else {
                    dp[i][j] = <code>;
                }
            }
        }

    * If you are given one string s the approach may little vary

        for (int l = 1; l < n; ++l) {
        for (int i = 0; i < n-l; ++i) {
            int j = i + l;
            if (s[i] == s[j]) {
                dp[i][j] = <code>;
                } else {
                    dp[i][j] = <code>;
                }
            }
        }
*/

/*
Q: Longest Common Subsequence

In English:

    Tushar roy video on this is pretty gold
    You use DP to build a matrix which compares text1 and text 2 by character
    ex:
          a,b,c,d,a,f
        a 1 1 1 1 1 1 
        c 1 1 2 2 2 2
        b 1 2 2 2 2 2
        c 1 2 3 3 3 3
        f 1 2 3 3 3 4
    * there is a col and row of zeros u just didnt include to help with the visual
    * when you fill a particular point in a matrix you have to ask youself if the letter in the row matches letter in column
        * ex: when you get to c you are seeing what is the max common substring u can get matching text1 with ONLY a and c
    * if chars dont match:
        make [i][j] the max of [i-1][j] and [i][j-1]
    * if chars do match:
        make [i][j] [i-1][j-1]+1

Time Complexity:
        * O(MN) where M is text1 & N is text2

Space Complexity:
        * O(MN) because you create a DP matrix
        * if you want you can optimize the space complexity more because if you think abt it ur just looking at one row at a time

*/

var longestCommonSubsequence = function(text1, text2) {
    let dp = [];
    for(let i = 0;i<text1.length+1;i++){
        dp.push(new Array(text2.length+1).fill(0));
    }
    text1='X'+text1;//to make indexes match for the for loop, you could alternatively do -1 & j-1 in your index calls
    text2='X'+text2;
    for(let i = 1;i<text1.length;i++){ //character in text1
        for(let j = 1;j<text2.length;j++){//character in text2
            if(text1[i]===text2[j]){
                dp[i][j]=dp[i-1][j-1]+1;
            }else{
                dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);
            }
        }
    }
    //console.log(dp);
    return dp[text1.length-1][text2.length-1];
};

//console.log(longestCommonSubsequence("hofubmnylkra","pqhgxgdofcvmr"));

/*
Q: Longest Palindromic Subsequence
    Given a string s, find the longest palindromic subsequence's length in s. You may assume that the maximum length of s is 1000.

In English:
    * Tushar Roy has a very good video on this as well
    * You use another dp array to build the answers which you will reuse
    * the indexes of the matrix correspond to intervals. for ex: longest palindrome len within s[0]->s[5] will be denoted as m[0][5]
    * so since u go by interval when you do see an i and j that match you just go one left above to find the interval
    it sandwhiches and add the value of that ([i+1][j-1])
    * if i and j dont match you add the maximum of the intervals which are inclusive (not the sandwich)
    * the dp array is built bottom up

Time Complexity:
    O(MN)
Space Complexity:
    O(MN)
*/

var longestPalindromeSubseq = function(s) {
    let dp = []
    for(let i = 0;i<s.length;i++){
        dp.push(new Array(s.length).fill(0));
    }
    
    for(let i = s.length-1;i >=0;i--){//starts from the right
        dp[i][i]=1;
        for(let j = i +1;j<s.length;j++){//first time around you dont do shit
            if(s[i]===s[j]){
                dp[i][j]=dp[i+1][j-1]+2;//you look at the length of the max palindrome between the interval of i,j: [0][5] -> [1][4], exclusive
            }else{
                dp[i][j]=Math.max(dp[i+1][j],dp[i][j-1]) //[0][5] -> max([1][5],[0][4]) these are the 2 intervals in between inclusive
            }
        }
        console.log(dp);
        console.log('-----------'+i);
    }
    return dp[0][s.length-1];
};

//longestPalindromeSubseq('agbdba')
//longestPalindromeSubseq('bbbab')