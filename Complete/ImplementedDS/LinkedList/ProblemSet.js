class Node{
    constructor(val){
        this.val = val;
        this.next = null;
    }
    traverse(){
        let ref = this;
        let ret = [];
        while(ref){
            ret.push(ref.val);
            ref = ref.next;
        }
        console.log(ret);
    }
}

function quickList(arr){
    let head = new Node(0);
    let ref = head;
    for(let i of arr){
        head.next = new Node(i);
        head = head.next;
    }
    return ref.next;
}

//----------------------------------------------------------------------

let node1 = new Node(1);
node1.traverse();
let node = quickList([1,2,3,4,5,6,7,8]);
node.traverse();


//----------------------------------------------------------------------

/*
Q: Reorder List
    Given a list change the order so it looks like : first -> last -> second -> second to last -> third ....

In English:

    1. Go to the middle of linked list
        fast is going twice as fast as slow, so when fast gets to the end, slow will be in the middle and the loop breaks
    2. Break into 2 lists
    3. Reverse second half
    4. Go back and forth and build new list
        

Time Complexity:
    O(N) you have a lot of operatiosn going on but it comes out to linear time

Space Complexity:
    O(1) you are not really creating new space that scales based on length of list

*/

var reorderList = function(head) {
    if(!head || !head.next){
        return;
    }
    let slow = head;
    let fast = head;
    let prev = null;
    let ref = head;//head of the first half of the list

    while(fast && fast.next){
        prev = slow; //will end up being the tail of first half of list
        slow = slow.next; //the head of the second half of the list
        fast = fast.next.next; //the tail of the second half of the list
    }
    
    prev.next = null; //breaks the list into 2
    
    let reversed = reverse(slow);//reverse the second half

    merge(ref,reversed);
    
    function merge(node1,node2){//draw this on paper to see it work
        while(node1){//you only need to make sure node1 isnt null cuz its gonna be same len as node2
            let next1 = node1.next;
            let next2 = node2.next;
            node1.next = node2;
            if(!next1){
                break;
            }
            node2.next = next1;
            node1 = next1;
            node2 = next2;
        }
    }
    
    function reverse(node){
        let prev = null;
        while(node){
            let next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return prev;
    }
    
};

reorderList(node);
node.traverse();

/*
Q: Add Two Numbers
    You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
    You may assume the two numbers do not contain any leading zero, except the number 0 itself.

    Example:
    Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
    Output: 7 -> 0 -> 8
    Explanation: 342 + 465 = 807.

In English:

    It's just simple math mate. That's all. Kinda cool how u do it in one loop so review this.

Time Complexity:
    O(N)

Space Complexity:
    O(N)

*/

var addTwoNumbers = function(l1, l2) {//most confusing thing about this is that the digits are stored in reverse order
    let ref = new ListNode(0);
    let p = l1;
    let q = l2;
    let curr = ref;//list you return
    let carry = 0;//when you go over 10 carry over what you had left
    
    while(p || q){
        let x = p ? p.val : 0;
        let y = q ? q.val : 0;
        let sum = carry + x + y;
        carry = Math.floor(sum/10);
        curr.next = new ListNode(sum%10);
        curr = curr.next;
        if(p) p = p.next;
        if(q) q = q.next;
    }
    
    if(carry > 0){
        curr.next = new ListNode(carry);
    }
    
    return ref.next;
};

/*
Q: Reverse Nodes in K group
    Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.
    k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k
    then left-out nodes in the end should remain as it is.

In English:

    * You have a special reverse function which reverses k nodes
    * you move a pointer around to every multiple of k 


Time Complexity:
    O(N) since we process each node exactly twice. Once when we are counting the number of nodes in each recursive call, and then once
    when we are actually reversing the sub-list. 

Space Complexity:
    O(1)

*/

var reverseKGroup = function(head, k) {
    let pointer = head;//where you start each loop from
    let kTail = null;//tail of ur reveresed list
    let ref = null;//head of reversed list
    
    while(pointer){//you just reverse k nodes everytime you see a multiple of k
        let count = 0;
        pointer = head;
        while(count < k && pointer){
            pointer = pointer.next;
            count++;
        }
        if(count === k){
            let revHead = reverse(head,k);
            if(!ref){
                ref = revHead; //first time 
            }
            if(kTail){
                kTail.next = revHead; //anytime after first
            }
            kTail = head;
            head = pointer;
        }
    }
    
    if(kTail){
        kTail.next = head;
    }
    
    return ref ? ref : head;

    function reverse(node,k){//slightly altered reverse function
        let prev = null;
        let ref = node;
        while(k > 0){
            let next = ref.next;
            ref.next = prev;
            prev = ref;
            ref = next;
            k--
        }
        return prev;
        
    }
    
};

