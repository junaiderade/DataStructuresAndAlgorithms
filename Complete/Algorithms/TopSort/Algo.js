/*
In English:

    * It is a linear ordering of vertices such that for every directed edge uv,
    u comes before v. It only works on a directed a cyclic graph (no cycles).\
    * Top Sort vs Depth First Traversal:
        * in DFS we print a vertex and then recursively call DFS for its adjacent vertices. 
        * n topological sorting, we need to print a vertex before its adjacent vertices. 
    * Example:
    5 ---->0 <-----4
    |              |
    v              v
    2 ---->3------>1         
        * top sort: 5 4 2 3  0 || 4 5 2 3 1 0
        * a dfs would be 5 2 3 1 0 4

Time Complexity:
    O(|V| + |E|) which is the same as DFS because this is essentially DFS woth an extra stack

Space Complexity:

Resources:
    * Helpful Article: https://www.tutorialspoint.com/Topological-sorting-using-Javascript-DFS
*/

class DirectedGraph{
    constructor(n){
        this.numVertices = n;
        this.adjList = new Map();
    }
    addVertex(v){
        this.adjList.set(v,[]);
    }
    addEdge(v1,v2){//this graph is directed because you set one connection
        this.adjList.get(v1).push(v2);
    }
    topSort(){
        let stack = [];
        let visited = new Set();
        for(let node of this.adjList.keys()){
            if(!visited.has(node)){
                console.log('in loop '+ node);
                this.topSortHelper(node,visited,stack);
            }
        }
        while(stack.length){
            console.log(stack.pop());
        }
    }
    topSortHelper(node,visited,stack){//very similar to a dfs
        console.log(node,visited,stack);
        visited.add(node);
        let next = this.adjList.get(node);
        for(let i of next){
            if(!visited.has(i)){
                this.topSortHelper(i,visited,stack);
            }
        }
        stack.push(node);
    }
}
let dr = new DirectedGraph(6);
dr.addVertex(5);
dr.addVertex(4);
dr.addVertex(3);
dr.addVertex(2);
dr.addVertex(1);
dr.addVertex(0);
dr.addEdge(2,3);
dr.addEdge(3,1);
dr.addEdge(4,0);
dr.addEdge(5,0);
dr.addEdge(5,2);
dr.addEdge(4,1);
dr.topSort();





