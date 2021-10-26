import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-settings',
  templateUrl: './customer-settings.component.html',
  styleUrls: ['./customer-settings.component.scss']
})
export class CustomerSettingsComponent implements OnInit {

  constructor(private router: Router) { }   

  ngOnInit(): void {
     const x = document.getElementById("pricing");
    
    const url = window.location.href;
    console.log(url.substring(url.length - 7));
    if(url.substring(url.length - 7) === 'payment'){
      x.style.display = "block";
    };
    //x.style.display = "none";
  }

  redirectBack() {
    this.router.navigate(['/home/IntraTrendingL1']);
  }

  pricing(data){
    console.log("Heloooooooooooo");
    const x = document.getElementById("pricing");
    if(data)
    {
    x.style.display = "block";
    }
    else {
      x.style.display = "none";
    }
    
  }
}
