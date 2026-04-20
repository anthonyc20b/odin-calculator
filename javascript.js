// Basic functions included for mathematical logic
const operationAdd = function (a, b){return a + b;};
const operationSubtract = function (a, b){return a - b;};
const operationMultiply = function (a, b){return a * b;};
const operationDivide = function (a, b){return a / b;};
const operationModulo = function (a, b){return ((a % b) + b) % b;};

let firstDisplayNumber = ""; // Used to show the current state of the calculator, updates the DOM for number 1
let secondDisplayNumber = ""; // Used to show the current state of the calculator, updates the DOM for number 2
let stringConvert = 0; // For function purposes this is a
let stringConvertTwo = 0; // For function purposes this is b
let operatorChosen = false; // Used to conditionally check if we are selecting number one or number two
let operatorSelect = ""; // Used to store what operator the user selected

const numberDisplay = document.querySelector("#current-number");

// Gets the first number from the user based on selection, updates the display, and allows for multiple digit numbers
const userNumberOne = document.querySelectorAll(".btn-number");
    for (let button of userNumberOne){
        button.addEventListener("click", () => {
            if (operatorChosen === false){
                let numberSelect = button.textContent;
                firstDisplayNumber = firstDisplayNumber + numberSelect;
                numberDisplay.textContent = firstDisplayNumber;
                stringConvert = parseInt(firstDisplayNumber)
        }})
    }

const userOperator = document.querySelectorAll(".btn-operator");
    for (let button of userOperator){
        button.addEventListener("click", () => {
            if (firstDisplayNumber != "" && operatorChosen === true && secondDisplayNumber != ""){ // Checks to make sure that if two operators are selected it runs the operate() function to allow chain expressions
                let finalResult = operate();

                finalResult = displayLimit(finalResult); // Check the display limit and ensure the number returns less than 16 and gets rounded up                numberDisplay.textContent = finalResult + " " + operatorSelect;
                
                firstDisplayNumber = finalResult; // Shows the final result as the current number so you can keep calculating on screen
                stringConvert = finalResult; // Updates the backend logic to make the correct mathematical calculation
                secondDisplayNumber = "";
            }
            operatorSelect = button.textContent;
            numberDisplay.textContent = firstDisplayNumber + " " + operatorSelect;
            operatorChosen = true;
        })
    }

// Gets the second number from the user and converts it to a string from the button output
const userNumberTwo = document.querySelectorAll(".btn-number");
    for (let button of userNumberTwo) {
        button.addEventListener("click", () => {
            if (operatorChosen === true){
                let numberSelect = button.textContent;
                secondDisplayNumber = secondDisplayNumber + numberSelect;
                numberDisplay.textContent = firstDisplayNumber + " " + operatorSelect + " " + secondDisplayNumber;
                stringConvertTwo = parseInt(secondDisplayNumber)
                
        }})
    }

// Equals button logic, listens for the click on = and runs the operate function while updating the variables to allow chain expressions
const finalCalculation = document.querySelector("#btn-equals");
finalCalculation.addEventListener("click", () => {
    let finalResult = operate();

    finalResult = displayLimit(finalResult); // Check the display limit and ensure the number returns less than 16 and gets rounded up

    numberDisplay.textContent = finalResult;
    stringConvert = finalResult; // Sets the final result as the current number so you can keep calculating
    firstDisplayNumber = finalResult; // Shows the final result as the current number so you can keep calculating on screen
    secondDisplayNumber = "";
})

const disableButtons = function (){
    userNumberOne.forEach(button => {button.disabled = true;});
    userNumberTwo.forEach(button => {button.disabled = true;});
    userOperator.forEach(button => {button.disabled = true;});
    finalCalculation.disabled = true;
}

const operate = function (){
        let a = stringConvert;
        let b = stringConvertTwo;
        // Checks to see if there is division by 0 in all cases and disables the calculator, requiring the user to restart it.
        if (a === 0 && b === 0 && operatorSelect === "/" || b === 0 && operatorSelect === "/"){
            disableButtons();
            return "Yeah right nice try!";
        } 

        if (operatorSelect === "+"){
            return operationAdd(a, b);
        } else if (operatorSelect === "-") {
            return operationSubtract(a, b);
        } else if (operatorSelect === "*") {
            return operationMultiply(a, b);
        } else if (operatorSelect === "/") {
            return operationDivide(a, b);
        } else if (operatorSelect === "%") {
            return operationModulo(a, b);
        } else {
            disableButtons();
            return "Error!";
        }
    };

    // Check that the length of the return is not greater than 16 digits (Screen display limits)
    const displayLimit = function (finalResult){
    let totalLength = finalResult.toString().length
    let stringSplit = finalResult.toString().split(".");
    let lengthBeforeDecim = stringSplit[0].length;
    if (totalLength > 16) {
        let roundingNum = 16 - lengthBeforeDecim;
        roundedFinal = finalResult.toFixed(roundingNum);
        finalResult = parseFloat(roundedFinal);
        return finalResult;
    } else {
        return finalResult;
    }
    }