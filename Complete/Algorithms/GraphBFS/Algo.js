/*
In English:

    * Just like the BFS on a tree. Uses a queue to see each level of a graph in order.
    * This goes out wide, not deep

Time Complexity:
    * O(|V| + |E|), it's 2 * E if its an undirected graph

Space Complexity:
    * O(|V| + |E|)

Resources:
    * Youtube Vid: https://www.youtube.com/watch?v=TIbUeeksXcI

*/

const Queue = require('@datastructures-js/queue');

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
    bfs(startNode){//you visit each level of neighbors before visiting the next
        if(!startNode){
            return;
        }
        let visited = new Set();

        let q = new Queue();
        visited.add(startNode);
        q.enqueue(startNode);

        while(!q.isEmpty()){
            let dequeued = q.dequeue();
            console.log(dequeued);
            let neighbors = this.adjList.get(dequeued); //neighbors is an array
            for(let neighbor of neighbors){
                if(!visited.has(neighbor)){
                    visited.add(neighbor);
                    q.enqueue(neighbor)
                }
            }
        }        
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

flights.bfs('atl');