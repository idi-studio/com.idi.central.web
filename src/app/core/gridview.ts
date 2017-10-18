import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableRowClickEvent } from '@covalent/core';
import { PageEvent } from '@angular/material';

export class GirdView {

    table: TdDataTableService
    fromRow: number = 1
    pageNumber: number = 1

    public source: any[]
    public columns: ITdDataTableColumn[]
    public filteredData: any[]
    public filteredTotal: number = 0
    public clickable: boolean = true
    public selectable: boolean = false
    public searchTerm: string = ''
    public pageSize: number = 10
    public pageSizeOptions: number[] = [5, 10, 15, 20]
    public sortBy: string = 'id'
    public sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

    constructor(table: TdDataTableService) {
        this.table = table
    }

    public sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter()
    }

    public search(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.filter()
    }

    public page(e: PageEvent): void {
        this.pageNumber = e.pageIndex + 1;
        this.pageSize = e.pageSize;
        this.fromRow = e.pageIndex * e.pageSize + 1
        this.filter()
    }

    public bind(source: any[] = []) {
        this.source = source
        this.filter()
    }

    private filter(): void {
        let data = this.source

        let excludedColumns: string[] = this.columns.filter((column: ITdDataTableColumn) => {
            return ((column.filter === undefined && column.hidden === true) || (column.filter !== undefined && column.filter === false));
        }).map((column: ITdDataTableColumn) => { return column.name; })

        data = this.table.filterData(data, this.searchTerm, true, excludedColumns)
        this.filteredTotal = data.length

        data = this.table.sortData(data, this.sortBy, this.sortOrder)
        data = this.table.pageData(data, this.fromRow, this.pageNumber * this.pageSize)
        this.filteredData = data;
    }
}