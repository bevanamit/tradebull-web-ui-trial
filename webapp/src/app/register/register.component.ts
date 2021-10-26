import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {AlertService} from '../service/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {checkspaceAtStartEnd, confirmPassword} from '../helpers/validators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    pt: string;
    prd: string;
    rawData: any;
    @ViewChild('phnNum', {static: true}) phnNumberInput: ElementRef<HTMLInputElement>;
    dialogRef: MatDialogRef<HTMLElement>;
    @ViewChild('tcDialog', {static: true}) tcDialog: TemplateRef<HTMLElement>;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService, private route: ActivatedRoute,
        private dialog: MatDialog
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/home/IntraTrendingL1']);
        // }
    }

    ngOnInit() {
        this.registerForm = new FormGroup({
            ref: new FormControl('', [Validators.required, checkspaceAtStartEnd]),
            phnNum: new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$')]),
            // phnNum: new FormControl('', [Validators.required, Validators.pattern('^((\\+91[0-9]{10})|(0[0-9]{10}))$')]),
            email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern('^([\\w+-.%]+@[\\w-]+\\.[A-Za-z]{1,})$')]),
            passwd: new FormControl('', [Validators.required, Validators.minLength(6)]),
            cnfmPasswd: new FormControl('', [Validators.required]),
            tc: new FormControl(false),
        }, confirmPassword());
        this.pt = this.route.snapshot.queryParamMap.get('pt');
        this.prd = this.route.snapshot.queryParamMap.get('prd');
    }

    ngAfterViewInit(): void {
        this.phnNumberInput.nativeElement.focus();
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.getInput();
        this.authenticationService.register(this.rawData)
            .subscribe((data: any) => {
                    if (data) {
                        if (data.response) {
                            localStorage.setItem('currentUser', data.response.cusId);
                            // this.authenticationService.currentUserSubject.next(data.response.cusId);
                            localStorage.setItem('cusId', data.response.cusId);
                            localStorage.setItem('sts', data.response.sts);
                            localStorage.setItem('email', data.response.email);
                            this.alertService.success('User Registration successful', true);
                            setTimeout(() => this.alertService.clear(), 3000);
                            this.loading = false;
                            this.router.navigate(['/verifyEmail']);
                        }
                        this.alertService.error(data.status_message);
                        this.loading = false;
                        if (data.status === 'ERROR') {
                            this.registerForm.get('passwd').setValue(null);
                            this.registerForm.get('cnfmPasswd').setValue(null);
                        }
                    }
                },
                error => {
                    this.registerForm.get('passwd').setValue(null);
                    this.registerForm.get('cnfmPasswd').setValue(null);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private getInput() {
        this.rawData = {
            ref: this.registerForm.get('ref').value,
            phnNum: this.registerForm.get('phnNum').value,
            email: this.registerForm.get('email').value,
            passwd: this.registerForm.get('passwd').value,
            cnfmPasswd: this.registerForm.get('cnfmPasswd').value,
            pt: this.pt,
            prd: this.prd
        };
    }

    openDialog() {
        this.dialogRef = this.dialog.open(this.tcDialog, {width: '70%', panelClass: 'my-dialog', disableClose: true});
    }

}
