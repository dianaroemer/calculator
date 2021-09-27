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


// -------------------------- Parse Buttons ------------------------------------

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
            if(!isNaN(solved)) {
                results3.textContent = results2.textContent;
                results2.textContent = solved;
            }

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
        case "decimal":
            // If there is no decimal in current number, add a decimal, else do nothing
            let currentNumber = [];
            
            for (let i = displayContent.length -1; i >= 0; i--) {
                
                if( displayContent[i] == "+" ||  displayContent[i] == "-" ||  displayContent[i] == "*" ||  displayContent[i] == "/") {
                    break;
                }
                currentNumber.push(displayContent[i]);
            }
            // console.log(currentNumber);
            
            const hasDecimal = currentNumber.findIndex( element => {
                return element == ".";
            })
            // console.log(`This is the status of hasDecimal: ` + hasDecimal);
            
            if(hasDecimal == -1) {
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

window.addEventListener('keydown', simulateClickEvent);

function simulateClickEvent(e) {

    // console.log(e.keyCode);
    switch ( e.keyCode ) {
        case 48:
            document.getElementById('cal_btn_zero').click();
            break;
        case 49:
            document.getElementById('cal_btn_one').click();
            break;
        case 50:
            document.getElementById('cal_btn_two').click();
            break;
        case 51:
            document.getElementById('cal_btn_three').click();
            break;
        case 52:
            document.getElementById('cal_btn_four').click();
            break;
        case 53:
            document.getElementById('cal_btn_five').click();
            break;
        case 54:
            document.getElementById('cal_btn_six').click();
            break;
        case 55:
            document.getElementById('cal_btn_seven').click();
            break;
        case 56:
            if(e.shiftKey) {
                document.getElementById('cal_btn_multiply').click();
            } else {
            document.getElementById('cal_btn_eight').click();
            }
            break;
        case 57:
            document.getElementById('cal_btn_nine').click();
            break;
            // ------------ Operators ------------
        case 187:
            if ( e.shiftKey) {
                document.getElementById('cal_btn_plus').click();
            } else {
                document.getElementById('cal_btn_equals').click();
            }
            break;
        case 189:
            document.getElementById('cal_btn_minus').click();
            break;
        case 191:
            document.getElementById('cal_btn_divide').click();
            break;
        case 13:
            document.getElementById('cal_btn_equals').click();
            break;
        case 190:
            document.getElementById('cal_btn_decimal').click();
            break;
        case 8:
            document.getElementById('cal_btn_backsp').click();
            break;
        case 46:
            document.getElementById('cal_btn_clear').click();
            break;
    }



}


// ----------------------------- Math ---------------------------------------

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
}


// ----------------------------- Toggle ---------------------------------------

const toggle = document.querySelector("#switchValue");
toggle.checked = true;

const resultsLabel = document.getElementById('resultsLabel');
const displayLabel = document.getElementById('displayLabel');
const cal_btn_posneg = document.getElementById('cal_btn_posneg');
const cal_btn_backsp = document.getElementById('cal_btn_backsp');

toggle.addEventListener('click', pickCalc);

function pickCalc () {

    // console.log(toggle.checked);
    if(toggle.checked) {
        results.style.display = "inherit";
        resultsLabel.style.display = "inherit";
        displayLabel.style.display = "inherit";
        cal_btn_backsp.style.gridArea = "1 / 2 / 1 / 4";
        cal_btn_posneg.style.display = "none";

        // Initialize Scientific variables to empty and default states
        displayContent = [];
        display.textContent = '';
        results.childNodes[0].nodeValue = '';
        results2.textContent = '';
        results3.textContent = '';
        display.style.marginBottom = "10px";

        cal_btn_plus.classList.remove('selected');
        cal_btn_minus.classList.remove('selected');
        cal_btn_multiply.classList.remove('selected');
        cal_btn_divide.classList.remove('selected');

        // Add Scientific event listeners
        calc_btns.forEach( button => button.addEventListener('click', parseButton));
        // Remove Simplified Event listeners XXXUPDATE
        calc_btns.forEach( button => button.removeEventListener('click', parseSimpButton));        
        
    } else {
        display.textContent = ''
        results.style.display = "none";
        resultsLabel.style.display = "none";
        displayLabel.style.display = "none";
        display.style.marginBottom = "0px";
        cal_btn_posneg.style.display = "inline-block";
        cal_btn_backsp.style.gridArea = "auto";


        // Initialize Simplified variables to empty and default states 
        // XXXUPDATEXXX
        displaySimpContent = '';
        firstValue = 0;
        secondValue =0;
        currentOperator = '';

        // Remove Scientific event listeners
        calc_btns.forEach( button => button.removeEventListener('click', parseButton));
        // Add Simplified event listeners XXXUPDATEXXX
        calc_btns.forEach( button => button.addEventListener('click', parseSimpButton));
        
    }

}

