import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  //msg: any;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.subscription = this.alertService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success alert-dismissible fade show';
            break;
          case 'error':
            message.cssClass = 'alert alert-danger alert-dismissible fade show';
            break;
        }

        //   this.msg = message.text;
        // if(this.msg.startsWith("The email address that you've entered is locked due to maximum authentication failures. Contact TradeBull Admin"))
        // {
        //   this.msg = message;
        // }
        // else if(this.msg.startsWith("The password that you've entered is incorrect."))
        // {
        //   this.msg = message;
        // } else if(this.msg.startsWith("The email address / phone number that you've entered doesn't match any account. Sign up for an account."))
        // {
        //   this.msg = message;
        // }
        // else {
        //   this.message = message;
        // }
        this.message = message;
        //console.log("Status" + message.text);
      });
  }

  closeAlert() {
    this.message = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
