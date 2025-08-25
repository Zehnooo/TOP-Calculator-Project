let numX = null;
let numY = null;
let operator = null;
let disabledButtons = [];
const validOperators = ["add", "subtract", "multiply", "divide"];
const validFunctions = ["clear", "pos-neg", "percent", "operate", "backspace"];

const calcDisplay = document.querySelector("#calc-num");
const calcSavedNum = document.querySelector("#calc-num-saved");
const prevCalcDisplay = document.querySelector("#prev-calc");
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

const operationSigns = new Map([
  ["add", "+"],
  ["subtract", "-"],
  ["multiply", "*"],
  ["divide", "/"],
]);

function operate(x, y, op) {
  let operation = operations[op];
  return operation(x, y);
}

function useButton(btn) {
  let id;
  btn.id ? (id = btn.id) : (id = null);
  let value;
  if (id === null || id === "decimal") {
    value = btn.textContent;
    if (id === "decimal") {
      btn.disabled = true;
      disabledButtons.push(btn);
    }
    calcDisplay.textContent === "0"
      ? (calcDisplay.textContent = value)
      : (calcDisplay.textContent += value);

    return;
  }

  if (validFunctions.includes(id)) {
    switch (id) {
      case "clear":
        clearCalc();
        break;

      case "operate":
        getNum();
        break;

      case "pos-neg":
        updateValue(id);
        break;

      case "percent":
        updateValue(id);
        break;

      case "backspace":
        str = calcDisplay.textContent;
        str = str.slice(0, -1);
        if (!str.includes(".")) {
          enableButtons(disabledButtons);
        }
        str.length === 0
          ? (calcDisplay.textContent = "0")
          : (calcDisplay.textContent = str);
        break;
    }
  }
  if (validOperators.includes(id)) {
    getNum();
    operator = id;
  }
}

function clearCalc() {
  calcDisplay.textContent = "0";
  calcSavedNum.textContent = "";
  prevCalcDisplay.textContent = "";
  numX = null;
  numY = null;
  operator = null;
  enableButtons(disabledButtons);
}

function getNum() {
  if (numX === null) {
    numX = Number(calcDisplay.textContent);
    calcSavedNum.textContent = numX;
    calcDisplay.textContent = "";
    enableButtons(disabledButtons);
    return;
  }

  if (calcDisplay.textContent !== "" && operator && numX != null) {
    numY = Number(calcDisplay.textContent);
    if (operator === "divide" && numY === 0) {
      clearCalc();
      calcDisplay.textContent = "can't divide by zero doofus";
      enableButtons(disabledButtons);
      return;
      /* break calculator in half */
    }
    let total = operate(numX, numY, operator);
    prevCalcDisplay.textContent = `${numX} ${operationSigns.get(
      operator
    )} ${numY} = `;

    numX = parseFloat(total.toFixed(8));
    calcSavedNum.textContent = numX;
    calcDisplay.textContent = "0";
    operator = null;
    numY = null;
  }
  enableButtons(disabledButtons);
}

function updateValue(id) {
  let origValue = Number(calcDisplay.textContent);
  let newValue = null;
  if (id === "pos-neg") {
    newValue = origValue * -1;
    calcDisplay.textContent = newValue;
  }
  if (id === "percent") {
    newValue = origValue / 100;
    calcDisplay.textContent = newValue;
  }
}

function enableButtons(arr) {
  for (const btn of arr) {
    btn.disabled = false;
  }
}
