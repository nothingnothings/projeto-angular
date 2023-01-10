import { TestBed } from '@angular/core/testing';

// E 'TESTBED',

// a propósito,

// É

//  O 'MAIN ANGULAR2 TESTING UTILITY OBJECT'...

import { AppComponent } from './app.component';
import { ExemploComponent } from './exemplo/exemplo.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({   
      declarations: [ ////AQUI ESPECIFICAMOS TODOS OS COMPONENTS QUE SERÃO ALVO DE NOSSOS TESTS, enumerados com 'it()' blocks...
        
        AppComponent,
        ExemploComponent
      
      
      ]
        
        
        ,
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);  //cria 1 de nossos components (podemos testar vários) enumerados em 'declarations', para que então possa ser TESTADO DE FORMA UNITÁRIA (separada do resto dos components)...
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'novoProjetoTesting'`, () => {
    const fixture = TestBed.createComponent(AppComponent); //cria 1 de nossos components (podemos testar vários) enumerados em 'declarations', para que então possa ser TESTADO DE FORMA UNITÁRIA (separada do resto dos components)...
    const app = fixture.componentInstance;
    expect(app.title).toEqual('app');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent); //cria 1 de nossos components (podemos testar vários) enumerados em 'declarations', para que então possa ser TESTADO DE FORMA UNITÁRIA (separada do resto dos components)...
    
    
    let component = fixture.componentInstance; //isso só funciona para components COMUNS, e não 'app.component.ts'..
  
    fixture.detectChanges();  ///é necessário, pq vai DETECTAR MUDANÇAS NESSE ELEMENTO NOSSO, NO DOM (ou seja, como o 'render de title')...

    const compiled = fixture.debugElement.nativeElement;  ///ISSO NOS DÁ ACESSO AO NOSSO 'ACTUAL TEMPLATE'... ---. e essa variable será um 'ACTUAL JAVASCRIPT OBJECT', essa é a razão de podermos chamar '.querySelector' em cima dela, no código logo abaixo...
    
    
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'app works'
    ); 

    // expect(component).toContain( /////////NÃO FUNCIONA   (esse código só funciona para components que NÃO SÃO O 'app.component.ts/html')...
    //   'novoProjetoTesting app is running!'
    // ); 
  });
});
