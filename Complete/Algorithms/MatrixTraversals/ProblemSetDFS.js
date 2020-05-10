//Resources: https://algorithms.tutorialhorizon.com/depth-first-search-dfs-in-2d-matrix-2d-array-iterative-solution/

/*
Q:Walls and Gates
    You are given a m x n 2D grid initialized with these three possible values.
    -1 : A wall or an obstacle.
    0 -:A gate.
    INF - Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
    Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

In English:
    * You almost got this one right on your first try!
    * it is a dfs because it goes all the way to the end of the path before seeing a neighbor
    * pay attention to the base care to stop infinite recursion!

Time Complexity:
    O(MN) Once we set a room's distance, we are basically marking it as visited, which means each room is visited at most once. 
    Therefore, the time complexity does not depend on the number of gates and is O(mn)O(mn).

Space Complexity:
    O(MN) because of the recursive call stack

*/
var wallsAndGates = function(rooms) {
    // Check every index in the matrix for a gate
    for (let i = 0; i < rooms.length; i++) {
        for (let j = 0; j < rooms[0].length; j++) {
            if (rooms[i][j] === 0) {
                dfs(rooms, i , j, 0);
            }
        }
    }
};

const dfs = (rooms, col, row, total) => {
    // Here is the boundaries for the matrix. If you enter this point in the 
    // matrix, just return out of it. 
    if (col < 0 || col >= rooms.length || row < 0 || row >= rooms[0].length) return;
    
    // If we hit a wall, or if we already reached this point with a lower 
    // count to the nearest gate, than return out of this
    if (rooms[col][row] === -1 || rooms[col][row] < total) {//you dont want to update a distance with a longer one
        return;
    } else {
        // update the point with the new total
        rooms[col][row] = total;
    }
    
    // check your left, right, up, down
    dfs(rooms, col + 1, row, total + 1);
    dfs(rooms, col - 1, row, total + 1);
    dfs(rooms, col, row + 1, total + 1);
    dfs(rooms, col, row - 1, total + 1);
}

/*
Q: Number of islands
    Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by 
    connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

In English:
    * This is a classic array DFS. You go all the way down a path before exploring neighbors. Note your base case here is achieved by
    reseting a value in a matrix

Time Complexity:
    O(M*N) 

Space Complexity:
    O(min(N,N)) because that's how much the size of the queue can grow to

*/
var numIslands = function(grid) {
    let count = 0;
    
    for(let i = 0;i < grid.length;i++){
        for(let j = 0;j < grid[i].length;j++){
            if(grid[i][j]==='1'){
                if1(i,j);
                count++;
            }
        }
    }
    
    console.log(grid);
    return count;
    
    function if1(i,j){
        if(i < 0 || i > grid.length-1){
            return;
        }
        if(j < 0 || j > grid[i].length-1){
            return;
        }
        if(grid[i][j]==='1'){
            grid[i][j]='0';
            if1(i+1,j);
            if1(i-1,j);
            if1(i,j+1);
            if1(i,j-1);
        }
    }
    
};