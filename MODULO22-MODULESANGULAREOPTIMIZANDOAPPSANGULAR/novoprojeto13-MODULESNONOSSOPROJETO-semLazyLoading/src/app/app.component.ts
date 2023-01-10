import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // selectedPage: string = 'recipeBook';  ////NAVIGATION _ SEM ROUTING_...



  constructor(private authService: AuthService) {}

  // pageSwitcher(page: string) {  ///navigation SEM ROUTING...
  //   this.selectedPage = page;
  // }



  ngOnInit(): void {  

    console.log('AUTOLOGIN');
      ////isso é BEM IMPORTANTE, sempre coloque-o no component que faz 'startup' do seu app...
    this.authService.autoLogin(); ////vai tentar realizar o 'AUTO LOGIN' de nosso user (vai tentar FAZER O EMIT DO 'USER JÁ ARMAZENADO NO LOCAL STORAGE' a outros COMPONENTS DE NOSSO APP)...




  }


}
