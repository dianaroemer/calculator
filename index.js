// To Do - Finish case statement for eventlistener in addContent





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

// To do
// Generate Array of calc_btns
// Add event listener to each btn with forEach
// Add function to each event listener parsing button id and calling representative function

// Alternatively - parse button id once and add respective eventListener and function based off of button id
// Each button will take two event listeners, click and keydown
// When event listener is triggered, will call representative function based off of buttonID
// Each eventListener should correspond to individual buttonID functions
// What is more efficient? To call which button is pressing me each time a button is pressed? This can be solved in only two or three lines, passing button ID as a function into the representative function
// Do it both ways - once, hard-coding each button and event listener, and a second time, passing the button id into the representative function, which parses result



// function updateDisplay() {
    
//     display.textContent = '';

//     displayContent.forEach( (element) => {
//         // console.log(element);
//         display.textContent += element;
//     });

//     // console.log(displayContent);

// }


function updateDisplay() {
    
    display.textContent = '';

    displayContent.forEach( (element) => {
        // console.log(element);
        display.textContent += element;
    });

    // console.log(displayContent);

}

function parseButton (e) {

    // Add element to displayContent based off of input, which is passed from eventListener

    // console.log(e.target.textContent);

    // displayContent.push(e.target.textContent[1]);

    const btnVal = e.target.dataset.value;

    const btnType = e.target.dataset.type;

    // console.log(e.target.dataset.type);

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
            // If previous element in array is operator, don't add operator
            // If array is empty, don't add operator
            if( displayContent.length > 0 ) {
                // if previous element in array is an operator, don't add operator, instead overwrite latest operator with newest operator value (eg, press + after pressing - updates final array value to match -, instead of staying static on +)
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

    // Button cases
      // Number 0-9
      // Operator + - * /
      // Equals = 
      // Backspace 
      // Clear

      // It's faster to check for clear, backspace, or equals, and the just complete the pop function by end



    // Update Display to show new input
    updateDisplay();

}

const calc_btns = Array.from(document.querySelectorAll('.calc_btn'));
// console.table(calc_btns);

calc_btns.forEach( button => button.addEventListener('click', parseButton));



// const cal_btn_one = document.querySelector("#cal_btn_one");
// cal_btn_one.addEventListener('click', function() {
//     displayContent.push(1);
//     // console.log(displayContent);
//     updateDisplay();
// });

// const cal_btn_two = document.querySelector("#cal_btn_two");
// cal_btn_two.addEventListener('click', function() {
//     displayContent.push(2);
//     // console.log(displayContent);
//     updateDisplay();
// });



// window.addEventListener

