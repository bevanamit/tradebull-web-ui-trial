import { Component, OnInit } from '@angular/core';
import { PaymentService} from '../../service/payment.service';
import {AlertService} from '../../service/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  orderID: string;
  txnToken: string;
  amt: string;


  // paymentRequest:  google.payments.api.PaymentDataRequest = {
  //     apiVersion: 2,
  //     apiVersionMinor: 0,
  //     allowedPaymentMethods: [
  //       {
  //         type: 'CARD',
  //         parameters: {
  //           allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
  //           allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
  //         },
  //         tokenizationSpecification: {
  //           type: 'PAYMENT_GATEWAY',
  //           parameters: {
  //             gateway: 'example',
  //             gatewayMerchantId: 'exampleGatewayMerchantId'
  //           }
  //         }
  //       }
  //     ],
  //     merchantInfo: {
  //       merchantId: '12345678901234567890',
  //       merchantName: 'Demo Merchant'
  //     },
  //     transactionInfo: {
  //       totalPriceStatus: 'FINAL',
  //       totalPriceLabel: 'Total',
  //       totalPrice: '1.00',
  //       currencyCode: 'INR',
  //       countryCode: 'IN'
  //     },
  //     callbackIntents: ['PAYMENT_AUTHORIZATION']
  // };

  // onLoadPaymentData(event: CustomEvent<google.payments.api.PaymentData>): void{
  //   console.log('Load Payment Details ' + event.detail);
  // }

  // onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
  //   paymentData 
  // ) => {
  //   console.log('pament Authorization' + paymentData);
  //   return {
  //     transactionState: 'SUCCESS'
  //   };
  // }

  onError = (event: ErrorEvent): void => {
    console.log("Error " + event.error);
  }

  constructor( public paymentService: PaymentService,
    public alertService:AlertService,
    public router:Router) { }

  ngOnInit(): void {
   // this.paymentService.pay();
  }

  pay(): void {
    this.router.navigate(['/home/settings/payment/paytm']);
   // setTimeout(() => {this.router.navigate(['/home/settings/payment/paytm']);}, 2000);
  }

}
