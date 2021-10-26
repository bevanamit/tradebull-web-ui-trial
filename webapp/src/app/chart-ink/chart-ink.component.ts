import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ChartInkArray, ChartInkModel} from '../models/chart-ink';
import {FormArray, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppDataSource} from '../models/app-data-source';
import {ChartInkService} from '../service/chart-ink.service';
import {AlertService} from '../service/alert.service';
import {ChartInkAlgoAddComponent} from './chart-ink-algo-add/chart-ink-algo-add.component';
import {ChartInkAlgoTestComponent} from './chart-ink-algo-test/chart-ink-algo-test.component';
import {MatSort} from '@angular/material/sort';

@Component({
    selector: 'app-chart-ink',
    templateUrl: './chart-ink.component.html',
    styleUrls: ['./chart-ink.component.scss']
})
export class ChartInkComponent implements OnInit {

    constructor(private chartInkService: ChartInkService, private dialog: MatDialog, private alertService: AlertService) {
    }

    addedAlgoTable = ['name', 'des', 'tranType', 'loss', 'profit', 'qty', 'status', 'action'];
    chartInkData: AppDataSource<ChartInkModel>;
    form: FormGroup = new FormGroup({});
    dialogRef: MatDialogRef<HTMLElement>;
    selectedAlgos: any;
    chartInkList: ChartInkArray;
    index: number = null;
    webHookUrl: string;
    sts: string;
    broker: boolean;
    disabledAlert: boolean = false;
    @ViewChild('deleteDialog', {static: true}) deleteDialog: TemplateRef<HTMLElement>;
    @ViewChild('deleteAllAlert', {static: true}) deleteAllAlert: TemplateRef<HTMLElement>;
    @ViewChild('disableAllDialog') disableAllDialog: TemplateRef<HTMLElement>;
    @ViewChild('appMenu') appMenu: TemplateRef<HTMLElement>;
    hideUserMenu = true;
    checkDailyRuns: string;
    disableAlerts = true;
    showAlert: true;

    private static sort(algoList: any): any {
        return algoList
            .sort((a, b) => a.an.localeCompare(b.an));
    }

    ngOnInit(): void {
        this.getStatus();
        this.getAlreadyAddedAlgos();
    }

    getStatus() { this.chartInkService.getuserSts()
        .subscribe((data:any) => {
            console.log(data.response.sts);
            if (data && data.response && data.response.sts) {
                this.sts = data.response.sts;
                localStorage.setItem('sts', data.response.sts);
                this.getchartInkWebHook();
            } else {
                this.sts = 'null';
            }
        }); 
    }

    getAlreadyAddedAlgos(): void {
        this.chartInkService.getAddedAlgos()
            .subscribe((data: any) => {
                    if (data && data.response && data.response.ca_cfg) {
                        this.chartInkList = new ChartInkArray(data.response.ca_cfg);
                        // ChartInkComponent.sort(this.chartInkList);
                        this.form = this.chartInkList.getForm();
                        this.chartInkData = new AppDataSource(this.chartInkList.ca_cfg);
                        this.getEnabledAlerts();
                    }
                },
                error => {
                    this.alertService.error(error);
                });
    }

        

    getchartInkWebHook() {
        if(this.sts === 'BROKER' || this.sts === 'VALIDATED') {
            this.broker = true;
            console.log(this.broker);
            this.chartInkService.getWebHook()
            .subscribe((data: any) => {
                if (data && data.response && data.response.wu) {
                    console.log(data.response.wu);
                    if(data.response.wu){
                        
                        this.webHookUrl = data.response.wu;
                    } else {
                        this.webHookUrl = 'a';
                    }
                    
                } else {
                    this.webHookUrl = 'WebHook not generated';
                    console.log("Else " + this.webHookUrl);
                }
            });
        } 
        else {
            this.broker = false;
            console.log(this.broker);
        }
        
    }

    add(algoId?, editMode = false) {
        const dialogData = {
            form: this.form,
            edit: editMode,
            id: algoId
        };
        this.dialog.open(ChartInkAlgoAddComponent, {
            width: '40%',
            data: dialogData,
            panelClass: 'my-dialog',
            disableClose: true
        }).afterClosed().subscribe(() => {
            this.getAlreadyAddedAlgos();
        });
    }

