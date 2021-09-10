// To Do - 
    // 1. Make math functions work


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
let displayContent = [];


function updateDisplay() {
    display.textContent = '';

    displayContent.forEach( (element) => {
        display.textContent += element;
    });

}

function parseButton (e) {

    // Add element to displayContent from e, passed from eventListener
    const btnVal = e.target.dataset.value;
    const btnType = e.target.dataset.type;


    switch(btnType) {
        case "equals":
            //Do functionality regarding the equals and solve function
            // console.log('This is the EQUALS button');
            // Type checking functionality
                // Don't perform equals operation if array is not in suitable format, eg equals without two inputs and one operator
            // if( displayContent[displayContent])

            console.log();
            let last = displayContent[displayContent.length-1];
            if( last == "+" || last == "-" || last == "*" || last == "/"){
                break;
            }
            solve(displayContent);
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

    console.log(displayContent);

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

    // Find operator in array
    let found = input.find( element => element == "+" || element == "-" || element == "*" || element == "/");
    let foundIndex = input.findIndex( element => element == "+" || element == "-" || element == "*" || element == "/");
    // console.log(`This is found: ${found}, this is foundIndex: ${foundIndex}`);

    // Determine next index of an operator, or return length
    let remainingInput = input.slice(foundIndex +1 , length);
    let nextFoundIndex = remainingInput.findIndex( element => element == "+" || element == "-" || element == "*" || element == "/");
    // console.log(`Below is the remaining input`);
    // console.log(remainingInput);
    // console.log(`And this is nextFoundIndex: ${nextFoundIndex}`);

    let leftNum = '';
    let rightNum = '';

    for ( let i = 0; i < foundIndex; i++ ){
        leftNum += input[i];
    }
    leftNum = parseFloat(leftNum);

    // Set up if statement - if nextFoundIndex exists, run the code as below
    // Else, run the for ( i = foundIndex; i < length; i++)
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

    console.log(`This is ${leftNum} and this is ${rightNum} and this is the operator between them: ${found}`);
    console.log(operate(found, leftNum, rightNum));
    
    

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