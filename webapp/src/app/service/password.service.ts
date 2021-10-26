import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PasswordService {

    constructor(private http: HttpClient) {
    }

    sendOtp(emailDetails) {
        return this.http.post<any>(`/tb/ui/v1/users/reset`, emailDetails);
    }

    checkOtp(otpDetails) {
        return this.http.post<any>(`/tb/ui/v1/users/verify`, otpDetails);
    }

    resetNewPassword(pswdDetails) {
        return this.http.post<any>(`/tb/ui/v1/users/passwd`, pswdDetails);
    }
}
