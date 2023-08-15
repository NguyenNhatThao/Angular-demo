import {
    animate,
    state,
    style,
    transition,
    trigger,
  } from '@angular/animations';
  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { Router } from '@angular/router';
  
  @Component({
    selector: 'app-table-contain-table',
    templateUrl: './table-contain-table.component.html',
    styleUrls: ['./table-contain-table.component.scss'],
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({ height: '0px', minHeight: '0' })),
        state('expanded', style({ height: '*' })),
        transition(
          'expanded <=> collapsed',
          animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
        ),
      ]),
    ],
  })
  export class TableContainTableComponent implements OnInit {
    @Input() displayedColumns: string[] = [];
    @Input() dataSource: any;
    @Input() totalRecords = 0;
    @Input() role = '';
    @Input() headerColumns: any;
    @Input() headerChildColumns: any;
    @Input() displayedChildColumns: any;
    @Output() onSelectPage = new EventEmitter<any>();
  
    pageSize = 2;
    pageSizeOptions = [2, 3, 4, 5, 6];
  
    constructor(private router: Router) {}
  
    ngOnInit() {}
  
    getUserDetail(id: number) {
      this.router.navigate(['/user-management/student-detail/', id]);
    }
  
    onPageChange(event: any) {
      this.pageSize = event.pageSize;
      this.onSelectPage.emit({
        pageIndex: event.pageIndex,
        pageSize: this.pageSize,
        previousPageIndex: event.previousPageIndex,
      });
    }
  
    selectRow(row: any) {
      row.isExpanded = !row.isExpanded;
    }
  }
  