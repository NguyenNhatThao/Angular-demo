import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss'],
})
export class CommonTableComponent implements OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any;
  @Input() totalRecords = 0;
  @Input() role = '';
  @Input() headerColumns: any;
  @Input() hasPaging = true;
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
}
