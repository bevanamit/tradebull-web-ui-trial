import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AesUtil} from '../../helpers/aesUtil';
import {Router} from '@angular/router';
import {AlertService} from '../../service/alert.service';
import {first} from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import {ProfileSettingService} from '../../service/profile-setting.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-broker-setting',
    templateUrl: './broker-setting.component.html',
    styleUrls: ['./broker-setting.component.scss']
})
export class BrokerSettingComponent implements OnInit {

    showUrls = false;
    form: FormGroup;
    loading = false;
    dataLoad = false;
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
    passPhraseCycle: number;
    apiK: string;
    apiS: string;
    placeholderText;
    sts: string;
    tc: boolean = true;
    dialogRef: MatDialogRef<HTMLElement>;
    @ViewChild('tcDialog', {static: true}) tcDialog: TemplateRef<HTMLElement>;


    constructor(private router: Router, private profileSettingService: ProfileSettingService,
                private alertService: AlertService,  private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            bn: new FormControl('ab', Validators.required),
            cId: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern('^\\S\\w*$')]),
            aK: new FormControl('', [Validators.required, Validators.pattern('^\\S*$')]),
            aS: new FormControl('', [Validators.required, Validators.pattern('^\\S*$')]),
            tc: new FormControl(false),
        });
        this.placeholderText = 'Enter client id';
        this.getBrokerData();
        this.sts = localStorage.getItem('sts');
        console.log(this.sts);
    }

    getBrokerData() {
        this.dataLoad = true;
        this.profileSettingService.getBrokerConfig().subscribe((data: any) => {
            if (data && data.response) {
                if (data.response.zrd) {
                    this.form.get('bn').setValue('zrd');
                    this.form.get('cId').setValue(data.response.zrd.cId);
                    const salt = data.response.sl;
                    const four = data.response.ivec;
                    this.aesUtil.aesUtil(this.keySize, this.iterationCount);
                    this.passPhraseCycle = data.response.pc;
                    this.passphrase = this.aesUtil.rotate(this.passPhraseCycle);
                    const decryptaK = this.aesUtil.decrypt(salt, four, this.passphrase, data.response.zrd.aK);
                    const decryptaS = this.aesUtil.decrypt(salt, four, this.passphrase, data.response.zrd.aS);
                    this.form.get('aK').setValue(decryptaK);
                    this.form.get('aS').setValue(decryptaS);
                    this.dataLoad = false;
                } else if (data.response.ab) {
                    this.form.get('bn').setValue('ab');
                    this.form.get('cId').setValue(data.response.ab.un);
                    const salt = data.response.sl;
                    const four = data.response.ivec;
                    this.aesUtil.aesUtil(this.keySize, this.iterationCount);
                    this.passPhraseCycle = data.response.pc;
                    this.passphrase = this.aesUtil.rotate(this.passPhraseCycle);
                    const decryptaK = this.aesUtil.decrypt(salt, four, this.passphrase, data.response.ab.pass);
                    const decryptaS = this.aesUtil.decrypt(salt, four, this.passphrase, data.response.ab.aS);
                    this.form.get('aK').setValue(decryptaK);
                    this.form.get('aS').setValue(decryptaS);
                    this.dataLoad = false;
                }
                
            }
        },
        error => { 
            this.dataLoad = false;
        }
        );
        //document.getElementById('brokerName').focus();
        this.form.get('bn').valueChanges.subscribe(() => {
            this.form.get('cId').setValue(''),
                this.form.get('aK').setValue(''),
                this.form.get('aS').setValue('');
            this.form.markAsPristine();

            if (this.form.get('bn').value === 'zrd') {
                (this.selectedBroker = 'Zerodha');
                this.placeholderText = 'Enter client id';
            } else {
                this.selectedBroker = 'AliceBlue';
                this.placeholderText = 'Enter username';
            }
            
        });
       
    }

    cancel() {
        this.getBrokerData();
    }

    get f() {
        return this.form.controls;
    }

    updateBroker() {
        this.submitted = true;
        this.passPhraseCycle = Math.round(Math.random() * (this.aesUtil.passphraseText.length - 1));
        this.passphrase = this.aesUtil.rotate(this.passPhraseCycle);
        const four = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
        const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
        this.aesUtil.aesUtil(this.keySize, this.iterationCount);
        const encryptaS = this.aesUtil.encrypt(salt, four, this.passphrase, this.form.value.aS);
        const encryptaK = this.aesUtil.encrypt(salt, four, this.passphrase, this.form.value.aK);
        this.apiK = this.form.get('aK').value;
        this.apiS = this.form.get('aS').value;
        this.form.get('aS').setValue(encryptaS);
        this.form.get('aK').setValue(encryptaK);
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.profileSettingService.updateBrokerConfig(this.getRawData(salt, four, this.passPhraseCycle))
            .pipe(first())
            .subscribe(
                (data: any) => {
                    if (data.status === 'ERROR') {
                        this.alertService.error(data.status_message);
                        this.form.get('aS').setValue('');
                        this.form.get('aK').setValue(this.apiK);
                        this.loading = false;
                    } else {
                        this.alertService.success(data.status_message);
                        this.loading = false;
                        setTimeout(() => this.alertService.clear(), 3000);
                        this.getBrokerData();
                        this.form.markAsPristine();
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.form.get('aS').setValue('');
                    this.form.get('aK').setValue(this.apiK);
                    this.loading = false;
                });
    }

    generateBrokerRegURL() {
        this.showUrls = true;
        this.redirectUrl = `https://${window.location.hostname}:${window.location.port}/tb/ui/v1/kdev/${this.form.get('cId').value}/get`;
        this.postbackUrl = `https://${window.location.hostname}:${window.location.port}/tb/ui/v1/kdev/${this.form.get('cId').value}/back`;
    }

    selectedBrokerHandler() {
        (this.form.get('bn').value === 'zrd') ? (this.selectedBroker = 'Zerodha') :
            this.selectedBroker = 'AliceBlue';
    }

    getRawData(salt, four, passPhraseCycle) {
        if (this.form.get('bn').value === 'zrd') {
            return {
                zrd: {
                    cId: this.form.get('cId').value,
                    aK: this.form.get('aK').value,
                    aS: this.form.get('aS').value
                },
                sl: salt,
                ivec: four,
                pc: passPhraseCycle,
                bn: 'ZERODHA'
            };
        } else {
            return {
                ab: {
                    un: this.form.get('cId').value,
                    pass: this.form.get('aK').value,
                    aS: this.form.get('aS').value
                },
                sl: salt,
                ivec: four,
                pc: passPhraseCycle,
                bn: 'ALICE_BLUE'
            };
        }
    }

    openDialog() {
        this.tc = false;
        this.dialogRef = this.dialog.open(this.tcDialog, {width: '70%', panelClass: 'my-dialog', disableClose: true});
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
