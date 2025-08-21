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
      }
    }
    if (validOperators.includes(id)) {
      operator = id;

      switch (id) {
        case "add":
          getNum(id);
          break;
      }
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

function getNum(id) {
  if (!numX) {
    numX = Number(calcDisplay.textContent);
    calcSavedNum.textContent = numX;
    calcDisplay.textContent = "";
    return numX;
  } else if (numX && !numY) {
    numY = Number(calcDisplay.textContent);
    return numY;
  } else {
    // if numX and numY exist
    let total = operate(numX, numY, id);
    numX = total;
    calcSavedNum.textContent = numX;
    calcDisplay.textContent = "0";
    numY = null;
    alert(total);
  }
}
