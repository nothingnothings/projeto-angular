import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generic-error-page',
  templateUrl: './generic-error-page.component.html',
  styleUrls: ['./generic-error-page.component.css']
})
export class GenericErrorPageComponent implements OnInit {




  errorMessage: string;

  constructor(private route: ActivatedRoute) {


   }

  ngOnInit(): void {

    this.errorMessage = this.route.snapshot.data['message']; //DEFINE _ INICIAL_ DE SUA DATA...


   this.route.data.subscribe( ///DEFINE __'POSTERIOR' de sua data (pq se a DATA de sua route/passada a sua ROUTE VIR A MUDAR EVENTUALMENTE, será redefinido o value de 'this.errorMessage' como equivalente ao novo value de 'message' na data recebida....)
      (data) => {
            this.errorMessage = data['message'];

      }
    )
  }





}
