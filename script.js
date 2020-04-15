//functions that does the operations add, subtract, divide and multiply
function add (operand1, operand2) {
    return operand1 + operand2;
}
function subtract (operand1, operand2) {
    return operand1 - operand2;
}
function divide (operand1, operand2) {
    if (operand2 === 0 || operand1 === 0 && operand2 === 0){
        solution =  'Not a number.'; 
        return;
    }
    return operand1 / operand2;
}
function multiply (operand1, operand2) {
    return operand1 * operand2;
}
let solution, currentNum, operator, lastAnswer, maxDisplay = 9, decimal = false;

function operate(operator, operand1, operand2) {
    switch(operator) {
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case 'x':
            return multiply(operand1, operand2);
        case '/':
            return divide(operand1, operand2);
    }
}
//to determine what operator was selected and carry out the operations
function otherOperations (btn) {
    const value = btn.textContent;
    switch(value) {
        case 'AC':
            reset();
            break;
        case '%':
            if (!Output.textContent) return;
            solution = parseFloat(Output.textContent) / 100;
            Output.textContent = solution;
            operator = '%';
            break;
        case 'DEL':
            Delete();
            break;
        case '=':
            evaluate(btn);
            if (getLength(solution) > maxDisplay) {
                Output.textContent = truncateSolution(solution, getLength(solution), maxDisplay);
                break;
            }
            if (Math.round(solution) !== solution) {
                decimal = true;
                decimalButton.className = 'disabled';
            }
            Output.textContent = solution;
            break;
        // case 'ANS':
        //     console.log('recalling the damn answer');
        //     solution = '';
        //     if(solution){
        //         lastAnswer = solution;
        //     }
        //     else lastAnswer = recall.value;
        //     console.log('answer equals', lastAnswer);
        //     Output.textContent = lastAnswer;
        //     break;        
    }
}

let Input = document.getElementById('input');
let Output = document.getElementById('output');
let decimalButton = document.getElementById('decimal');
let numberKeys = document.getElementById('container');
// let recall = document.getElementById('answer');
numberKeys.addEventListener('click', function (event) {
    const btn = event.target;
    let isAtMaxLength = Output.textContent.length === maxDisplay;
    if (btn.className === 'number' && Output.textContent.length !== maxDisplay){
        // if(btn.id === 'answer'){
        //     Input.textContent = Output.textContent;
        // }
        renderOutput(btn);
        console.log('number clicked', Output.textContent);
    }
    else if (btn.id === 'decimal' && !isAtMaxLength && !decimal) {
        decimal = true;
        decimalButton.className = 'disabled';
        renderOutput(btn);
    }
    else if (btn.className === 'operator') {
        if (operator === '=') {resetInput();}
        evaluate(btn);
    }
    else otherOperations(btn);
});

function resetInput() {
    Input.textContent += '';
}
function resetOutput() {
    Output.textContent = '';
}

function reset() {
    solution = '';
    currentNum = '';
    operator = '';
    Input.textContent = '';
    Output.textContent = '';
    // recall.textContent = '';
}

function renderInput(btn) {
    Input.textContent += Output.textContent + ` ${btn.textContent} `;
}

function renderOutput(btn) {
    Output.textContent += btn.textContent;
}

function Delete () {
    Output.textContent = Output.textContent.slice(0, -1);
    if(Output.textContent == "") {
        Output.textContent = "";
    };
}
function recallAnswer(btn) {
    
}

function evaluate(btn) {
    currentNum = parseFloat(Output.textContent);
    // if(currentNum === 'ANS' && !solution){
    //     currentNum += ;
    // }
    if (isNaN(currentNum)) return;
    // if(currentNum === 'ANS'){
    //     console.log("hello i could work if you dont give up");
    // }
    renderInput(btn);
    resetOutput();
    if (!solution || operator === '=' || operator === '%') {
        solution = currentNum;
        operator = btn.textContent;
        return;
    }
    solution = operate(operator, solution, currentNum);
    Output.textContent += solution;
    operator = btn.textContent;
    decimal = false;
    decimalButton.className = '';
    
    console.log('solution is ', solution);
    console.log(currentNum);
    }

function getLength(solution) {
    return Math.ceil(Math.log10(solution));
}

function truncateSolution(solution, length, maxDisplay) {
    return `${Math.round(solution / Math.pow(10, length - maxDisplay + 3))}event${length - maxDisplay + 3}`;
}