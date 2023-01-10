import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ActivateService } from '../activate.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;


  constructor(private route: ActivatedRoute, private activatedService: ActivateService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    )
  }




  onButtonClicked() {
 // this.activatedService.activateEmitter.next(true); ///USO DE UM __ SUBJECT, COMO SE FOSSE UM EVENT EMITTER, PARA RENDERIZAR O NOSSO ELEMENT...
  }




}
