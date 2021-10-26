import {DataSource} from '@angular/cdk/table';
import {CollectionViewer, SelectionModel} from '@angular/cdk/collections';
import {asyncScheduler, BehaviorSubject, Observable} from 'rxjs';

export class AppDataSource<T> extends DataSource<T> {
    dataSource: BehaviorSubject<T[]>;
    private selection = new SelectionModel(true, []);

    constructor(data: T[]) {
        super();
        this.dataSource = new BehaviorSubject<T[]>(data);
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSource;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSource.complete();
    }

    update(data: T[], clearSelection = true): void {
        asyncScheduler.schedule(() => {
            this.dataSource.next(data);
            if (clearSelection) {
                this.selection.clear();
            }
        });
    }

    isSelected(row) {
        return this.selection.isSelected(row);
    }

    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.value.forEach(row => this.selection.select(row));
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.value.length;
        return (numSelected && numRows) && numSelected === numRows;
    }

    isAnySelected() {
        return this.selection.selected.length;
    }

    toggleRow(row) {
        this.selection.toggle(row);
    }

    clearSelection() {
        this.selection.clear();
    }

    selectedRows() {
        return this.selection.selected;
    }
}
