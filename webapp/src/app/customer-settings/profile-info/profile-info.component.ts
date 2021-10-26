import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';
import {checkForFutureDates, checkForInvalidYear, checkForPastDates, checkspaceAtStartEnd} from '../../helpers/validators';
import {first} from 'rxjs/operators';
import {ProfileSettingService} from '../../service/profile-setting.service';
import {format} from 'date-fns-tz';
import {SpinnerService} from '../../common/spinner/spinner.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
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
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.scss'],
    providers: [ 
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
        {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
    ]
})

export class ProfileInfoComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    loading = false;
    submitted = false;
    maxDate: string;
    minDate: any;
    dateValue: any;
    dataLoad = true;
    @ViewChild('firstName', {static: true}) firstNameInput: ElementRef<HTMLInputElement>;
    @ViewChild('fileInput') el: ElementRef;
    public imageUrl: any = "https://i.ibb.co/fDWsn3G/buck.jpg";
    editFile: boolean = true;
    removeUpload: boolean = false;
    

    constructor(private router: Router, private profileSettingService: ProfileSettingService,
                private alertService: AlertService, private spinner: SpinnerService,
                private elRef: ElementRef,) {
    }

    // registrationForm = this.fb.group({
    //     file: [null]
    //   }) 

    ngOnInit(): void {
        this.form = new FormGroup({
            img: new FormControl(''),
            fn: new FormControl('', [Validators.required, Validators.maxLength(32), Validators.pattern('^[a-zA-Z0-9 _]+$'), checkspaceAtStartEnd]),
            ln: new FormControl('', [Validators.maxLength(32), Validators.pattern('^[a-zA-Z0-9 _]+$'), checkspaceAtStartEnd]),
            gdr: new FormControl('', Validators.required),
            dob: new FormControl('', [Validators.required, this.dateformate, checkForFutureDates, checkForPastDates, checkForInvalidYear]),
        });
        this.getProfileData(this.elRef);
    }
    
    dateformate(ctrl: FormControl): any {
        
        var dob = document.getElementById("date");
            dob.addEventListener('input', function(e) {
                (e.target as any).type = 'text';
                var input = (e.target as any).value;
                    if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);
                    var values = input.split('/').map(function(v) {
                        return v.replace(/\D/g, '')
                    });
                    if (values[0]) values[0] = checkValue(values[0], 31);
                    if (values[1]) values[1] = checkValue(values[1], 12);
                    var output = values.map(function(v, i) {
                        return v.length == 2 && i < 2 ? v + ' / ' : v;
                    });
                    (e.target as any).value = output.join('').substr(0, 14);
                   // console.log((e.target as any).value);
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
     

    getProfileData(elRef) {
        const progressRef = this.spinner.showProgress(elRef);
        this.getDobValidations();
        this.profileSettingService.getProfileData().subscribe((data: any) => {
          //  console.log(data.response.img);
            if (data && data.response && data.response.img) {
                this.imageUrl = data.response.img;
               // this.dataLoad = false;
                this.form.setValue(data.response);
                // this.form.get('fn').setValue(data.response.fn);
                // this.form.get('ln').setValue(data.response.ln);
                // this.form.get('gdr').setValue(data.response.gdr);
                // this.form.get('dob').setValue(data.response.dob);
                this.form.get('dob').setValue(format(this.form.get('dob').value, 'yyyy-MM-dd'));
                }
        },
        error => { 
           // this.dataLoad = false;
        });
      //  this.dataLoad = false;
        this.spinner.detach(progressRef);
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
        return this.form.controls;
    }

    updateProfile(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.profileSettingService.updateProfileData(this.getRawValue())
            .pipe(first())
            .subscribe(
                (data: any) => {
                    this.alertService.success(data.status_message, true);
                    this.loading = false;
                    setTimeout(() => this.alertService.clear(), 3000);
                    this.form.markAsPristine();
                    localStorage.setItem('img', this.imageUrl);
                   // console.log(this.imageUrl);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

    }

    cancel() {
        this.getProfileData(this.elRef);
    }

    private getRawValue() {
        // const i = (this.form.get('dob').value)['_i'];
        // const dd = (new Date(this.form.get('dob').value));
        // console.log(this.form.get('dob').value);
        // console.log(dd);
        return {
            fn: this.form.get('fn').value,
            gdr: this.form.get('gdr').value,
            ln: this.form.get('ln').value,
            dob: (new Date(this.form.get('dob').value)).getTime(),
            //dob: (format(dd, 'yyyy-MM-dd')),
            img: this.imageUrl,
        };
    }

    uploadFile(event) {
        let reader = new FileReader(); // HTML5 FileReader API
        let file = event.target.files[0];
        if (event.target.files && event.target.files[0]) {
          reader.readAsDataURL(file);
    
          // When file uploads set it to file formcontrol
          reader.onload = () => {
            this.imageUrl = reader.result;
            // this.registrationForm.patchValue({
            //   file: reader.result
            // });
            this.editFile = false;
            this.removeUpload = true;
          }
          // ChangeDetectorRef since file is loading outside the zone
          //this.cd.markForCheck();        
        }
      }
    
      // Function to remove uploaded file
    //   removeUploadedFile() {
    //     let newFileList = Array.from(this.el.nativeElement.files);
    //     this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    //     this.editFile = true;
    //     this.removeUpload = false;
    //     this.registrationForm.patchValue({
    //       file: [null]
    //     });
    //   }
      
}
