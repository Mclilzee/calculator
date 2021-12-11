const field = document.querySelector(".calculator-field");
const operators = Array.from(document.querySelectorAll(".operator"));

let firstNumber = 0;
let secondNumber = 0;
let hasComma = false;

function clear() {
  field.textContent = "";
  firstNumber = 0;
}

const c = document.querySelector("#C");
c.addEventListener("click", () => clear());

document.querySelectorAll(".number").forEach((e) => {
  e.addEventListener("click", () => drawNumber(e));
});

document.querySelectorAll(".operator").forEach((e) => {
  e.addEventListener("click", () => drawOperator(e));
});

document.querySelector(".equals").addEventListener("click", () => equals());

document.querySelector(".comma").addEventListener("click", () => {
  if (!hasComma) {
    hasComma = true;
    field.textContent += ".";
  }

  if (field.textContent.startsWith(".")) {
    field.textContent = "0.";
  }
});

function drawNumber(e) {
  if (field.textContent.length < 17) {
    field.textContent += e.textContent;
  }
}

function drawOperator(e) {
  if (field.textContent.includes(" ")) {
    equals();
  }

  if (field.textContent.endsWith(".")) {
    field.textContent += "0";
  }
  firstNumber = Number(field.textContent);
  field.textContent += " " + e.textContent + " ";
  hasComma = false;
}

function equals() {
  const numbers = field.textContent.split(" ");
  secondNumber = Number(numbers[2]);

  if (!secondNumber) {
    secondNumber = 0;
  }

  switch (numbers[1]) {
    case "+":
      firstNumber += secondNumber;
      break;
    case "-":
      firstNumber -= secondNumber;
      break;
    case "/":
      firstNumber /= secondNumber;
      break;
    case "x":
      firstNumber *= secondNumber;
  }

  field.textContent = firstNumber;
}
