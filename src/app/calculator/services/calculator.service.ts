import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', 'x', '÷']; // %
const specialOperators = ['+/-', '.', '=', 'C', 'Backspace'];

const MAX_NUM_CHARACTERS = 10;

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public buildNumber(value: string): void {
    // Input validation
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.warn('Invalid input: ', value);
      return;
    }

    // Result calculation
    if (value === '=') {
      this._calculateResult();
      return;
    }

    // Clean result
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    if (value === 'Backspace') {
      if (this.resultText() === '0') return;

      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      // Eliminamos la última posición
      this.resultText.update((currentText) => currentText.slice(0, -1));
      return;
    }

    // Apply operator
    if (operators.includes(value)) {
      this._calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // Limitate characters amount
    if (this.resultText().length >= MAX_NUM_CHARACTERS) {
      console.warn('Max length reached');
    }

    // Validate decimal point
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((currentText) => currentText.concat('.'));
      return;
    }

    // Handle initial value with 0
    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() === '-0')
    ) {
      return;
    }

    // Change sign
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        // Eliminamos de la primera posición
        this.resultText.update((currentText) => currentText.slice(1));
        return;
      }

      this.resultText.update((currentText) => '-' + currentText);
      return;
    }

    // Numbers
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }
      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update((currentText) => currentText + value);
      return;
    }
  }

  private _calculateResult() {
    const number01 = parseFloat(this.subResultText());
    const number02 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number01 + number02;
        break;
      case '-':
        result = number01 - number02;
        break;
      case 'x':
        result = number01 * number02;
        break;
      case '÷':
        result = number01 / number02;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }
}
