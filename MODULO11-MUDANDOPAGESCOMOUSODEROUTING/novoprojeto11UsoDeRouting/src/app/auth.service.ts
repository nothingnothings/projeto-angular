import { Injectable } from "@angular/core";



@Injectable()
export class AuthService {



    loggedIn = false;
    
    isAuthenticated() {  ///esse method vai SIMULAR O PROCESSO DE 'CHECK DE AUTHENTICATION' de nosso user, lá em um server/backend... (pq demora alguns segundos, é async)...
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        resolve(this.loggedIn)
                    }, 800
                )
            }
        )

        return promise;
    }


    
    login() {
        this.loggedIn = true;
    }


    logout() {
        this.loggedIn = false;
    }




}















// --> EM UM APP DE VERDADE,




// PROVAVELMENTE USARÍAMOS ESSE 'SERVICE' PARA FAZER LOGIN/LOGOUT e etc, 



// faríamos a communication com um server/backend,


// PARA AÍ 

// 'CHECAR A CURRENT AUTHENTICATION STATE 
// DO USEr'...


////////////OBS::: 'authService' foi/é usado EM CONJUNTO COM AQUELE service de 'auth-guard.service.ts'...