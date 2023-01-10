import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ActivateService {
  @Output() activateEmitter = new EventEmitter<boolean>();

  // onActivateService(boolean: boolean) {
  //   this.activateEmitter.emit(boolean);
  // }



  
}
