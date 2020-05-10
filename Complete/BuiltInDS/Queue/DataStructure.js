/*
Description:
    * This is a FIFO (First in first out data structure)
    * compare it to a regular line at an ice cream truck

Uses:
    * even though you can use the regular shift function to make a queue, that shift function runs in O(N^2) which isnt good
    * if you had 1 million elements it would take 3 minutes to shift them all and 40 ms to dequeue them all
    
Documentation: https://github.com/datastructures-js/queue

Resources:

*/

//Import:

    const Queue = require('@datastructures-js/queue');

//Constructor:

    let q1 = new Queue();
    let q2 = new Queue([1,2,3]); //uses Queue.fromArray(arr)

//Functions

    //enqueue 
        //return: void
        //param: none
        //desc: NR
        //time: technically O(1) according to this implementation
    q1.enqueue(1);
    q1.enqueue(2);
    q1.enqueue(3);

    //front:
        //return: the first element in the queue
        //param: none
        //time: O(1)
    console.log(q1.front());

    //back:
        //return: last element in queue
        //param: none
        //time: O(1)
    console.log(q1.back());

    //dequeue: 
        //return: node at front
        //param: none
        //desc: removes and returns front node
        //time: O(1)
    console.log(q1.dequeue());
    console.log(q2.dequeue());

    //isEmpty:
        //return: boolean
        //param: none
        //desc: checks if any elements r left
        //time: O(1)
    console.log(q1.isEmpty());

    //size:
        //return: number
        //param: none
        //desc: returns size of queue
        //time: O(1)
    console.log(q1.size())

    //clone: 
        //return: Queue
        //param: none
        //desc: used to make a copy
        //time: O(N)
    let q3 = q2.clone();
    console.log(q3);

    //toArray: 
        //time: O(N)
    let arr = q1.toArray();

    //clear: 
        //time: O(1)
    q1.clear();
