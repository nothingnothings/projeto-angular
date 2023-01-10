import { NgModule } from '@angular/core'; ///esse será um MODULE SECUNDÁRIO ADICIONADO AO SEU PROJETO, para managear melhor suas routes...
import { HomeComponent } from './home/home.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Routes } from '@angular/router';

import { RouterModule } from '@angular/router';

import { ServerComponent } from './servers/server/server.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { UserComponent } from './users/user/user.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';








const appRoutes: Routes = [
  {
    path: '', ////localhost:4200/   (É O _ DEFAULT, A HOME PAGE, PQ É o domain.com SEM O PATH depois)...
    component: HomeComponent,
  },

  // {  ////inválido... --> se quiser redirecionar a partir de '', adicione 'pathMatch: full'...
  //   path: '',
  //   redirectTo: '/server'
  // },

  // {
  //   /////é a nossa primeira route... cada object nesse array é uma ROUTE, que é governada por um 'PAGE-COMPONENT' (o page-component é a ROUTE/page, no caso)...
  //   path: 'users', ///   localhost:4200/users
  //   component: UsersComponent, ///users.component.html
  // },
  // {
  //   path: 'users/:userId', ////exemplo de DYNAMIC SEGMENTS (carregar user específico, dentro de list de users.... mesma coisa vista no NODEJS)...
  //   component: UserComponent,
  // },

  {
    /////é a nossa primeira route... cada object nesse array é uma ROUTE, que é governada por um 'PAGE-COMPONENT' (o page-component é a ROUTE/page, no caso)...
    path: 'users', ///   localhost:4200/users
    component: UsersComponent, ///users.component.html
    children: [
      {
        path: ':userId', //localhost:4200/users/:userId
        component: UserComponent,
      },
    ],
  },

  // {
  //   path: 'users/:userId/:name',   ////PODEMOS TER MÚLTIPLOS SEGMENTOS DINÂMICOS NAS NOSSAS URLS...
  //   component: UserComponent
  // },

  // { /////SEM _ NESTED_ ROUTES_....
  //   path: 'servers', //localhost:4200/servers
  //   component: ServersComponent, //servers.component.html
  // },

  // {
  //   ///COM NESTED ROUTES...
  //   path: 'servers', //localhost:4200/servers
  //   component: ServersComponent, //servers.component.html
  //   canActivate: [AuthGuard], ////PROPRIEDADE_ USADA _ PARA DEFINIR 'GUARD' ( ou guards) PARA ESSA SUA ROUTE específica... --> e essas guards serão aplicadas a TODAS AS CHILD ROUTES DESSA ROUTE, também....
  //   children: [
  //     ///child routes...
  //     {
  //       path: ':id',
  //       component: ServerComponent,
  //     },

  //     {
  //       path: ':id/edit',
  //       component: EditServerComponent,
  //     },
  //   ],
  // },



  {
    ///COM NESTED ROUTES...
    path: 'servers', //localhost:4200/servers
    component: ServersComponent, //servers.component.html
    // canActivate: [AuthGuard], ////PROPRIEDADE_ USADA _ PARA DEFINIR 'GUARD' ( ou guards) PARA ESSA SUA ROUTE específica... --> e essas guards serão aplicadas a TODAS AS CHILD ROUTES DESSA ROUTE, também....
    canActivateChild: [AuthGuard], ///propriedade usada para DEFINIR 'guard' EM TODAS AS CHILD ROUTES, MAS NÃO NA ROUTE inicial/parent... (deixa essa route 'desprotegida' em relaçaõ ao acesso do user)... 
    
    children: [
      ///child routes...
      {
        path: ':id',
        component: ServerComponent,
        resolve: {server: ServerResolver}
      },

      {
        path: ':id/edit',
        canDeactivate: [CanDeactivateGuard],   ///GUARD meio complicada de definir... ver estrutura em 'can-deactivate-guard.service.ts'... ----> O COMPORTAMENTO DE 'leave' dessa página de 'edit-component' SERÁ DEFINIDO NA PRÓPRIA PAGE, em 'edit-component.ts' mesmo.... (e não no service de 'can-deactivate-guard.service.ts')..
        component: EditServerComponent,
      },
    ],
  },



  {
    path: 'not-found', 
    component: GenericErrorPageComponent, //2.0   --> essa page será usada para TODO TIPO DE ERRORS POSSÍVEIS..
    data: { //pass de DATA ESTÁTICA a essa nossa route...  --> isso nos deixa usar aquele component de 'GenericErrorPageComponent' MUITAS E MUITAS VEZES, DE FORMA REUTILIZÁVEL...
      message: 'Page not found!'
    } 
},



  // {
  //   path: 'not-found',
  //   component: PageNotFoundComponent,  //1.0 (menos versátil/reusable que a versão de cima)...
  // },

  {
    ////////////ESSA ROUTE DEVE SER SEMPRE ___ ABSOLUTAMENTE A ÚLTIMA ROUTE DE NOSSO ARRAY DE ROUTES, para ser 'catch-all' de todas as routes que não encaixarem naquelas definidas logo acima....
    path: '**', ///o double asterisk significa 'CATCH ALL THE ROUTES THAT ARE NOT DEFINED ABOVE' (ou seja, é usado com pages de erro 404)...
    redirectTo: 'not-found', ///USADO _ PARA _ REDIRECIONAR nosso user quando ele digita paths que não existem na url bar... --> vamos redirecionar à page de 'PageNotFoundComponent', que é nossa page de 'erro 404, not found'...
   
   

  },

  // {
  //   path: 'servers/:id',
  //   component: ServerComponent,
  // },

  // {
  //   path: 'servers/:id/edit',
  //   component: EditServerComponent,
  // },
];

@NgModule({

imports: [
    RouterModule.forRoot(appRoutes) ///ISSO É NECESSÁRIO. É isso que vai REGISTRAR NOSSAS ROUTES...


    // RouterModule.forRoot(appRoutes, {useHash: true})   ///usar esse 'approach'/versão de nossas urls (COM "#") quando os browsers que acessam nossa page SÃO MT VELHOS/RUINS...  --> suas routes ficarão com um formato 'localhost:4200/#/users' (com esse HASH NO MEIO... APENAS A PARTE QUE VEM __ DEPOIS__ DO '#' será PARSEADA PELO ANGULAR... a parte antes disso será IGNORADA PELO SERVER, que é o que desejamos)
],

exports: [
    RouterModule  ///TAMBÉM É NECESSÁRIO. PRECISAMOS DISSO PARA__ ACTUALLY __ CONSEGUIR USAR ESSE NOSSO 'MODULE' de routing lá em 'app.module.ts', no array de 'imports:[]' dele...
]

})
export class AppRoutingModule {}
