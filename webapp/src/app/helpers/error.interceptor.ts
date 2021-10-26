import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {AlertService} from '../service/alert.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router,
                private alertService: AlertService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 && err.error.redirectTo === 'login') {
                this.alertService.error(`${err.error.status_message}. Redirecting to login`);
                // auto logout if 401 response returned from api
                setTimeout(() => {
                    localStorage.clear();
                    // this.authenticationService.currentUserSubject.next(null);
                    this.router.navigate(['/login']);
                }, 3000);
            }
            const error = err.error.status_message || err.statusText;
            if (error) {
                return throwError(error);
            } else {
                this.alertService.error('Something is wrong with the service. Please try after sometime.');
            }
        }));
    }
}
