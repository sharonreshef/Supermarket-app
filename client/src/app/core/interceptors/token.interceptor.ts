import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.endsWith('auth')) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      req = req.clone({
        setHeaders: {
          'x-auth-token': ` ${this.authService.getToken()}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(req).pipe(
      tap((res: HttpEvent<any>) => {
        if (res instanceof HttpResponse && req.url.endsWith('auth')) {
          this.saveCredentials(res.body);
        }

        if (
          res instanceof HttpResponse &&
          res.body &&
          req.url.endsWith('products')
        ) {
          this.saveCredentials(res.body);
        }
      })
    );
  }

  private saveCredentials(body) {
    const { payload } = body;
    const authToken = body.token;
    const isAdmin = payload.isAdmin;
    const username = payload.username;
    const city = payload.city;
    const street = payload.street;
    localStorage.setItem('token', authToken);
    localStorage.setItem('city', city);
    localStorage.setItem('isAdmin', isAdmin.toString());
    localStorage.setItem('street', street);
    localStorage.setItem('username', username);
  }
}
