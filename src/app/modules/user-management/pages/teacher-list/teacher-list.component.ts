import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserManagementService } from '../../user-management.service';
import { ScoreStatusPipe } from 'src/app/shared/pipes/score.pipe';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherList implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'classes', 'edit'];
  displayedChildColumns: string[] = ['name', 'age', 'score', 'class'];
  totalRecords = 0;
  pageSize = 2;
  scoreStattusPipe = new ScoreStatusPipe();
  listTeacher = [];
  listClass = [];
  listStudent = [];
  studentMap = new Map();
  classMap = new Map();

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
    // this.getClassOfTeacher();
    this.getInfoOfTeachers();
  }

  // getClassOfTeacher() {
  //   this.dataSource.data.forEach((teacher: any) => {
  //     teacher.listStudent = [];
  //     const listClass: any[] = [];
  //     this.listClass.forEach((theClass: any) => {
  //       if (teacher.listClass.includes(theClass.id)) {
  //         listClass.push(theClass);
  //         const studentsOfClass = this.getStudentsOfClass(theClass);
  //         teacher.listStudent.push(...studentsOfClass);
  //       }
  //     });
  //     teacher.classes = listClass
  //       .map((theclass: any) => theclass.name)
  //       .join(', ');
  //   });
  // }

  getListStudentInfo() {
    this.listStudent.forEach((student: any) => {
      let studentList: any[] = this.studentMap.get(parseInt(student.selectedClass)) || [];
      this.studentMap.set(parseInt(student.selectedClass), [...studentList, student]);
    })
    this.listClass.forEach((theClass: any) => {
      this.classMap.set(theClass.id, theClass.name);
      let listStudentOfClass = this.studentMap.get(parseInt(theClass.id));
      listStudentOfClass = listStudentOfClass.map((student: any) => {
        student.class = theClass.name;
        return student;
      });
      this.studentMap.set(parseInt(theClass.id), listStudentOfClass);
    })
  }

  getInfoOfTeachers() {
    this.getListStudentInfo();
    this.dataSource.data.forEach((teacher: any) => {
      teacher.listStudent = [];
      teacher.classes = '';
      teacher.listClass.forEach((classId: any)=> {
        teacher.listStudent = teacher.listStudent.concat(...this.studentMap.get(parseInt(classId)));
        teacher.classes = teacher.classes
                ? teacher.classes.concat(', ', this.classMap.get(parseInt(classId)))
                : this.classMap.get(parseInt(classId));
      })
    })
  }

  // getStudentsOfClass(theClass: any): any[] {
  //   let listStudent: any[] = [];
  //   this.listStudent.forEach((student: any) => {
  //     if (student.selectedClass === theClass.id) {
  //       listStudent.push({ ...student, class: theClass.name });
  //     }
  //   });
  //   return listStudent;
  // }

  // getClassesOfTeacher() {
  //   this.dataSource.data.forEach((teacher: any) => {
  //     teacher.classes = '';
  //     teacher.listStudent = [];
  //     teacher.listClass.forEach((classId: number) => {
  //       this.userManagementService
  //         .getClassOfTeacher(classId)
  //         .subscribe((theClass: any) => {
  //           if (theClass) {
  //             teacher.classes = teacher.classes
  //               ? teacher.classes.concat(', ', theClass.name)
  //               : theClass.name;
  //             this.getStudentsDetailOfTeacher(teacher, theClass);
  //           }
  //         });
  //     });
  //   });
  // }

  // getStudentsDetailOfTeacher(teacher: any, theClass: any) {
  //   this.userManagementService
  //     .getStudentsOfClass(theClass.id)
  //     .subscribe((students: any) => {
  //       if (students) {
  //         students = students.map((student: any) => {
  //           return { ...student, class: theClass.name };
  //         });
  //         teacher.listStudent = teacher.listStudent.concat(...students);
  //       }
  //     });
  // }

  getTeacherDetail(id: number) {
    this.router.navigate(['/user-management/teacher-detail/', id]);
  }

  createNewTeacher() {
    this.router.navigate(['/user-management/new-teacher']);
  }
}
