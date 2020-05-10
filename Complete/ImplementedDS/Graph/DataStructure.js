
/*
Description:
    * there are 2 types generally: adjacency list and adjacency matrix

Uses:
    * this is a undirected unweighted graph, if you wanted to change the undirected pard you'd just change the add edge function
    * a graph is a collection of nodes and connections
    * trees are actually a type of graph. a tree is an acyclic connected graph
    * there’s no parent node/child node concept in graphs
    * if you wanted to make it a weighted graph you'd just push an object made up of the source, dest and weight
    * look at weighted graph representation for this
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
    printGraph(){
        for(let [key,val] of this.adjList){
            let curr = ""
            for(let i of val){//since the value is an array
                curr+=i+" ";
            }
            console.log(key + "->"+curr);
        }
    }
    bfs(startNode){//you visit each level of neighbors before visiting the next
        if(!startNode){
            return;
        }
        let visited = new Set();

        let q = new Queue();
        visited[startNode] = true;
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
            let current = stack.pop();
            console.log(current);
            result.push(current);
            let neighbors = this.adjList.get(current);
            for(let neighbor of neighbors){
                if(!visited.has(neighbor)){
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            }
        }
    }
}

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
//flights.printGraph();
//flights.bfs('atl');
//flights.dfs('atl');
//flights.dfsIterative('atl');

/*
         bcn ---maa
         |
sha --- atl --- nyc
  |------ |      
         tyo      
          |
          mow
*/







