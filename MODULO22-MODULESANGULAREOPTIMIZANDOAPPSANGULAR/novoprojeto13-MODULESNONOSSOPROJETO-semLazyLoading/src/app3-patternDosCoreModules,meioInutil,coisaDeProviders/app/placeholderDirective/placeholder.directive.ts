import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
                ///lembre-se de deixar o 'viewContainerRef' como PÚBLICO, para que você consiga o acessar do lado de fora, lá no seu method que vai criar esse component nesse local...
  constructor(public viewContainerRef: ViewContainerRef )  ////ESSE TYPE _ JÁ NOS _ DÁ, AUTOMATICAMENTE, UMA 'REFERENCE'/pointer AO __ LOCAL DE NOSSO DOM _ EM QUE _ ESSA DIRECTIVE DE 'placeholder' for usada..
  { }   ///e esse 'viewContainerRef' TEM MAIS DO QUE SÓ COORDENADAS, TEM TAMBÉM __ METHODS ÚTEIS, COMO POR EXEMPLO O METHOD QUE CRIA UM COMPONENT, QUE PODE CRIAR 1 COMPONENT BEM NO LOCAL EM QUE ESSA NOSSA DIRECTIVE FOR POSICIONADA... 

}
