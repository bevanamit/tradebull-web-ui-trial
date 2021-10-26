import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormGroup} from '@angular/forms';
import {ChartInkModel} from '../../models/chart-ink';
import {ChartInkService} from '../../service/chart-ink.service';
import {AlertService} from '../../service/alert.service';

@Component({
    selector: 'app-chart-ink-algo-add',
    templateUrl: './chart-ink-algo-add.component.html',
    styleUrls: ['./chart-ink-algo-add.component.scss']
})
export class ChartInkAlgoAddComponent implements OnInit, AfterViewInit {
    update = false;
    alertForm: FormGroup;
    @ViewChild('alertName', {static: true}) alertNameInput: ElementRef<HTMLInputElement>;

    constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, public dialog: MatDialogRef<ChartInkAlgoAddComponent>,
                private chartInkService: ChartInkService, private alertService: AlertService) {
    }

    ngOnInit(): void {
        const chartInkModel = new ChartInkModel();
        this.alertForm = chartInkModel.getForm();
        if (this.dialogData.edit) {
            this.update= true;
            (this.dialogData.form.get('ca_cfg') as FormArray).controls.map((control: FormGroup) => {
                if (control.get('aid').value === this.dialogData.id) {
                    this.alertForm.setValue(control.value);
                }
            });
        }
    }

    ngAfterViewInit(): void {
        this.alertNameInput.nativeElement.focus();
    }

    SaveAlert() {
        this.chartInkService.update(this.getRawValues())
            .subscribe((data: any) => {
                if (data && data.status === 'SUCCESS') {
                    this.alertService.success(data.status_message, true);
                    setTimeout(() => this.alertService.clear(), 3000);
                    if (this.dialogData.edit) {
                        (this.dialogData.form.get('ca_cfg') as FormArray).controls.map((control: FormGroup) => {
                            if (control.get('aid').value === this.dialogData.id) {
                                control.setValue(this.alertForm.value);
                            }
                        });
                    } else {
                        (this.dialogData.form.get('ca_cfg') as FormArray).push(this.alertForm);
                    }
                    this.dialog.close();
                } else {
                    this.alertService.error(data.status_message);
                }
            }, error => {
                this.alertService.error(error);
            });
    }

    private getRawValues() {
        // this.alertForm.get('lp').setValue(parseInt(this.alertForm.get('lp').value, 1));
        // this.alertForm.get('pp').setValue(parseInt(this.alertForm.get('pp').value, 1));
        // this.alertForm.get('qt').setValue(parseInt(this.alertForm.get('qt').value, 0));
        this.alertForm.get('ada').setValue(false);
        this.alertForm.get('ads').setValue(false);
        return this.alertForm.getRawValue();
    }

    close() {
        this.dialog.close();
        this.dialog = null;
    }
}
