import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generic-error-page',
  templateUrl: './generic-error-page.component.html',
  styleUrls: ['./generic-error-page.component.css']
})
export class GenericErrorPageComponent implements OnInit {


  errorMessage: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {



    this.errorMessage = this.route.snapshot.data['message'];



  }

}