// -------------------------- Parse Simp Buttons ----------------------------

// Intake user input via button or click

let displaySimpContent = '';
let firstValue = 0;
let secondValue = 0;
let currentOperator = '';

const cal_btn_plus = document.getElementById('cal_btn_plus');
const cal_btn_minus = document.getElementById('cal_btn_minus');
const cal_btn_multiply = document.getElementById('cal_btn_multiply');
const cal_btn_divide = document.getElementById('cal_btn_divide');


function parseSimpButton( e ) {

     // Add element to displayContent from e, passed from eventListener
    const btnVal = e.target.dataset.value;
    const btnType = e.target.dataset.type;


    switch(btnType) {
        case "equals":
            //Do functionality regarding the equals and solve function

            solveCurrent();
            firstValue = secondValue;
            currentOperator = '';

            break;
        case "backspace":
            // Do functionality regarding Backspace
            firstValue = firstValue.toString();
            if(firstValue.length > 1) {
                firstValue = firstValue.slice(0, -1);
                firstValue = parseFloat(firstValue);
            } else {
                firstValue = 0;
            }
            displaySimpContent = displaySimpContent.slice(0, -1);
            break;
        case "clear":
            // Do functionality regarding CLEAR
            displaySimpContent ='';
            firstValue = 0;
            secondValue = 0;
            currentOperator = '';

            cal_btn_plus.classList.remove('selected');
            cal_btn_minus.classList.remove('selected');
            cal_btn_multiply.classList.remove('selected');
            cal_btn_divide.classList.remove('selected');

            break;
        case "operator":
            // Check if can operator is legal on current value by checking whether or not prev value exists

            if(currentOperator) {
                //Solve current operation before showing new operation
                solveCurrent();
                currentOperator = btnVal;
            } else {
                switch(btnVal) {
                    case "+":
                        displaySimpContent = firstValue.toString()
                        secondValue = firstValue;
                        firstValue = 0;
                        currentOperator = "+";
                        console.log(cal_btn_plus.classList);
                        cal_btn_plus.classList.toggle('before');
                        console.log(cal_btn_plus.classList);
                        break;
                    case "-":
                        displaySimpContent = firstValue.toString();
                        secondValue = firstValue;
                        firstValue = 0;
                        currentOperator = "-";
                        break;
                    case "*":
                        displaySimpContent = firstValue.toString();
                        secondValue = firstValue;
                        firstValue = 0;
                        currentOperator = "*";
                        break;
                    case "/":
                        displaySimpContent = firstValue.toString();
                        secondValue = firstValue;
                        firstValue = 0;
                        currentOperator = "/";
                        break;
                }               
            }
            break;
        case "decimal":
            // If displaySimpContent has no decimal, add a decimal, else do nothing
            firstValue = firstValue.toString();
            if (!firstValue.includes('.')) {
                firstValue += '.';
            }
            displaySimpContent = firstValue;

            break;
        case "posneg":
            firstValue *= -1;
            displaySimpContent = firstValue.toString();
            break;
        default:
                firstValue = firstValue.toString();
                if( firstValue == '0' ){
                    firstValue = btnVal;
                } else {
                    firstValue += btnVal;
                }
                displaySimpContent = firstValue;
                firstValue = parseFloat(firstValue);

            break;
    }
 
    console.log(`The value of displaySimpContent is: |${displaySimpContent}| and the value of firstValue is: |${firstValue}|, the value of secondValue is: |${secondValue}|, and the currentOperator is: |${currentOperator}|`);

    // Update Display to show new input
    updateSimpDisplay();
}

function updateSimpDisplay() {
    display.textContent = displaySimpContent;
}

function solveCurrent() {
    switch(currentOperator) {
        case "+":
            firstValue = add(firstValue, secondValue);
            displaySimpContent = firstValue.toString();
            secondValue = firstValue;
            firstValue = 0;
            break;
        case '-':
            firstValue = subtract(secondValue, firstValue);
            displaySimpContent = firstValue.toString();
            secondValue = firstValue;
            firstValue = 0;
            break;
        case '*':
            firstValue = multiply(firstValue, secondValue);
            displaySimpContent = firstValue.toString();
            secondValue = firstValue;
            firstValue = 0;
            break;
        case '/':
            firstValue = divide(secondValue, firstValue);
            displaySimpContent = firstValue.toString();
            secondValue = firstValue;
            firstValue = 0;
            break;
    }
}