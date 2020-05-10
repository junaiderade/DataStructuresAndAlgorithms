/*
In English:
    * works very similarly to a dfs in a tree. You go all the way down a path before visiting neighbors.
    * The stack is also dfs because it always pops from the end which results in you finishing a path before seeing all neighbors
    * graphs may contain cycles, so we may come to the same node again. To avoid processing a node more than once, we use a visited hashset.
    * The below code traverses only the vertices reachable from a given source vertex.
    * Uses a stack. Actual stack or call stack.
    * You can have muliple of the same node of the stack at the same time but you'll never process a node twice
        * ex: A has B C and D as neighbors, you then have a stack of [B,C,D] and if D has just C as a neighbor then it is [B,C,C]

Time Complexity:
    * O(|E| + |V|) where E is number of edges and V is number of vertices. For an undirected graph each edge will occur twice
    so it would be O(2 * |E| + |V|).

Space Complexity:
    * O(|V|)

Resources:
    * https://www.geeksforgeeks.org/implementation-graph-javascript/

*/

class Graph{
    constructor(n){
        this.numVertices = n;
        this.adjList = new Map();
    }
    addVertex(v){
        this.adjList.set(v,[]);
    }
    addEdge(v1,v2){//this graph is only undirected because you set both connections
        this.adjList.get(v1).push(v2);
        this.adjList.get(v2).push(v1);
    }
    dfs(startNode){//go all the way down a path before visiting neightbors
        let visited = new Set();
        this.dfsUtil(startNode,visited);
    } 
    dfsUtil(node,visited){
        visited.add(node);
        console.log(node);
        let neighbors = this.adjList.get(node);
        for(let neighbor of neighbors){
            if(!visited.has(neighbor)){
                this.dfsUtil(neighbor,visited);
            }
        }
    }
    dfsIterative(startNode){
        const stack = [startNode];
        const result = [];
        const visited = new Set();
        visited.add(startNode);
        while(stack.length){
            console.log(stack);
            let current = stack.pop();
            result.push(current);
            let neighbors = this.adjList.get(current);
            for(let neighbor of neighbors){
                if(!visited.has(neighbor)){
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            }
        }
        console.log('result: '+result);
    }
}

/*
Test:
------------------------------------------------
*/
/*
         bcn ---maa
         |
sha --- atl --- nyc
  |------ |      
         tyo      
          |
          mow
*/
let flights = new Graph(7);
flights.addVertex('atl');
flights.addVertex('nyc');
flights.addVertex('tyo');
flights.addVertex('maa'); //chennai lol
flights.addVertex('bcn'); 
flights.addVertex('mow');
flights.addVertex('sha');
flights.addEdge('atl','nyc');
flights.addEdge('atl','bcn');
flights.addEdge('atl','tyo');
flights.addEdge('atl','sha');
flights.addEdge('bcn','maa');
flights.addEdge('tyo','mow');
flights.addEdge('tyo','sha');

flights.dfs('atl');
flights.dfsIterative('atl');