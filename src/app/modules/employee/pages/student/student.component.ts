import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'age', 'score'];
  totalRecords = 0;
  pageSize = 2;
  listStudent: any;
  listClass: any;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    forkJoin([
      this.studentService.getStudent(),
      this.studentService.getClass(),
    ]).subscribe((res: any) => {
      if (res) {
        this.listStudent = res[0];
        this.dataSource.data = res[0].slice(0, this.pageSize);
        this.totalRecords = res[0].length;
        this.listClass = res[1];
        this.updateClassNumber();
      }
    });
    // this.studentService.getStudent().subscribe((studentList) => {
    //   if (studentList) {
    //     this.listStudent = studentList;
    //     this.dataSource.data = studentList.slice(0, this.pageSize);
    //     this.totalRecords = studentList.length;
    //   }
    // });
    // this.studentService.getClass().subscribe((classList) => {
    //   this.listClass = classList;
    // });
  }

  onPageChange(event: any) {
    this.studentService.getStudent().subscribe((studentList) => {
      if (studentList) {
        if (event.previousPageIndex < event.pageIndex) {
          this.getRecords(studentList, event.pageIndex + 1, event);
        } else {
          this.getRecords(studentList, event.pageIndex, event);
        }
      }
    });
  }

  getRecords(studentList: any, startIndex: number, event: any) {
    if (event.pageIndex + event.pageSize < this.totalRecords) {
      this.dataSource.data = studentList.slice(
        startIndex,
        event.pageIndex + event.pageSize
      );
    } else {
      this.dataSource.data = studentList.slice(startIndex, this.totalRecords);
    }
  }

  updateClassNumber() {
    console.log(this.listClass);
    console.log(this.listStudent);
  }
}
