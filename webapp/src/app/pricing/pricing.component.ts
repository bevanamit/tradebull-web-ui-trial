import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {Price, Pricing, header, Header} from '../common/pricing';
import {list,priceList, pinfo} from '../../assets/data/pricing';
import {ActivatedRoute, Router} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentService} from '../service/payment.service';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  pricingForm: FormGroup;
  price6: Pricing[] = Price; 
  header1: Header[] = header;
  public PricingList: BehaviorSubject<Pricing[]> = new BehaviorSubject<Pricing[]>([]);
  monthlyPlan: String[];
  public Header: BehaviorSubject<Header[]> = new BehaviorSubject<Header[]>([]);
  public priceList = priceList;
  public list = list;
  public info = pinfo;
  public planName: string;
  public planType: string = "MONTHLY";
  public plan: String;
  public plancost: string;
  public planDur: number = 1;
  public discountPer: number = 0;
  public pt: string;
  public clear: boolean = false;

  constructor(public paymentService: PaymentService,
    public alertService:AlertService,private router: Router, private dialog: MatDialog) { 
    
  }

  @ViewChild('paymentDialog', {static: true}) paymentDialog: TemplateRef<HTMLElement>;
  @ViewChild('freeTrial', {static: true}) freeTrial: TemplateRef<HTMLElement>;
  @ViewChild('freeSubscribed', {static: true}) freeSubscribed: TemplateRef<HTMLElement>
  dialogRef: MatDialogRef<HTMLElement>;

  ngOnInit(): void {
   //localStorage.setItem('pt', 'UNKNOWN');
   if(sessionStorage.getItem('cusId') !== null){
    this.paymentService.getuserSts()
        .subscribe((data:any) => {
          localStorage.setItem('pt', data.response.pt);
            
        }); 
   }
    
    this.pricingForm = new FormGroup({
      plan: new FormControl(false)
       });      
       console.log(this.planType);
    this.PricingList.next(this.price6.slice());
    this.Header.next(this.header1.slice());
    console.log(list);

   }

   onItemChange(type){
    console.log(" Value is : ", type );
    //console.log(this.list.length);
    this.planType = type;
    var cost;
    var m = [];
    var q = [];
    var y = [];
    for(let i= 1; i<(this.priceList.length); i++)
    {
      cost = this.priceList[i].col[1];
     // this.list[i].col[1];
     // console.log((this.list[i].col[1]).substring(1,this.list[i].col[1].length));
     if(type === 'MONTHLY'){
      const temp = parseInt(cost.substring(1,cost.length));
      this.list[i].col[1] = "₹".concat((((temp * 1)* (100 - this.discountPer))/100).toString());
      m[i] = "₹".concat((((temp * 1)* (100 - this.discountPer))/100).toString());  
      console.log(m[i]);   
     }
     else if(type === 'QUARTERLY'){
      console.log(cost.substring(1,cost.length));
      const temp = parseInt(cost.substring(1,cost.length));
      this.list[i].col[1] = "₹".concat((((temp * 3)* (100 - this.discountPer))/100).toString());
      q[i] = "₹".concat((((temp * 3)* (100 - this.discountPer))/100).toString());  
      console.log(q[i]);    
     }
     else if(type === 'ANNUALY'){
      console.log(cost.substring(1,cost.length));
      const temp = parseInt(cost.substring(1,cost.length));
      this.list[i].col[1] = "₹".concat((((temp * 12)* (100 - this.discountPer))/100).toString());
      y[i] = "₹".concat((((temp * 12)* (100 - this.discountPer))/100).toString());   
      console.log(y[i]);  
     }
    }

    if(type === 'MONTHLY'){
      if(this.plan === 'Starter'){
        this.plancost = m[2];
        this.pt = (this.plan.toUpperCase()).concat('_').concat(type);
      }
      else if(this.plan === 'Basic') {
        this.plancost = m[3];
        this.pt = (this.plan.toUpperCase()).concat('_').concat(type);
      }
      else {
        this.plancost = "₹0";
        this.pt = (this.plan.substring(0,4).toUpperCase()).concat('_').concat('TIER');
      }
    }
    if(type === 'QUARTERLY'){
      if(this.plan === 'Starter')
      { 
        this.plancost = q[2];
        this.pt = (this.plan.toUpperCase()).concat('_').concat(type);
        console.log(this.pt);
      }
      else if(this.plan === 'Basic')
      {
        this.plancost = q[3];
        this.pt = (this.plan.toUpperCase()).concat('_').concat(type);
      }
      else {
        this.plancost = "₹0";
        this.pt = (this.plan.substring(0,4).toUpperCase()).concat('_').concat('TIER');
      }
    }
    if(type === 'ANNUALY'){
      if(this.plan === 'Starter')
      {
        this.plancost = y[2];
        this.pt = (this.plan.toUpperCase()).concat('_').concat(type);
      }
      else if(this.plan === 'Basic') {
        this.plancost = y[3];
        this.pt = (this.plan.toUpperCase()).concat('_').concat(type);
      }
      else {
        this.plancost = "₹0";
        this.pt = (this.plan.substring(0,4).toUpperCase()).concat('_').concat('TIER');
      }
    }
    localStorage.setItem('pt_temp', this.pt);
    localStorage.setItem('pt_cost', this.plancost.substring(2,this.plancost.length));
   // this.paymentService.pay();
 } 

   subscribe(tier, name: String, price) {
     console.log("Plan : " + tier);
     console.log("Name : " + name);
     console.log("Price : " + price);
     this.planName = name.substring(0, 11);
     this.plan = name;
     this.plancost = price;
     console.log("CustID " + sessionStorage.getItem('cusId'));
     if(sessionStorage.getItem('cusId') === null)
     {
      this.router.navigate(['/register'], {queryParams: {pt: tier, prd: 15}});
     }
     else if(tier === 'FREE_TIER'){
       this.dialogRef = this.dialog.open(this.freeSubscribed, {width: '800px', panelClass: 'my-dialog', disableClose: true});
      }
      else if(localStorage.getItem('pt') === 'UNKNOWN'){
        // this.dialogRef = this.dialog.open(this.freeTrial, {width: '800px', panelClass: 'my-dialog', disableClose: true});
        }
     else {
      this.dialogRef = this.dialog.open(this.paymentDialog, {width: '800px', panelClass: 'my-dialog', disableClose: true});
      console.log(name.substring(0,4));
      if(name.substring(0,4) === 'Free')
      {
        this.pt = (name.substring(0,4).toUpperCase()).concat('_').concat('TIER');
      } else {
        this.pt = (name.toUpperCase()).concat('_').concat(this.planType);
      }
     // console.log(this.pt);
     localStorage.setItem('pt_temp', this.pt);
     localStorage.setItem('pt_cost', this.plancost.substring(2,this.plancost.length));
     //this.paymentService.pay();
     }
    
   }

   onPriceChange(cost) {
     console.log(cost);

   }

   paymentRequest:  google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '1.00',
      currencyCode: 'INR',
      countryCode: 'IN'
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION']
};

