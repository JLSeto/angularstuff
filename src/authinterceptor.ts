import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http'

/** https://angular.io/guide/http#http-interceptors */
@Injectable()
export class authinterceptor implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>>{
      
    const authToken = localStorage.getItem('token');
    const authReq = req.clone({
      headers: req.headers.set('Authorization','Token: ' + authToken)
    });

    return next.handle(authReq);

  }
}


@NgModule({
  providers:[
    { provide: HTTP_INTERCEPTORS,
      useClass: authinterceptor,
      multi: true }
    ]
})

export class AuthInterceptorModule { }