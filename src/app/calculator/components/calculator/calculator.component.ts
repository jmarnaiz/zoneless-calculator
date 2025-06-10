import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '@/calculator/components/calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

const KEY_EQUIVALENTS: Record<string, string> = {
  Escape: 'C',
  Clear: 'C',
  Delete: 'C',
  // Backspace: 'C',
  c: 'C',
  '*': 'x',
  X: 'x',
  '/': '÷',
  Enter: '=',
};

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
// Document afecta a TODO el documento
export class CalculatorComponent {
  private _calcService = inject(CalculatorService);

  // De esta forma, creamos un readonly signal, sería como crear un getter
  public resultText = computed(() => this._calcService.resultText());
  public subResultText = computed(() => this._calcService.subResultText());
  public lastOperator = computed(() => this._calcService.lastOperator());

  public calculatorButtons = viewChildren(CalculatorButtonComponent);
  handleClick(key: string) {
    console.log('Key: ', key);

    this._calcService.buildNumber(key);
  }

  /**
   * Así se hacía antes, se mantiene por retrocompatibilidad.
   * De la documentación oficial de Angular:
   * https://angular.dev/guide/components/host-elements#the-hostbinding-and-hostlistener-decorators
   * Always prefer using the host property over @HostBinding
   * and @HostListener. These decorators exist exclusively
   * for backwards compatibility.
   *
   */
  // Así se hacía antes, se mantiene por retrocompatibilidad.
  // De la documentación oficl
  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    console.log({ key });
    const keyValue = KEY_EQUIVALENTS[key] ?? key;
    this.handleClick(keyValue);

    this.calculatorButtons()
      .find(
        (button) => button.contentValue()?.nativeElement.innerText === keyValue
      )
      ?.keyboardPressedStyle(keyValue);

    // this.calculatorButtons().forEach((button) => {
    //   button.keyboardPressedStyle(key);
    // });
  }
}
