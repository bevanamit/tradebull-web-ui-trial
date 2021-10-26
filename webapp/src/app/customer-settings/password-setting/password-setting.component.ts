import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertService} from '../../service/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {confirmPassword} from '../../helpers/validators';
import {first} from 'rxjs/operators';
import {ProfileSettingService} from '../../service/profile-setting.service';
import {SpinnerService} from '../../common/spinner/spinner.service';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-password-setting',
    templateUrl: './password-setting.component.html',
    styleUrls: ['./password-setting.component.scss']
})
export class PasswordSettingComponent implements OnInit {

    loading = false;
    form: FormGroup;
    @ViewChild('passwd', {static: true}) passwdInput: ElementRef<HTMLInputElement>;
    @ViewChild('oldpasswd',{static:true}) oldpasswdInput: ElementRef<HTMLInputElement>;

    constructor(private profileSettingService: ProfileSettingService,
                private alertService: AlertService, private spinner: SpinnerService, private router: Router,
                private elRef: ElementRef, private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            passwd: new FormControl('', [Validators.required, Validators.minLength(6)]),
            cnfmPasswd: new FormControl('', [Validators.required]),
            oldpasswd: new FormControl('', [Validators.required]),
        }, confirmPassword());

    }

    get f() {
        return this.form.controls;
    }

    ngAfterViewInit(): void {
        this.passwdInput.nativeElement.focus();
        //this.oldpasswdInput.nativeElement.focus();
    }

    updatePassword() {
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        const progressRef = this.spinner.showProgress(this.elRef);
        console.log("Inside update");
        console.log("Oldpassword " + this.form.get('oldpasswd').value);
        this.profileSettingService.updatePassword(this.getRawValue())
            .pipe(first())
            .subscribe(
                (data: any) => {
                    this.alertService.success(data.status_message, true);
                    this.loading = false;
                    setTimeout(() => {
                        this.alertService.clear();
                        localStorage.clear();
                        this.router.navigate(['/login']);
                    }, 3000);
                    this.form.get('oldpasswd').setValue('');
                    this.form.get('passwd').setValue('');
                    this.form.get('cnfmPasswd').setValue('');
                    this.form.markAsPristine();
                    this.loading = false;
                },
                error => {
                    this.form.get('oldpasswd').setValue('');
                    this.form.get('passwd').setValue('');
                    this.form.get('cnfmPasswd').setValue('');
                    this.alertService.error(error);
                    this.loading = false;
                });
        this.spinner.detach(progressRef);

    }

    cancel() {
        this.form.get('oldpasswd').setValue('');
        this.form.get('passwd').setValue('');
        this.form.get('cnfmPasswd').setValue('');
    }

    private getRawValue() {
        return {
            old_pass: this.form.get('oldpasswd').value,
            pass: this.form.get('cnfmPasswd').value,
            c_pass: this.form.get('passwd').value,
            cusId: localStorage.getItem('cusId'),
            email: localStorage.getItem('email')
        };
    }
}
