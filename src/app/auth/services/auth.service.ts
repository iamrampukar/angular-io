import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from './../../models/login-model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  public fetchAll(): Observable<LoginModel> {
    const self = this;
    const url = "http://localhost/yig2016/io/api/rest.php";
    return self._http.get<LoginModel>(url);
  }

  public userLogin(params: any): Observable<any> {
    const self = this;
    const url = "http://localhost/yig2016/io/api/rest_post.php";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return self._http.post(url, params, httpOptions).pipe(
      catchError(self.handleError)
    );
  }

  public accessTokenValid(params: any): Observable<any> {
    const self = this;
    const url = "http://localhost/yig2016/io/api/rest_token.php";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return self._http.post(url, params, httpOptions);
  }

  public doUnauthorize(params: any): Observable<any> {
    const self = this;
    const url = "https://dev3.yigserver.com/apps/sedori/backend/public/api/login";
    // const url = "http://localhost/yig2016/io/api/rest_unauthorize.php";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return self._http.post(url, params, httpOptions);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
