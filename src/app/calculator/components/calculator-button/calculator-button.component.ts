import { NgClass } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class]': 'isDoubleSize() ? "w-2/4" : "w-1/4"',
  },
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);
  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  // Para poder mandarle <calculator-button isCommand>, ya que esto
  // lo toma como un string

  // public isCommand = input(false, {
  //   transform: (value: boolean | string) =>
  //     typeof value === 'string' ? value === '' : value,
  // });

  public isCommand = input(false, {
    transform: booleanAttribute,
  });

  public isDoubleSize = input(false, {
    transform: booleanAttribute,
  });

  // @HostBinding('class.w-2/4') get doubleSizeStyle() {
  //   return this.isDoubleSize();
  // }

  // Le aplico esa clase dependiendo del valor booleano de vuelta
  // @HostBinding('class.bg-indigo-700') get commandStyle() {
  //   return this.isCommand();
  // }
  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }

  handleClick() {
    if (!this.contentValue()?.nativeElement) return;

    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());
  }

  public keyboardPressedStyle(key: string) {
    if (!this.contentValue) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }

  /**
   * Esto se lo traga TailWind, a pesar de que aplique w-1/4
   * y w-2/4 en ciertos elementos, pero no me gusta dejarlo así
   *   host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',

    Esto sin usar operador ternario:
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
   */
}
