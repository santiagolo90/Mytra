import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaComponent } from './suma.component';

describe('SumaComponent', () => {
  let component: SumaComponent;
  let fixture: ComponentFixture<SumaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('La suma debe dar 2', async(() =>{
    (<HTMLInputElement>document.getElementById('num1')).value = '2';
    (<HTMLInputElement>document.getElementById('num2')).value = '2';
    document.getElementById('calc').click();

    expect((<HTMLInputElement>document.getElementById('result')).value).toBe('4'); // Igual a ==
    // expect((<HTMLInputElement>document.getElementById('result')).value).not.toBe('4'); //Negar igualdad
    // expect((<HTMLInputElement>document.getElementById('result')).value).toEqual('4'); //Estrictamente igual a ===

  }))

  it('contiene SumApp', async(() =>{
    const title = document.getElementById('title').innerHTML;

    expect(title).toContain('SumApp'); //Contiene la palabra SumApp

  }));

  it('contiene SumApp', async(() =>{
    const des = document.getElementById('description').innerHTML;

    expect(des).toMatch('\(app\)'); //Contiene (app) Regex

  }));

  it('titulo está definido', async(() =>{
    const title = document.getElementById('title').innerHTML;

    expect(title).toBeDefined(); //Esta definido
    // expect(title).toBeUndefined(); //Esta indefinido
    // expect(title).toBeNull(); //Es Null
  }));


  it('La suma es mayor a 3', async(() =>{
    (<HTMLInputElement>document.getElementById('num1')).value = '2';
    (<HTMLInputElement>document.getElementById('num2')).value = '2';
    document.getElementById('calc').click();

    expect((<HTMLInputElement>document.getElementById('result')).value).toBeGreaterThan(3); // Mayor a 

  }))

  it('La suma es menor a 5', async(() =>{
    (<HTMLInputElement>document.getElementById('num1')).value = '2';
    (<HTMLInputElement>document.getElementById('num2')).value = '2';
    document.getElementById('calc').click();

    expect((<HTMLInputElement>document.getElementById('result')).value).toBeLessThan(5); // Menor a 

  }))

  it('La suma es cercana a 3', async(() =>{
    (<HTMLInputElement>document.getElementById('num1')).value = '2';
    (<HTMLInputElement>document.getElementById('num2')).value = '2';
    document.getElementById('calc').click();

    expect((<HTMLInputElement>document.getElementById('result')).value).toBeCloseTo(4, 0.1); // Cercano a (tolerancia) 

  }))

  it('funcion throw', async(() =>{
    const foo = () =>{
      return 2 + 2;
    }
    expect(foo).not.toThrow();
  }))


});
