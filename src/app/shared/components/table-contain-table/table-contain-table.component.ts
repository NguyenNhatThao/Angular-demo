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
import { CustomDataSource } from '../custom-data-source';

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
  @Input() totalRecords = 0;
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

  ngOnInit() {
    this.dataSource?.connect().subscribe((res: any) => {
      if (res) {
        this.dataOfDataSource = res;
        res.forEach((parent: any) => {
          parent.childDataSource?.connect().subscribe((child: any) => {
            if (child) {
              this.dataOfChildData.push(child);
            }
          });
        });
      }
    });
  }

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
    if (this.dataOfDataSource) {
      this.dataOfDataSource.forEach((data: any, index: number) => {
        if (id === data.id) {
          data.isExpanded = !data.isExpanded;
          data.childDataSource = new CustomDataSource();
          data.childDataSource.loadData(this.dataOfChildData[index]);
          this.dataSource.loadData(this.dataOfDataSource);
        }
      });
    }
    this.expandedRow.emit(id);
  }

  capitalize(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }
}
