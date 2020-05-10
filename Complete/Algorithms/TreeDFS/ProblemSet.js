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

let bst = quickTree([[4],[2,6],[1,3,5,7]],0,0);


/*
Q: Binary Tree Right Side View

In English:
    The main concept is here is preorder traversal. Knowing this you that you visit the rightmost node at
    each level last

Time Complexity:
    O(N) because you visit each node once

Space Complexity:
    O(K) where K is the height of the tree (accounts for call stack and return arr)

*/
var rightSideView = function(root) {
    let arr = [];
    dfs(root,0)
    return arr;
    
    function dfs(node,level){
        if(!node)return;
        arr[level]=node.val;
        dfs(node.left,level+1);
        dfs(node.right,level+1);
    }
};

/*
!Q: Diameter of Binary Tree
    Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

    Example:
    Given a binary tree
            1
            / \
            2   3
        / \     
        4   5  
In English:

    This is a preorder dfs so you go all the way down before going up. When you hit that base case
    of 0 you finally return. and each time you return you add 1. 

Time Complexity:
    O(N)

Space Complexity:
    O(N) because of call stack
*/

var diameterOfBinaryTree = function(root) {
    let ret = 1;
    depth(root);
    return ret -1;
    
    function depth(node){
        if(!node){
            return 0;
        }
        let left = depth(node.left);
        let right = depth(node.right);
        ret = Math.max(ret,left+right+1);//you see the distance to the right and leftmost and include current node in between
        console.log(node.val,left,right);
        return Math.max(left,right)+1;
    }
}

console.log(diameterOfBinaryTree(bst));