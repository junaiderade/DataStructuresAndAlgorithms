/*
In English:

    * A Depth First Traversal starts at the root of a tree and goes ass far as possible along each branch before backtracking
    * ex of a tree:
           1
        2     3 
      4   5
    * Preorder: left -> root -> right:  1 2 4 5 3
    * Inorder: root -> left -> right: 4 2 5 1 3
    * Postorder: left -> right ->root: 4 5 2 3 1

Time Complexity:
    O(N) because you see each node once.

Space Complexity:
    O(N) if you keep track of call stack but O(1) if not. If the tree is balanced then it is O(H).

Resources:

*/
function dfsPreOrder(node){
    if(!node){
        return;
    }
    console.log(node.val);
    dfsPreOrder(node.left);
    dfsPreOrder(node.right);
}
function dfsPreOrderiterative(node){
    if(!node){
        return;
    }
    let stack = [];
    stack.push(node);
    while(stack.length){
        let current = stack.pop();
        if(current.right){//you push the right before the left here so left is the latest in stack
            stack.push(current.right);
        }
        console.log(current.val);
        if(current.left){
            stack.push(current.left);
        }
    }
}
function dfsInOrder(node){//in the order of a heap dequeue if it was a bst
    if(!node){
        return;
    }
    dfsInOrder(node.left);
    console.log(node.val);
    dfsInOrder(node.right);
}
function dfsPostOrder(node){
    if(!node){
        return;
    }
    dfsPostOrder(node.left);
    dfsPostOrder(node.right);
    console.log(node.val);
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

let bst = quickTree([[4],[2,6],[1,3,5,7]],0,0);
let tree = quickTree([[1],[2,3],[4,5,6,7]],0,0);
dfsPreOrderiterative(bst);
//dfsPreOrder(bst);

