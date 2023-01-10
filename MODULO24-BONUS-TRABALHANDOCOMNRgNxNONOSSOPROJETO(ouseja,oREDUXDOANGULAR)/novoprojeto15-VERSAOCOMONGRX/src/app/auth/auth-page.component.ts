import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { PlaceholderDirective } from '../placeholderDirective/placeholder.directive';

import { AlertDynamicComponent } from '../shared/alertVersaoImperativa/alert.component';
import { Store } from '@ngrx/store';
import { AppState } from '..';








import * as AuthActions from '../auth/store/authActions';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit, OnDestroy {
  isSignup: boolean = true;  //state que manageia a user interface, mas que nÃO É MANAGEADO DENTRO DO NGRX/store, pq ele NÃO AFETA NENHUMA OUTRA PARTE DE NOSSO APP.. 

  isLoading: boolean = false;

  private closeAlertBoxSubscription: Subscription;

  private storeSubscription: Subscription;


  error: string | null;

  @ViewChild(PlaceholderDirective, { static: false })
  dynamicAlertBoxHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {


  this.storeSubscription = this.store.select('auth').subscribe(
        (authState) => {


          this.isLoading = authState.isLoading;  ///com isso, usamos o state de 'auth' PARA ATUALIZAR O STATE DESSE NOSSO 'PAGE COMPONENT' de 'AuthPage'...
          this.error = authState.error; 
          if (this.error) {
            this.showErrorAlert(this.error);
          }
        }
      )



  }

  private showErrorAlert(errorMessage: string) {
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        AlertDynamicComponent
      );

    const hostViewContainerRef = this.dynamicAlertBoxHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentReference = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    componentReference.instance.message = errorMessage;

    this.closeAlertBoxSubscription =
      componentReference.instance.close.subscribe(() => {
        this.closeAlertBoxSubscription.unsubscribe();
        hostViewContainerRef.clear();
        this.store.dispatch(new AuthActions.ClearError());  ///limpa/sincroniza o STATE GLOBAL DO NGRX, AUTH, com esse nosso component (pq vamos COLOCAR O ERROR COMO NULL, para fazer com que ele seja redefinido no state geral do ngrx, e não apenas localmente...)...

        console.log(this.store.select('auth'));
      });



  }

  onAuthFormSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.form.get('email')?.value;
    const password = form.form.get('password')?.value;

    const userData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    // let authObs: Observable<AuthResponseData>;  //////completamente substituído pelo APPROACH QUE USA 'NGRX/EFFECTS'...
      ////os effects de nosso login (UPDATE DO GENERAL STATE DO NOSSO APP) são realizados lá nos effects..


    // this.isLoading = true;   //isso também será handlado por nossos EFFECTS...

    if (!this.isSignup) {
      // authObs = this.authService.onLogin(userData);

      this.store.dispatch(new AuthActions.AuthStart({email: email, password: password}));   ///OBS: 'DISPATCH' não vai 'give back' um OBSERVABLE A NÓS... --> é exatamente por isso que não podemos o armazenar em 'authObs' (cujo type é de observable)...
            ////além disso, como ESSE DISPATCH NÃO É UM OBSERVABLE, ELE NÃO _ NOS ENTREGA INFO SOBRE SE O __ SEND DE DATA FOI BEM SUCEDIDO, O QUE NOS IMPEDE DE DEFINIR COISAS COMO 'isLoading' e o NAVIGATE AWAY, Pq não sabemos o status de nosso request (se fosse um observable, conseguiríamos saber)...
    } else {
      // authObs = this.authService.onCreateAccount(userData);

      this.store.dispatch(new AuthActions.AuthSignupStart({email: email, password: password}))
    }

    // authObs.subscribe( ////substituído pela lógica de 'EFFECTS', e do SUBSCRIBE AO STORE DO 'ngrx'...
    //   (responseData) => {
    //     this.isLoading = false;
    //     this.router.navigate(['/recipe-book']); ////redirects serão feitos no/com o  NGRX EFFECTS..
    //   },

    //   (errorMessage) => {
    //     console.log(errorMessage);
    //     this.isLoading = false;

    //     this.showErrorAlert(errorMessage);
    //   }
    // );



    // this.store.select('auth').subscribe(  ///ESSE CÓDIGO FOI TRANSPLANTADO PARA O 'ngOnInit()', em que cumpre sua função mais adequadamente...

    //   (authState) => {   ///vai retornar nosso state de auth integralmente... --> aí rodamos if checks a partir disso...


    //     if (authState.error && !authState.isLoading) {

    //     }
    //   }
    // )

    form.reset();
  }

  onSwitchAuth() {
    console.log('test');
    this.isSignup = !this.isSignup;
  }

  ngOnDestroy(): void {
    if (this.closeAlertBoxSubscription) {
      this.closeAlertBoxSubscription.unsubscribe();
    }


    this.storeSubscription.unsubscribe();
  }
}
