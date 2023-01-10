import { Component, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertDynamicComponent {



  @Input() message: string;
  @Output() close = new EventEmitter<boolean>();


  constructor(private authService: AuthService) {}






  onClose() {
      this.close.emit(true);
  }
}
