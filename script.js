const add = function(a, b) {
    return a + b;
};

const subtract = function(a, b) {
    return a - b;
};

const sum = function(arr) {
    return arr.reduce((prev, cur) => prev + cur, 0)
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

let current = '';
let last = '';
let operation = '';
const displayCurrent = document.getElementById('current');
const displayLast = document.getElementById('last');


const updateDisplay = (value) => {
    displayCurrent.innerText += value;
}

const calculate = (value) => {
    if(displayCurrent.innerHTML && value !== operation){

        if(displayLast.innerHTML === 'ERROR'){
            displayLast.innerHTML = '';
        }

        if(!last) {
            last = +displayCurrent.innerHTML;
            operation = value;
        }
        else {
            current = +displayCurrent.innerHTML;
            last = executeOperation(operation, last, current);
            operation = value;
        }

        if(last === 'ERROR'){
            current = '';
            last = '';
            operation = '';
            displayLast.innerHTML = 'ERROR'
            displayCurrent.innerHTML = '';
        }
        else if(value === '='){
            displayLast.innerHTML += current+operation;
            displayCurrent.innerHTML = last;
            current = '';
            last = '';
        }
        else{
            displayLast.innerHTML = last+operation
            displayCurrent.innerHTML = ''
        }
    }
}



function initializeCalc(){
    const numbers = document.querySelectorAll('.key.number');
    const operators = document.querySelectorAll('.operator');

    numbers.forEach((number) => {
            number.addEventListener('click', (e) => updateDisplay(e.target.innerText) )
        })

    operators.forEach( op => {
        op.addEventListener('click', (e) => calculate(e.target.innerText)) 
    }) 
}

initializeCalc();