import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

export class ChartInkArray {
    ca_cfg: ChartInkModel[];

    constructor(data?: any) {
        if (data) {
            this.ca_cfg = data.map(algo => new ChartInkModel(algo));
        } else {
            this.ca_cfg = [];
        }
    }

    getForm() {
        return new FormGroup({
            ca_cfg: new FormArray(this.ca_cfg.map(mapping => mapping.getForm())),
        });
    }
}

export class ChartInkModel {
    aid: string;
    des: string;
    an: string;
    tt: string;
    lp: string;
    pp: string;
    qt: string;
    act: boolean;
    ada: boolean;
    ads: boolean;

    constructor(data?: any) {
        if (data) {
            this.aid = data.aid;
            this.des = data.des;
            this.tt = data.tt;
            this.an = data.an;
            this.lp = data.lp;
            this.pp = data.pp;
            this.qt = data.qt;
            this.act = data.act;
            this.ada = data.ada;
            this.ads = data.ads;
        } else {
            this.aid = '';
            this.des = '';
            this.tt = '';
            this.an = '';
            this.lp = '';
            this.pp = '';
            this.qt = '';
            this.act = false;
            this.ads = false;
            this.ada = false;
        }
    }

    getForm() {
        return new FormGroup({
            aid: new FormControl(this.aid),
            des: new FormControl(this.des, [Validators.maxLength(100)]),
            tt: new FormControl(this.tt, [Validators.required]),
            an: new FormControl(this.an, [Validators.required, Validators.maxLength(32)]),
            lp: new FormControl(this.lp, [Validators.required, Validators.min(0.001),
                Validators.max(100), Validators.pattern('^[0-9]\\d*(\\.\\d{1,3})?\\s*$')]),
            pp: new FormControl(this.pp, [Validators.required, Validators.min(0.001),
                Validators.max(100), Validators.pattern('^[0-9]\\d*(\\.\\d{1,3})?\\s*$')]),
            qt: new FormControl(this.qt, [Validators.required, Validators.min(1),
                Validators.max(10000000), Validators.pattern('^\\d*?\\d*$')]),
            ada: new FormControl(this.ada),
            ads: new FormControl(this.ads),
            act: new FormControl(this.act),
        });
    }
}
