import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, map, Observable, take, tap } from 'rxjs';
import { AppState } from '.';

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),

      exhaustMap((userOnDemand) => {
        if (!userOnDemand.token) {
          return next.handle(req);
        }
        const queryParams = new HttpParams()
          .set('auth', userOnDemand?.token!)
          .set('recipeBy', userOnDemand?.userId!);

        const requestClone = req.clone({
          params: queryParams,
        });

        return next.handle(requestClone);
      })
    );
  }
}
