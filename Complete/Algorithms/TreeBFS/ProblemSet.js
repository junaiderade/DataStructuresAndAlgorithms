var Queue = require('@datastructures-js/queue');

class TreeNode{
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
    let node = new TreeNode(arr[i][j]);
    node.left = quickTree(arr,i+1,j*2);
    node.right = quickTree(arr,i+1,j*2+1);
    return node;
}


/*
!Q: All Nodes Distance K in Binary Tree
    We are given a binary tree (with root node root), a target node, and an integer value K.
    Return a list of the values of all nodes that have a distance K from the target node.  The answer can be returned in any order.

In English:

    * NOTE: this is more of a bfs on a graph
    * Cool this abt this question is it uses BOTH BFS and DFS
    * it also uses a lot of data structures: tree, graph, queue, set , map
    * The ultimate idea is that you start with the target node, then you push all it's neighbors to a queue followed by null.
    you also keep track of a var called dist which increments each time a 'null' is seen int the queue
    * you get access to the parent with a dfs which uses a hashmap to store child node: parent node

Time Complexity:
    O(N) because even tho we perform multiple operatiosn per node, it depends on number of nodes in list. So it is linear.

Space Complexity:
    O(N) because the space used by our data structures is linear

*/

var distanceK = function(root, target, K) {
    let parent = new Map();//map to that holds child node: parent node
    dfs(root,null);//populates map
    
    let queue = new Queue();
    queue.enqueue(null);
    queue.enqueue(target);//add null & target to start of queue
    
    let seen = new Set();
    seen.add(target);
    seen.add(null);
    
    let dist = 0;
    
    while(!queue.isEmpty()){
        let node = queue.dequeue();
        if(!node){
            if(dist === K){
                let ret = [];
                while(!queue.isEmpty()){
                    ret.push(queue.dequeue().val);
                }
                return ret;
            }
            queue.enqueue(null);//REALLY FRICKIN IMPORTANT, this is how you know you have to to the end of a set of neighbors in the graph
            dist++;//increment k everytime you finish a level to know you are 1 more away from target
        }else{//this section adds all neighbors(right, left, parent)
            if(!seen.has(node.left)){//you dont want to visit seen nodes twice
                seen.add(node.left);
                queue.enqueue(node.left);
                }
            if(!seen.has(node.right)){
                seen.add(node.right);
                queue.enqueue(node.right);
                }
            let par = parent.get(node);
            if(!seen.has(par)){
                seen.add(par);
                queue.enqueue(par);
            }
        } 
    }
    return [];
    
    function dfs(node, par){//create the child node: parent node hashmap
        if(node){
            parent.set(node,par);
            dfs(node.left,node);
            dfs(node.right,node);
        }
    }
};
// let ex = new Node(1);
// ex.left = new Node(2)
// let targ = new Node(3);
// ex.right = targ;
// ex.left.left = new Node(4);
// ex.left.right = new Node(5);
// targ.left = new Node(6);
// targ.right = new Node(7);

//console.log(distanceK(ex,targ,1));
/*




*/
/*
Q:Binary Tree ZigZag Level Order Traversal
    Given a binary tree, return the zigzag level order traversal of its nodes' values. 
    (ie, from left to right, then right to left for the next level and alternate between).

In English:
    You do BFS but to break everything up into arrays by level you push null when you reach the end. and you use multiple arrays

Time Complexity:
    O(N)

Space Complexity:
    O(N)
*/
var zigzagLevelOrder = function(root) {
    if(!root){
        return [];
    }
    let ret = [];
    let dq = [];
    dq.push(root);
    dq.push(null);
    let levels = [];
    let isLeft = true;
    
    while(dq.length){
        let curr = dq.shift();
        if(curr){
            if(isLeft){
                levels.push(curr.val);
            }else{
                levels.unshift(curr.val);
            }
            
            if(curr.left){
                dq.push(curr.left);
            }
            if(curr.right){
                dq.push(curr.right);
            }
        }else{
            ret.push(levels);
            levels = [];
            if(dq.length){
                dq.push(null);
            }
            isLeft = !isLeft;
        }
    }
        return ret;
};
let tree = quickTree([[1],[2,3],[4,5,6,7]],0,0);
//console.log(zigzagLevelOrder(tree));
/*




*/
/*
!Q:Level Order Traversal
    Given a binary tree, return level order traversal where each level is its own array.

In English:
    You do BFS but use more arrays to hold vals. for each level (starting with just one node)
    You push everything in your stack to an array called temp but while you're goign thru that for loop (which runs from 0 -> stack.len)
    u push the left and right of your shifted

Time Complexity:
    O(N)
Space Complexity:
    O(N)
*/
var levelOrder = function(root) {//bad code
    if (!root) {
        return [];
    }
    let q = new Queue();
    q.enqueue(root);
    let result = [];
    while (!q.isEmpty()) {
        let size = q.size();//this is neccessary because otherwise if you just have q.length it change as ur going
        console.log(size);
        let temp = [];    
        while(size > 0){
            let node = q.dequeue();
            console.log(node.val);
            temp.push(node.val);
            if (node.left) {
                q.enqueue(node.left);
            }
            if (node.right) {
                q.enqueue(node.right);
            }
            size--;
        }
        result.push(temp);
    }
    return result;
};

console.log(levelOrder(tree));

