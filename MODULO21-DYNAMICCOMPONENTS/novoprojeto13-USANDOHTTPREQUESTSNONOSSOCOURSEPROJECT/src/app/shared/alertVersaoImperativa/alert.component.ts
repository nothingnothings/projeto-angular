import { Component, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertDynamicComponent {/////ESSA É A VERSÃO IMPERATIVA de nossa alert box (menos prática, tipo 'legacy')....




  @Input() message: string; ////Colocamos 'Input()' PQ QUEREMOS QUE ESSA MESSAGE DESSA BOX CONSIGA SER SETTADA DO LADO DE FORA....
  @Output() close = new EventEmitter<boolean>();


  constructor(private authService: AuthService) {}






  onClose() {
      this.close.emit(true);
  }
}
