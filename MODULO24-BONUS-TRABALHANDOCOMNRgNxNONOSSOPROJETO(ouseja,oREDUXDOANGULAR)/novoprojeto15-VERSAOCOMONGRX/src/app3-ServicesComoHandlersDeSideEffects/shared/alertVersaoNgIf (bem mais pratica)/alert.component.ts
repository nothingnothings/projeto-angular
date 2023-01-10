import { Component, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})

export class AlertDynamicComponent { ///essa é a versão NGIF de nossa 'alert box'...

    @Input() message: string;  ////Colocamos 'Input()' PQ QUEREMOS QUE ESSA MESSAGE DESSA BOX CONSIGA SER SETTADA DO LADO DE FORA....


    @Output() closeModal = new EventEmitter<boolean>()


  constructor(private authService: AuthService) {}





  onModalClose() {
        

    this.closeModal.emit(true);
  }


}
