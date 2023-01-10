import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule, Routes } from '@angular/router'; //USADO PARA DEFINIR ROUTES/ROUTING NO NOSSO APP...
////isso foi outsourceado...

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServersComponent } from './servers/servers.component';
import { UsersComponent } from './users/users.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user/user.component';
import { FormsModule } from '@angular/forms';
import { ServersService } from './servers/servers.service';
import { UsersService } from './users/users.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { GenericErrorPageComponent } from './generic-error-page/generic-error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

// const appRoutes: Routes = [
//   {
//     path: '', ////localhost:4200/   (É O _ DEFAULT, A HOME PAGE, PQ É o domain.com SEM O PATH depois)...
//     component: HomeComponent,
//   },


//   // {  ////inválido... --> se quiser redirecionar a partir de '', adicione 'pathMatch: full'...
//   //   path: '',
//   //   redirectTo: '/server'
//   // },



//   // {
//   //   /////é a nossa primeira route... cada object nesse array é uma ROUTE, que é governada por um 'PAGE-COMPONENT' (o page-component é a ROUTE/page, no caso)...
//   //   path: 'users', ///   localhost:4200/users
//   //   component: UsersComponent, ///users.component.html
//   // },
//   // {
//   //   path: 'users/:userId', ////exemplo de DYNAMIC SEGMENTS (carregar user específico, dentro de list de users.... mesma coisa vista no NODEJS)...
//   //   component: UserComponent,
//   // },



//   {
//     /////é a nossa primeira route... cada object nesse array é uma ROUTE, que é governada por um 'PAGE-COMPONENT' (o page-component é a ROUTE/page, no caso)...
//     path: 'users', ///   localhost:4200/users
//     component: UsersComponent, ///users.component.html
//     children: [
//       {
//         path: ':userId',    //localhost:4200/users/:userId
//         component: UserComponent,
//       },
//     ]
//   },




//   // {
//   //   path: 'users/:userId/:name',   ////PODEMOS TER MÚLTIPLOS SEGMENTOS DINÂMICOS NAS NOSSAS URLS...
//   //   component: UserComponent
//   // },

//   // { /////SEM _ NESTED_ ROUTES_....
//   //   path: 'servers', //localhost:4200/servers
//   //   component: ServersComponent, //servers.component.html
//   // },



//   { ///COM NESTED ROUTES...
//     path: 'servers', //localhost:4200/servers
//     component: ServersComponent, //servers.component.html
//     children: [ ///child routes...
//       {
//         path: ':id',
//         component: ServerComponent,
//       },
    
//       {
//         path: ':id/edit',
//         component: EditServerComponent,
//       },



   

//     ]
//   },






// {
//   path: 'not-found',
//   component: PageNotFoundComponent
// },


// {////////////ESSA ROUTE DEVE SER SEMPRE ___ ABSOLUTAMENTE A ÚLTIMA ROUTE DE NOSSO ARRAY DE ROUTES, para ser 'catch-all' de todas as routes que não encaixarem naquelas definidas logo acima....
//   path: '**',   ///o double asterisk significa 'CATCH ALL THE ROUTES THAT ARE NOT DEFINED ABOVE' (ou seja, é usado com pages de erro 404)...
//   redirectTo: 'not-found'  ///USADO _ PARA _ REDIRECIONAR nosso user quando ele digita paths que não existem na url bar... --> vamos redirecionar à page de 'PageNotFoundComponent', que é nossa page de 'erro 404, not found'...
// },





//   // {
//   //   path: 'servers/:id',
//   //   component: ServerComponent,
//   // },

//   // {
//   //   path: 'servers/:id/edit',
//   //   component: EditServerComponent,
//   // },
// ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServersComponent,
    UsersComponent,
    ServerComponent,
    EditServerComponent,
    UserComponent,
    PageNotFoundComponent,
    GenericErrorPageComponent,
  ],
  imports: [BrowserModule, FormsModule, 
    AppRoutingModule //checar arquivo de 'app-routing.module.ts', em que OUTSOURCEAMOS O MANAGE DE NOSSAS ROUTES E AS ROUTES EM SI...
    // RouterModule.forRoot(AppRoutes)

 
  ], // RouterModule.forRoot(appRoutes)], ///vocÊ deve ESCREVER o 'RouterModule', declará-lo aqui, para o TER COMO __ FUNCIONALIDADE DE SEU APP (routing).. --> E PRECISAMOS DO METHOD DE '.forRoot(contComSuasRoutes)' PARA ACTUALLY REGISTRAR NOSSAS ROUTES NO NOSSO APp... --> 
    ////COMO OUTSOURCEAMOS isso, o 'ROUTING MODULE' ao arquivo de 'app-routing.module.ts', nõa precisamos mais desse  'RoutingModule.forRoot(appRoutes)'...
  //// e aí você deve usar 'router-outlet' lá no seu 'app.component.html' para CARREGAR SUAS ROUTES a partir da url...
  providers: [ServersService, UsersService, AuthService, AuthGuard, CanDeactivateGuard, ServerResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
