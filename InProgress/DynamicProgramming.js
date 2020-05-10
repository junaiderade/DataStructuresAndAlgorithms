/*
Uses:
    * The 2 conditions where you use dynamic programming are overlapping subproblems and optimal substructure
    * dynamic programming is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, 
    solving each of those subproblems once, and storing their solutions
    * a problem is said to have overlapping subproblems if it can be broken down into subproblems which are resused several times. 
    It means we can break one problem down into smaller pieces, but some of those pieces are reused again.
    * a problem is said to have optimal substructure if an optimal solution can be constructed from optimal solutions of its subproblems
    * Basically when you are using previous solutions to build the next that's dp, keeping track of previous solutions so you dont have to recalculate

General method:
    * memoization is storing the results of expensive function calls and returning the cached result when the same inputs occur again
    * u only look at the amount of times u calculate a value. Not the amount of times u look a value up. Because remember, 
    looking a value up is constant time. It doesnt make a difference in the grand scheme of things.
    * tabulation is the other flavor of dynamic programming, it is usually done by storing the result of a previous reult in a “table” (using an array)
        * usually done thru iteration
        * better space complexity can be achieved using tabulation

*/