import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChartInkService} from '../../service/chart-ink.service';
import {AlertService} from '../../service/alert.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {NSE, NSE100} from '../../common/constants';
import {SpinnerService} from '../../common/spinner/spinner.service';

@Component({
    selector: 'app-chart-ink-algo-test',
    templateUrl: './chart-ink-algo-test.component.html',
    styleUrls: ['./chart-ink-algo-test.component.scss']
})
export class ChartInkAlgoTestComponent implements OnInit {

    alertTestForm: FormGroup;
    inValidData = false;
    nse100: NSE100[] = NSE;
    titleStocks = [];
    public filteredShareMulti: BehaviorSubject<NSE100[]> = new BehaviorSubject<NSE100[]>([]);

    constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any, public dialog: MatDialogRef<ChartInkAlgoTestComponent>,
                private chartInkService: ChartInkService, private alertService: AlertService, private spinner: SpinnerService,
                private elRef: ElementRef) {
    }

    ngOnInit(): void {
        this.alertTestForm = new FormGroup({
            shareName: new FormControl('', [Validators.required]),
            searchString: new FormControl('')
        });
        this.filteredShareMulti.next(this.nse100.slice());
        this.alertTestForm.get('searchString').valueChanges
            .subscribe(() => {
                this.filterShares();
            });
    }

    close() {
        this.dialog.close();
        this.dialog = null;
    }

    testAlert() {
        this.chartInkService.test(this.getTestValues())
            .subscribe((data: any) => {
                if (data && data.status === 'SUCCESS') {
                    this.alertService.success(data.status_message, true);
                    setTimeout(() => this.alertService.clear(), 2000);
                    this.dialog.close();
                    this.getTestResults(data.response.altId, this.elRef);
                } else {
                    this.alertService.error(data.status_message);
                }
            }, error => {
                this.alertService.error(error);
            });
    }

    private getTestValues() {
        let selectedStocks = [];
        this.alertTestForm.get('shareName').value.map(stock => {
            selectedStocks.push(stock.id);
        });
        return {
            st: selectedStocks.toString(),
            aid: this.dialogData
        };
    }

    getTestResults(altId, elRef) {
        const progressRef = this.spinner.showProgress(elRef);
        this.chartInkService.getTestStatus(altId).subscribe((data: any) => {
            if (data && data.status === 'SUCCESS' && data.status_message === null) {
                setTimeout(() => this.getTestResults(altId, elRef), 3000);
            } else if (data && data.status === 'SUCCESS' && data.status_message !== null) {
                this.alertService.success(data.status_message, true);
                setTimeout(() => this.alertService.clear(), 3000);
            }
            this.spinner.detach(progressRef);
        }, error => {
            this.alertService.error(error);
        });
        this.spinner.detach(progressRef);
    }

    protected filterShares() {
        if (!this.nse100) {
            return;
        }
        let search = this.alertTestForm.get('searchString').value;
        if (!search) {
            this.filteredShareMulti.next(this.nse100.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filteredShareMulti.next(
            this.nse100.filter(nse => nse.name.toLowerCase().indexOf(search) > -1)
        );
    }
}
