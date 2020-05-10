/*
!Q: Validate Binary Search Tree


In English:

    * recursive solution is a lot easier to grasp
    basically you use an IN ORDER traversal to look and compare thru values
    * WARNING: this problem is not as easy as it seems
    * it isnt just comparing value of left or right to parent. For ex: you need to 
    make sure if you're going left that a right node in the left subtree is smaller than parent
    * the recursive solution also gives insight on how to return true or false from a recursive function

Time Complexity:
    O(N) 

Space Complexity:
    O(N) to keep stack
*/
var isValidBST = function(root) {
    let stack = [];
    let inOrder = -Infinity;
    
    while(stack.length || root){
        while(root){//go all the way to the left;
            stack.push(root);
            root = root.left;
        }
        
        root = stack.pop();//if the root was null u come straight here
        
        if(root.val <= inOrder){
            return false;   
        } 
        inOrder = root.val;
        root = root.right;//will be null sometimes
    }
    return true;
};
var isValidBSTRecursive  = function(root) {//if u go left, you need to check max, if ou go right check min, you will check both as u recurse
    if (!root) {
        return true; // Sanity check for passing test case '[]'
    }

    function helper(root, min, max) {
        if (!root) {
            return true; // We hit the end of the path
        }
        
        if ((min !== null && root.val <= min) || (max !== null && root.val >= max)) {
            return false; // current node's val doesn't satisfy the BST rules
        }
        
        // Continue to scan left and right
        return helper(root.left, min, root.val) && helper(root.right, root.val, max);
    }
    
    return helper(root, null, null);
};

/*
Q: Binary Search Tree Iterator

    * Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.
    Calling next() will return the next smallest number in the BST.

In English:

    * You basically go all the way left, and then go right 

Time Complexity:

Space Complexity:

Resources:

*/

class BSTIterator {
    constructor(root) {
        this.stack = [];
        this.addChildren(root);
    }
    
    hasNext() {
        return this.stack.length > 0;
    }
    
    next() {
    	const node = this.stack.pop();
      this.addChildren(node.right);//now push right!
      return node.val;
    }
    
    addChildren(node) {
        while(node) {//keep pushing left
            this.stack.push(node);
            node = node.left;
        }
    }
}


//  7
//  /\
// 15 1
//    /\
//    9 20
