import { NgClass } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  },
})
export class CalculatorButtonComponent {
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

  @HostBinding('class.w-2/4') get doubleSizeStyle() {
    return this.isDoubleSize();
  }

  // Le aplico esa clase dependiendo del valor booleano de vuelta
  // @HostBinding('class.bg-indigo-700') get commandStyle() {
  //   return this.isCommand();
  // }
  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }
}
