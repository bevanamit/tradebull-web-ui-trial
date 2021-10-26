import { getHtmlTagDefinition, viewClassName } from '@angular/compiler';
import { JSDocTagName } from '@angular/compiler/src/output/output_ast';
import {Component, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {NSE10, NSETop10} from '../common/constants';

declare const TradingView: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit {
  public symbol: string;
  nse10: NSETop10[] = NSE10; 
  public filteredShareMulti: BehaviorSubject<NSETop10[]> = new BehaviorSubject<NSETop10[]>([]);
  
 

  constructor() {
  }

  ngOnInit(): void {
    this.filteredShareMulti.next(this.nse10.slice());
  }

  initialise() {
  var i = document.getElementById('nav-li');
    i.className = "nav-link-active";
    this.symbol = this.nse10[0].id;
    console.log(this.symbol);
  }

  ngAfterViewInit() {
    this.initialise();
      this.tradingView();
   }

   ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

   tradingView() {
    new TradingView.widget({
      "container_id": "tradingview_81a86",
      "width": 840,
  "height": 440,
  "symbol": this.symbol,
  "interval": "5",
  "timezone": "exchange",
  "theme": "light",
  "style": "1",
  "toolbar_bg": "#f1f3f6",
  "hide_side_toolbar": false,
  "allow_symbol_change": true,
  "save_image": true,
  "allowtransparency": true,
  "fullscreenmode":true,
  "chart_properties": true,
  "studies": [
    "MASimple@tv-basicstudies"
  ],
  "locale": "in"

     });
   }

  getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
  }
  
  
   stock = (item: string) => {
      var ul = document.getElementById('nav-link');
      for(var i=0; i<ul.children.length; i++){
          var l = ul.children[i];
          var a = l.children[0];
          a.className = "nav-li";
      }
      ul.onclick = (event) => {
        var target = this.getEventTarget(event);
        var li = target.closest('li'); 
        target.className = "nav-link-active";

        // var nodes = Array.from( li.closest('ul').children);
        // var index = nodes.indexOf( li );
        // console.log(index);
        // var element = document.getElementById('nav-li');
        // element[index].className = "nav-link-active";
      }

     
      this.symbol = item;
      this.tradingView();  
          
   }

  //  refreshTradingInput(){
  //   var href = document.getElementById('tradingview_81a86');
  //   var h = href.innerHTML;
  //    href.innerHTML = h;
  //   console.log(this.symbol);
  //   document.getElementById('href').setAttribute('href', 'https://www.tradingview.com/symbols/'+ this.symbol + '/');
  //   document.getElementById('script').setAttribute('src', document.getElementById('script').getAttribute('src'));
  //   console.log(document.getElementById('href').getAttribute('href'));
  //}

}




