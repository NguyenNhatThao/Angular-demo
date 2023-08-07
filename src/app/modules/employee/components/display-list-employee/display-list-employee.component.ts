import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-display-list-employee',
  templateUrl: './display-list-employee.component.html',
})
export class DisplayListEmployeeComponent implements OnInit {
  @Input() displayedColumns: String[] = [];
  @Input() dataSource: any;
  @Input() totalRecords = 0;
  @Output() onSelectPage = new EventEmitter<any>();

  pageSize = 2;

  constructor() {}

  ngOnInit() {}

  // onPageChange(event: any) {
  //   this.pageSize = event.pageSize;
  //   this.onSelectPage.emit({
  //     pageIndex: event.pageIndex,
  //     pageSize: this.pageSize,
  //   });
  // }
}
