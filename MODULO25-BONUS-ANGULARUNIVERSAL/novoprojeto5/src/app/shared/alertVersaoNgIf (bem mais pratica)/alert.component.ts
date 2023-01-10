import { Component, Input, Output } from '@angular/core';

import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertDynamicComponent {
  @Input() message: string;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor() {}

  onModalClose() {
    this.closeModal.emit(true);
  }
}
