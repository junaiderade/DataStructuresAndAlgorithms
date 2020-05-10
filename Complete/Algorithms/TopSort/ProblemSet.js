/*
Q: Alien Dictionary
    There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. You receive a list of non-empty words from the dictionary, where words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language.

    Example 1:

    Input:
    [
    "wrt",
    "wrf",
    "er",
    "ett",
    "rftt"
    ]

    Output: "wertf"

In English:

    Method
    ---------------
    1. You want to do 3 things first:
        1. make a map with all the letters
        2. make a map with all indegrees
        3. Then you loop thru each adjacent word (i & i+1)
        and the way you tell the order of the words is that whenever i and i+1 dont have the same character, the char of i is before the char of i+1
    2. The way you can tell the ordering thru this map is by indegrees, those letters that have the same indegree are in the same order.
    Letters with an indegree of 0 come first.
    3. Create an empty string to return to
    4. Do a BFS where you start with the letters with indegree of 0 and push them to a queue. Then shift from the queue and 
    look at the array which is the value to the key (the shifted letter). For each node in that array decrease its indegree by 1.
    If you see a node after the decrement having indegree of 0 then push it to the queue.
    Everytime you dequeue, you add that letter to ret

    Edge Cases:
    --------------
    * since top sort only works on acyclic directed graphs you cannot have a cycle
    * the way you handle this is you compare the size of the map with the size of the string to return, if they dont match return ""

    Other
    --------------
    * whats complicated about this question is the answer can have multiple orders
    * It would be good to ask the interviewer some qs about this when u get the problem like:
        * are all letters lowercase??
        * what to return if order is invalid?

Time Complexity:
    O(C) where C is the total length of all the input lists added together

Space Complexity:
    O(1) because there are no more than 26 letters in latin. and the worst case each letter would to every letter so 26^2 which is still O(1)

*/
var alienOrder = function(words) {
    let graph = new Map();//char, arr
    let inDegrees = new Map();//char int
    
    for(let word of words){//for building the graph
        for(let char of word){
            if(!graph.has(char)){
                graph.set(char,[]);
            }
            if(!inDegrees.has(char)){
                inDegrees.set(char,0);
            }
        }
    }
    
    for(let i = 0;i<words.length-1;i++){//we look at adjacent words to build order
        let idx = 0;
        while(idx < words[i].length && idx < words[i+1].length){//whenever idxes rnt the same you know you the order because of the ordering of the input
            let c1 = words[i].charAt(idx);
            let c2 = words[i+1].charAt(idx);
            if(c1!==c2){
                graph.get(c1).push(c2);
                inDegrees.set(c2,inDegrees.get(c2)+1);
                break;
            }
            idx++;
        }
    }
        
    let q = [];
    for(let [key,val] of inDegrees){
        if(val===0){
            q.push(key);
        }
    }
    
    let ret = "";
    
    while(q.length){
        let c = q.shift();
        ret+=c;
        for(let after of graph.get(c)){
            inDegrees.set(after,inDegrees.get(after)-1);
            if(inDegrees.get(after)===0){
                q.push(after);
            }
        }
    }
    
    if(ret.length<inDegrees.size){
        return "";
    }
    
    return ret;
    
};
/*
Q: Course Schedule
    There are a total of numCourses courses you have to take, labeled from 0 to numCourses-1.

    Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

    Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

In English:

    * This question is really about detecting cycles
    * So you use top sort and indegrees
    * you have 2 maps, one is indegrees (which is how many prereqs a course requires) and one is a map of prereq: course it requires
    * you set up the graph and indegrees by looping thru prereqs
    * then you use a bfs which uses a queue which starts with all nodes with indegree of 0 (courses that have no prerequisites)
    * each time you shift from the queue you decrement indegrees of all the courses that have it as a prereq (info from ur map)
    * and if you see a 0 after decrementing you push to your queue again
    * if you see any indegrees > 0 after your bfs you know there is a cycle and to return false

Time Complexity:
    O(2⋅∣E∣+∣V∣) where |V|is the number of courses, and |E| is the number of dependencies.
    Similar with the above postorder DFS traversal, we would visit each vertex and each edge once and only once in the worst case,.
    As a result, the overall time complexity of the algorithm would be O(2⋅∣E∣+∣V∣).

Space Complexity:
    O(2⋅∣E∣+∣V∣) because of our graph

*/
var canFinish = function(numCourses, prerequisites) {
    let graph = new Map();
    let indegrees = new Map();
    
    for(let [i,j] of prerequisites){
        if(!graph.has(i)){
            graph.set(i,[]);
        }
        if(!graph.has(j)){
            graph.set(j,[]);
        }
        if(!indegrees.has(j)){
            indegrees.set(j,0);
        }
        if(!indegrees.has(i)){
            indegrees.set(i,0);
        }
        
        graph.get(j).push(i);
        indegrees.set(i,indegrees.get(i)+1);
    }
    
    let queue = [];
    
    for(let [key,val] of indegrees){//find the nodes with 0 indegrees
        if(val === 0){
            queue.push(key);
        }
    }
    
    while(queue.length){
        let dequeued = queue.shift();
        for(let i of graph.get(dequeued)){
            indegrees.set(i,indegrees.get(i)-1);
            if(indegrees.get(i)===0){
                queue.push(i);
            }
        }
    }
    
    for(let [key,val] of indegrees){
        if(val!==0){
            return false;
        }
    }
    
    return true;
};