import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';


import { Post } from './post.model';

@Injectable()
export class PostsHttpService {

    error = new Subject<string>();  ////VAI SER __ RESOLVEd__ como uma STRING..
 



  constructor(private http: HttpClient) {}

  private fetchPosts() {
    ///outsourcing.
    return this.http
      .get<{ [name: string]: Post }>(
        'https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((responseData) => {
          const transformedPostsArray: Post[] = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              ///VAI CHECAR SE ISSO NÃO É UM 'PROTOTYPE' dentro da 'responseData'...
              transformedPostsArray.push({ ...responseData[key], id: key });
            }
          }

          return transformedPostsArray; ///return de 'observable' (Faça SUBSCRIPTION lá nos seus COMPONENTS, para pegar o resultado da subscription)...
        })
      );
  }

  // onCreatePost(postData: Post) {
  //   return this.http.post<{ name: string }>( ///return de 'observable' (Faça SUBSCRIPTION lá nos seus COMPONENTS, para pegar o resultado da subscription)...
  //     'https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json',

  //     postData ///nossa ACTUAL DATA.
  //   );
  // }




  onCreatePost(postData: Post) {
    // return this.http.post<{ name: string }>( ///return de 'observable' (Faça SUBSCRIPTION lá nos seus COMPONENTS, para pegar o resultado da subscription)...
    //   'https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json',

    //   postData ///nossa ACTUAL DATA.
    // );


    this.http.post<{name: string}>(
      'https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json',
      postData

    )
    .subscribe(
      (responseData) => {
        console.log(responseData);
      },

      (error) => {
        this.error.next(error.message);
      }
    )
  }


  onDeletePosts() {

    return this.http.delete(
        'https://angularconnectiondummy-default-rtdb.firebaseio.com/posts.json'
    );



  }

  onFetchPosts() {
    return this.fetchPosts();
  }
}
