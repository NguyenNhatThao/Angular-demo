import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-list-employee',
  templateUrl: './display-list-employee.component.html',
  styleUrls: ['./display-list-employee.component.scss'],
})
export class DisplayListEmployeeComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @Input() displayedColumns: String[] = [];
  @Input() dataSource: any;
  @Input() totalRecords = 0;
  @Output() onSelectPage = new EventEmitter<any>();

  pageSize = 2;
  pageSizeOptions = [2, 3, 4, 15];

  constructor(private router: Router) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  goToStudentDetail(id: number, name: String) {
    this.router.navigate(['/dashboard/student-detail/', id], {
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
