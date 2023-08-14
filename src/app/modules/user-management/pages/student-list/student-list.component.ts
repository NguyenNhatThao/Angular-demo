import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { UserManagementService } from '../../user-management.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentList implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'age', 'score', 'class', 'edit'];
  totalRecords = 0;
  pageSize = 1;
  listClass: any;

  constructor(private userManagementService: UserManagementService) {}

  ngOnInit() {
    forkJoin([
      this.userManagementService.getAllStudent(),
      this.userManagementService.getAllClass(),
    ]).subscribe((res: any) => {
      if (res) {
        this.listClass = res[1];
        this.totalRecords = res[0].length;
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize });
      }
    });
  }

  onPageChange(event: any) {
    this.userManagementService
      .getPagedData('students', event.pageIndex, event.pageSize)
      .subscribe((res) => {
        this.dataSource.data = res;
        this.updateClassNumber();
      });
  }

  updateClassNumber() {
    this.dataSource.data.forEach((theStudent: any) => {
      let numberClassOfStudent = 0;
      this.listClass.forEach((theClass: any) => {
        if (theClass.students.indexOf(theStudent.id) > -1) {
          numberClassOfStudent++;
        }
      });
      theStudent.class = numberClassOfStudent;
    });
  }
}
