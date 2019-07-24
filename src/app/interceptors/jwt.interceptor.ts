import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        let currentToken = this.authenticationService.currentTokenValue;
        if (currentToken && currentToken.accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentToken.accessToken}`
                }
            });
        }
        return next.handle(request);
    }
}