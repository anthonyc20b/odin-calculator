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

                if (numberSelect === "0" && firstDisplayNumber.length === 0){
                    return;
                } // Check to make sure that 0 has not been entered multiple times as the first number, repeated again in userNumberTwo
                if (firstDisplayNumber.length >= 7){ // Ensure the user cannot type past the display limit
                    return;
                }
                firstDisplayNumber = firstDisplayNumber + numberSelect;
                numberDisplay.textContent = firstDisplayNumber;
                stringConvert = parseFloat(firstDisplayNumber)
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

            //Re-enable the decimal button if needed as we are onto second number
            createDecimalBtn.disabled = false;
            createDecimalBtn.style.pointerEvents = "auto";
        })
    }

// Gets the second number from the user and converts it to a string from the button output
const userNumberTwo = document.querySelectorAll(".btn-number");
    for (let button of userNumberTwo) {
        button.addEventListener("click", () => {
            if (operatorChosen === true){
                let numberSelect = button.textContent;
                if (numberSelect === "0" && secondDisplayNumber.length === 0){
                    return;
                }
                if (secondDisplayNumber.length >= 7){ // Ensure the user cannot type past the display limit
                    return;
                }
                secondDisplayNumber = secondDisplayNumber + numberSelect;
                numberDisplay.textContent = firstDisplayNumber + " " + operatorSelect + " " + secondDisplayNumber;
                stringConvertTwo = parseFloat(secondDisplayNumber)
                
        }})
    }

// Equals button logic, listens for the click on = and runs the operate function while updating the variables to allow chain expressions
const finalCalculation = document.querySelector("#btn-equals");
finalCalculation.addEventListener("click", () => {
    let finalResult = operate();

    finalResult = displayLimit(finalResult); // Check the display limit and ensure the number returns less than 16 and gets rounded up

    numberDisplay.textContent = finalResult;
    stringConvert = finalResult; // Sets the final result as the current number so you can keep calculating
    firstDisplayNumber = finalResult.toString(); // Shows the final result as the current number so you can keep calculating on screen
    secondDisplayNumber = "";
    operatorChosen = false;
})

