import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tradebullz-algorithms',
  templateUrl: './tradebullz-algorithms.component.html',
  styleUrls: ['./tradebullz-algorithms.component.scss']
})
export class TradebullzAlgorithmsComponent implements OnInit {
  switchColor: any = 'green';
  checkDailyRuns: string;
  runStatus = true;
  constructor() { }

  ngOnInit(): void {
  }

  changed(event) {
    event.checked ? this.checkDailyRuns = 'On' : this.checkDailyRuns = 'Off';
  }

  stopRun() {
    this.runStatus = false;
  }
}
