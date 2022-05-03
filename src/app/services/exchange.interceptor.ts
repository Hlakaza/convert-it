import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ExchangeInterceptor implements HttpInterceptor {
  mimeType = 'application/json';
  apiKey = environment.api.key;
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.match(/api.apilayer.com/g)) {
      console.log('test intercept');
      request = request.clone({
       setHeaders: {
         Accept: this.mimeType,
         apiKey: this.apiKey
       }
     })
    }
    return next.handle(request);
  }
}
