import { Directive } from '@angular/core';

import { Input } from '@angular/core';

import { TemplateRef } from '@angular/core';

import { ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  @Input() set unless(condition: boolean) {    ///o nome de sua 'propriedade/setter' DEVE TER O MESMO NOME DE SEU SELECTOR, SENÃO O NEGÓCIO (structural directive) NÃO FUNCIONA...
    if (!condition) {
      this.viewContainerReference.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerReference.clear()
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerReference: ViewContainerRef
  ) {}
}
