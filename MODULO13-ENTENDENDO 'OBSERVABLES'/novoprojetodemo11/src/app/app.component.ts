
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivateService } from './activate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  activated: boolean = false;



  activatedSubscription: Subscription;

  constructor(private activatedService: ActivateService) {}

  ngOnInit() {
   this.activatedSubscription = this.activatedService.activateEmitter.subscribe((data) => {
      this.activated = data;
    });
  }


  ngOnDestroy(): void {
    this.activatedSubscription.unsubscribe();
  }

}
