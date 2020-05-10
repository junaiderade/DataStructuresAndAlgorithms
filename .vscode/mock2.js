function groupAnagrams(words){//this works in leetcode
    let map = new Map();
    for(let word of words){
        let ref = word.split('').sort().join('');
        if(!map.has(ref)){
            map.set(ref,[]);
        }
        map.get(ref).push(word);
    }
    let ret = [];
    for(let [key,val] of map){
        ret.push(val);
    }
    return ret;
}
//map: sorted: anagrams
//for each word
    //sort the word: push

function findMissing(nums){

    for(let i = 0;i<nums.length;i++){
        if(nums[i]!==i){
            return i;
        }
    }

    return nums.length;
}

