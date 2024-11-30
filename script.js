function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b === 0) {
        return "Error"
    }
    return a / b;
}

function percentage(a) {
    return a / 100;
}

function sign(a) {
    return -(a);
}

function operate(operator, operand1, operand2) {
    switch(operator) {
        case "+":
            return add(operand1, operand2);
        
        case "-":
            return subtract(operand1, operand2);

        case "*":
            return multiply(operand1, operand2);

        case "/":
            return divide(operand1, operand2);

        case "%":
            return percentage(operand1);

        case "±":
            return sign(operand1);

        default:
            return "Invalid Operator";
    }
}

let operand1 = null;
let operand2 = null;
let operator = null;
let displayText = "";
let currentOperand = 1;

const displayDiv = document.querySelector(".display");

function showDisplayText() {
    displayDiv.textContent = displayText || "0";
}

function updateDisplayText(text) {
    if(displayText === "0" && text === ".") {
        displayText = displayText + text;
    } else if(displayText === "0" || displayText === "Error") {
        displayText = text;
    } else if(text === "." && displayText.includes(".")) {
        return;
    } else {
        displayText = displayText + text;
    }
}

function updateOperand1(value) {
    operand1 = Number(value);
}

function updateOperand2(value) {
    operand2 = Number(value);
}

function updateOperand() {
    if(currentOperand === 1) {
        updateOperand1(displayText);
    } else {
        updateOperand2(displayText);
    }
}

const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        updateDisplayText(event.target.value);
        updateOperand();
        showDisplayText();
    });
});

function updateOperator(operatorSign) {
    operator = operatorSign;
}

function toggleOperand() {
    currentOperand = currentOperand === 1 ? 2 : 1;
}

function resetCurrentOperand() {
    currentOperand = 1;
}

function resetOperand1() {
    operand1 = null;
}

function resetOperand2() {
    operand2 = null;
}

function resetOperator() {
    operator = null;
}

function resetDisplayText() {
    displayText = "";
}

function calculateAndShowResult() {
    let result = operate(operator, operand1, operand2);
    result = Number(result.toFixed(10));
    resetDisplayText();
    updateDisplayText(String(result));
    toggleOperand();
    updateOperand();
    showDisplayText();
    resetOperand2();
    resetOperator();
}

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        if(isNaN(operand1) || isNaN(operand2)) {
            return;
        }

        if(operator && displayText === "") {
            updateOperator(event.target.value);
            return;
        }

        if(operator && (operand1 != null) && (operand2 != null)) {
            calculateAndShowResult();
        }

        updateOperator(event.target.value);
        toggleOperand();
        updateOperand();
        resetDisplayText();
    });
});

const equalButton = document.querySelector(".equal");
equalButton.addEventListener("click", () => {
    if(!operator || (operand1 == null) || isNaN(operand1) || (operand2 == null) || isNaN(operand2) || (displayText === "")) {
        return;
    }

    calculateAndShowResult();
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", (event) => {
    resetDisplayText();
    resetOperator();
    resetOperand1();
    resetOperand2();
    resetCurrentOperand();
    showDisplayText();
});

const transformButtons = document.querySelectorAll(".transform");
transformButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        let operand = currentOperand === 1 ? operand1 : operand2;

        if(operand != null && !isNaN(operand)) {
            let result = operate(event.target.value, operand);
            result = Number(result.toFixed(10));
            resetDisplayText();
            updateDisplayText(String(result));
            updateOperand();
            showDisplayText();
        }
    });
});

const backButton = document.querySelector(".back");
backButton.addEventListener("click", () => {
    if(displayText) {
        let result = displayText.slice(0, -1);
        resetDisplayText();
        updateDisplayText(String(result));
        updateOperand();
        showDisplayText();
    }
});