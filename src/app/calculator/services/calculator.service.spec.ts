import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;
  // En cada prueba, se reinicializa el servicio con el beforeEach
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText and subResultText to "0" when "C" is pressed', () => {
    service.resultText.set('288');
    service.subResultText.set('288');
    service.lastOperator.set('*');

    service.buildNumber('C');
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
  });

  it('should update resultText with number input', () => {
    service.buildNumber('1');
    expect(service.resultText()).toBe('1');

    service.buildNumber('2');
    expect(service.resultText()).toBe('12');
  });

  it('should handle operators correctly', () => {
    service.buildNumber('1');
    service.buildNumber('-');

    expect(service.lastOperator()).toBe('-');
    expect(service.subResultText()).toBe('1');
    // Debe ser 0 para construir el siguiente número
    expect(service.resultText()).toBe('0');
  });

  it('should calculare result correctly for addition', () => {
    service.buildNumber('7');
    service.buildNumber('+');
    service.buildNumber('8');
    service.buildNumber('=');

    expect(service.resultText()).toBe('15');
  });

  it('should calculare result correctly for substraction', () => {
    service.buildNumber('1');
    service.buildNumber('5');
    service.buildNumber('-');
    service.buildNumber('4');
    service.buildNumber('=');

    expect(service.resultText()).toBe('11');
  });

  it('should calculare result correctly for division', () => {
    service.buildNumber('6');
    service.buildNumber('÷');
    service.buildNumber('3');
    service.buildNumber('=');

    expect(service.resultText()).toBe('2');
  });

  it('should calculare result correctly for multiplication', () => {
    service.buildNumber('2');
    service.buildNumber('x');
    service.buildNumber('3');
    service.buildNumber('=');

    expect(service.resultText()).toBe('6');
  });

  it('should handle decimal point correctly', () => {
    service.buildNumber('1');
    service.buildNumber('.');
    service.buildNumber('5');

    expect(service.resultText()).toBe('1.5');
    service.buildNumber('.');
    expect(service.resultText()).toBe('1.5');
  });

  it('should handle decimal point correctly starting with zero', () => {
    service.buildNumber('0');
    service.buildNumber('.');
    service.buildNumber('.');
    service.buildNumber('0');

    expect(service.resultText()).toBe('0.0');
  });

  it('should handle sign change correctly', () => {
    service.buildNumber('1');
    service.buildNumber('+/-');

    expect(service.resultText()).toBe('-1');
    service.buildNumber('+/-');
    expect(service.resultText()).toBe('1');
  });

  it('should handle backspace correctly', () => {
    service.buildNumber('1');
    service.buildNumber('5');
    service.buildNumber('3');
    service.buildNumber('Backspace');

    expect(service.resultText()).toBe('15');
    service.buildNumber('Backspace');
    expect(service.resultText()).toBe('1');
    service.buildNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });

  it('should handle max length correctly', () => {
    for (let i = 0; i < 10; i++) {
      service.buildNumber('1');
    }
    expect(service.resultText().length).toBe(10);
    service.buildNumber('1');
    expect(service.resultText().length).toBe(10);
  });
});
