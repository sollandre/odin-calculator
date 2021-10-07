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

const inverse = () => {
    displayCurrent.textContent = 
        displayCurrent.textContent.includes('-') || displayCurrent.textContent == '' 
        ? displayCurrent.textContent.slice(1) 
        : '-'+displayCurrent.textContent 
}

const backspace = () => {
    displayCurrent.textContent = displayCurrent.textContent.slice(0, -1);
}

const updateDisplay = (value) => {
    displayCurrent.textContent == 'ERROR' ? displayCurrent.textContent = value : displayCurrent.textContent += value;
}

const resetOperands = () => {
    firstOperand = '';
    secOperand = '';
    operation = '';
}

const calculate = (operator) => {

    if(displayCurrent.textContent){

        const displayCurrentValue = Number(displayCurrent.textContent);
        const displayOldValue = displayOld.textContent;
        
        //First number and operator input initiating a chain after reset
        if(!firstOperand) {
            firstOperand = displayCurrentValue;
            operation = operator;
        }
        //Subsequent inputs of the chain 
        else {
            secOperand = displayCurrentValue;
            firstOperand = executeOperation(operation, firstOperand, secOperand);
            firstOperand = typeof firstOperand === 'number' ? Math.round(firstOperand*1000)/1000 : firstOperand; 
            operation = operator;
        }

        //Error handling for results of executeOperation
        if(firstOperand === 'ERROR'){
            displayCurrent.textContent = 'ERROR';
            resetOperands();
        }
        //The '=' operator terminates a chain of operations
        else if(operator === '='){
            if(!displayOldValue.includes(operator)){
                displayOld.textContent += secOperand+operation;
                displayCurrent.textContent = firstOperand;
            } 
            resetOperands();
        }
        //Default behavior for first and subsequent steps in the chain of operations 
        else{
            displayOld.textContent = firstOperand+operation
            displayCurrent.textContent = ''
        }
    }
}



function initializeCalc(){
    const numbers = document.querySelectorAll('.key.number');
    const operators = document.querySelectorAll('.key.operator');
    const dot = document.getElementById('dot');
    const clear = document.getElementById('clear');
    const back = document.getElementById('back');
    const invert = document.getElementById('invert');
    
    const numberKeys = Array.from(numbers).map((ele) => ele.textContent)
    const operatorKeys = Array.from(operators).map((ele) => ele.textContent)
    
    
    
    window.addEventListener('keydown', (e) => {
        switch(e.key) {
            case numberKeys.find(ele => ele === e.key):
                updateDisplay(e.key);
                break;
            case operatorKeys.find(ele => ele === e.key):
                calculate(e.key);
                break;
            case 'Backspace':
                backspace();
                break;
            case '.':
                if(!displayCurrent.textContent.includes('.'))  updateDisplay(e.key)
                break;
            default:
                return;
        }
    })
    
    numbers.forEach((number) => {
            number.addEventListener('click', (e) => updateDisplay(e.target.innerText) )
        })

    dot.addEventListener('click', (e) => {
        if(!displayCurrent.textContent.includes('.'))  updateDisplay(e.target.innerText) 
    })
            
    operators.forEach( op => {
        op.addEventListener('click', (e) => calculate(e.target.innerText)) 
    }) 

    clear.addEventListener('click', (e) => {
        resetOperands();
        displayCurrent.textContent = '';
        displayOld.textContent = '';
    })

    back.addEventListener('click', (e) => backspace());

    invert.addEventListener('click', (e) => inverse());


}

initializeCalc();