const add = function(a, b) {
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
};

const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    return a/b;
}



function executeOperation(operation, first, second){
    switch(operation) {
        case '+':
            return add(first, second);
        break;
        case '-':
            return subtract(first, second);
        break;
        case 'x':
            return multiply(first, second);
        break;
        case '/':
            return second == 0 ? 'ERROR' : divide(first, second);
        break;
        default:
            return 'ERROR';
    }
}

let firstOperand = '';
let secOperand = '';
let operation = '';

const displayCurrent = document.getElementById('current');
const displayOld = document.getElementById('old');


const updateDisplay = (value) => {
    displayCurrent.textContent == 'ERROR' ? displayCurrent.textContent = value : displayCurrent.textContent += value;
}

const resetOperands = () => {
    firstOperand = '';
    secOperand = '';
}

const calculate = (operator) => {

    if(displayCurrent.textContent && operator !== operation){

        const displayCurrentValue = Number(displayCurrent.textContent);
        const displayOldValue = displayOld.textContent;
        
        //First number and operator input after operands reset
        if(!firstOperand) {
            firstOperand = displayCurrentValue;
            operation = operator;
        }
        //Subsequent inputs when we already have a history 
        else {
            secOperand = displayCurrentValue;
            firstOperand = executeOperation(operation, firstOperand, secOperand);
            operation = operator;
        }

        //Error handling for results of executeOperation
        if(firstOperand === 'ERROR'){
            displayCurrent.textContent = 'ERROR';
            operation = '';
            resetOperands();
        }
        //The '=' operator terminates a chain of operations, handled by a operand reset
        else if(operator === '='){
            displayOld.textContent += secOperand+operation;
            displayCurrent.textContent = firstOperand;
            resetOperands();
        }
        //Default behavior for chain of operations
        else{
            displayOld.textContent = firstOperand+operation
            displayCurrent.textContent = ''
        }
    }
}



function initializeCalc(){
    const numbers = document.querySelectorAll('.key.number');
    const operators = document.querySelectorAll('.operator');

    numbers.forEach((number) => {
            number.addEventListener('click', (e) => updateDisplay(e.target.innerText) )
        })

    document.getElementById('dot').addEventListener('click', (e) => updateDisplay(e.target.innerText) )
            

    operators.forEach( op => {
        op.addEventListener('click', (e) => calculate(e.target.innerText)) 
    }) 
}

initializeCalc();