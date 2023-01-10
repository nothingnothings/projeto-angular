import { Component, Injector } from '@angular/core';

import { createCustomElement } from '@angular/elements'; ////usado para CRIAR COMPONENTS ANGULAR DE FORMA 'ANGULAR ELEMENt'...
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; ///também necessário
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  content: null | SafeHtml = null;

  constructor(injector: Injector, domSanitizer: DomSanitizer) {
    ///necessário

    const AlertElement = createCustomElement(
      AlertComponent,
      { injector: injector } ///esse segundo parâmetro é necesário
    );

    customElements.define('app-alert', AlertElement);

    setTimeout(
      () => {
        ////ESSA VERSÃO FUNCIONARÁ (pq é um HTML COMUM, e não um ANGULAR COMPONENT)...
        // this.content = `
        //   <p>A paragraph!</p>
        //   `;

        ////ESSA VERSÃO NÃO FUNCIONARÁ (pq é um ANGULAR COMPONENT, E NÃO HTML... é um angular component sem a FEATURE DO ANGULAR ELEMENTS)
        //   this.content = `
        //   <app-alert message="Rendered dynamically!"></app-alert>
        // `

        ////ESSA VERSÃO FUNCIONARÁ (ISSO SE TIVERMOS AS LINHAS de 'AlertElement' e 'customElements.define', que vão CRIAR e DEFINIR/REGISTRAR o nosso ANGULAR COMPONENT COMO CUSTOM ELEMENT A SER RENDERIZADO)
        ///também necessária é a escrita/uso de 'domSanitizer: DomSanitizer' no CONSTRUCTOR... , e também o usage do wrapper de  'domSanitizer.bypassSecurityTrustHtml()'...
        this.content = domSanitizer.bypassSecurityTrustHtml(`
          <app-alert message="Rendered dynamically!"></app-alert>
        `);
      },

      1000
    );
  }
}
