/*In English:
    * Array must be sorted
    * Begin with an interval covering the whole array
    * if the value of the search key is less than the item in the middle of the interval
    * then narrow the interval to the left half. If it is greater, than narrow to the right half
    * Repeat until value is found 
    * use this to stop oveflow             let mid = left + (right - left)/2;
    * honesly when you're looking to solutions for these questions dont look at the stupid 8 line solutions look at actual rwadable code
*/

/*
Time Complexity:
    * this is because you can represent it as O(n/2)+c
*/

/*
Space Complexity:
    * because you are only keeping track of pointers

Resources: 
    * Article on solving binary search problems (great): https://www.codementor.io/@rishabhdaal/solving-problems-binary-search-interview-questions-du1089cq6
    * This Video!!:  https://www.youtube.com/watch?v=bU-q1OJ0KWw
*/

function binarySearchIterative(arr,val){
    let left = 0;
    let right = arr.length-1;
   
    while(left <= right){
        let mid = Math.floor((right+left)/2);
        if(arr[mid]===val){
            return mid;
        }
        if(arr[mid]>val){
            right = mid-1;
        }else{
            left = mid+1;
        }
    }

    return -1;
}

function binarySearchRecursive(arr,val,left,right){
    if(right>=1){
        let mid = Math.floor(right+left)/2;
        console.log(mid);
        if(arr[mid]===val){
            return mid;
        }
        if(arr[mid]>val){
            return binarySearchRecursive(arr,val,left,mid-1);
        }else{
            return binarySearchRecursive(arr,val,mid+1,right);
        }
    }else{
        return -1;
    }
}

//console.log(binarySearchIterative([3,7,9,20,21,30],7));
//console.log('---');
//console.log(binarySearchRecursive([3,7,9,20,21,30],7,0,6));

