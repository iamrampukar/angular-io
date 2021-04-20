import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

  constructor(private _router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const self = this;
    const flag = true;
    if (flag) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer 28AEF6A43F8CCE2FEF42728D768B8'
        }
        // url: request.url.replace('http://', 'https://')
      })
    }
    // return next.handle(secureReq);
    return next.handle(request).pipe(tap(() => { },
      (error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status !== 401) {
            return;
          }
          self._router.navigate(['/'])
        }
      }
    ));
  }
}
