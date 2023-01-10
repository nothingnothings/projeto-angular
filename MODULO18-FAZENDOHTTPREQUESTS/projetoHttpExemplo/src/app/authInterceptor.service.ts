import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"; ///essa interface NOS FORÇA A ADICIONAR UM METHOD DE 'intercept'...
import { map, tap, Observable } from "rxjs";



export class AuthInterceptorService implements HttpInterceptor { ///nosso interceptor PRECISA SER POSICIONADO/USADO LÁ EM 'app.module.ts'....

    /////o primeiro object é um object de HTTP REQUEST...

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  ///esses 2 methods são OBTIDOS AUTOMATICAMENTE, pois são passados pelo angular...
        

        

// if (req.url === 'DUMMY') {

//     /////STOPS THE SEND OF THE REQUEST...
    
//     }

/////modificações DIRETAMENTE NO NOSSO OBJECT 'req' SÃO PROIBIDAS, mas nada nos impede de CRIAR UMA CÓPIA DE NOSSO REQUEST, com 'req.clone()', e aí FORWARDAR ESSA CÓPIA, MODIFICADA, com 'next.handle(copiaDoReq)'...
    // const requestCopy = req.clone(); 

    const requestCopy = req.clone( ////com o pass de um OBJECT JAVASCRIPT dentro desse 'clone', podemos CONFIGURAR/OVERWRITTAR TODAS AS 'CORE THINGS' de nosso REQUEST ORIGINAL, nessa cópia aí..
        {
            // body,
            // headers,
            ///headers: req.headers.append('novoHeader', 'novoHeaderValue') ///assim você pode manter os antigos headers...
            headers: req.headers.append('Auth', 'true')
            // params,
            // method,
            // url


        }
 
    );   



    console.log('Request is on its way!'); ///lógica que é executada _ ANTES_ DO REQUEST DEIXAR NOSSO APP (frontend)...


    // return next.handle(req); /////lógica que é executada _ PARA _ '''LET OUR REQUEST ACTUALLY LEAVE OUR APP'''...
    
    
    // return next.handle(requestCopy);  ////forwardamos A CÓPIA DO REQUEST, COM AS MODIFICAÇÕES APLICADAS POR NOSSO INTERCEPTOR... (aquele header extra de 'Auth: xyz') --> isso será recebido lá no nosso subscribe, e em todos os operators e coisas restante do flow de nosso código...




    return next.handle(requestCopy)  ////se digitamos '.pipe()' nesse OBSERVABLE (o next.handle() RETORNA UM OBSERVABLE), conseguimos CONFIGURAR A RESPONSE QUE VAI CHEGAR AO NOSSO APP, fazer coisas como APLICAR OPERATORS na nossa response...
        .pipe(
        //    map(  ///cuidado cmo isso, pode quebrar seu app, se você transformar seu response body em algo incompatível
        //    )

        tap( ///usamos isso para 'look into' no nosso RESPONSE DATA e NA EVENT DATA dessa response..

        (event) =>  //// no interceptor, nós SEMPRE CONSEGUIMOS UM 'EVENT' como argumento...
        {
            console.log(event);
            if (event.type === HttpEventType.Response) {
                console.log('Response arrived, body data: ' );
                console.log(event.body);
            }


        }
        )
        )
}
     
}