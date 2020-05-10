/*
In English:
    You can think of it as the way we swap cards in our hand when sorting them
    you pick an element and insert it where it's supposed to be. This is going
    from the back to the front.

Time Complexity:
    O(n). Nested loop.

Space Complexity:
    O(1). You arnt creating extra space

Top Leets: Not needed.

*/

function insertionSort(nums){
    for (let i = 1; i < nums.length; i++) {
      let j = i - 1
      let temp = nums[i]
      while (j >= 0 && nums[j] > temp) {
        nums[j+1] = nums[j]
        j--
      }
      nums[j+1] = temp
    }
    return nums
  }
  console.log(insertionSort([3, 0, 2, 5, -1, 4, 1]));