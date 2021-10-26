import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';


@Component({
    selector: 'app-core',
    templateUrl: './core.component.html',
    styleUrls: ['./core.component.scss'],
})
export class CoreComponent {

    currentUser: string;

    constructor(
        private router: Router, 
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute) {
        // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

     onToggle() {
        var x = document.getElementById("mytoggle");
        var l = document.getElementById("toggleIconLeft");
        var r = document.getElementById("toggleIconRight");
        if (x.style.display == "none" || x.style.display == "") {
          x.style.display = "block";
          x.style.transition = "transition: all 0.3s ease;"
          //x.style.position = "relative";
          r.style.display = "block";
          l.style.display = "none";
        } else {
          x.style.display = "none";
          r.style.display = "none";
          l.style.display = "block";
        }
      } 

      showMenu() {
        var s = document.getElementById("mattool3");
        console.log("MatTool: " + s.style.display);
        if(s.style.display == "none" || s.style.display== "" ) {
          s.style.display = "block";
        }
        else {
          s.style.display = "none";
        }
      }

}
