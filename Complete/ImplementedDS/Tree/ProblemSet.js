
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

//----------------------------------------------------------------------
/*
Q: Serialize and Deserialize Binary Tree
    Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file 
    or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

    Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.
    You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.
In English:
    You use a preorder dfs to serialize the tree and then use a preorder dfs to serialize as well. 
    In serialize if there is no current node you ass "null,". What's important here is to add the comma as well because u need the split method here
    to turn the string into an array which is fed into deserialize
    in deserialize you use a queue for better time complexity since shift() can have up to O(n) for each call.
    note: u also realized thrut his q that some of the solutions have multiple data structures due to java's limitations.

Time Complexity:
    O(N). In both functions we visit each node just once.

Space Complexity:
    O(N). In both serialization and deserialization we keep the entire tree.
*/

const Queue = require('@datastructures-js/queue');

function serialize(root) {
    return rserialize(root,'');
    
    function rserialize(root,str){
        if(!root){
            str+="null,"
        }else{
            str+=root.val+',';
            str = rserialize(root.left,str);
            str = rserialize(root.right,str);
        }
        return str;
    }
};

var deserialize = function(data) {
    data = data.split(',');
    let q = Queue.fromArray(data);
    let root = rdeserialize(q);
    return root;
    
    function rdeserialize(q){
        if(q.front()==="null"){
            q.dequeue();
            return null;
        }
        let root = new TreeNode(q.dequeue());
        root.left = rdeserialize(q);
        root.right = rdeserialize(q);
        
        return root;
    }
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// let tree = quickTree([[1],[2,3],[4,5,6,7]],0,0);
// let serialized = serialize(tree);
// let deserialized = deserialize(serialized);
// console.log(deserialized);

/*
Q:
    Given a non-empty binary tree, find the maximum path sum.
    For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child
    connections. The path must contain at least one node and does not need to go through the root.

In English:
    basically you want to see the maximum path (by adding the node values) from node a to node b. This includes a nodes connected through the root.
    you calc the maximum path for each node as you go down the tree.

Time Complexity:
    O(N). you visit each node just once.
Space Complexity:
    O(H) where h is the height of the tree because that will be the recursion call stack.

*/
function maxPathSum(root) {
    let maxSum = -Infinity;
    maxGain(root);
    return maxSum;
    
    function maxGain(node){//this recursion starts from the bottom, when there is no left and right it retuns node.val + 0 + 0. This works in preorder fashion
        if(!node) return 0;
        
        let left = Math.max(maxGain(node.left),0);//if either of the paths subtracts from the sum it just becomes 0
        let right = Math.max(maxGain(node.right),0);
        
        let sum = node.val + left + right;
        
        maxSum = Math.max(maxSum, sum); 
        
        return node.val + Math.max(left,right);
    }
    
};
// let tree = quickTree([[1],[2,3],[4,5,6,7]],0,0);
// console.log(maxPathSum(tree));

/*
Q:Lowest common ancestor

    Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
    This question is worded shitty so basically what it's asking is find the node closest to the bottom
    which has both p and q as it's descendants. And The node coud be P or Q if it has Q or P as a descendant.
    All of the nodes' values will be unique.
    p and q are different and both values will exist in the binary tree.

In English:

    You write a dfs function which traverses the left and right branch. This question works off of a bunch of if statements.
    There are 4 cases:
    1. if you've traversed a path to the bottom and didnt see p or q you return null
    2. if you've traversed a path and see p then you return it and break further recursion
    3. if you've traversed a path and see q you break further recursion
    4. since you're assigning the left and right to variables on which you call the function. If left and right both do not return null
        then this is the right node and you return it


Time Complexity:
    O(N). You visit each node once.

Space Complexity:
    O(N). it is not O(H) because worst case we could have a very skewed binary tree which has the same height as num nodes.
*/

var lowestCommonAncestor = function(root, p, q) {
    return dfs(root);
    
    function dfs(node){
        if(!node){
            return null;
        }
        if(node === p || node === q){
            return node;
        }
        let left = dfs(node.left);
        let right = dfs(node.right);
        
        if(left && right){ //if it finds one node in left subtree and one node in right
            return node;
        }
        if(left){//if both nodes are in left subtree left have a val and right is null
            return left;
        }
        
        if(right){//if both nodes are in right subtree right has a val and left is null
            return right;
        }
    }
};

