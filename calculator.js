const field = document.querySelector(".calculator-field");
const operators = Array.from(document.querySelectorAll(".operator"));

let firstNumber = 0;
let secondNumber = 0;
let hasComma = false;

function clear() {
  field.textContent = "";
  firstNumber = 0;
  hasComma = false;
}

const c = document.querySelector("#C");
c.addEventListener("click", () => clear());

document.querySelectorAll(".number").forEach((e) => {
  e.addEventListener("click", () => drawNumber(e));
});

document.querySelectorAll(".operator").forEach((e) => {
  e.addEventListener("click", () => drawOperator(e));
});

document.querySelector("#equals").addEventListener("click", () => equals());

document.querySelector(".comma").addEventListener("click", () => {
  if (!hasComma) {
    hasComma = true;
    field.textContent += ".";
  }

  if (field.textContent.startsWith(".")) {
    field.textContent = "0.";
  }
});

document.querySelector("#back").addEventListener("click", () => {
  if (field.textContent.length) {
    field.textContent = field.textContent.slice(0, -1);
  }
});

document.querySelector(".percent").addEventListener("click", () => {
  firstNumber = field.textContent;
  field.textContent += " " + "/" + " 100";
  equals();
});

function drawNumber(e) {
  if (field.textContent.length < 17) {
    field.textContent += e.textContent;
  }
  if (field.textContent.startsWith("0")) {
    field.textContent = field.textContent.slice(1);
  }
}

function drawOperator(e) {
  if (field.textContent.includes(" ")) {
    equals();
  }

  if (field.textContent.endsWith(".")) {
    field.textContent += "0";
  }
  field.textContent += " " + e.textContent + " ";
  hasComma = false;
}

function equals() {
  const numbers = field.textContent.split(" ");
  firstNumber = Number(numbers[0]);
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

  if (Number.isInteger(firstNumber)) {
    hasComma = false;
  } else {
    let numberString = "" + firstNumber;
    while (numberString.length > 17) {
      numberString = numberString.slice(0, numberString.length - 1);
    }
    hasComma = true;
    firstNumber = Number(numberString);
  }

  field.textContent = firstNumber;
}
