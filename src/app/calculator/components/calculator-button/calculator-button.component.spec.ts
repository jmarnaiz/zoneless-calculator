import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';

// Es como lo que hay en calculator.component
@Component({
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content underline">Test content</span>
    </calculator-button>
  `,
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    // En las clases de 'compiled' no aparecen ni w-2/4 ni w-1/4 y es
    // debido a que tenemos que esperar a que se realicen los cambios.
    // Para eso se usa el detectChanges. Como lo vamos a usar en todos
    // los casos de prueba, lo podemos mover al 'beforeEach'
    //fixture.detectChanges();
    // console.log('Compiled: ', compiled);
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 if doubleSize is false', () => {
    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should apply w-2/4 if doubleSize is true', () => {
    // La forma de cambiar los input signals es esta, no como yo lo estaba
    // intentando hacer 'component.isDoubleSize().set...'
    fixture.componentRef.setInput('isDoubleSize', true);
    // Debemos detectar los cambios de nuevo, ya que hemos cambiado el valor
    // del input
    fixture.detectChanges();
    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });

  it('should emit onClick when handleClick is called', () => {
    // Spies
    // spyOn(component.onClick, 'emit');
    // component.handleClick();
    // expect(component.onClick.emit).toHaveBeenCalled();

    const emitSpy = spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(emitSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith('');
  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called with a matching key', (done) => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');
    expect(component.isPressed()).toBeTrue();
    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      // Con el done es una manera de decirle a Karma/Jasmine que espere
      // a que este timeout responda
      done();
    }, 150);
  });

  it('should not set isPressed to true if key does not match', () => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('2');
    expect(component.isPressed()).not.toBeTrue();
  });

  it('should display projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLDivElement;
    // console.log('Compiled: ', compiled.querySelector('button')?.innerText);

    const projectedContent = compiled.querySelector('.projected-content');
    expect(projectedContent).not.toBeNull();
    expect(projectedContent?.classList.contains('underline')).toBeTrue();
    expect(projectedContent?.innerHTML).toBe('Test content');

    // expect(compiled.querySelector('button')?.innerText).toBe(component.contentValue())
    // expect(compiled.querySelector)
    // console.log(testHostFixture.nativeElement);
    // console.log(testHostFixture.debugElement)

    // expect()
  });
});
