// Selecting all the required DOM elements
let submitButton = document.getElementById("findBtn");
let num1 = document.getElementById("num1");
let num2 = document.getElementById("num2");
let num3 = document.getElementById("num3");
let num4 = document.getElementById("num4");
let num5 = document.getElementById("num5");
let num6 = document.getElementById("num6");
let num7 = document.getElementById("num7");
let num8 = document.getElementById("num8");
let num9 = document.getElementById("num9");
let num10 = document.getElementById("num10");
let resultTitle = document.getElementById("resultTitle");
let myPair = document.getElementById("pairList");

// Initializing an empty array to store the numbers.
let inputArr = [];

// Regular expression to check only numbers
let regx = /[a-zA-Z`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

//This function handles the find button and displays the results to the user
function clickHandler() {

    if (inputValidator()) {

        inputArr.push(parseInt(num1.value));
        inputArr.push(parseInt(num2.value));
        inputArr.push(parseInt(num3.value));
        inputArr.push(parseInt(num4.value));
        inputArr.push(parseInt(num5.value));
        inputArr.push(parseInt(num6.value));
        inputArr.push(parseInt(num7.value));
        inputArr.push(parseInt(num8.value));
        inputArr.push(parseInt(num9.value));
        inputArr.push(parseInt(num10.value));

        const avg = arrAverage(inputArr); // We found the average of the array
        let pairsList = findPair(inputArr, avg); // We got back the pairList array from the function invoked

        renderElement(avg, pairsList); // After getting the required input we render the elements in the DOM
        inputArr = []; // Again we need to give a empty array , or else in next click event more values will be added on the previous array, which will lead to incorrect result


    } else {
        alert("Please enter valid number"); // There  are some error in the input fields we show the alert box, stating there is a invalid number in the inmput field
    }

}

// This function finds out the average of the input given by the user
function arrAverage(arr) {
    let length = arr.length;
    let sum = arr.reduce((acc, index) => { // This reduce function gives the total sum of the array using reduce method 
        return acc + index
    }, 0)
    let avg = sum / length;
    return Math.floor(avg); // Adding Math.floor() function because it is not possible to check integer with float sum
}


// This function is used to find out the possible pair in the array which make sum of the average we got.
function findPair(arr, target) {
    let pairList = []; // Initialzing a empty array to store the pairs

    let newArr = arr.sort((a, b) => a - b); // We need to sort the array 
    console.log(newArr)
    let low = 0; // Pointer 1
    let high = newArr.length - 1; // Pointer 2

    while (low < high) {
        if (newArr[low] + newArr[high] == target) {
            /*If we find both the pointer adding up to the avg value, 
            then we return an obj which contains both the number in 
            the array and push it to the empty pair list array */
            pairList.push(pairObj(newArr[low], newArr[high]));
        }
        if (newArr[low] + newArr[high] < target) {
            /* if the sum of both pointer is less we increment the low pointer by one */
            low++;
        } else {
            /* if the sum of both pointer is greater we decrement the high pointer by one */
            high--;
        }
    }
    /* If we end to get to the point where both the pointer are equal we just return the pairList array*/
    if (low == high) {
        return pairList;
    }

    /* This obj is used to push the value which satisy the condition*/
    function pairObj(a, b) {
        return {
            a,
            b
        }
    }
    console.log(pairList);
    return pairList;
}

// This function validates the input where if there are any symbols or special characters include in it which may cause error
function inputValidator() {
    if (regx.test(num1.value) || regx.test(num2.value) || regx.test(num3.value) || regx.test(num4.value) || regx.test(num5.value) ||
        regx.test(num6.value) || regx.test(num7.value) || regx.test(num8.value) || regx.test(num9.value) || regx.test(num10.value)) {
        // alert("Invalid Number");
        return false;
    } else if (num1.value == "" || num2.value == "" || num3.value == "" || num4.value == "" || num5.value == "" ||
        num6.value == "" || num7.value == "" || num8.value == "" || num9.value == "" || num10.value == "") {
        return false;
    } else {
        return true;
    }
}

// This function is used to render the HTML elements once we get back the pair list and render it to the user.
function renderElement(avg, pairsList) {

    if (avg <= 0) {
        resultTitle.innerHTML = `The average is ${0}`;
        myPair.innerHTML = `There are no possible pairs`;
    } else if (pairsList.length == 0) {
        resultTitle.innerHTML = `The average is ${avg}`;
        myPair.innerHTML = `There are no possible pairs`;
    } else {
        let textPair = "";
        for (let i in pairsList) {
            textPair += `(${pairsList[i].a},${pairsList[i].b}) \n`;
        }
        resultTitle.innerHTML = `The average is ${avg}`;
        myPair.innerHTML = `The possible pairs are ${textPair}`;
    }


}


function resetHandler() {
    location.reload();
}