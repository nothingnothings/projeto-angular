import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { DropdownDirective } from './dropdownDirective/dropdown.directive';
import { PlaceholderDirective } from '../placeholderDirective/placeholder.directive';
import { AlertDynamicComponent } from './alertVersaoImperativa/alert.component';

@NgModule({


    declarations: [
        PlaceholderDirective,
        DropdownDirective,
        AlertDynamicComponent,
        SpinnerComponent
    ],
  imports: [
    CommonModule


  ],

  exports: [
    AlertDynamicComponent,
    SpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule


  ],

  entryComponents: [   ///usado com o RENDER DE COMPONENTS DENTRO DE NOSSO CÓDIGO TS... --> ou seja, components que não vão usar um 'selector' para serem renderizados, nem o ROUTE CONFIG (paths e etc) para serem renderizados... eles vão simplesmente ser 'DROPPADOS' no código, por meio de uma directive especializada e por meio de uma 'ComponentFactory' própria...
  AlertDynamicComponent
],
})
export class SharedModule {}
