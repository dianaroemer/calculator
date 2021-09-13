// To Do - 
    // 1. Add positive/negative button
    // 2. Add the ability to input decimals
    // 3. Toggle simplified vs complicated inputs
        // a. Rebuild project based off of single number display
    // 4. Rebuild complicated view to function more cleanly


// operate( a, b, c) takes an operator, a, and two numbers, and calls a representative function based on a switch statement from the operator
function operate( operator, foo , bar ) {

    // console.log(`${operator} and ${foo} and ${bar}`);

    switch(operator) {
        case "+":
            return add(foo, bar);
        case "-":
            return subtract(foo, bar);
        case "*":
            return multiply(foo, bar);
        case "/":
            return divide(foo, bar);
    }
    
}

function add ( foo , bar ) {
    if ( typeof foo != "number" || typeof bar != "number" ) {
        console.log("One of these two elements aren't numbers!");
        return null;
    }
    return foo + bar;
}

function subtract ( foo , bar ) {
    if ( typeof foo != "number" || typeof bar != "number" ) {
        console.log("One of these two elements aren't numbers!");
        return null;
    }
    return foo - bar;
}

function multiply ( foo , bar ) {
    if ( typeof foo != "number" || typeof bar != "number" ) {
        console.log("One of these two elements aren't numbers!");
        return null;
    }
    return foo * bar;
}

function divide ( foo , bar ) {
    if ( typeof foo != "number" || typeof bar != "number" ) {
        console.log("One of these two elements aren't numbers!");
        return null;
    }
    if ( bar === 0 || foo === 0) {
        console.log(`You're attempting to divide by zero! Please try again!`);
        return null;
    }
    return (foo / bar);
}

// ----------------------------- Display ---------------------------------------

const display = document.querySelector('#display');
const results = document.querySelector('#results');
const results2 = document.querySelector('#results2');
const results3 = document.querySelector('#results3');

let displayContent = [];


function updateDisplay() {
    display.textContent = '';
    displayContent.forEach( (element) => {
        display.textContent += element;
    });

    let solved = solve(displayContent);
    // Round to closest whole number
    solved = solved.toFixed(0);


    // Update results text value
    if(!isNaN(solved)) {
        var textToChange = results.childNodes[0];
        textToChange.nodeValue = solved;
    } else if ( displayContent.length === 0 ) {
        var textToChange = results.childNodes[0];
        textToChange.nodeValue = '';
    }
}


function parseButton (e) {

    // Add element to displayContent from e, passed from eventListener
    const btnVal = e.target.dataset.value;
    const btnType = e.target.dataset.type;

    switch(btnType) {
        case "equals":
            //Do functionality regarding the equals and solve function
            let last = displayContent[displayContent.length-1];
            if( last == "+" || last == "-" || last == "*" || last == "/"){
                break;
            }

            let solved = solve(displayContent);
            // Round to closest whole number
            solved = solved.toFixed(0);
            results3.textContent = results2.textContent;
            results2.textContent = solved;

            // solve(displayContent);
            break;
        case "backspace":
            // Do functionality regarding Backspace
            // console.log('This is the BACKSPACE button');
            if( displayContent.length > 0) {
                displayContent = displayContent.slice(0, displayContent.length - 1);
            }
            break;
        case "clear":
            // Do functionality regarding CLEAR
            // console.log('This is the CLEAR button');
            displayContent = [];
            break;
        case "operator":
            // Add operator to array
            // console.log('This is an operator');
            // If array is empty, don't add operator
            if( displayContent.length > 0 ) {
                // if previous element in array is an operator, overwrite prev with new operator 
                let prev = displayContent[displayContent.length-1];
                if ( prev == "+" || prev == "-" || prev == "*" || prev == "/") {
                    displayContent[displayContent.length - 1] = btnVal;
                    break;
                }
                displayContent.push(btnVal);
            }
            break;
        default:
            // Add button value to displayContent[]
            displayContent.push(btnVal);
            break;
    }

    // console.log(displayContent);

    // Update Display to show new input
    updateDisplay();

}

