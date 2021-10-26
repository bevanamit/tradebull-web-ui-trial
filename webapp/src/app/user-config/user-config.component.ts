import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {ProfileSettingService} from '../service/profile-setting.service';

@Component({
    selector: 'app-user-config',
    templateUrl: './user-config.component.html',
    styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
    hideUserMenu = true;
    customerId: string;
    imageUrl: any = "assets/images/img_avatar.png";

    constructor(private router: Router, private authenticationService: AuthenticationService, 
        private profileSettingService: ProfileSettingService) {
    }

    ngOnInit(): void {
        this.customerId = localStorage.getItem('email');
        console.log(localStorage.getItem('img'));
        this.getProfileImage();     //get Profile pic of the user if uploaded   
    }

    getProfileImage() {
        this.profileSettingService.getProfileData().subscribe((data: any) => {
            if (data && data.response && data.response.img) {
               // console.log(data.response.img);
                this.imageUrl = data.response.img;
                }
        });
    }

    logout() {
        this.hideUserMenu = true;
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
