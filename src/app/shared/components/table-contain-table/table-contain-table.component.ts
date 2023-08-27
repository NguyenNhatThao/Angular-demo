import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Constants } from '../../constants/constants';
import { cloneDeep } from 'lodash';
import * as _ from 'lodash';

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
export class TableContainTableComponent implements OnInit, OnChanges {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any;
  @Input() totalRecords = 0;
  @Input() headerColumns: any;
  @Input() displayedChildColumns: any;
  @Input() typeMainColumns: any[] = [];
  @Input() childsSearched: any;
  @Output() onSelectPage = new EventEmitter<any>();
  @Output() routeToDetail = new EventEmitter<number>();
  constants = Constants;
  dataSourceNotSearch: any;
  idsOfChildSearched: any[] = [];

  pageSize = 2;
  pageSizeOptions = [2, 3, 4, 5, 6];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['childsSearched'] && !changes['childsSearched'].firstChange) {
      this.idsOfChildSearched = this.getIdsOfChildSearched();
      this.searchData();
    }
  }

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

  selectRow(id: any, isExpanded?: boolean) {
    this.dataSource.data.forEach((data: any) => {
      if (data.id === id) {
        if (isExpanded !== undefined) {
          data.isExpanded = isExpanded;
        } else {
          data.isExpanded = !data.isExpanded;
          this.dataSourceNotSearch = cloneDeep(this.dataSource.data);
        }
      }
    })    
  }

  capitalize(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }

  searchData() {
    if (this.dataSourceNotSearch) {        
      this.dataSource.data = _.cloneDeep(this.dataSourceNotSearch);
    } else {
      this.dataSource.data = this.dataSource.data.map((data: any) => {return {...data, isExpanded: false}});
    }
    this.highlightChildRow();
    this.childsSearched.forEach((child: any) => {
      this.selectRow(child.parentId, true);
    })
  }

  highlightChildRow() {
    this.dataSource.data.forEach((parent: any) => {
      parent.childDataSource = parent.childDataSource
        .map((data: any) => { return {...data, isHighlight: this.idsOfChildSearched.includes(data.id)}});
      })
  }

  getIdsOfChildSearched() {
    const childSearched = this.childsSearched.map((childSearched: any) => { return childSearched.id});
    return [... new Set(childSearched)];
  }
}
