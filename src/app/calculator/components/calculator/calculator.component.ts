import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorButtonComponent } from '@/calculator/components/calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {}
