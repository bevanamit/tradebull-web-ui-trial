import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  currentUser: string;

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
    // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  // tslint:disable-next-line:typedef
  onExpand() {
    var x = document.getElementById('mytoggle');
    if(x.style.display == 'block' || x.style.display == "")
    { 
      x.style.display = 'none';
    }
    
  
  }

}