    deleteAlert(alertId, alertName) {
        this.dialogRef = this.dialog.open(this.deleteDialog, {width: '500px', panelClass: 'my-dialog', disableClose: true});
        this.selectedAlgos = alertName;
        this.dialogRef.afterClosed()
            .subscribe((okSelected) => {
                    if (okSelected) {
                        this.chartInkService.delete(alertId).subscribe((data: any) => {
                            if (data && data.status === 'SUCCESS') {
                                this.alertService.success(data.status_message, true);
                                setTimeout(() => this.alertService.clear(), 3000);
                                this.delete(alertId);
                            } else {
                                this.alertService.error(data.status_message);
                            }
                        });
                    }
                },
                error => {
                    this.alertService.error(error);
                });
    }

    delete(selectedId) {
        const index = this.chartInkList.ca_cfg.findIndex(value => value.aid === selectedId);
        this.chartInkList.ca_cfg.splice(index, 1);
        (this.form.get('ca_cfg') as FormArray).removeAt(index);
        this.chartInkData = new AppDataSource(this.chartInkList.ca_cfg);
    }


    deleteAll() {
        this.getDisabledAlerts();
        this.dialogRef = this.dialog.open(this.deleteAllAlert, {width: '500px', panelClass: 'my-dialog', disableClose: true});
        this.dialogRef.afterClosed()
            .subscribe((okSelected) => {
                    if (okSelected) {
                        this.chartInkService.deleteAll(this.getDisabledAlerts()).subscribe((data: any) => {
                            if (data && data.status === 'SUCCESS') {
                                this.alertService.success(data.status_message, true);
                                setTimeout(() => this.alertService.clear(), 3000);
                                this.getAlreadyAddedAlgos();
                            } else {
                                this.alertService.error(data.status_message);
                            }
                        });
                    }
                },
                error => {
                    this.alertService.error(error);
                });
    }

    disableAll() {
        this.dialogRef = this.dialog.open(this.disableAllDialog, {width: '500px', panelClass: 'my-dialog', disableClose: true});
        this.dialogRef.afterClosed()
            .subscribe((okSelected) => {
                    if (okSelected) {
                        this.chartInkService.disableAll(this.getAllAlgoIds())
                            .subscribe((data: any) => {
                                if (data && data.status === 'SUCCESS') {
                                    this.disableAlerts = true;
                                    this.alertService.success(data.status_message, true);
                                    setTimeout(() => this.alertService.clear(), 3000);
                                    this.getAlreadyAddedAlgos();
                                    this.form.markAsPristine();
                                } else {
                                    this.alertService.error(data.status_message);
                                }
                            });
                    }
                },
                error => {
                    this.alertService.error(error);
                });
    }

    private getRawValues() {
        (this.form.get('ca_cfg') as FormArray).controls.map((fg: FormGroup) => {
            fg.get('lp').setValue(parseInt(fg.get('lp').value, 0));
            fg.get('pp').setValue(parseInt(fg.get('pp').value, 0));
            fg.get('qt').setValue(parseInt(fg.get('qt').value, 0));
        });
        return this.form.getRawValue();
    }

    changed(element, event) {
        this.chartInkService.disable(element).subscribe((data: any) => {
                if (data && data.status === 'SUCCESS') {
                    this.getAlreadyAddedAlgos();
                    this.alertService.success(data.status_message, true);
                    setTimeout(() => this.alertService.clear(), 3000);
                } else {
                    this.alertService.error(data.status_message);
                }
            },
            error => {
                this.alertService.error(error);
                event.checked = !event.checked;
            });

    }

    private getAllAlgoIds() {
        const algoIds = [];
        (this.form.get('ca_cfg') as FormArray).controls.map((fg: FormGroup) => {
            algoIds.push(fg.get('aid').value);
        });
        return algoIds;
    }

    test(aid: string) {
        this.dialog.open(ChartInkAlgoTestComponent, {
            width: '40%',
            data: aid,
            panelClass: 'my-dialog',
            disableClose: true
        });
    }

    private getEnabledAlerts() {
        (this.form.get('ca_cfg') as FormArray).controls.forEach((fg: FormGroup) => {
            if (fg.get('act').value === true) {
                this.disableAlerts = false;
            }
        });
    }

    private getDisabledAlerts() {
        const algoIds = [];
        (this.form.get('ca_cfg') as FormArray).controls.forEach((fg: FormGroup) => {
            if (fg.get('act').value !== true) {
                algoIds.push(fg.get('aid').value);
                this.disabledAlert = false;
               // console.log(algoIds);
            }
        });
        if(algoIds.length < 1) {
            this.disabledAlert = true;
        }
        return algoIds;
    }
}
