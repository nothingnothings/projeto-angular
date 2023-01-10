import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Subscription } from 'rxjs';




/////OUTSOURCEADOS.
// import { HttpClient } from '@angular/common/http'; ///DEVE SER UTILIZADO, JUNTO DE 'HttpClientModule', lá em 'angular.module.ts', PARA CONSEGUIRMOS FAZER SEND DE HTTP REQUESTS...

// import { map } from 'rxjs'; ////UM DE NOSSOS OPERATORS, a ser usado em nossos OBSERVABLES (no caso, será usado NO OBSERVABLE DE 'http'...)...

import { Post } from './post.model'; ///modelo de post, CRIADO POR NÓS,  a ser usado PARA ESPECIFICAR COMO É A DATA QUE SERÁ RETORNADA DE NOSSO HTTP REQUEST...
import { PostsHttpService } from './postsHttpServiceVersaoSubject.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  loadedPosts: Post[] = [];

  isLoading: boolean = false;


  error: any = null;



  private errorSub: Subscription;

  constructor(private httpPosts: PostsHttpService) {}

  ngOnInit() {
    // this.fetchPosts();

   this.errorSub = this.httpPosts.error.subscribe(
        (errorMessage) => {
            this.error = errorMessage
        }
    )
    
    this.fetchPosts();

    console.log(this.loadedPosts);
  }


  onCreatePost(formReference: NgForm) {

    console.log(formReference.value);

    const postData = formReference.value;

    // this.httpPosts.onCreatePost(postData).subscribe(
    //   (responseData) => {

    //     console.log(responseData);
    //     formReference.reset(); //resetta os values de todos os fields a partir de um submit bem sucedido...

    //     this.loadedPosts.push(
    //     postData
    //     )
    //   }
    // )

    this.httpPosts.onCreatePost(postData);
  }

  onClearPosts() {
    //send HTTP request

    this.httpPosts.onDeletePosts()
    .subscribe(
      (responseData) => {

        console.log(responseData);
        this.loadedPosts = [];
      }
    )

   

  }

  fetchPosts() {
    this.isLoading = true;

    this.httpPosts.onFetchPosts().subscribe(
      
      
      (postsData) => {
      this.loadedPosts = postsData;
      this.isLoading = false;
    },

    (error) => {  
      console.log('TEST ERROR');
      console.log(error);
      this.isLoading = false;
        this.error = error.error.error; //mensagem de error.
    } 

    );
  }


  ngOnDestroy(): void {
      
    this.errorSub.unsubscribe();
  }
}
