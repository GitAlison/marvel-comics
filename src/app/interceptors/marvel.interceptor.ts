import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ParamsHttpMarvelInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const PUBLIC_KEY = environment.MARVEL_PUBLIC_KEY;
    const HASH = environment.MARVEL_HASH;

    return next.handle(httpRequest.clone({
      url: `${environment.BASE_API}${httpRequest.url}`,
      setParams: {
        ts: '1',
        apikey: PUBLIC_KEY,
        hash: HASH
      }
    }));
  }
}
