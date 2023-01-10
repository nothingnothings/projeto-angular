import { Injectable } from '@angular/core';

// @Injectable({providedIn: "root"})  //isso vai adicionar esse service lá no nosso root, lá em 'app.module.ts'.... e é isso que vai permitir o INJECT DE UM SERVICE DENTRO DE OUTRO SERVICE...
@Injectable()
export class CounterService {
  // counter: number = 0;

  counter: { value: number } = { value: 0 };
}
