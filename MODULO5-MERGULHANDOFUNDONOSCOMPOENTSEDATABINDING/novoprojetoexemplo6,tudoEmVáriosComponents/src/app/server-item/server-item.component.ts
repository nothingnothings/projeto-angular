import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-server-item',
  templateUrl: './server-item.component.html',
  styleUrls: ['./server-item.component.css'],
  encapsulation: ViewEncapsulation.Emulated, ////'encapsulation' é usada para _ COPIAR O COMPORTAMENTO DE 'CSS MODULES' (cada arquivo css é aplicado só AO COMPONENT A QUE ESTÁ VINCULADO, não sendo aplicados seus selectors aos DEMAIS COMPONENTS DO CÓDIGO).. ->_ esse comportamneto pode ser OVERWRITTEN, substituído pelo 'COMPORTAMENTO DEFAULT' de arquivos css (que é sempre aplicar os selectors A TODOS OS ELEMENTS DO SEU PROJETO)....

  ////encapsulation tem 3 MODOS: 'emulated' (default, é o padrão do angular, é o comportamento de 'css modules'), 'none' (aplica seus selectors a TODOS OS ELEMENTS DA PÁGINA, tendo um behavior de 'css/javascript' comum...),
  /// 'ShadowDom', antigamente chamado de 'Native', é uma opção que faz a MESMA COISA QUE EMULATED, mas com SUPORTE PIOR NOS BROWSERS...
})
export class ServerItemComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy { //aqui fazemos IMPLEMENT das INTERFACES que pretendemos usar...


  // @Input() element: { /////USO DE '@Input' SEM O USO _ DE 'alias' para sua property name.... (element aqui será exatamente '[element]' no seu elemento html de 'app-server-item'...)
  //   ///por meio de '@Input' fazemos o _ 'EXPOSE' de sua given property '''' AO MUNDO''' (o que quer dizer que podemos PASSAR DATA A ESSA PROPRIEDADE de 'eleemnt' _ DO LADO_ DE FORA de seu element, tipo um react-props, pq VAMOS PODER PASSAR DATA LÁ DE UM 'PARENT COMPONENT' para esse nosso component de 'app-server-item', basta usar aquele PROPERTY BINDING de '[element]="yourValue/object"' ao COMPONENT DE 'app-server-item'....)
  //   name: string;
  //   type: string;
  //   content: string;
  // } = {
  //   name: '',
  //   type: '',
  //   content: '',
  // };

    

    serverNumber: number = 0;

  @Input('srvElement') element: {
    /////USO DE '@Input' COM O USO _ DE 'alias' para sua property name.... (element, essa propriedade, aqui terá nome de 'element', mas no HTML terá um NOME DISTINTO, como esse exemplo 'srvElement'...) --> isso ocorre por meio do PASS DO PARÂMETRO A 'input'..
    ///por meio de '@Input' fazemos o _ 'EXPOSE' de sua given property '''' AO MUNDO''' (o que quer dizer que podemos PASSAR DATA A ESSA PROPRIEDADE de 'eleemnt' _ DO LADO_ DE FORA de seu element, tipo um react-props, pq VAMOS PODER PASSAR DATA LÁ DE UM 'PARENT COMPONENT' para esse nosso component de 'app-server-item', basta usar aquele PROPERTY BINDING de '[element]="yourValue/object"' ao COMPONENT DE 'app-server-item'....)
    name: string;
    type: string;
    content: string;
  } = {
    name: '',
    type: '',
    content: '',
  };


  @Input() name: string;///approach/demo de 


  @ViewChild('heading', {static: true}) header: ElementRef



  @ContentChild('contentParagraphExample', {static: true}) paragraph: ElementRef;  ///aqui estamos acessando o valor do '<p>' que é passado como CONTENT ao nosso 'server-item' LÁ NO TEMPLATE DE 'app.component.html'...
                                                                                  //o valor desse '<p>' só poderá ser lido/acessado A PARTIR DO HOOK DE 'ngAfterContentInit()', e nunca antes disso (indisponível esse valor em ngOnChanges, ngOnInit e ngDoCheck....)

  constructor() {
    ///é executado ANTES DE ONINIT... (primeiro na ordem)
    console.log('server-item constructor called');
  }

  ngOnChanges(changes: SimpleChanges) {  ////este é o ÚNICO HOOK _ QUE RECEBE_ UM PARÂMETRO....
    ///é executado DEPOIS DE 'constructor' (segundo na ordem), MAS __ ANTES_ DE 'onInit'....
    console.log('server-item ngOnChanges called', changes);


    console.log('contentParagraphExample', 'onChanges', this.paragraph.nativeElement.innerText)
  }

  ngOnInit(): void {
    ///é executado DEPOIS de CONSTRUCTOR (terceiro na ordem)

    console.log('server-item ngOnInit called');
    console.log(this.header.nativeElement.textContent)  //esse value/element ainda NÃO TERÁ SIDO DEFINIDO (mt cedo no LIFECYCLE HOOK)
    console.log('contentParagraphExample', 'onInit', this.paragraph.nativeElement.innerText)
  }


  
 ngDoCheck() {
  console.log('server-item ngDoCheck called')
  console.log('contentParagraphExample', 'onDoCheck', this.paragraph.nativeElement.innerText)
}



ngAfterContentInit(): void {
  console.log('server-item ngAfterContentInit Called')
  console.log('contentParagraphExample', 'onAfterContentInit', this.paragraph.nativeElement.innerText)
}


ngAfterContentChecked(): void {
  console.log('server-item ngAfterContentChecked Called')
}


ngAfterViewInit(): void {
  console.log('server-item ngAfterviewInit Called')
  console.log(this.header.nativeElement.textContent)  //esse value/element JÁ TERÁ SIDO DEFINIDO (os ELEMENTOS DE SEU TEMPLATE JÁ TERÃO SIDO CARREGADOS, no seu lifecycle hook ) -->  aí vocÊ pode pegar o value desses items no template/usar esses values...
}


ngAfterViewChecked(): void {
  console.log('server-item ngAfterviewChecked Called')
}

ngOnDestroy(): void {
  console.log('server-item ngOnDestroy called')
}

}
