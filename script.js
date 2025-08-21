let numX;
let numY;
let operator;

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
  const calcDisplay = document.querySelector("#calc-num");
  const value = btn.textContent;
  if (isNaN(value)) {
    const id = btn.id;
    alert(id);
  } else {
    calcDisplay.textContent === "0"
      ? (calcDisplay.textContent = value)
      : (calcDisplay.textContent += value);
  }
}

// grab calc buttons and add event listener
const buttonContainer = document.querySelector(".calc-buttons");
const buttons = buttonContainer.querySelectorAll("button");
for (const btn of buttons) {
  btn.addEventListener("click", () => useButton(btn));
}
