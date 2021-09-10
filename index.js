// To Do - 
    // 1. Make math functions work



// operate( a, b, c) takes an operator, a, and two numbers, and calls a representative function based on a switch statement from the operator
function operate( operator, foo , bar ) {

    console.log(`${operator} and foo:${foo} and bar:${bar}`);

    switch(operator) {
        case operator == "+":
            return add(foo, bar);
        case operator == "-":
            return subtract(foo, bar);
        case operator == "*":
            return multiply(foo, bar);    
        case operator == "/":
            return divide(foo, bar);
    }

    

}

function add ( foo , bar ) {
        if ( foo != "number" || bar != "number" ) {
        console.log("One of these two elements aren't numbers!");
        return null;
    }
    return foo + bar;
}

function subtract ( foo , bar ) {
    if ( foo != "number" || bar != "number" ) {
        console.log("One of these two elements aren't numbers!");
        return null;
    }
    return foo - bar;
}

function multiply ( foo , bar ) {
    if ( foo != "number" || bar != "number" ) {
        console.log("One of these two elements aren't numbers!");
        return null;
    }
    return foo * bar;
}

function divide ( foo , bar ) {
    if ( foo != "number" || bar != "number" ) {
        console.log("One of these two elements aren't numbers!");
        return null;
    }
    if ( bar === 0 ) {
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
            console.log('This is the EQUALS button');
            // Type checking functionality
                // Don't perform equals operation if array is not in suitable format, eg equals without two inputs and one operator
            break;
        case "backspace":
            // Do functionality regarding Backspace
            console.log('This is the BACKSPACE button');
            if( displayContent.length > 0) {
                displayContent = displayContent.slice(0, displayContent.length - 1);
            }
            // console.log(displayContent);
            break;
        case "clear":
            // Do functionality regarding CLEAR
            console.log('This is the CLEAR button');
            displayContent = [];
            break;
        case "operator":
            // Add operator to array
            console.log('This is an operator');
            // If array is empty, don't add operator
            if( displayContent.length > 0 ) {
                // if previous element in array is an operator, don't add operator, instead overwrite prev with new operator 
                let prev = displayContent[displayContent.length-1];
                if ( prev == "+" || prev == "-" || prev == "*" || prev == "/") {
                    displayContent[displayContent.length - 1] = btnVal;
                    break;
                }
                displayContent.push(btnVal);
            }
            break;
        default:
            // Add button content to displayContent[]
            // XXXUPDATEXXX Change this not to pull from text content, but instead from data-value, so I can change button textContent without changing the functionality of the button itself
            displayContent.push(btnVal);
            break;
    }

    console.log(displayContent);

    // Update Display to show new input
    updateDisplay();

}

const calc_btns = Array.from(document.querySelectorAll('.calc_btn'));

calc_btns.forEach( button => button.addEventListener('click', parseButton));

