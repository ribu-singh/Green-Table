import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/**
 * This interceptor automatically adds the token header needed by our backend API if such token is present
 * in the current state of the application.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR');
    let localAuthData: string = localStorage.getItem('userDetails');
        if (localAuthData && !req.url.endsWith('/login')) {
            let parsedAuthData = JSON.parse(localAuthData);
            if (parsedAuthData && parsedAuthData.Token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: 'Bearer ' + parsedAuthData.Token
                    }
                });
            }
        }

        return next.handle(req);
  }
}