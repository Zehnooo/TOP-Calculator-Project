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
  value = btn.textContent;
  btn.id ? alert(btn.id) : alert("no button Id set" + value);
}

const buttonContainer = document.querySelector(".calc-buttons");
const buttons = buttonContainer.querySelectorAll("button");
for (const btn of buttons) {
  btn.addEventListener("click", () => useButton(btn));
}
