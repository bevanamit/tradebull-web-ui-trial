import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AlertService} from '../service/alert.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
 public orderID: string;
 txnToken: string;
 amt: string;
 public txnStatus: string;
 public txnMessage: string;
 public notify: string;
 public loading: boolean;
 public custID: string;
 public pt: string;
 public pt_cost: string;

    constructor(private http: HttpClient,
        public alertService: AlertService) {
            // this.pay();
            // this.custID = localStorage.getItem('ordId');
            // console.log("Cust ID : " + localStorage.getItem('ordId'));
             
    }

initiatePayment(): Observable<any> {
this.pt = localStorage.getItem('pt_temp');
this.pt_cost = localStorage.getItem('pt_cost');
console.log(this.pt + this.pt_cost);
    return this.http.post(`/tb/ui/v1/actions/payments/init`, {
            "pt"  : this.pt,
            "prd" : 1,
            "ptt" : {
                "pc" : "PAYTM"
            },
            "pt_amt" : this.pt_cost
    });
}

transactionStatus(): Observable<any> {  
    this.custID = localStorage.getItem('ordId');
    console.log("Order ID in paymnt ser: " + localStorage.getItem('ordId'));
    return this.http.post(`/tb/ui/v1/actions/payments/status`, {
        "co_id": this.custID,
        "pt"  : this.pt,
            "prd" : 1,
            "ptt" : {
                "pc" : "PAYTM"
            },
            "pt_amt" : this.pt_cost
    });
    
}



     pay() {
         
        this.initiatePayment().subscribe((data: any) => {
            this.orderID = data.response.t_id;
        this.txnToken = data.response.ppr.body.txnToken;
        this.amt = data.response.pt_amt;
      },
      error => {
        this.alertService.error(error);
        console.log(error);
      }
      );
    }

//   getStatus(paymentStatus: any){
//       this.txnStatus = paymentStatus['STATUS'];
//       this.txnMessage = paymentStatus['RESPMSG'];
//       if(this.txnStatus === "TXN_SUCCESS"){
//         this.alertService.success(this.txnMessage, true);
//         setTimeout(() => this.alertService.clear(), 5000);
//       }
//       else {
//         this.alertService.error(this.txnMessage, true);
//         this.loading
//        // setTimeout(() => this.alertService.clear(), 10000);
//       }
      
//   }

  getCustID(id: any){
     localStorage.setItem('ordId',id);
      console.log("CutomerID form local " + localStorage.getItem('ordId'));
  }

  notifyMerchant(eventName: any, data: any){
      this.notify = data.message;
      this.alertService.error(this.notify, true);
      setTimeout(() => this.alertService.clear(), 4000);
  }

  getuserSts() {
    return this.http.get(`/tb/ui/v1/actions/users/sts`);
}

}


