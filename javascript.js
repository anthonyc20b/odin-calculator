const operationAdd = function (a, b) {
 return a + b;
}

const operationSubtract = function (a, b){
    return a - b;
}

const operationMultiply = function (a, b){
    return a * b;
}

const operationDivide = function (a, b){
    return a / b;
}

// Go back and update to actually run off of user input
let userNumberOne = 3;
let userOperator = "";
let userNumberTwo = 4;

const operate = function (){
    let a = userNumberOne;
    let b = userNumberTwo;
    return operationAdd(a, b);
};
console.log(operate());