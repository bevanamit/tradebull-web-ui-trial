import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {ProfileRegisterService} from '../service/profile-register.service';
import {AlertService} from '../service/alert.service';
import {DatePipe} from '@angular/common';
import {checkForFutureDates, checkForInvalidYear, checkForPastDates, checkspaceAtStartEnd} from '../helpers/validators';
import {MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMMM YYYY',
    }
};

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    providers: [
        DatePipe,
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
        {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
    ]
})
export class UserProfileComponent implements OnInit, AfterViewInit {
    profileForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    maxDate: string;
    minDate: any;
    dateValue: number;
    @ViewChild('firstName', {static: true}) firstNameInput: ElementRef<HTMLInputElement>;

    constructor(private router: Router, private profileRegisterService: ProfileRegisterService,
                private alertService: AlertService, private datepipe: DatePipe,) {
    }

    ngOnInit(): void {
        this.profileForm = new FormGroup({
            fn: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.pattern('^[a-zA-Z0-9 _]+$'), checkspaceAtStartEnd]),
            gdr: new FormControl('', Validators.required),
            ln: new FormControl('', [Validators.maxLength(32), Validators.pattern('^[a-zA-Z0-9 _]+$'), checkspaceAtStartEnd]),
            dob: new FormControl('', [checkForFutureDates, this.dateformate, checkForPastDates, checkForInvalidYear])
        });
        this.getDobValidations();
    }

    dateformate(ctrl: FormControl): any {
        
        var dob = document.getElementById("date");
            dob.addEventListener('input', function(e) {
                (e.target as any).type = 'text';
                var input = (e.target as any).value;
                //var input = format((e.target as any).value, 'yyyy-MM-dd');
                console.log("input " + input);
                    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
                    var values = input.split('/').map(function(v) {
                        return v.replace(/\D/g, '')
                    });
                    console.log("values" + values);
                    if (values[0]) values[0] = checkValue(values[0], 31);
                    if (values[1]) values[1] = checkValue(values[1], 12);
                    var output = values.map(function(v, i) {
                        return v.length == 2 && i < 2 ? v + ' / ' : v;
                    });
                    console.log("output " + output);
                    (e.target as any).value = output.join('').substr(0, 14);
                    console.log((e.target as any).value);
            });
            function checkValue(str, max) {
                if (str.charAt(0) !== '0' || str == '00') {
                  var num = parseInt(str);
                  if (isNaN(num) || num <= 0 || num > max) num = 1;
                  str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1 ? '0' + num : num.toString();
                };
                return str;
              };
                    
    }


    getDobValidations(): void {
        const today = new Date();
        this.maxDate = `${today.getFullYear() - 10}-${today.getMonth() + 1}-${today.getDate()}`;
        this.minDate = `${today.getFullYear() - 100}-${today.getMonth() + 1}-${today.getDate()}`;

    }

    ngAfterViewInit(): void {
        this.firstNameInput.nativeElement.focus();
    }

    get f() {
        return this.profileForm.controls;
    }

    updateProfile(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.profileForm.invalid) {
            return;
        }

        this.loading = true;
        this.profileRegisterService.profile(this.getRawValue())
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Profile registration successful', true);
                    this.loading = false;
                    setTimeout(() => this.alertService.clear(), 3000);
                    this.router.navigate(['/home/registerbroker']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

    }

    skip() {
        this.router.navigate(['/home/registerbroker']);
    }

    private getRawValue() {
        this.profileForm.get('dob').setValue((new Date(this.profileForm.get('dob').value)).getTime());
        return this.profileForm.value;
    }
}
