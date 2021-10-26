import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BrokerRegisteration} from '../models/broker-registeration';

@Injectable({
    providedIn: 'root'
})
export class ProfileSettingService {

    constructor(private http: HttpClient) {
    }

    getProfileData() {
        return this.http.get(`/tb/ui/v1/actions/users/profile`);
    }

    updateProfileData(profileData: any) {
        return this.http.put(`/tb/ui/v1/actions/users/profile`, profileData);
    }

    getBrokerConfig() {
        return this.http.get(`/tb/ui/v1/actions/users/broker`);
    }

    updateBrokerConfig(broker) {
        return this.http.put(`/tb/ui/v1/actions/users/broker`, broker);
    }

    updatePassword(passwordDetails: any) {
        return this.http.put(`/tb/ui/v1/actions/users/passwd`, passwordDetails);
    }
}
