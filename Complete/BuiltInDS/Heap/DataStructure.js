/*
Description:
    A list of nodes which orders itself based on some compare function

Uses:
    * Using a heap to pop is better than sorting the array each time because 
        if you used a heap you'd get time complexity of NLogN but if you sorted each time it's N * NLogN

Documentation: 
    Heap: https://github.com/qiao/heap.js (this is the better one because it allows you to sort by comparator)

Resources:
    Time Complexity: https://www.geeksforgeeks.org/binary-heap/
*/

//Imported Class
//------------------------------------------------

//Import:

    var Heap = require('heap');

//Constructor: can be left blank for a default pq OR you can add a custom sorting function

    let maxHeap = new Heap((a,b)=>b-a);

//Functions: 

    //push:     
        //return: void
        //param: Object
        //time: O(logN)
        maxHeap.push(5);
        maxHeap.push(10);
        maxHeap.push(1);
        maxHeap.push(3);

    //pop:
        //return: node
        //param: none
        //desc: removes and returns root
        //time: O(logN)
        let n = maxHeap.pop();

    //peek: 
        //return: node
        //param: none
        //desc: see item at top of heap
        //time: O(logN)
        let n1 = maxHeap.peek();

    //empty: 
        //return: boolean
        //check if heap is empty
        let n2 = maxHeap.empty();

    //size: 
        //return: number
        //desc: see the length of the heap
        let n3 = maxHeap.size();

    //toArray: 
        //return: array
        //desc: return the array representation of the heap
        let n4 = maxHeap.toArray();

//Quick Heap
//------------------------------------------------
    class quickHeap{
        constructor(sortingFunc){
            this.arr = [];
            this.comparator = sortingFunc;
        }
        enqueue(val){
            this.arr.push(val);
            this.arr.sort(this.comparator);
        }
        dequeue(){
            return this.arr.shift();
        }
        isEmpty(){
            return this.arr.length ? false : true;
        }
    }

    let mh = new quickHeap((a,b)=>a[0]===b[0] ? a[1]-b[1] : a[0]-b[0]);
    mh.enqueue([0,1]);
    mh.enqueue([9,12]);
    mh.enqueue([8,9]);
    // while(!mh.isEmpty()){
    //     console.log(mh.dequeue());
    // }

