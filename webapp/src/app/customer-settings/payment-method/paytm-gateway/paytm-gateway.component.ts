import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { PaymentService} from '../../../service/payment.service';
import {AlertService} from '../../../service/alert.service';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-paytm-gateway',
  templateUrl: './paytm-gateway.component.html',
  styleUrls: ['./paytm-gateway.component.scss']
})
export class PaytmGatewayComponent implements OnInit , AfterViewInit{
 public orderID: string;
 public txnToken: string;
 public amt: string;
 public loading: boolean = true;

  constructor(private paymentService: PaymentService,
    public alertService: AlertService,
    public router: Router) { 
      this.orderID = paymentService.orderID;
      this.txnToken = paymentService.txnToken;
      this.amt = paymentService.amt;
    }

  ngOnInit(): void {

  }


  ngAfterViewInit() {
    if(!this.orderID) {
      this.router.navigate(['/home/settings/payment']);
    }
    else {
      this.onScriptLoad();
    }

  }

   public onScriptLoad() {
      var r = this.router;
      var p = this.paymentService;
          var config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
            "orderId": this.orderID, /* updade order id */
            "token": this.txnToken, /* update token value */
            "tokenType": "TXN_TOKEN",
            "amount": this.amt /* update amount */
            },
            // "payMode": {
            //   "labels": {
            //     "pay": "UPI"
            //   }
            // },
            // "merchant":{
            //   "redirect": false
            // },
            "handler": {
              "notifyMerchant": function(eventName,data): void{
                console.log("eventName => ",eventName);
                console.log("data => ",data);
               // p.notifyMerchant(eventName, data);
                r.navigate(['/home/settings/payment']);
              },
              // "transactionStatus" : function transactionStatus(paymentStatus){
              //   console.log("paymentStatus => ",paymentStatus);
              //  p.getStatus(paymentStatus);               
              //  //window.location.href = "https://tradebullz.in:61987/#/home/settings/payment";
              //  window["Paytm"].CheckoutJS.close();
              //  r.navigate(['/home/settings/payment']);
              //  return paymentStatus;
              // }  
              
            }
          };

          if(window["Paytm"] && window["Paytm"].CheckoutJS){            
              window["Paytm"].CheckoutJS.init(config).then(function onSuccess() {
                // after successfully updating configuration, invoke JS Checkout
                p.getCustID(config.data.orderId);
                window["Paytm"].CheckoutJS.invoke();
            }).catch(function onError(error){
                console.log("error => ",error);
            });      
          }
          
            // window["Paytm"].CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
            //     // initialze configuration using init method 
            //     window["Paytm"].CheckoutJS.init(config).then(function onSuccess() {
            //         // after successfully updating configuration, invoke JS Checkout
            //         window["Paytm"].CheckoutJS.invoke();
            //         console.log("After init");
            //     }).catch(function onError(error){
            //         console.log("error => ",error);
            //     });
            // });
          }      
        
}



