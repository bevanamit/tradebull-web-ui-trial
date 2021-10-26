import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomUtilsService} from '../helpers/dom-utils.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    mySidebar = document.getElementById('mySidebar');
    // @ViewChild('signup', {static: true}) signupFromLogin: ElementRef<HTMLElement>;

    constructor(private router: Router, private route: ActivatedRoute, private domUtils: DomUtilsService) {
    }

    ngOnInit(): void {

    }

    // ngAfterViewInit(): void {
    //     // if (this.route.snapshot.queryParamMap.get('from') === 'login') {
    //         asyncScheduler.schedule(() => this.domUtils.scrollIntoView(this.signupFromLogin.nativeElement), 300);
    //     // }
    // }

    login() {
        this.router.navigate(['/login']);
    }

    signup(value) {
        this.router.navigate(['/register'], {queryParams: {pt: value, prd: 15}});
    }

    onClick(element) { 
        // document.getElementById('img01').src = element.src;
        document.getElementById('modal01').style.display = 'block';
        const captionText = document.getElementById('caption');
        captionText.innerHTML = element.alt;
    }


// Toggle between showing and hiding the sidebar when clicking the menu icon

    w3_open() {
        if (this.mySidebar.style.display === 'block') {
            this.mySidebar.style.display = 'none';
        } else {
            this.mySidebar.style.display = 'block';
        }
    }

// Close the sidebar with the close button
    w3_close() {
        this.mySidebar.style.display = 'none';
    }
}
