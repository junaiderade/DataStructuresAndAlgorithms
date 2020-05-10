/*
Q: Accounts Merge
    Given a list accounts, each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing 
    emails of the account.

    Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some email that is common to both accounts. Note that even if 
    two accounts have the same name, 
    they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the 
    same name.

    After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. 
    The accounts themselves can be returned in any order.

    Example 1:
    Input: 
    accounts = [["John", "johnsmith@mail.com", "john00@mail.com"], ["John", "johnnybravo@mail.com"], ["John", "johnsmith@mail.com", "john_newyork@mail.com"], ["Mary", "mary@mail.com"]]
    Output: [["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],  ["John", "johnnybravo@mail.com"], ["Mary", "mary@mail.com"]]
    
In English:

    * For each account, draw the edge from the first email to all other emails. Additionally, we'll remember a map from emails to names 
    on the side. After finding each connected component using a depth-first search, we'll add that to our answer.

Time Complexity:
    *come back to this

Space Complexity:
    *come back to this

*/
var accountsMerge = function(accounts) {  
    
    let graph = new Map();//undirected graph
    let nameDict = new Map();
    
    for (let acc of accounts) {
        let name = acc[0];
        for (let i=1;i<acc.length;i++) {
            if(!graph.has(acc[i])){
                graph.set(acc[i],new Set());//add it to graph
            }
            nameDict.set(acc[i],name);//link account to name it belongs to
            if(i!==1){//you are linking the first email to others so don't include itself
                graph.get(acc[1]).add(acc[i]); //because later on in temp the emails are sorted
                graph.get(acc[i]).add(acc[1]);//you are also adding the first email to the val of the ith in the map
            }
        }
    }
    
    let res = [];
    let visited = new Set();
    
    for (let key of graph.keys()) {//u always start from first email in list and search its chilren, then children of children w/ dfs
        if (!visited.has(key)) {
            let temp = dfs(key);
            temp.sort();//sort result u get from dfs
            console.log(temp);
            console.log('--');
            temp.unshift(nameDict.get(temp[0]));//you are adding names to emails here

            res.push(temp);
        }
    }
    
    function dfs(key) {
        visited.add(key);
        let emails = [key];//you push to this so have the first email in there already, in recursion you concat this
        for(let i of graph.get(key)){
            if (!visited.has(i)) {
                emails = emails.concat(dfs(i));//you NEED concat here because recursively you are merging return arrays
            }
        }    
        return emails;
    }
    //console.log(nameDict);
    //console.log('---');
    console.log(res);
    return res;
};

accountsMerge([["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]);

