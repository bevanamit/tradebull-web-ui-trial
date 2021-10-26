import {Component, HostListener, OnInit} from '@angular/core';
import {format} from 'date-fns-tz';

@Component({
    selector: 'app-notifier',
    templateUrl: './notifier.component.html',
    styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {
    trialType: string;
    expiryDate: any;
    hideUserMenu = true;
    css: string;
    status: string;
    

    constructor() {
       // this.css = "[{originX:'start',originY:'bottom',overlayX:'end',overlayY:'top',offsetX:50,offsetY:27}]";
    }

    ngOnInit(): void {
        this.trialType = localStorage.getItem('pt');
        this.expiryDate = Number(localStorage.getItem('exp'));
        this.status = localStorage.getItem('sts');
        console.log(this.status);
        // this.expiryDate = this.expiryDate.getDate();
    }

    @HostListener('window:resize', ['$event'])
        onResize(event) {
        if(event.target.innerWidth <= '992')
        {
            this.hideUserMenu = true;
            //this.css = "[{originX:'end',originY:'bottom',overlayX:'end',overlayY:'bottom',viewportMargin:50}]";
        }
        else {
            this.hideUserMenu = true;
        }
    }
 

}
