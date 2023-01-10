import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { HeaderComponent } from './headerComponent/headerComponent.app';

import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';

import { HttpInterceptorService } from 'src/app/httpInterceptor.service';

import { SharedModule } from './shared/shared.module';
import { LoggingService } from './logging.service';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { reducers } from '.';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment';
import { RecipeBookEffects } from './recipeBook/store/recipeBook.effects';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

    GenericErrorPageComponent,
    HomePageComponent,
  ],
  imports: [


    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, RecipeBookEffects]),

    // BrowserModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,

    AppRoutingModule,
    HttpClientModule,

    SharedModule,

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    StoreRouterConnectingModule.forRoot(),
  ],

  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  },
    LoggingService,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