const disableButtons = function (){ // Disable all button functions besides clear and turn off CSS hover styling
    userNumberOne.forEach(button => {button.disabled = true; button.style.pointerEvents = "none"});
    userNumberTwo.forEach(button => {button.disabled = true; button.style.pointerEvents = "none"});
    userOperator.forEach(button => {button.disabled = true; button.style.pointerEvents = "none"});
    finalCalculation.disabled = true;
    finalCalculation.style.pointerEvents = "none";
    createBackspaceBtn.disabled = true;
    createBackspaceBtn.style.pointerEvents = "none";
    createDecimalBtn.disabled = true;
    createDecimalBtn.style.pointerEvents = "none";
    positiveNegativeBtn.disabled = true;
    positiveNegativeBtn.style.pointerEvents = "none";
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

    // Create the logic for the plus/minus button to change from positive to negative
    const positiveNegativeBtn = document.querySelector("#btn-plusminus")
    positiveNegativeBtn.addEventListener("click", () => {
        if (operatorChosen === false && firstDisplayNumber != "" && firstDisplayNumber != "0"){ // Make sure that we are on number one and it is not equal to 0
            
            if (!firstDisplayNumber.includes("-")){ // If first number does not have a negative add a negative
                firstDisplayNumber = "-" + firstDisplayNumber;
                numberDisplay.textContent = firstDisplayNumber;
                stringConvert = parseFloat(firstDisplayNumber);
            } else if (firstDisplayNumber.includes("-")){ // If first number does have a negative remove the negative
                firstDisplayNumber = firstDisplayNumber.slice(1);
                numberDisplay.textContent = firstDisplayNumber;
                stringConvert = parseFloat(firstDisplayNumber);
        }
    } else if (operatorChosen === true && secondDisplayNumber != "" && secondDisplayNumber != "0"){
        if (!secondDisplayNumber.includes("-")) {
            secondDisplayNumber = "-" + secondDisplayNumber;
            numberDisplay.textContent = firstDisplayNumber + " " + operatorSelect + " " + secondDisplayNumber;
            stringConvertTwo = parseFloat(secondDisplayNumber);
        } else if (secondDisplayNumber.includes("-")){
            secondDisplayNumber = secondDisplayNumber.slice(1);
            numberDisplay.textContent = firstDisplayNumber + " " + operatorSelect + " " + secondDisplayNumber;
            stringConvertTwo = parseFloat(secondDisplayNumber);
        }
        
    }

    })

    // Create the function for the delete/backspace button. Slices the last value off of the string
    // Then updates the display and variable for the calculation.
    const createBackspaceBtn = document.querySelector("#btn-delete")
    createBackspaceBtn.addEventListener("click", () => {
        if (operatorChosen === false){
        firstDisplayNumber = firstDisplayNumber.slice(0, -1);
        numberDisplay.textContent = firstDisplayNumber;
        stringConvert = parseFloat(firstDisplayNumber)
    } else if (operatorChosen === true){
        secondDisplayNumber = secondDisplayNumber.slice(0, -1)
        numberDisplay.textContent = firstDisplayNumber + " " + operatorSelect + " " + secondDisplayNumber;
        stringConvertTwo = parseFloat(secondDisplayNumber)
    }
    if (firstDisplayNumber === ""){
        numberDisplay.textContent = "0";
    }

    //Re-enable decimal button if removed from the string, updates on the backspace function
    if (!firstDisplayNumber.includes(".")){
        createDecimalBtn.disabled = false;
        createDecimalBtn.style.pointerEvents = "auto";
        } else if (!secondDisplayNumber.includes(".")){
        createDecimalBtn.disabled = false;
        createDecimalBtn.style.pointerEvents = "auto";
        }
    })

    // Create the logic and function for decimal button. Follows same screen and variable
    // Update as used in the numbers above to tap into resst of calculator logic.
    const createDecimalBtn = document.querySelector("#btn-decimal")
    createDecimalBtn.addEventListener("click", () => {
        if (operatorChosen === false){
        numberSelect = createDecimalBtn.textContent;
        firstDisplayNumber = firstDisplayNumber + numberSelect;
        numberDisplay.textContent = firstDisplayNumber;
        stringConvert = parseFloat(firstDisplayNumber)

        if (firstDisplayNumber.includes(".")){
            createDecimalBtn.disabled = true;
            createDecimalBtn.style.pointerEvents = "none";
        }} else if (operatorChosen === true){
        numberSelect = createDecimalBtn.textContent;
        secondDisplayNumber = secondDisplayNumber + numberSelect;
        numberDisplay.textContent = firstDisplayNumber + " " + operatorSelect + " " + secondDisplayNumber;
        stringConvertTwo = parseFloat(secondDisplayNumber)

        if (secondDisplayNumber.includes(".")){
            createDecimalBtn.disabled = true;
            createDecimalBtn.style.pointerEvents = "none";
        }
        }
    })

    // From here on out is adding in the keyboard support. First checking to see if it is a number instead of writing a seperate case for each.
    // Then adding cases to check if it is an operator or a different type of feature being called for the calculator

    document.addEventListener("keydown", (event) => {
        if (!isNaN(event.key)){
            numberOneButtonArray = Array.from(userNumberOne);
            const matchingButtonNum1 = numberOneButtonArray.find(button => button.textContent === event.key);
            matchingButtonNum1.click();
        }
        switch (event.key) {
            case "+":
            case "-":
            case "/":
            case "*":
            case "%":
                userOperatorButtonArray = Array.from(userOperator);
                const matchingButtonOperator = userOperatorButtonArray.find(button => button.textContent === event.key);
                matchingButtonOperator.click();
            break;

            case "Enter":
                finalCalculation.click();
            break;

            case "Delete":
            case "Backspace":
                createBackspaceBtn.click();
            break;

            case "Escape":
                event.preventDefault();
                location.reload();
            break;
        }
    })