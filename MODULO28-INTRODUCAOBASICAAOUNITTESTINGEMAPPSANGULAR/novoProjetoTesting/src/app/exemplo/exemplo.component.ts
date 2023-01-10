import { Component, OnInit } from '@angular/core';
import { ExemploService } from '../exemplo.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-exemplo',
  templateUrl: './exemplo.component.html',
  styleUrls: ['./exemplo.component.css'],
})
export class ExemploComponent implements OnInit {
  example = { name: 'EXEMPLO1' };
  isLoggedIn = false;

  data: string | unknown;
  constructor(
    // private exemploService: ExemploService  ///quando estiver testando UNITARIAMENTE, não injete o service dentro do seu component... faça isso APENAS NO PRÓPRIO 'component.spec.ts', dentro da 'testBed' apropriada (que vai representar seu component)...

    private exemploService: ExemploService,
    private asyncDataService: DataService
  ) {}

  ngOnInit(): void {
    // this.example.name = this.exemploService.user.name;
    this.example.name = this.exemploService.user.name;

    this.asyncDataService.getDetails(
    ).then(
      (data: string | unknown) => {

        this.data = data;
      }
    )
  }
}
