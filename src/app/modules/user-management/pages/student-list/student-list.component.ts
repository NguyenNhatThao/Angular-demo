import { Component, OnInit } from '@angular/core';
import { StudentListService } from './student-list.service';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentList implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'age', 'score', 'class'];
  totalRecords = 0;
  pageSize = 1;
  listClass: any;

  constructor(private studentService: StudentListService) {}

  ngOnInit() {
    forkJoin([
      this.studentService.getStudent(),
      this.studentService.getClass(),
    ]).subscribe((res: any) => {
      if (res) {
        this.listClass = res[1];
        this.totalRecords = res[0].length;
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize });
      }
    });
  }

  onPageChange(event: any) {
    this.studentService
      .getPagedData(event.pageIndex, event.pageSize)
      .subscribe((res) => {
        this.dataSource.data = res;
        this.updateClassNumber();
      });
  }

  updateClassNumber() {
    this.dataSource.data.forEach((theStudent: any) => {
      let numberClassOfStudent = 0;
      this.listClass.forEach((theClass: any) => {
        if (theClass.students.indexOf(theStudent.name) > -1) {
          numberClassOfStudent++;
        }
      });
      theStudent.class = numberClassOfStudent;
    });
  }
}
