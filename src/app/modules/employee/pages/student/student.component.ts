import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getData().subscribe((studentList) => {
      if (studentList) {
        this.dataSource.data = studentList.slice(0, this.pageSize);
        this.totalRecords = studentList.length;
      }
    });
  }

  onPageChange(event: any) {
    this.studentService.getData().subscribe((studentList)=> {
      if(studentList) {
        if(event.previousPageIndex < event.pageIndex) {
          this.getRecords(studentList, event.pageIndex+1, event);
        } else {
          this.getRecords(studentList, event.pageIndex, event);
        }
      }
    })
  }

  getRecords(studentList: any, startIndex: number, event: any) {
    if(event.pageIndex + event.pageSize < this.totalRecords) {
      this.dataSource.data = studentList.slice(startIndex, (event.pageIndex + event.pageSize));
    } else {
      this.dataSource.data = studentList.slice(startIndex, this.totalRecords);
    } 
  }
}
