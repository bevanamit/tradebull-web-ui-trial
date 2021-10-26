import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';
import {AuthenticationService} from '../../service/authentication.service';
import {first} from 'rxjs/operators';
import {PasswordService} from '../../service/password.service';
import {confirmPassword} from '../../helpers/validators';

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password.component.html',
    styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit, AfterViewInit {

    loading = false;
    submitted = false;
    returnUrl: string;
    userEmail: string;
    pswdForm: FormGroup;
    @ViewChild('newPswd', {static: true}) pswdInput: ElementRef<HTMLInputElement>;

    constructor(private passwordService: PasswordService, private router: Router, private alertService: AlertService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.pswdForm = new FormGroup({
            passwd: new FormControl('', [Validators.required, Validators.minLength(6)]),
            cnfmPasswd: new FormControl('', [Validators.required]),
        }, confirmPassword());
        this.userEmail = localStorage.getItem('passwd_email');
    }

    ngAfterViewInit(): void {
        this.pswdInput.nativeElement.focus();
    }

    submitDetails() {
        if (this.pswdForm.valid) {
            this.submitted = true;
            this.loading = true;
            this.passwordService.resetNewPassword({
                email: this.userEmail,
                pass: this.pswdForm.get('passwd').value,
                c_pass: this.pswdForm.get('cnfmPasswd').value,
            })
                .pipe(first())
                .subscribe((data: any) => {
                        if (data) {
                            if (data.status === 'SUCCESS') {
                                this.alertService.success(data.status_message, true);
                                localStorage.clear();
                                setTimeout(() => this.router.navigate(['/login']), 3000);
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
