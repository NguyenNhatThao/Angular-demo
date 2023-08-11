import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserManagementService } from '../../user-management.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherList implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'subject', 'list', 'action'];
  totalRecords = 0;
  pageSize = 1;
  listStudent: any;

  constructor(private UserManagementService: UserManagementService) {}

  ngOnInit() {
    forkJoin([
      this.UserManagementService.getStudent(),
      this.UserManagementService.getClass(),
    ]).subscribe((res: any) => {
      if (res) {
        this.listStudent = res[0];
        this.totalRecords = res[1].length;
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize });
      }
    });
  }

  onPageChange(event: any) {
    this.UserManagementService.getPagedData(
      'class',
      event.pageIndex,
      event.pageSize
    ).subscribe((res) => {
      this.dataSource.data = res;
      this.getStudentsOfClass();
    });
  }

  getStudentsOfClass() {
    this.dataSource.data.forEach((theClass: any) => {
      theClass.list = [];
      this.listStudent.forEach((theStudent: any) => {
        if (theClass.students.indexOf(theStudent.id) > -1) {
          theClass.list.push(theStudent.name);
        }
      });
    });
  }
}
