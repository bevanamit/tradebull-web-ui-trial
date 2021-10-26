import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../../service/alert.service';
import { PaymentService} from '../../../service/payment.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {
  public txnStatus: string;
  public txnMessage:string;
  public msg: boolean = false;

  constructor(private paymentService:PaymentService,
    private alertService:AlertService) { 
    console.log("The order ID in status: " + localStorage.getItem('ordId'));
    this.status();
  }

  ngOnInit(): void {
    
  }

status() {
  console.log("subscribingggggggg");
  this.paymentService.transactionStatus().subscribe((data: any) => {
    console.log(data);
    this.txnStatus = data.response.pts.body.resultInfo.resultStatus;
    this.txnMessage = data.response.pts.body.resultInfo.resultMsg;
    if(this.txnStatus === "TXN_SUCCESS"){
      this.msg = true;
      this.alertService.success("Transaction Successful");
    }
    else {
      this.alertService.error(this.txnMessage);
    }
    
 },
 error => {
     this.alertService.error(error);
     console.log(error);
 }
)
}

}
