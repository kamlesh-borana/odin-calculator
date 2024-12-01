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
        case "!":
        case "_":
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
        event.target.blur();
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
        event.target.blur();

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
equalButton.addEventListener("click", (event) => {
    event.target.blur();

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
    event.target.blur();
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

        event.target.blur();
    });
});

const backButton = document.querySelector(".back");
backButton.addEventListener("click", (event) => {
    if(displayText) {
        let result = displayText.slice(0, -1);
        resetDisplayText();
        updateDisplayText(String(result));
        updateOperand();
        showDisplayText();
    }

    event.target.blur();
});

document.addEventListener("keydown", (event) => {
    const key = event.key;
    const isShiftKeyPressed = event.shiftKey;
    const isCtrlKeyPressed = event.ctrlKey;

    switch(key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
            updateDisplayText(key);
            updateOperand();
            showDisplayText();
            break;

        case "+":
        case "-":
        case "*":
        case "/":
            if(isNaN(operand1) || isNaN(operand2)) {
                return;
            }
    
            if(operator && displayText === "") {
                updateOperator(key);
                return;
            }
    
            if(operator && (operand1 != null) && (operand2 != null)) {
                calculateAndShowResult();
            }
    
            updateOperator(key);
            toggleOperand();
            updateOperand();
            resetDisplayText();
            break;

        case "=":
        case "Enter":
        case " ":
            if(!operator || (operand1 == null) || isNaN(operand1) || (operand2 == null) || isNaN(operand2) || (displayText === "")) {
                return;
            }
        
            calculateAndShowResult();
            break;

        case "%":
        case "!":
        case "_":
            let operand = currentOperand === 1 ? operand1 : operand2;

            if(operand != null && !isNaN(operand)) {
                let result = operate(key, operand);
                result = Number(result.toFixed(10));
                resetDisplayText();
                updateDisplayText(String(result));
                updateOperand();
                showDisplayText();
            }
            break;

        case "Backspace":
            if(isShiftKeyPressed || isCtrlKeyPressed) {
                resetDisplayText();
                resetOperator();
                resetOperand1();
                resetOperand2();
                resetCurrentOperand();
                showDisplayText();
                break;
            }

            if(displayText) {
                let result = displayText.slice(0, -1);
                resetDisplayText();
                updateDisplayText(String(result));
                updateOperand();
                showDisplayText();
            }
            break;
    }
});