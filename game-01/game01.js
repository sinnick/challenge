/*
Let M be a not empty set of integer numbers, find the first subset of 2 numbers of M which sum N.
For instance, let's say we've got a set of numbers [2, 5, 8, 14, 0] and N = 10, the resulting subset should be [2, 8].
*/

let N = 22;
let M = [2, 5, 8, 14, 0];


const findNums = (nums,sum) => {
    let map = {}; //map to store the numbers that have been seen in the array in each loop
    

    //loop through the array, if the sum is found, return the two numbers, otherwise, add the number and its index to the map
    for (let i = 0; i < nums.length; i++){ 
        let currentValue = nums[i];
        let target = sum - currentValue;
        if (map[target] !== undefined){
            return [target, currentValue];
        } else {
            map[currentValue] = i;
        }
    }
}


//call the function and log the result
console.log('result: ', findNums(M,N));