import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  // it('should render router-outlet', () => {
  //   expect(compiled.querySelector('router-outlet')).toBeTruthy();
  // });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div'); //Tomamos el primero
    // const cssClasses =
    //   'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5';
    //   expect(divElement?.classList.value).toBe(cssClasses);
    // Esto no estaría mal pero si por lo que sea, en el HTML se cambian de orden las clases,
    // fallaría, cuando no debería hacerlo (tan solo se han cambiado de posición)
    const mustHaveClasses =
      'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(
        ' '
      );
    expect(divElement).not.toBeNull();
    // divElement?.classList.forEach((className) => {
    //   expect(mustHaveClasses).toContain(className);
    // });
    // El problema de esto es que si añado una clase nueva, falla, cuando yo lo que quiero
    // es probar que tenga, como mínimo, las clases en mustHaveClasses. El orden por tanto
    // de evaluación importa mucho
    const divClasses = divElement?.classList.value.split(' ');
    mustHaveClasses.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });

  it("should contain the 'buy me a beer link'", () => {
    const anchorElement = compiled.querySelector('a');
    expect(anchorElement).not.toBeNull();
    expect(anchorElement?.title).toBe('Buy me a beer');
    // expect(anchorElement?.href).toBe(...) // Es lo mismo que abajo
    expect(anchorElement?.getAttribute('href')).toBe(
      'https://www.buymeacoffee.com/scottwindon'
    );
  });
});
