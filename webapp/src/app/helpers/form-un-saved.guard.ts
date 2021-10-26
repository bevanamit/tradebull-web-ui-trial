import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FormUnSavedGuard implements CanDeactivate<any> {

    constructor() {
    }

    canDeactivate(component: any): boolean | Observable<boolean> {
        if (component.form && component.form.dirty) {
            return confirm('Changes done may not be saved. Are you sure you want to continue?');
        }
        return true;
    }
}
