let currentNum = "";
let previousNum = "";
let operator = "";

const currentDisplayNumber = document.querySelector(".currentNumber");
const previousDisplayNumber = document.querySelector(".previousNumber");
const decimal = document.querySelector(".dot");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

window.addEventListener("keydown", handleKeyPress);
clear.addEventListener("click", clearCalculator);
del.addEventListener("click", handleDelete);
equal.addEventListener("click", () =>{
  if (currentNum != "" && previousNum != ""){
    calculate();
  }
});
decimal.addEventListener("click", () => {
  addDecimal();
});

numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

operators.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleKeyPress(e){
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9 || e.key == ".") {
    handleNumber(e.key);
  }
  if (e.key === "Enter" || (e.key === "=" && currentNum != "" && previousNum != ""))
  {calculate();}
  if (e.key === "+" || e.key === "-") {
    handleOperator(e.key);
  }
  if (e.key === "/") {
    handleOperator("÷");
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}

function handleNumber(number) {
  if (previousNum !== "" && currentNum !=="" && operator === ""){
    previousNum = "";
    currentDisplayNumber.textContent = currentNum;
  }
  if (currentNum.length <= 15){
  currentNum += number;
  currentDisplayNumber.textContent = currentNum;}
}

function handleOperator(op) {
  if (previousNum === ""){
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === "") {
    operatorCheck(op);
  } else {
    calculate();
    operator = 0;
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = previousNum +  " " + operator;
  }
}

function addDecimal() {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    currentDisplayNumber.textContent = currentNum;
  }
}

function roundNumber(num){
  return Math.round(num * 100000) / 100000;
} 

function operatorCheck(text) {
  operator = text;
  previousDisplayNumber.textContent = previousNum +  " " + operator;
  currentDisplayNumber.textContent = "0";
  currentNum = "";
};

function handleDelete() {
  if (currentNum != "") {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNumber.textContent = currentNum;
    if (currentNum === "") {
      currentDisplayNumber.textContent= "0";
    }
  }
  if (currentNum === "" && previousNum !== "" && operator === "") {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
  }
}

function calculate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);
  if (previousNum == "5" && currentNum == "5" && operator === "+"){
    previousNum = "Patata";
    displayResults();
    return;
  }
  else if (operator === "+") {
    previousNum += currentNum;
  } else if (operator === "-") {
    previousNum -= currentNum;
  } else if (operator === "x") {
    previousNum *= currentNum;
  } else if (operator === "÷") {
    if (currentNum <= 0) {
      previousNum = "Error";
      displayResults();
      return;
    }
    previousNum /= currentNum;
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResults();
}


function displayResults(){
  if (previousNum.length <= 15){
    currentDisplayNumber.textContent = previousNum;
  } else {
    currentDisplayNumber.textContent = previousNum.slice(0, 16) + "...";
  }
  previousDisplayNumber.textContent = "";
  operator = "";
  currentNum = "";
}

function clearCalculator(){
  currentNum = "";
  previousNum = "";
  currentDisplayNumber.textContent = "0";
  previousDisplayNumber.textContent = "";
}