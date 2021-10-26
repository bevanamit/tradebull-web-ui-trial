import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {
public section: number;
  constructor() { }

  ngOnInit(): void {
    this.section = parseInt(localStorage.getItem('section'));
  }

  show(choice){
    switch(choice){
      case 1: 
        this.section = 1;
        break;
      case 2:
        this.section = 2;
        break;
      case 3:
        this.section = 3;
        break;
      case 4:
        this.section = 4;
        break;
      case 5:
        this.section = 5;
        break;
    }
  }

}
