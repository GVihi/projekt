import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('accessToken');

        if (token) {
            request = request.clone({ headers: request.headers.set('accessToken', token) });
        }


        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                }
                return event;
            }));
    }
}