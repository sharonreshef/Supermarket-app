import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
// import { ToastrService } from "ngx-toastr";
import { tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token: string;

  constructor(
    // private tostr: ToastrService,
    private authService: AuthService
  ) {
    this.token = authService.getToken();
  }
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
          'x-auth-token': ` ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(req).pipe(
      tap((res: HttpEvent<any>) => {
        if (res instanceof HttpResponse && req.url.endsWith('auth')) {
          console.log(res.body);
          this.saveCredentials(res.body);
        }

        // if (res instanceof HttpResponse && res.body && req.url.endsWith('register')) {
        //     this.tostr.success(res.body.message)
        // }
      })
    );
  }

  private saveCredentials(body) {
    console.log(body);
    const { payload } = body;
    console.log(payload);
    const authToken = body.token;
    const userId = payload.customerID;
    const isAdmin = payload.isAdmin;
    const email = payload.email;
    const username = payload.username;
    const orders = payload.orders.join(', ');

    localStorage.setItem('token', authToken);
    localStorage.setItem('userId', userId);
    localStorage.setItem('isAdmin', isAdmin.toString());
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('orders', orders);
    // this.tostr.success(body.message);
  }
}
