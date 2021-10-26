import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DomUtilsService {

    public scrollIntoView(element: HTMLElement) {
        if (!this.isElementVisible(element)) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }

    private isElementVisible(element: HTMLElement) {
        const {top, left, right, bottom} = element.getBoundingClientRect();
        return (top >= 0 && left >= 0 && bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

}
