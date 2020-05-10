//Resources: https://algorithms.tutorialhorizon.com/breadth-first-search-bfs-in-2d-matrix-2d-array/

/*
!Q:Walls and Gates
    You are given a m x n 2D grid initialized with these three possible values.
    -1 : A wall or an obstacle.
    0 -:A gate.
    INF - Infinity means an empty room. We use the value 231 - 1 = 2147483647 to represent INF as you may assume that the distance to a gate is less than 2147483647.
    Fill each empty room with the distance to its nearest gate. If it is impossible to reach a gate, it should be filled with INF.

In English:

    * You almost got this one right on your first try!
    * it is a bfs because you are looking at all of a gate's neighbors before going down to the ends
    * pay attention to the base care to stop infinite recursion!
    * we initiate breadth-first search (BFS) from all gates at the same time. Since BFS guarantees that we search all rooms of distance d 
    * before searching rooms of distance d + 1, the distance to an empty room must be the shortest.

Time Complexity:
    O(MN) Once we set a room's distance, we are basically marking it as visited, which means each room is visited at most once. 
    Therefore, the time complexity does not depend on the number of gates and is O(mn)O(mn).

Space Complexity:
    O(MN) because of the queue
*/

var wallsAndGates = function(rooms) {

    var EMPTY = 2147483647;
    var GATE = 0;
    var DIRECTIONS = [[1,  0], [-1,  0], [0,  1], [0, -1]];
    
    var m = rooms.length;
    if (m == 0) return;
    var n = rooms[0].length;
    var q = [];
    for (var row = 0; row < m; row++) {
        for (var col = 0; col < n; col++) {
            if (rooms[row][col] == GATE) {
                q.push([row, col]);
            }
        }
    }
    while (q.length > 0) {//this works because you never push to the queue if you've changed a value
        var point = q.shift();
        var rw = point[0];
        var cl = point[1];
        DIRECTIONS.forEach(function(direction) {
            var r = rw + direction[0];
            var c = cl + direction[1];
            if (r < 0 || c < 0 || r >= m || c >= n || rooms[r][c] != EMPTY) {//check edge cases
                return;
            }
            rooms[r][c] = rooms[rw][cl] + 1;//the order the queue shifts from matter
            q.push([r, c]);
        });
    }
}

/*
!Q: Rotting Oranges

In English:
    Classic BFS question for a matrix, works very similarly to one above

Time Complexity:
    O(N)

Space Complexity:
    O(N)

*/

var orangesRotting = function(grid) {
    let queue = [];
    let minutes = 0;
    let fresh = 0;
    for (let i=0;i<grid.length;i++) {
        for (let j=0;j<grid[0].length;j++) {
            if (grid[i][j]==1) fresh++;
            if (grid[i][j]==2) queue.push([i, j]);//creates your starting queue, works based off of the rotting oranges
        }
    }

    while (queue.length!=0 && fresh) {
        let dR = [0,-1,0,1];
        let dC = [-1,0,1,0];
        
        let next = [];
        while (queue.length!=0 ) {//this is the real bfs
            let current = queue.shift();
            for (let i=0;i<dR.length;i++) {
                let nR = current[0]+dR[i];
                let nC = current[1]+dC[i];
                if (nR>=0 && nC>=0 && nR<grid.length && nC<grid[0].length) {
                    if (grid[nR][nC]==1) {
                        grid[nR][nC]=2;
                        fresh--;//one less fresh orange
                        next.push([nR,nC]);//build up the next queue of rotting oranges!
                    }
                }
            }
        }
        minutes++;
        queue = next;//you reset queue to next level!
    }

    return fresh==0?minutes:-1;
};