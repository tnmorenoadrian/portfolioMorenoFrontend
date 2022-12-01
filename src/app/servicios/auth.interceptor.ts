import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NO_API_KEY } from './http.context';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    // Here we can find out if the Http Call triggered wanted to skip the interceptor or not
    if (request.context.get(NO_API_KEY)) {
        // if enters it's because skipApiKey function was called for this request. Won't add the token
        return next.handle(request);
    }

    const requestApiKey = request.clone({ setHeaders: { Authorization: `${token}` } });
    return next.handle(requestApiKey);
}
  
}