onLoadPaymentData(event: CustomEvent<google.payments.api.PaymentData>): void{
  console.log('Load Payment Details ' + event.detail);
}

onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
  paymentData 
) => {
  console.log('pament Authorization' + paymentData);
  return {
    transactionState: 'SUCCESS'
  };
}

onError = (event: ErrorEvent): void => {
  console.log("Error " + event.error);
}

pay(): void {
  this.paymentService.pay();
 // this.router.navigate(['/home/settings/payment/paytm']);
  this.dialogRef.close(false);
 setTimeout(() => {this.router.navigate(['/home/settings/payment/paytm']);}, 3000);
}

updateFreeTier(){
  this.clear = true;
  this.dialogRef.close(true);
  console.log("Free Tier Subscribed");
  localStorage.setItem('pt', 'FREE_TIER');
}

@HostListener('window:click', ['$event'])
  onClick(event) {
    //this.clear = false;
   // console.log(this.dialog.);
    console.log("EventTriggered");
    if(localStorage.getItem('pt') === 'UNKNOWN') 
    {
      console.log("Routing.............." + window.location.href);
      this.router.navigate(['/home/settings/payment']);
      if(!this.clear){
        this.dialogRef = this.dialog.open(this.freeTrial, {width: '800px', panelClass: 'my-dialog', disableClose: true});
      } 
    }
  }


}
