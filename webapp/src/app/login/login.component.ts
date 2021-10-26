import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertService} from '../service/alert.service';
import {AuthenticationService} from '../service/authentication.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    message: any;
    @ViewChild('username', {static: true}) usernameInput: ElementRef<HTMLInputElement>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        this.router.events.subscribe(
            (event) => {
                   if (event instanceof NavigationEnd) {
                        this.dialogRef.close(false);
                   }
            });        
    }

    dialogRef: MatDialogRef<HTMLElement>;

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern('^([\\w+-.%]+@[\\w-]+\\.[A-Za-z]{1,})$')]),
            passwd: new FormControl('', [Validators.required])
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    ngAfterViewInit(): void {
        this.usernameInput.nativeElement.focus();
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.email.value, this.f.passwd.value)
            .subscribe((data: any) => {
                    // localStorage.setItem('currentUser', data.response.cusId);
                    // this.authenticationService.currentUserSubject.next(data.response.cusId);
                    if (data && data.redirectTo === 'Kite-Authentication') {
                        const apiKey = data.response.ak;
                        window.location.href = (`https://kite.zerodha.com/connect/login?v=3&api_key=${apiKey}`);
                    } else if (data && data.redirectTo === 'TradeBull-Dashboard') {
                        //console.log('hello');
                        localStorage.setItem('cusId', data.response.cusId);
                        sessionStorage.setItem('custId', data.response.cusId);
                        localStorage.setItem('sts', data.response.sts);
                        localStorage.setItem('email', data.response.email);
                        localStorage.setItem('pt', data.response.pt);
                        localStorage.setItem('exp', data.response.exp);
                        if (data.response.pt === 'UNKNOWN') {
                            this.router.navigate(['/home/settings/payment']);
                        } else if (data.response.sts === 'VALIDATED') {
                            this.router.navigate(['/home/profile']);
                        } else if (data.response.sts === 'REGISTERED') {
                            // this.authenticationService.currentUserSubject.next(null);
                            this.router.navigate(['/verifyEmail']);
                        } else if (data.response.sts === 'PROFILE') {
                            this.router.navigate(['/home/registerbroker']);
                        } else if (data.response.sts === 'BROKER') {
                            this.router.navigate(['/home/dashboard']);
                        } else if (data.response.sts === 'TB_ADMIN') {
                            this.router.navigate(['/home/dashboard']);
                        }
                    }
                    this.alertService.error(data.status_message);
                    this.loading = false;
                },
                error => { 
                    this.loginForm.get('passwd').setValue(null);
                    this.alertService.error(error);
                    this.message=error;
                   console.log("Message" + error);
                    //this.showAlert();
                    this.loading = false;
                });
    }

    // showAlert() {
    //     var l = document.getElementById("lockedaccount");
    //     var p = document.getElementById("wrongpassword");
    //     var a = document.getElementById("noaccount");
    //     console.log("Hello");
    //     if(this.message.startsWith("The email address that you've entered is locked due to maximum authentication failures. Contact TradeBull Admin"))
    //     {
    //         l.style.display = "block";
    //         p.style.display = "none";
    //         a.style.display = "none";
    //     }
    //     else if(this.message.startsWith("The password that you've entered is incorrect."))
    //     {
    //         p.style.display="block";
    //         l.style.display = "none";
    //         a.style.display = "none";
    //     } 
    //     else if(this.message.startsWith("The email address / phone number that you've entered doesn't match any account. Sign up for an account."))
    //     {
    //         a.style.display="block";
    //         p.style.display = "none";
    //         l.style.display = "none";
    //     }
    //     else {
    //         p.style.display="block"
    //         l.style.display = "none";
    //         a.style.display = "none";
    //     }
    // }

}
