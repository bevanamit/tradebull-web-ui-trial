import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertService} from '../service/alert.service';
import {AuthenticationService} from '../service/authentication.service';
import {PasswordService} from '../service/password.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
    loading = false;
    submitted = false;
    returnUrl: string;
    userEmail: string;
    otpForm: FormGroup;
    @ViewChild('otp', {static: true}) otpInput: ElementRef<HTMLInputElement>;

    constructor(private passwordService: PasswordService, private router: Router, private alertService: AlertService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.otpForm = new FormGroup({
            otp: new FormControl('', [Validators.required]),
        });
        this.userEmail = localStorage.getItem('passwd_email');
    }

    ngAfterViewInit(): void {
        this.otpInput.nativeElement.focus();
    }

    submitDetails() {
        if (this.otpForm.valid) {
            this.submitted = true;
            this.loading = true;
            this.passwordService.checkOtp({
                email: this.userEmail,
                e_otp: this.otpForm.get('otp').value.toString()
            })
                .pipe(first())
                .subscribe((data: any) => {
                        if (data) {
                            if (data.status === 'SUCCESS') {
                                this.alertService.success(data.status_message, true);
                                this.router.navigate(['/newPassword']);
                            } else {
                                this.alertService.error(data.status_message);
                            }
                        }
                        this.loading = false;
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }
    }
}
