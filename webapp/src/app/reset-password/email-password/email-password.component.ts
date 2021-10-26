import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordService} from '../../service/password.service';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';
import {AuthenticationService} from '../../service/authentication.service';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-email-password',
    templateUrl: './email-password.component.html',
    styleUrls: ['./email-password.component.scss']
})
export class EmailPasswordComponent implements OnInit, AfterViewInit {

    loading = false;
    submitted = false;
    returnUrl: string;
    userEmail: string;
    emailForm: FormGroup;
    @ViewChild('email', {static: true}) emailInput: ElementRef<HTMLInputElement>;

    constructor(private passwordService: PasswordService, private router: Router, private alertService: AlertService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.emailForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.pattern('^([\\w+-.%]+@[\\w-]+\\.[A-Za-z]{1,})$')]),
        });
    }

    ngAfterViewInit(): void {
        this.emailInput.nativeElement.focus();
    }

    submitDetails() {
        if (this.emailForm.valid) {
            this.submitted = true;
            this.loading = true;
            this.passwordService.sendOtp({
                email: this.emailForm.get('email').value
            })
                .pipe(first())
                .subscribe((data: any) => {
                        if (data) {
                            if (data.status === 'SUCCESS') {
                                localStorage.setItem('passwd_email', this.emailForm.get('email').value);
                                this.alertService.success(data.status_message, true);
                                this.router.navigate(['/resetPassword']);
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
