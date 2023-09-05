import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Constants } from '../../constants/constants';
import * as _ from 'lodash';
import { CustomDataSource } from './custom-data-source';

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
  @Input() dataSource!: CustomDataSource;
  @Input() totalRecords: any = 0;
  @Input() headerColumns: any;
  @Input() displayedChildColumns: any;
  @Input() typeMainColumns: any[] = [];
  @Output() onSelectPage = new EventEmitter<any>();
  @Output() routeToDetail = new EventEmitter<number>();
  @Output() expandedRow = new EventEmitter<number>();
  constants = Constants;
  dataSourceNotSearch: any;
  idsOfChildSearched: any[] = [];
  dataOfDataSource: any[] = [];
  dataOfChildData: any[] = [];

  pageSize = 2;
  pageSizeOptions = [2, 3, 4, 5, 6];

  constructor() {}

  ngOnInit() {}

  goToDetail(id: number) {
    this.routeToDetail.emit(id);
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.onSelectPage.emit({
      pageIndex: event.pageIndex,
      pageSize: this.pageSize,
    });
  }

  selectRow(id: any) {
    this.expandedRow.emit(id);
  }

  capitalize(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }
}
