const operationAdd = function (a, b){return a + b;};
const operationSubtract = function (a, b){return a - b;};
const operationMultiply = function (a, b){return a * b;};
const operationDivide = function (a, b){return a / b;};

const numberDisplay = document.querySelector("#current-number");
let firstDisplayNumber = ""; // Used to show the current state of the calculator, updates the DOM for number 1
let secondDisplayNumber = ""; // Used to show the current state of the calculator, updates the DOM for number 2
let stringConvert = 0; // For function purposes this is a
let stringConvertTwo = 0; // For function purposes this is b
let operatorChosen = false;

const userNumberOne = document.querySelectorAll(".btn-number");
    for (let button of userNumberOne){
        button.addEventListener("click", () => {
            if (operatorChosen === false){
                const numberSelect = button.textContent;
                firstDisplayNumber = firstDisplayNumber + numberSelect;
                numberDisplay.textContent = firstDisplayNumber;
                stringConvert = parseInt(firstDisplayNumber)
                console.log("The first number is:", firstDisplayNumber);
        }})
    }

const userOperator = document.querySelectorAll(".btn-operator");
    for (let button of userOperator){
        button.addEventListener("click", () => {
            const operatorSelect = button.textContent;
            console.log("The operator selection is:", operatorSelect);
            numberDisplay.textContent = operatorSelect;
            return operatorChosen = true;
        })
    }


let userNumberTwo = document.querySelectorAll(".btn-number");
    for (let button of userNumberTwo) {
        button.addEventListener("click", () => {
            if (operatorChosen === true){
                const numberSelect = button.textContent;
                secondDisplayNumber = secondDisplayNumber + numberSelect;
                numberDisplay.textContent = secondDisplayNumber;
                stringConvertTwo = parseInt(secondDisplayNumber)
                console.log("The first number is:", secondDisplayNumber);
        }})
    }

const operate = function (){
    let a = userNumberOne;
    let b = userNumberTwo;

    if (userOperator === "+"){
        return operationAdd(a, b);
    } else if (userOperator === "-") {
        return operationSubtract(a, b);
    } else if (userOperator === "*") {
        return operationMultiply(a, b);
    } else if (userOperator === "/") {
        return operationDivide(a, b);
    } else {
        return "Error: Invalid Selection";
    }
};
// Used for testing the function in the console
console.log(operate());