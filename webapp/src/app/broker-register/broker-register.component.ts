import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ProfileRegisterService} from '../service/profile-register.service';
import {AlertService} from '../service/alert.service';
import * as CryptoJS from 'crypto-js';
import {AesUtil} from '../helpers/aesUtil';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-broker-register',
    templateUrl: './broker-register.component.html',
    styleUrls: ['./broker-register.component.scss']
})
export class BrokerRegisterComponent implements OnInit {
    showUrls = false;
    brokerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    redirectUrl: string;
    postbackUrl: string;
    iterationCount = 1000;
    keySize = 128;
    passphrase: string;
    aesUtil = new AesUtil();
    selectedBroker: string;
    broker: string;
    dialogRef: MatDialogRef<HTMLElement>;
    @ViewChild('tcDialog', {static: true}) tcDialog: TemplateRef<HTMLElement>;
    passPhraseCycle: number;
    apiK: string;
    apiS: string;
    tc: boolean = true;
    placeholderText = 'Enter client id';

    constructor(private router: Router, private profileRegisterService: ProfileRegisterService,
                private alertService: AlertService, private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.brokerForm = new FormGroup({
            bn: new FormControl('ab', Validators.required),
            cId: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^\\S\\w*$')]),
            aK: new FormControl('', [Validators.required, Validators.pattern('^\\S*$')]),
            aS: new FormControl('', [Validators.required, Validators.pattern('^\\S*$')]),
            tc: new FormControl(false),
        });
        document.getElementById('brokerName').focus();
        this.brokerForm.get('bn').valueChanges.subscribe(() => {
            this.brokerForm.get('cId').setValue(''),
                this.brokerForm.get('aK').setValue(''),
                this.brokerForm.get('aS').setValue('');
            this.brokerForm.get('tc').setValue(false);
            this.brokerForm.markAsPristine();

            if (this.brokerForm.get('bn').value === 'zrd') {
                (this.selectedBroker = 'Zerodha');
                this.placeholderText = 'Enter client id';
            } else {
                this.selectedBroker = 'AliceBlue';
                this.placeholderText = 'Enter username';
            }
        });
    }

    // tslint:disable-next-line:typedef
    skip() {
        this.router.navigate(['/home/IntraTrendingL1']);
    }

    get f() {
        return this.brokerForm.controls;
    }

    updateBroker() {
        this.submitted = true;
        // this.encrypt();
        this.passPhraseCycle = Math.round(Math.random() * (this.aesUtil.passphraseText.length - 1));
        this.passphrase = this.aesUtil.rotate(this.passPhraseCycle);
        const four = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
        const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
        this.aesUtil.aesUtil(this.keySize, this.iterationCount);
        const encryptaS = this.aesUtil.encrypt(salt, four, this.passphrase, this.brokerForm.value.aS);
        // const decryptaS = this.aesUtil.decrypt(salt, four, this.passphrase, encryptaS);
        const encryptaK = this.aesUtil.encrypt(salt, four, this.passphrase, this.brokerForm.value.aK);
        this.apiK = this.brokerForm.get('aK').value;
        this.apiS = this.brokerForm.get('aS').value;
        this.brokerForm.get('aS').setValue(encryptaS);
        this.brokerForm.get('aK').setValue(encryptaK);
        // stop here if form is invalid
        if (this.brokerForm.invalid) {
            return;
        }

        this.loading = true;
        this.profileRegisterService.registerBroker(this.getRawData(salt, four, this.passPhraseCycle))
            .pipe(first())
            .subscribe(
                data => {
                    if (data.status === 'ERROR') {
                        this.alertService.error(data.status_message);
                        this.brokerForm.get('aS').setValue('');
                        this.brokerForm.get('aK').setValue(this.apiK);
                        this.loading = false;
                    } else {
                        this.alertService.success('Broker registration successful', true);
                        this.loading = false;
                        this.router.navigate(['/home/dashboard']);
                        setTimeout(() => this.alertService.clear(), 3000);
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.brokerForm.get('aS').setValue('');
                    this.brokerForm.get('aK').setValue(this.apiK);
                    this.loading = false;
                });
    }

    generateBrokerRegURL() {
        this.showUrls = true;
        this.redirectUrl = `https://${window.location.hostname}:${window.location.port}/tb/ui/v1/kdev/${this.brokerForm.get('cId').value}/get`;
        this.postbackUrl = `https://${window.location.hostname}:${window.location.port}/tb/ui/v1/kdev/${this.brokerForm.get('cId').value}/back`;
    }

    selectedBrokerHandler() {
        (this.brokerForm.get('bn').value === 'zrd') ? (this.selectedBroker = 'Zerodha') :
            this.selectedBroker = 'AliceBlue';
    }

    openDialog() {
        this.tc = false;
        this.dialogRef = this.dialog.open(this.tcDialog, {width: '70%', panelClass: 'my-dialog', disableClose: true});
    }

    getRawData(salt, four, passPhraseCycle) {
        if (this.brokerForm.get('bn').value === 'zrd') {
            return {
                zrd: {
                    cId: this.brokerForm.get('cId').value,
                    aK: this.brokerForm.get('aK').value,
                    aS: this.brokerForm.get('aS').value
                },
                sl: salt,
                ivec: four,
                pc: passPhraseCycle,
                bn: 'ZERODHA'
            };
        } else {
            return {
                ab: {
                    un: this.brokerForm.get('cId').value,
                    pass: this.brokerForm.get('aK').value,
                    aS: this.brokerForm.get('aS').value
                },
                sl: salt,
                ivec: four,
                pc: passPhraseCycle,
                bn: 'ALICE_BLUE'
            };
        }
    }

    knowledgeBase(broker) {
        switch(broker){
            case 1:
                localStorage.setItem('section', '1');
                    break;
            case 2:
                localStorage.setItem('section', '2');
                    break;
        }
    }
}