// Add click eventListener to each button, passing parseButton
const calc_btns = Array.from(document.querySelectorAll('.calc_btn'));
calc_btns.forEach( button => button.addEventListener('click', parseButton));


// ----------------------------- Math ---------------------------------------

// XXXUPDATEXXX
// Solve the equation
// Look at array each time a button is pressed and determine if the array is 'solveable'
// if the array is solveable, show the current solveable value in the bottom of the display
    // Per the README:
    // If you enter a number then an operator and another number that calculation should be displayed if your next input is an operator. The result of the calculation should be used as the first number in your new calculation.

// Each button press scan through array to find an operator
    // If suitable operator is found, scan left to find suitable number, ending at displayContent[0]
    // if suitable number is on left, scan right to find suitable number, ending at displayContent[displayContent.length] || operator
    // Solve current operation, using operate ( operator, number left, number right)
    // Place solved value into new array, and append any remaining values of array to the right, run solve on new Array
    // Scan new array, looking for operator, numLeft, and numRight, then solve

function solve( arr ) {

    let input = arguments[0];
    let length = input.length;

    let leftNum = '';
    let rightNum = '';

    // Find operator in array
    let foundOperator = input.find( element => element == "+" || element == "-" || element == "*" || element == "/");
    let foundIndex = input.findIndex( element => element == "+" || element == "-" || element == "*" || element == "/");

    // If no operator is found, return current displayContent as float
    if ( foundIndex == -1 ){
        for ( let i = 0; i < length; i++ ){
            leftNum += input[i];
        }
        leftNum = parseFloat(leftNum);
        return leftNum;
    }

    // If operator is found, create an array containing remaining elements
    // Also find index of next operator
    let remainingInput = input.slice(foundIndex +1 , length);
    let nextFoundIndex = remainingInput.findIndex( element => element == "+" || element == "-" || element == "*" || element == "/");

    remainingInput = remainingInput.slice(nextFoundIndex);
    // console.log(`Below is the remaining input`);
    // console.log(remainingInput);
    // console.log(`And this is nextFoundIndex: ${nextFoundIndex}`);


    // Parse current array of leftNum, operator, rightNum
    for ( let i = 0; i < foundIndex; i++ ){
        leftNum += input[i];
    }
    leftNum = parseFloat(leftNum);
    // Set up if statement - if nextFoundIndex exists, iterate rightNum until nextFoundIndex
    // Else, iterate rightNum until length
    if( nextFoundIndex != -1) {
        for(let i = foundIndex + 1; i <= nextFoundIndex + foundIndex; i++){
            rightNum += input[i];
        }
    } else {
        for(let i = foundIndex + 1; i < length; i++){
            rightNum += input[i];
        }
    }
    rightNum = parseFloat(rightNum);

    // Solve current operation with leftNum, operator, rightNum    
    let operatedValue = operate(foundOperator, leftNum, rightNum);


    // If remainingInput exists (i.e. nextFoundIndex != -1), recurse, using new array populated with previous operate number and remainingInput
    if ( nextFoundIndex != -1 ){
        // console.log('There is a remaining input to be solved!');
        let remainingArray = [operatedValue];
        remainingInput.forEach(element => remainingArray.push(element));
        // console.log(`This is remainingArray ${remainingArray}`);
        return solve(remainingArray);
    }
    
    return operatedValue;

    // Array cases
        // 1. Numbers, no operator
        // 2. Numbers, 1 operator
        // 3. Numbers, operator, numbers
        // 4. Num, oper, num, oper, num, oper, num, etc.
    // Cases to solve for
        // If case 1, return numbers
        // If case 2, return numbers
        // If case 3, perform solve function on numbers using operator, return finished value
        // If case 4, perform solve function recursively on self, passing the finished value from (3.) into new array, with remaining values of current array
    // 


}