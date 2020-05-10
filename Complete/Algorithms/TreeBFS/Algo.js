/*
In English:

    * A Breadth First Traversal starts at the root of a tree and explores the neighbors first, before moving the the
    next level neighbors. It explores veritices in order of the distance from the source vertex, where distance is the minimum length
    of a path from source vertex to the node.
    * You have queue and whenever you shift from it you add that value to return
    * then you add the dequeued's left and right to the queue. This makes sure you see higher levels in order.

Time Complexity:
    * O(n) because you see each node once, The number of operations changes based on number of nodes

Space Complexity:
    * O(n) because you have a queue to hold items in the queue

Resources: 

*/

const Queue = require('@datastructures-js/queue');

function bfs(node){
    let data = [];
    let queue = new Queue();
    queue.enqueue(node);
    while(!queue.isEmpty()){
        let dequeued = queue.dequeue();
        data.push(dequeued.val);
        if(dequeued.left){
            queue.enqueue(dequeued.left);
        }
        if(dequeued.right){
            queue.enqueue(dequeued.right);
        }
    }
    return data;
}

class Node{
    constructor(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function quickTree(arr,i,j){
    if(i >= arr.length){
        return null;
    }
    let node = new Node(arr[i][j]);
    node.left = quickTree(arr,i+1,j*2);
    node.right = quickTree(arr,i+1,j*2+1);
    return node;
}

//let tree = quickTree([[1],[2,3],[4,5,6,7]],0,0);
//console.log(bfs(tree));
