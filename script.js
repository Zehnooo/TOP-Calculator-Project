let numX;
let numY;
let operator;
const validOperators = ["add", "subtract", "multiply", "divide"];
const validFunctions = ["clear", "pos-neg", "percent", "operate"];

const calcDisplay = document.querySelector("#calc-num");
const calcSavedNum = document.querySelector("#calc-num-saved");
// grab calc buttons and add event listener
const buttonContainer = document.querySelector(".calc-buttons");
const buttons = buttonContainer.querySelectorAll("button");
for (const btn of buttons) {
  btn.addEventListener("click", () => useButton(btn));
}

const operations = {
  add: function getSum(x, y) {
    return x + y;
  },

  subtract: function getDifference(x, y) {
    return x - y;
  },

  multiply: function getProduct(x, y) {
    return x * y;
  },

  divide: function getQuotient(x, y) {
    return x / y;
  },
};

function operate(x, y, op) {
  let operation = operations[op];
  return operation(x, y);
}

function useButton(btn) {
  const id = btn.id;
  let value;
  if (id.length === 0) {
    value = btn.textContent;
    calcDisplay.textContent === "0"
      ? (calcDisplay.textContent = value)
      : (calcDisplay.textContent += value);
  } else {
    if (validFunctions.includes(id)) {
      switch (id) {
        case "clear":
          clearCalc();
          break;

        case "operate":
          getNum();
          break;
      }
    }
    if (validOperators.includes(id)) {
      operator = id;
      getNum();
    }
  }
}

function clearCalc() {
  calcDisplay.textContent = "0";
  calcSavedNum.textContent = "";
  numX = null;
  numY = null;
  operator = null;
}

function getNum() {
  if (numX === null) {
    numX = Number(calcDisplay.textContent);
    calcSavedNum.textContent = numX;
    calcDisplay.textContent = "";
    return;
  }

  if (calcDisplay.textContent !== "" && operator) {
    numY = Number(calcDisplay.textContent);
    if (operator === "divide" && numY === 0) {
      clearCalc();
      calcDisplay.textContent = "can't divide by zero doofus";
      return;
      /* break calculator in half */
    }
    let total = operate(numX, numY, operator);
    numX = total;
    calcSavedNum.textContent = numX;
    calcDisplay.textContent = "0";
    numY = null;
  }
}
