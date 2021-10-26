import {Pipe, PipeTransform} from '@angular/core';
import {format} from 'date-fns-tz';

@Pipe({name: 'appDate'})
export class DatePipe implements PipeTransform {

    constructor() {
    }

    transform(value: Date, applyTimezone: boolean = true): string {
        return format(value, 'dd/MMM/yyyy');

    }
}
