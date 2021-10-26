import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../../service/alert.service';

@Component({
  selector: 'app-alert-loginscreens',
  templateUrl: './alert-loginscreens.component.html',
  styleUrls: ['./alert-loginscreens.component.scss']
})
export class AlertLoginscreensComponent implements OnInit {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

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
        this.message = message;
      });
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
}
