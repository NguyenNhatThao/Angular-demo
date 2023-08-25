import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserManagementService } from '../../user-management.service';
import { ScoreStatusPipe } from 'src/app/shared/pipes/score.pipe';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Constants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherList implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'classes', 'edit'];
  typeColumns = ['number', 'string', 'string', Constants.EDIT];
  displayedChildColumns: string[] = ['name', 'age', 'score', 'class'];
  totalRecords = 0;
  pageSize = 2;
  scoreStattusPipe = new ScoreStatusPipe();
  listTeacher = [];
  listClass = [];
  listStudent = [];
  studentMapByClassId = new Map();
  classMapByClassId = new Map();

  constructor(
    private userManagementService: UserManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    forkJoin([
      this.userManagementService.getAllTeacher(),
      this.userManagementService.getAllClass(),
      this.userManagementService.getAllStudent(),
    ]).subscribe((res: any) => {
      if (res) {
        this.listTeacher = res[0];
        this.listClass = res[1];
        this.listStudent = res[2];
        this.totalRecords = res[0].length;
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize });
      }
    });
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    this.dataSource.data = this.listTeacher.slice(
      startIndex,
      startIndex + event.pageSize
    );
    this.getInfoOfTeachers();
  }

  getListStudentInfo() {
    // student1 - classA, student2 - classB, student3 - classA
    this.listStudent.forEach((student: any) => {
      let studentList: any[] =
        this.studentMapByClassId.get(parseInt(student.selectedClass)) || [];
      this.studentMapByClassId.set(parseInt(student.selectedClass), [
        ...studentList,
        student,
      ]);
    });
    this.listClass.forEach((theClass: any) => {
      this.classMapByClassId.set(theClass.id, theClass.name);
      let listStudentOfClass = this.studentMapByClassId.get(
        parseInt(theClass.id)
      );
      listStudentOfClass = listStudentOfClass.map((student: any) => {
        student.class = theClass.name;
        return student;
      });
      this.studentMapByClassId.set(parseInt(theClass.id), listStudentOfClass);
    });
  }

  getInfoOfTeachers() {
    this.getListStudentInfo();
    this.dataSource.data.forEach((teacher: any) => {
      teacher.childDataSource = [];
      teacher.classes = '';
      teacher.listClass.forEach((classId: any) => {
        teacher.childDataSource = teacher.childDataSource.concat(
          ...this.studentMapByClassId.get(parseInt(classId))
        );
        teacher.classes = teacher.classes
          ? teacher.classes.concat(
              ', ',
              this.classMapByClassId.get(parseInt(classId))
            )
          : this.classMapByClassId.get(parseInt(classId));
      });
    });
  }

  getTeacherDetail(id: number) {
    this.router.navigate(['/user-management/teacher-detail/', id]);
  }

  createNewTeacher() {
    this.router.navigate(['/user-management/new-teacher']);
  }

  onChangeSearchTeacher($event: any) {}

  onChangeSearchStudent($event: any) {}
}
