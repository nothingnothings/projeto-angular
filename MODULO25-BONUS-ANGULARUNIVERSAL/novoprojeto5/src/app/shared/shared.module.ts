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
    ]
})
export class SharedModule {}
