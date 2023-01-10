import { Directive, ElementRef } from '@angular/core'; //VOCÊ TAMBÉM DEVE IMPORTAR E DECLARAR ESSA DIRECTIVE LÁ NO ARQUIVO 'app.module.ts' do seu projeto, senão ela não funcionará


import { OnInit } from '@angular/core';
@Directive({ ////esse object vai CONFIGURAR essa directive...

    selector: '[appBasicHighlight]'  //escreva o selector dessa directive de forma 'camelCase'...
                                    ////usamos '[]' pq isso realmente será usado como um DIRECTIVE, ATTRIBUTE DIRECTIVE, uma directive/COISA que VIVE DENTRO DOS OUTROS COMPONENTS DE SEU TEMPLATE/ELEMENTS DO SEU TEMPLATE... --> basta escrever 'appBasicHighlight' dentro de um elemento, sem '[]', que ele será reconhecido como esse 'attribute directive'...s
})
export class BasicHighlightDirective implements OnInit { //sempre importe 'OnInit()', pois o lifecycle hook de 'ngOnInit()' é MT ÚTIL para directives... (melhor definir coisas de nosso elemento lá em 'ngOnInit', e não diretamente no constructor)...



    constructor(private elementRef: ElementRef) {   /// o parâmetro que representa esse 'element' em que a directive foi posicionada é 'elementRef', que possui esse type de 'ElementRef'......
        ///é no constructor de nossa 'directive' QUE VAMOS __ GANHAR _ ACESSO AO 'ELEMENT/COMPONENT' em que essa directive é posicionada (seja esse element um <p>, um <h1>, um <input>, qualquer coisa)....
                //aqui também usamos aquele SHORTCUT DO ANGULAR, para adicionar essa propriedade como 'private property' de nossa class (para que possa ser usada sua data para todo tipo de coisa, dentro dessa directive/class)...
  
  
                // elementRef.nativeElement.xxxx = ''; ///TIPO ASSIM... --> assim já poderíamos editar coisas do elemneto em que foi posicionada a directive, dentro desse constructor....  --> MAS É MELHOR FAZER ESSE TIPO DE COISA LÁ NO 'ngOnInit()' hook, e não aqui, diz o professor...
            }



            ngOnInit(): void {
                

                this.elementRef.nativeElement.style.backgroundColor = 'green';  //com isso, conseguimos MUDAR PROPRIEDADES DE NOSSO ELEMENTO DURANTE SUA INICIALIZAÇÕA, POR MEIO DE NOSSA DIRECTIVE...
            }
}
