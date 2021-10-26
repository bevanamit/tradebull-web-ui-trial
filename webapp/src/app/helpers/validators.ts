import {FormControl, FormGroup} from '@angular/forms';
import {format} from 'url';
import {DatePipe} from '@angular/common';

export function confirmPassword() { // here we have the 'passwords' group
    return (group: FormGroup) => {
        const pass = group.get('passwd').value;
        const confirmPass = group.get('cnfmPasswd').value;

        return pass === confirmPass ? null : {confirmPassword: true};
    };
}

export function checkForFutureDates(ctrl: FormControl): any { // here we have the 'passwords' group
    const today = new Date();
    const maxDate = `${today.getFullYear() - 10}-${today.getMonth() + 1}-${today.getDate()}`;
    const formattedMaxDate = new Date(maxDate);
    const formattedDate = new Date(ctrl.value);
    if (formattedDate > formattedMaxDate) {
        return {checkForFutureDates: true};
    } else {
        return null;
    }
}

export function checkForPastDates(ctrl: FormControl): any { // here we have the 'passwords' group
    const today = new Date();
    const minDate = `${today.getFullYear() - 100}-${today.getMonth() + 1}-${today.getDate()}`;
    const formattedMinDate = new Date(minDate);
    const formattedDate = new Date(ctrl.value);
    if (formattedDate < formattedMinDate) {
        return {checkForPastDates: true};
    } else {
        return null;
    }
}

export function checkForInvalidYear(ctrl: FormControl): any { // here we have the 'passwords' group
    const year = new Date(ctrl.value).getFullYear();
    if (isNaN(year) || year > 9999 ) {
        return {checkForInvalidYear: true};
    } else {
        return null;
    }
}

export function checkspaceAtStartEnd(ctrl: FormControl): any {
    const stringCheck: string = ctrl.value;
    if (stringCheck && stringCheck.startsWith(' ')) {
        return {checkspaceAtStartEnd: true};
    }
    return null;
}

