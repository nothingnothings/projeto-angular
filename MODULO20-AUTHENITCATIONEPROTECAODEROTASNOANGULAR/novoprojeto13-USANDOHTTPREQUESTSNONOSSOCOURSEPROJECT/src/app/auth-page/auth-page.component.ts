import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit {
  isSignup: boolean = true;

  isLoading: boolean = false;

  error: string | null = null; ////vai segurar nossas mensagens de error...

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onAuthFormSubmit(form: NgForm) {
    if (!form.valid) {
      ///extra validaton, bem básica (caso em que o user hackeia nossos form controls; nesse caso, mesmo assim teremos essa step extra de validation)...
      return;
    }

    const email = form.form.get('email')?.value;
    const password = form.form.get('password')?.value;

    const userData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (!this.isSignup) {
      authObs = this.authService.onLogin(userData);
     
      // .subscribe(
      //   (responseData) => {
      //     this.isLoading = false;
      //     // form.reset();
      //     this.router.navigate(['/auth']);
      //   },

      //   (errorMessage) => { ////ver código dos OPERATORS de nosso methods de auth... ( em que temos o throw de 'errorMessage' custom, com o uso de 'catchError' e 'throwError')...
      //     this.isLoading = false;

      //     this.error = errorMessage;

      //     // if (errorData.error.error.message === 'EMAIL_EXISTS') { ///lógica similar foi outsourceada lá em 'auth.service.ts', para LIBERAR ESPAÇO NESSE COMPONNNET DE 'auth.component.ts'...
      //     //   // confirm(
      //     //   //   'Entered email already exists, please create an account with a different email.'
      //     //   // );

      //       // this.error = 'Entered email already exists, please create an account with a different email.'
      //     // } else {

      //       // this.error = errorData.error.error.message
      //     // }
      //     // console.log(errorData);
      //   }
      // );
    } else {
      authObs = this.authService.onCreateAccount(userData);

      // .subscribe(
      //   (responseData) => {
      //     console.log(responseData);
      // const expirationDate = new Date(
      //   new Date().getTime() + +responseData.expiresIn * 1000
      // ); ////lembre-se de adicionar '* 1000', pois o JAVASCRIPT SEMPRE CONSIDERA 'TEMPO' EM MILISSEGUNDOS, E NÃO EM SEGUNDOS.... (só o 'expiresIn' que é mostrado em segundos....)
      // localStorage.setItem('token', responseData.idToken);
      // localStorage.setItem('expirationDate', expirationDate.toString());
      // localStorage.setItem('userId', responseData.localId);
      // localStorage.setItem('email', responseData.email);

      //     this.isLoading = false;

      //     this.router.navigate(['/recipe-book']);
      //   },

      //   (errorMessage) => {
      //     this.isLoading = false;
      //     this.error = errorMessage;
      //   }
      // );
    }

    authObs.subscribe(
      (responseData) => {

        ////////ISSO (storage da user AuthData no browser do user) NÃO SERÁ FEITO AQUI, E SIM SERÁ FEITO LÁ EM '.tap()', lá em 'pipe()', nos OPERATORS, em que é mais adeuqado fazer esse STORAGE...
        // const expirationDate = new Date(  
        //   new Date().getTime() + +responseData.expiresIn * 1000
        // ); ////lembre-se de adicionar '* 1000', pois o JAVASCRIPT SEMPRE CONSIDERA 'TEMPO' EM MILISSEGUNDOS, E NÃO EM SEGUNDOS.... (só o 'expiresIn' que é mostrado em segundos....)
        // localStorage.setItem('token', responseData.idToken);
        // localStorage.setItem('expirationDate', expirationDate.toString());
        // localStorage.setItem('userId', responseData.localId);
        // localStorage.setItem('email', responseData.email);
        this.isLoading = false;
        this.router.navigate(['/recipe-book']);
      },

      (errorMessage) => {
        console.log(errorMessage);
        this.isLoading = false;
        this.error = errorMessage;
      }
    );

    form.reset();
  }

  onSwitchAuth() {
    console.log('test');
    this.isSignup = !this.isSignup;
  }
}
