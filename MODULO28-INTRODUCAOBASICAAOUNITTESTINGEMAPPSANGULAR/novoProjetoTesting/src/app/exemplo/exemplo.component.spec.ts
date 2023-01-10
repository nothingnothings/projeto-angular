import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ExemploService } from '../exemplo.service';
import { DataService } from '../shared/data.service';
import { ExemploComponent } from './exemplo.component';

describe('ExemploComponent', () => {
  let component: ExemploComponent;
  let fixture: ComponentFixture<ExemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExemploComponent, //aqui vamos DECLARAR TODOS OS COMPONENTS QUE VAO SER ALVOS DE NOSSO TESTING..
      ],
    }).compileComponents(); ///devemos chamar isso....

    fixture = TestBed.createComponent(ExemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //// isso DETECTA O CHANGE DE NOSSAS PROPRIEDADES (como o change ocorrido com o INJECT DO SERVICE NO NOSSO COMPONENT, isso é o change de properties, por exemplo)....
  });

  ////SINTAXE NOVA DO ANGULAR PARA CONSEGUIR ACESSO AO ELEMENT (ts e dom)

  // fixture: ComponentFixture<ExemploComponent>; ///COMPONENT NO NOSSO DOM.. (DOM SIMULADO, É COMO SE CRIÁSSEMOS UM DOM ADICIONAL, E AÍ RENDERIZÁSSEMOS ESSE ELEMENT NELE)...
  // component: ExemploComponent; ///COMPONENT EM SI

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should have "example" property', () => {
    expect(component.example).toBeDefined();
  });

  // it('"example" property should have a name value of "EXEMPLO"', () => {
  //   expect(component.example.name).toEqual('EXEMPLO');
  // });

  it('should use the user name from the service "exemploService"', () => {
    ///testamos se a propriedade do service realmente é injetada com sucesso nesse component...
    const exemploService = fixture.debugElement.injector.get(ExemploService); /////é assim que TESTAMOS A UTILIZAÇAÕ DE services externos aos nossos components, sua utilzaçaõ nos nossos components... (checamos/testamos se o value REALMENTE FOI INJETADO NO NOSSO COMPONENT)...

    fixture.detectChanges(); ///usado para DETECTAR CHANGES NO NOSSO COMPONENT (como o inject de nosso service, no caso)...
    expect(exemploService.user.name).toEqual(component.example.name);
  });

  it('should display user.name in a string interpolation, if user is logged in', () => {
    // const exemploService = fixture.debugElement.injector.get(ExemploService);

    component.isLoggedIn = true;

    fixture.detectChanges();

    const compiledTemplate = fixture.debugElement.nativeElement as HTMLElement;

    expect(compiledTemplate.querySelector('p')?.textContent).toContain(
      component.example.name
    );
  });

  it('should not display user.name in a string interpolation, if user is not logged in', () => {
    // const exemploService = fixture.debugElement.injector.get(ExemploService);

    fixture.detectChanges();

    ///'isLoggedIn' já vai estar como false, no caso...

    const compiledTemplate = fixture.debugElement.nativeElement as HTMLElement;

    expect(compiledTemplate.querySelector('p')?.textContent).not.toContain(
      component.example.name
    );
  });





  ////exemplo com FETCH DE DATA DE MODO ASYNC (e não sync, como visto logo acima)... -> mas aqui, nesse test, VAMOS _MOCKAR/fakar __ o run de um method async... (pq o reach out a um webserver de verdade, em um testing environment, não é proveitoso)..



  ///approach ERRADO DE ESCREVER 'ASYNC TESTS', TESTS DE METHODS ASSÍNCRONOS....
  it("shouldn't fetch data successfully if not called asynchronously.", () => {


    let dataService = fixture.debugElement.injector.get(DataService);  /////QUEREMOS FAZER 'spyOn', espionar, esse SERVICE ESPECÍFICO, QUE CONTÉM O METHOD ASYNC QUE NOS INTERESSA...

    let spy = spyOn(dataService, 'getDetails') /////fazemos 'SPY' desse METHOD ESPECÍFICO (que é async), NESSE GIVEN SERVICE...
    .and  /////complementa 'spyOn()' */////COM 'spyOn', SEREMOS INFORMADOS _ SEMPRE QUE _ ESSE METHOD DE 'getDetails' FOR EXECUTADO.... -> E QUANDO ELE FOR EXECUTADO, SUA EXECUÇÃO SERÁ INTERROMPIDA, E SERÁ RETORNADO, EM VEZ DISSO, O VALUE DEFINIDO EM 'returnValue()'....
    // .returnValue(); ////quando esse 'getDetails' for executado, QUEREMOS QUE SEJA RETORNADO ESSE VALUE ESPECÍFICO (retornado o parâmetro de 'returnValue')..
    .returnValue(
      Promise.resolve('Data') //////ok, significa que, QUANDO ESSE METHOD NESSE SERVICE FOR EXECUTADO, method async, SERÁ ENTREGUE A NÓS UMA DATA '''DUMMY'''', data definida por nós, e que vai ser retornada nesse returnValue (e, com isso, a execução do METHOD COMUM, ASYNC, não ocorrerá, evitando reach out a servers de verdade)....
    ) //vai nos dar 'Data' quando acabar seu processo async...


    fixture.detectChanges(); ///necessário, pois RECEBEMOS NOVA DATA NO NOSSO COMPONENT, através do dataService....
  


    expect(component.data).toBe(undefined);
  });











  ///APPROACH _ CORRETO__ DE test de methods async...
    
  it("SHOULD fetch data successfully if called asynchronously.", 
  
  
  async (() => { ///EIS AQUI A GRANDE DIFERENÇA, ESSa inserção do termo 'async', que vai denotar o caráter ASYNC DE NOSSO TEST... --> ELE VAI 'CRIAR A SORT OF ASYNC TESTING ENVIRONMENT for angular 2'...
   //// --> É CLARO QUE ESSE AMBIENTE  _ NÃO É __ REALMENTE_ ASYNC, MAS O QUE IMPORTA É QUE '''ELE NOS DEIXA RODAR TAREFAS ASYNC NO SEU INTERIOR'''..

    let dataService = fixture.debugElement.injector.get(DataService); 


    let spy = spyOn(dataService, 'getDetails')
    .and.returnValue(Promise.resolve('Data'));

    fixture.detectChanges();

    fixture.whenStable() ///'whenStable' É APLICADO somente quando todos os 'async' já tiverem acabado sua seleção...
    .then(
      () => {
        expect(component.data).toBe('Data'); 
      }
    )
  }));








  /////VERSÃO __COM 'FAKEASYNC' do código acima (é a mesma coisa, mesmos efeitos e utilização, só sua SINTAXE É DIFERENTE)...
  it("SHOULD fetch data successfully if called asynchronously. (2, using fakeAsync)", 
  
  
  fakeAsync (() => {  ////CÓDIGO EM QUESTÃO.

    let dataService = fixture.debugElement.injector.get(DataService); 


    let spy = spyOn(dataService, 'getDetails')
    .and.returnValue(Promise.resolve('Data'));

    fixture.detectChanges();


    tick(); ///CÓDIGO EM QUESTÃO.

    expect(component.data).toBe('Data'); ////CÓDIGO EM QUESTÃO.
  }));







});
