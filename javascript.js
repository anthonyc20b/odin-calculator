// Basic functions included for mathematical logic
const operationAdd = function (a, b){return a + b;};
const operationSubtract = function (a, b){return a - b;};
const operationMultiply = function (a, b){return a * b;};
const operationDivide = function (a, b){return a / b;};

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
                console.log("The first number is:", firstDisplayNumber);
        }})
    }

const userOperator = document.querySelectorAll(".btn-operator");
    for (let button of userOperator){
        button.addEventListener("click", () => {
            if (firstDisplayNumber != "" && operatorChosen === true && secondDisplayNumber != ""){ // Checks to make sure that if two operators are selected it runs the operate() function to allow chain expressions
                let finalResult = operate();

                let length = finalResult.toString().length
                console.log("The final result is:", finalResult);
                numberDisplay.textContent = finalResult + " " + operatorSelect;
                firstDisplayNumber = finalResult; // Shows the final result as the current number so you can keep calculating on screen
                stringConvert = finalResult; // Updates the backend logic to make the correct mathematical calculation
                secondDisplayNumber = "";
            }
            operatorSelect = button.textContent;
            console.log("The operator selection is:", operatorSelect);
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
                console.log("The second number is:", secondDisplayNumber);
                
        }})
    }

// Equals button logic, listens for the click on = and runs the operate function while updating the variables to allow chain expressions
const finalCalculation = document.querySelector("#btn-equals");
finalCalculation.addEventListener("click", () => {
    let finalResult = operate();
    console.log("The final result is:", finalResult);
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
        } else {
            disableButtons();
            return "Error!";
        }
    };