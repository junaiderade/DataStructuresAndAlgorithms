/*
In English:

Time Complexity:

Space Complexity:

Top Leets:

*/


function getDigit(num, i) { //returns the digit in num at the given place value (basically the index backwards)
    return Math.floor(Math.abs(num) / Math.pow(10,i)) % 10;
}

function digitCount(num) { //returns num of digits int the number
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
//* Math.log10 asks 10 to what power gives us the number
//ex: Math.log10(1000) = 3
}

function mostDigits(nums) { //returns the number of digits of the value with the most digits
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
}

function radixSort (numbers){
    let maxDigits = mostDigits(numbers);
    for (var k = 0; k < maxDigits; k++){
        let digitBuckets = Array.from({length:10}, () => []); //this creates an array of 10 empty arrays (1 per digit 0-9)
        for (let i = 0;i < numbers.length; i++){
            let digit = getDigit(numbers[i],k); //gets the digit at a 10^i place value
            digitBuckets[digit].push(numbers[i]); //pushes the number, not the digit, into the matching array in the array of arrays
        }
        numbers = [].concat(...digitBuckets); //this creates one array from all the arrays within digitBuckets. pay attention to the .. operator
        //and assigns it to the original array
    }
    return numbers;
}

console.log(radixSort([5,4,3,2,1,45,56,2]));