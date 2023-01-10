import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../auth.service';
import { PlaceholderDirective } from '../placeholderDirective/placeholder.directive';

import { AlertDynamicComponent } from '../shared/alertVersaoImperativa/alert.component';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent implements OnInit, OnDestroy {
  isSignup: boolean = true;

  isLoading: boolean = false;


  closeAlertBoxSubscription: Subscription;

      ///colocamos nossa 'Placeholder directive' PQ ELA TAMBÉM FUNCIONA com '@ViewChild()' (será selecionado o local/elemento do dom que está com essa directive posicionada no seu interior, no caso aquele 'ng-template'...)..
  @ViewChild(PlaceholderDirective, {static: false}) dynamicAlertBoxHost: PlaceholderDirective;   ///essa propriedade vai 'HOLD' nossa placeholder directive, como ela aparece no nosso tempalte..
  

 ////// error: string | null = null; ////vai segurar nossas mensagens de error...   --> mas não precisaremos mais disso, pq agora o CREATE DINÂMICO DE NOSSO COMPONENT 'ALERT-BOX' (usada para o display de MESSAGES DE ERROR) já vai automaticamente passar aquele argumento de 'errorMessage', que será OUTPUTTADO NESSE COMPONNET, DIRETAMENTE.... (VER METHOD de 'private showErrorAlert()'...)

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {////componentFactoy É USADO COM A CRIAÇÃO de clones...  

  }

  ngOnInit(): void {}




  // onModalClose(boolean: boolean) {  //versão do código que tinha o 'ngIf' no nosso alert-box... trocamos pelo 'APPROACH PROGRAMÁTICO'...

  //   if (boolean) {
  //     this.error = null;
  //   }

  // }


    private showErrorAlert(errorMessage: string,) {  ////approach PROGRAMÁTICO DE 'CREATE A COMPONENT' por meio de código TS, e não HTML...

      // const alertComponent = new AlertDynamicComponent();   ////////ISSO OBVIAMENTE NÃO FUNCIONARÁ, NÃO É ASSIM QUE VOCÊ CRIA/INSTANCIA COMPONENTS ANGULAR DENTRO DO CÓDIGO TS....


          ///a esse method 'resolveComponentFactory' você deve passar: 1) O _ TYPE__ DO SEU COMPONENT, DO COMPONENT QUE VOCê QUER CRIAR.... 2) 
   
   
          const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertDynamicComponent);  /////usamos isso para CRIAR NOSSO COMPONENT DINAMICAMENTE/PROGRAMATICAMENTE, DENTRO DO CÓDIGO 'ts'...

          //OBS: VER DIRECTIVE DE 'placeholderDirective', que é usada com essa nosa 'alertComponentFactory'...

          ////com esse method de 'resolveComponentFactory' armazenado em uma CONST, FICAMOS COM UMA VERDADEIRA FACTORY DESSE COMPONENT ESPECÍFICO (AlertDynamicComponent, no nosso caso).


          const hostViewContainerRef = this.dynamicAlertBoxHost.viewContainerRef;   //     local/elemento em que será RENDERIZADO, MANUALMENTE, esse nosso 'component', por meio da factory...


          hostViewContainerRef.clear();   ///simplesmente LIMPA todos os components que estavam renderizados naquele 'ng-template', naquele LUGAR (não importa qual seja) anteriormente, no seu DOM...
        /////queremos LIMPAR TUDO NESSE LUGAR AÍ, ANTES DE RENDERIZAR ALGO NOVO..



    const componentReference = hostViewContainerRef.createComponent(alertComponentFactory); ///cria um NOVO COMPONENT, COM (por meio de) ESSA FACTORY ESPECÍFICA, nesse 'local' (hostViewContainerRef) DE NOSSO TEMPLATE...




    componentReference.instance.message = errorMessage;  ////por meio de 'instance' podemos definir PROPRIEDADES DESSE COMPONENT (property binding) e TAMBÉM FAZER EVENT BINDING (os 2 tipos de databinding, em outras palavras)...
      
    // componentReference.instance.close.emit(true); ////ERRADO...



    this.closeAlertBoxSubscription = componentReference.instance.close.subscribe(
      () => {
        this.closeAlertBoxSubscription.unsubscribe();  ////remove nossa subscription (sem o uso de ngOnDestroy)
        hostViewContainerRef.clear();   ////limpa/remove o nosso alertbox do DOM (na verdade, LIMPA O 'SLOT' em que esse element foi renderizado)
 
      }
    )

  
      }






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
        // this.error = errorMessage;  ///não precisamos mais disso, basta esse component criado a partir de 'showErrorAlert()'..
        this.showErrorAlert(errorMessage); /////por meio desse call, CRIAMOS _ O NOSSO 'ALERT BOX COMPONENT' DE FORMA __ PROGRAMÁTICA, basta ver o código desse method aí para compreender....
      }
    );

    form.reset();
  }

  onSwitchAuth() {
    console.log('test');
    this.isSignup = !this.isSignup;
  }



  ngOnDestroy(): void {

    if (this.closeAlertBoxSubscription) {  ////vai dar unsubscribe nisso aí apenas se ele existir...
      this.closeAlertBoxSubscription.unsubscribe();
    }

  }

  
}
