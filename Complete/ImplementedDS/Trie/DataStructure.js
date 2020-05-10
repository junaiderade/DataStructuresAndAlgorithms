/*
Description:
    * A trie is a special type of tree which stores data in steps
    * often used to store words
    * the property end says you have reached the end of some word. however it can keep going. Refer to the video
    to understand this better
    * even if you have a word in a trie but you dont do the isEnd on that node it is technically not in there

Uses:

Documentation: 

Resources: 
    Implementation Video: https://www.youtube.com/watch?v=7XmS8McW_1U

*/

class Node{
    constructor(){
        this.keys = new Map();
        this.end = false;
        }
    setEnd(){//notes if this is the end of a word
        this.end = true;
    }
    getEnd(){
        return this.end;
    }
}

class Trie{
    constructor(){
        this.root = new Node();
    }
    add(word,node=this.root){//this function is recursive and the first time it is called you pass in the default node
        if(word.length===0){
            node.setEnd();
            return;
        }else if (!node.keys.has(word[0])){
            node.keys.set(word[0],new Node());//you make a key for this letter in the map!
            return this.add(word.substring(1),node.keys.get(word[0]));
        }else{
            return this.add(word.substring(1),node.keys.get(word[0]));//you are reffering to a specific key in a map here whose value is a map!
        }
    }
    isWord(word){
        let node = this.root;
        while(word.length>1){
            if(!node.keys.has(word[0])){
                return false;
            }else{
                node = node.keys.get(word[0]);
                word = word.substring(1);
            }
        }
        return node.keys.has(word) && node.keys.get(word).getEnd() ? true : false; //when you are on the last letter
    }
    print(){
        let words = [];
        this.search(this.root,"",words);
        return words;
    }
    search(node,str,words){
        if(node.keys.size !== 0){
            for(let letter of node.keys.keys()){//searches the keys of keys starting from root node
                this.search(node.keys.get(letter),str+letter,words); //sort of backtracking here
            }
            if(node.getEnd()){
                words.push(str);
            }
        }else{
            str.length > 0 ? words.push(str) : undefined;
        }
    }
}

let trie = new Trie();
trie.add("john");
trie.add('jack');
trie.add("jonah");
console.log(trie.isWord('jack'));
console.log(trie.isWord('dutch'));
console.log(trie.print());



