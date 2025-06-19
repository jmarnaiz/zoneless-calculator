import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { inject } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

class CalculatorServiceMock {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine
    .createSpy('subResultText')
    .and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public buildNumber = jasmine.createSpy('buildNumber');
}
describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let calcServiceMock: CalculatorServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: CalculatorServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    calcServiceMock = TestBed.inject(
      CalculatorService
    ) as unknown as CalculatorServiceMock;

    // Hay variables que dependen de un servicio, por tanto no
    // mostrarán su valor hasta que hagamos el detectChanges()
    // fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculation values', () => {
    calcServiceMock.resultText.and.returnValue('123');
    calcServiceMock.subResultText.and.returnValue('288');
    calcServiceMock.lastOperator.and.returnValue('*');

    // console.log('Compiled: ', compiled);

    /* Comentamos el detectChanges de la línea 44 porque si no,
    el de abajo, no detecta los cammbios y resultText seguiría
    siendo 100.00, por lo que daría un falso positivo este test
    expect(component.resultText()).toBe('100.00');
    */
    fixture.detectChanges();
    expect(compiled.querySelector('span')?.innerText).toBe('288 *');
    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('288');
    expect(component.lastOperator()).toBe('*');
  });

  // it('should have 19 calculator-button components', () => {
  //   expect(component.calculatorButtons()).toBeTruthy();
  //   expect(component.calculatorButtons().length).toBe(19);
  // });

  // Ahora haremos lo anterior pero usando content projection

  it('should have 19 calculator-button components with content projection', () => {
    // querySelector solo toma el primero
    const buttons = compiled.querySelectorAll('calculator-button');
    // Esta sería una forma. Otra es la siguiente
    // const buttonsByDirective = fixture.debugElement.queryAll(By.directive(CalculatorButtonComponent))
    expect(buttons.length).toBe(19);

    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');
  });

  it('should handle keyboard events correctly', () => {
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(enterEvent);

    expect(calcServiceMock.buildNumber).toHaveBeenCalledWith('=');

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);
    expect(calcServiceMock.buildNumber).toHaveBeenCalledWith('C');
  });

  it('should display result text correctly', () => {
    calcServiceMock.resultText.and.returnValue('123');
    calcServiceMock.subResultText.and.returnValue('10');
    calcServiceMock.lastOperator.and.returnValue('-');

    fixture.detectChanges();
    expect(component.resultText()).toBe('123');
    // Hemos añadido el ID para probar como se haría a través
    // del querySelector con el ID
    expect(compiled.querySelector('#sub-result')?.textContent).toContain(
      '10 -'
    );
    // El toContain es para no preocuparme de los espacios
  });
});
