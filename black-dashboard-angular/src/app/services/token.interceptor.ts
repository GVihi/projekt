import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) { } intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        const token = this.auth.getAccessToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    "accessToken": this.auth.getAccessToken()
                }
            });
            return next.handle(request);
        } else {
            return next.handle(request);
        }


    }
}