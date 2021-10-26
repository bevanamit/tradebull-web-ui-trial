import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {first} from 'rxjs/operators';
import {VerifyEmailService} from '../service/verify-email.service';
import {Router} from '@angular/router';
import {AlertService} from '../service/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit, AfterViewInit {
    loading = false;
    submitted = false;
    returnUrl: string;
    userEmail: string;
    customerId: string;
    generateOtpCounter = 0;
    generateOtpBtn = true;
    otpCounter = true;
    otpForm: FormGroup;
    @ViewChild('otp', {static: true}) otpInput: ElementRef<HTMLInputElement>;

    constructor(private verifyEmailService: VerifyEmailService, private router: Router, private alertService: AlertService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.userEmail = localStorage.getItem('email');
        this.customerId = localStorage.getItem('cusId');
        this.otpForm = new FormGroup({
            otp: new FormControl('', [Validators.required, Validators.pattern('\\d{6}')]),
        });
    }

    ngAfterViewInit(): void {
        this.otpInput.nativeElement.focus();
    }

    generateOtp() {
        this.submitted = true;
        this.generateOtpCounter = this.generateOtpCounter + 1;
        this.loading = true;
        this.generateOtpBtn = false;
        setTimeout(() => this.generateOtpBtn = true, 60000);
        this.verifyEmailService.sendOtp({
            cusId: this.customerId,
            email: this.userEmail,
            ct: this.generateOtpCounter
        }).subscribe((data: any) => {
                this.alertService.success('Email notification sent. Please request for new Otp after 1min.', true);
                setTimeout(() => this.alertService.clear(), 3000);
                this.loading = false;
                this.otpCounter = data.response.ctLeft;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }

    verifyOtp() {
        if (this.otpForm.valid) {
            this.submitted = true;
            this.loading = true;
            this.verifyEmailService.checkOtp({
                cusId: this.customerId,
                email: this.userEmail,
                e_otp: this.otpForm.get('otp').value.toString()
            })
                .pipe(first())
                .subscribe((data: any) => {
                        this.alertService.success('Customer validated successfully', true);
                        if (data.response.vld) {
                            // this.authenticationService.currentUserSubject.next(data.response.cusId);
                            setTimeout(() => this.alertService.clear(), 3000);
                            this.router.navigate(['/home/profile']);
                        } else {
                            this.alertService.error('Invalid Otp, Please enter 6 digit Otp sent to your registered email');
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
