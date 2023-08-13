import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any;
  @Input() totalRecords = 0;
  @Input() role = '';
  @Output() onSelectPage = new EventEmitter<any>();

  pageSize = 1;
  pageSizeOptions = [1, 2, 3, 4, 10];

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
