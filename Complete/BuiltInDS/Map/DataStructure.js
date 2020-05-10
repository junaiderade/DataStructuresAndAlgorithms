/*
Description: 
    * The Map object holds key-value pairs and remembers the original insertion order of the keys. 
    Any value (both objects and primitive values) may be used as either a key or a value.

Uses:

Documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

Resources:

*/

//------------------------------------------------

//Constructor:
    let lookup = new Map();

//Properties:
    
    //size
    console.log(lookup.size);

//Functions

    //set:
        //return: void
        //params: key,value
        //desc: adds or updates a value, 
        //time: O(1)
        lookup.set('junaid',1);
        lookup.set('rayhaan',[]);

    //get:
        //return: value at a key
        //params: key
        //time: O(1)
        lookup.set('junaid',lookup.get('junaid')+1);
        lookup.get('rayhaan').push(2);
        lookup.get('rayhaan').push(3);
        lookup.set('humza',lookup.get('humza')+5 || []); //setting if empty
        lookup.get('humza').push(4);
    
    //delete:
        //return: boolean if object you want to delete existed and has been removed
        //time: O(1)
        lookup.set('toDel',0);
        lookup.delete('toDel');
    
    //has
        //return: boolean if object you're looking for is in there
        //param: key
        //time: O(1)
        console.log(lookup.has('zehra'));

    //clear
        //desc: empties map if you did lookup.clear()

    

//Usage
    //A Map object iterates its elements in insertion order — a for...of loop returns an array of [key, value] for each iteration.
    for(let [key,value] of lookup){
        console.log(key + ':' + value);
    }
    //if you did let i of lookup.keys() you'd just see keys
    //if you did let i of lookup.values() you'd just see values

    //to turn an array into a map
    let arr = [[1,2],[3,4]];
    let newMap = new Map(arr);
    console.log(newMap);

    //cloning a map, using == does not work with clone and og map
    let clone = new Map(newMap);

    //to turn to an array
    console.log(Array.from(lookup));

    //to merge 2 maps
    let merged = new Map([...lookup,...clone])






    

