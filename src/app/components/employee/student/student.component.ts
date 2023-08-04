import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['id', 'name', 'age'];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getData().subscribe((studentList) => {
      if (studentList) {
        this.dataSource.data = studentList;
      }
    });
  }
}
