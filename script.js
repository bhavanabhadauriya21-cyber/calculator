const display = document.getElementById('display');
let currentInput = '0';
let shouldResetDisplay = false;

function appendToDisplay(value) {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }

  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    if (value === '.') {
      const parts = currentInput.split(/[\+\-\*\/]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes('.')) return;
    }
    currentInput += value;
  }

  display.textContent = currentInput;
}

function clearDisplay() {
  currentInput = '0';
  display.textContent = currentInput;
  shouldResetDisplay = false;
}

function calculate() {
  try {
    // Prevent unsafe characters
    if (/[^0-9+\-*/.]/.test(currentInput)) return;

    let expression = currentInput.replace(/×/g, '*').replace(/−/g, '-');
    let result = Function('"use strict";return (' + expression + ')')();

    result = Math.round(result * 100000000) / 100000000;

    display.textContent = result;
    currentInput = result.toString();
    shouldResetDisplay = true;
  } catch (error) {
    display.textContent = 'Error';
    currentInput = '0';
    shouldResetDisplay = true;
  }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    appendToDisplay(e.key);
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    appendToDisplay(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    calculate();
  } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
