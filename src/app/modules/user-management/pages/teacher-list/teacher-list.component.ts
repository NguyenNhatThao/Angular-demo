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
  displayedColumns: string[] = ['id', 'name', 'displayNameOfClasses'];
  headerColumns: string[] = ['', 'Name', 'Classes'];
  displayedChildColumns: string[] = ['name', 'age', 'score', 'class'];
  headerChildColumns: string[] = ['Name', 'Age', 'Score', 'Class'];
  totalRecords = 0;
  pageSize = 2;
  listStudent: any;

  constructor(private userManagementService: UserManagementService) {}

  ngOnInit() {
    forkJoin([
      this.userManagementService.getAllStudent(),
      this.userManagementService.getAllClass(),
    ]).subscribe((res: any) => {
      if (res) {
        this.listStudent = res[0];
        this.totalRecords = res[1].length;
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize });
      }
    });
  }

  onPageChange(event: any) {
    this.userManagementService
      .getPagedData('teachers', event.pageIndex, event.pageSize)
      .subscribe((res) => {
        if (res) {
          this.dataSource.data = res;
          this.getClassesOfTeacher();
        }
      });
  }

  getClassesOfTeacher() {
    this.dataSource.data.forEach((theTeacher: any) => {
      theTeacher.isExpanded = false;
      theTeacher.listStudent = [];
      theTeacher.displayNameOfClasses = '';
      theTeacher.classes.forEach((classId: any) => {
        this.userManagementService
          .getClassOfTeacher(classId)
          .subscribe((theClass: any) => {
            if (theClass) {
              if (theTeacher.displayNameOfClasses) {
                theTeacher.displayNameOfClasses =
                  theTeacher.displayNameOfClasses.concat(
                    ', ',
                    theClass.subject
                  );
              } else {
                theTeacher.displayNameOfClasses = theClass.subject;
              }
              this.getStudentsOfTeacher(theClass, theTeacher);
            }
          });
      });
    });
  }

  getStudentsOfTeacher(theClass: any, theTeacher: any) {
    this.userManagementService
      .getStudentsOfClass(theClass.id)
      .subscribe((listStudent: any[]) => {
        if (listStudent) {
          listStudent.forEach((student: any) => {
            theTeacher.listStudent.push(student);
            this.userManagementService
              .getClass(student.selectedClass)
              .subscribe((theClass: any) => {
                if (theClass) {
                  student.class = theClass.subject;
                }
              });
          });
        }
      });
  }
}
