import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any;
  @Input() totalRecords: any;
  @Output() onSelectPage = new EventEmitter<any>();

  pageSize = 1;
  pageSizeOptions = [1, 2, 3, 4, 15];

  constructor(private router: Router) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  getUserDetail(id: number, name: String) {
    this.router.navigate(['/dashboard/user-management/student-detail/', id], {
      queryParams: {
        name,
      },
    });
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
