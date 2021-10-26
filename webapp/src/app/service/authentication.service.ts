import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserRegister} from '../models/user-register';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
    // public currentUserSubject: BehaviorSubject<string>;
    // public currentUser: Observable<string>;
    expiryDate: Date;
    subscriptionType: string;

    constructor(private http: HttpClient) {
        // this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    // public get currentUserValue(): string {
    //   // return this.currentUserSubject.value;
    // }

    login(username: string, password: string) {
        return this.http.post<any>(`/tb/ui/v1/users/login`, {username, password});
    }

    register(user) {
        return this.http.post(`/tb/ui/v1/users/register`, user);
    }

    logout() {
        // remove user from local storage to log user out
        this.http.get(`/tb/ui/v1/actions/users/logout`).subscribe();
        localStorage.clear();
        // this.currentUserSubject.next(null);
    }
}
