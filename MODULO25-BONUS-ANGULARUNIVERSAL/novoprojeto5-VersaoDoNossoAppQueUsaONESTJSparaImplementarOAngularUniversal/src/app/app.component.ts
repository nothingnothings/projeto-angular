import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '.';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

import * as AuthActions from './auth/store/authActions';
import { Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private loggingService: LoggingService,
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit(): void {
    this.loggingService.printLog('Hello From AppComponent NgOnInit!');

    // if (isPlatformBrowser(this.platformId)) {
    //   ///ver código do 'novoprojeto5'...
    //   console.log('EXEMPLO');
    //   this.store.dispatch(new AuthActions.AutoLogin());
    // }
  }
}
