import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';   //quando usamos nosso router dentro de component.ts, vamos fazer o NAVIGATE PROGRAMÁTICO DO USUÁRIO, através de METHODS... (E não através de links e 'routerLink', como é o comum)...
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLoadServers() {
    this.router.navigate(['/servers']); /////É ASSIM QUE FAZEMOS 'NAVIGATE' programaticamente.... --> o argumento é o 'absolute path' (ou relative, se não tiver '/') a que VAMOS QUERER NAVIGATE O USER....
  }


  onLoadServer(id: number) {
    this.router.navigate(
      ['/servers', id, 'edit'],    ////localhost:4200/servers/4/edit      --> depois colocaremos os query params, tipo ?exemplo=true, e depois o FRAGMENT, que fica tipo    ?exemplo=true#diabrete....  ( nno caso, será '?allowEdit=1#loading')..

      {
        queryParams: {
            allowEdit: 1
        },
        fragment: 'loading'
      }
    )
  }


  onLogin() {
    this.authService.login();
  } 

  onLogout() {
    this.authService.logout();
  }
}


///exemplo de CARREGAMENTO/PASS DE QUERY PARAMS  AS NOSSAS ROUTES _ QUANDO _ ESTAMOS FAZENDO 'NAVIGATE PROGRAMATICAMENTE'..