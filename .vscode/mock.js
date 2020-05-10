function longest(arr){
    let lookup = new Map();
    let max = 0;
    for(let i of arr){
        lookup.set(i,0);
    }
    for( let [key,val] of lookup){//you go up and down and only see each number once
        if(val===1){
            continue;
        }
        let foward = key;
        let backward = key;
        let count = 1;
        while(lookup.has(forward+1)){
            lookup.set(foward+1,1);
            forward++;
            count++;
        }
        while(lookup.has(backward-1)){
            lookup.set(backward-1,1);
            backward--;
            count++;
        }
        lookup.set(key,1);
        max = Math.max(max,count);
    }
    return max;
}

//negative,repeats are you edge cases
//you said itd be O(C) where c is max element -minel || maxelement-0
//first solution was to use an 2 arrays (one for pos and one for neg) and mark the indexes and loop thru
//talk thru solution before you start typing u started typing before u thought abt edge cases
//talk, then write all you code. Dont write code talk code talk
//when you walk thru ur code walk thru an example specifically
//use your own examples
//dont code till you come to an optimal solution
//its good to keep asking "is that okay"
//main thing is dont code too fast and know time complexity well
//u said somethingabt deleting keys in the map for a more optimal complexity, they dont care and that doesnt matter
//when you said "oh i could try this but it "