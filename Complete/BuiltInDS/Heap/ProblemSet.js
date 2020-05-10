/*

Q: Merge K Sorted Lists
    You're given an array of lists which are sorted and you need to return it as one sorted list

In English:

    loop thru the array and for each node in each list, put the value into a priority queue.

Time Complexity:
    O(NLogK) where k is the number of linked lists and N is the number of nodes in the last list

Space Complexity:
    O(N) because you have to create a new list

*/
var Heap = require('heap');

class Node{//for tree
    constructor(val){
        this.val = val;
        this.next = null;
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

function mergeKLists(list){
    let pq = new Heap((a,b) => a-b);
    for(let node of list){
        while(node){
            pq.push(node.val);
            node = node.next;
        }
    }
    let dummy = new Node(0);
    let ref = dummy;
    while(!pq.empty()){
        ref.next = new Node(pq.pop());
        ref = ref.next;
    }
    return dummy.next;
}

let node1 = quickList([1,4,5]);
let node2 = quickList([1,3,4]);
let node3 = quickList([2,6]);

let arr = [node1, node2, node3];

//console.log(mergeKLists(arr));

/*
!Q: Top K Frequent Words
    Given a non-empty list of words, return the k most frequent elements.
    Your answer should be sorted by frequency from highest to lowest. 
    If two words have the same frequency, then the word with the lower alphabetical order comes first.

In English:

    You have a Map which acts as a frequency counter. Then you have a heap which holds strings and it compares by looking up the string in the Map.
    if the value in the map is the same it sorts alphabetically. Then you loop thru every key in the map and push them to the priority queue but u 
    dont let it exceed k because you only want the top k items in there. Then you pop from the pq and push to an array.


Time Complexity:
    O(NLogK) where N is the length of words. We count the frequency of words in O(N) time then we add N words to the
    heap in O(Logk) time. We pop from the heap which also taks O(LogK) time

Space Complexity:
    O(N) because of hashmap and return array

*/

function topKFrequent(words,k){
    let lookup = new Map();
    for(let i of words){
        lookup.set(i,lookup.get(i)+1 || 0);
    }
    let pq = new Heap(//very interesting comparator function here
        (a,b) => lookup.get(a)===lookup.get(b) ? b.localeCompare(a) : lookup.get(a)-lookup.get(b)
        );//it compares by frequency but when frequency is the same it compare alphabetically

    for(let i of lookup.keys()){//if you didnt do .keys() it would actually loop thru the key value pair which messes up the compare function because it's not a string
        pq.push(i);
        if(pq.size()>k){
            pq.pop();//it always pops off the one that has occurec least frequently
        }
    }

    let ret = [];
    while(!pq.empty()){
        ret.push(pq.pop())
    }
    ret.reverse();
    return ret;
}
console.log(topKFrequent(['junaid','zehra','junaid','abhin','ibrahim','ibrahim','junaid','umer'],4));
