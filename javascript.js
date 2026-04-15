const operationAdd = function (a, b) {return a + b;};
const operationSubtract = function (a, b){return a - b;};
const operationMultiply = function (a, b){return a * b;};
const operationDivide = function (a, b){return a / b;};

const numberDisplay = document.querySelector("#current-number");

const userNumberOne = document.querySelectorAll(".btn-number");
    for (let button of userNumberOne){
        button.addEventListener("click", () => {
            const numberChoice = button.textContent
            console.log("The first number is:", numberChoice);
            numberDisplay.textContent = numberChoice;
        })
    }

const userOperator = "";


let userNumberTwo = 4;

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