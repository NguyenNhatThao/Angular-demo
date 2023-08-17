import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserManagementService } from '../../user-management.service';
import { ScoreStatusPipe } from 'src/app/shared/pipes/score.pipe';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherList implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'name', 'classes', 'edit'];
  displayedChildColumns: string[] = ['name', 'age', 'score', 'class'];
  headerChildColumns: string[] = ['Name', 'Age', 'Score', 'Class'];
  totalRecords = 0;
  pageSize = 2;
  scoreStattusPipe = new ScoreStatusPipe();

  constructor(private userManagementService: UserManagementService) {}

  ngOnInit() {
    this.userManagementService.getAllTeacher().subscribe((res:any)=> {
      if(res) {
        this.totalRecords = res.length;
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize });
      }
    })
  }

  onPageChange(event: any) {
    this.userManagementService
      .getPagedData('teachers', event.pageIndex, event.pageSize)
      .subscribe((res) => {
        if (res) {
          this.dataSource.data = res;
          // this.getClassesOfTeacher();
          this.getClassesTeacher();
        }
      });
  }

  getClassesTeacher() {
    this.dataSource.data.forEach((teacher: any) => {
      teacher.classes = '';
      teacher.listStudent = [];
      teacher.listClass.forEach((classId: number) => {
        this.userManagementService.getClassOfTeacher(classId).subscribe((theClass: any) => {
          if (theClass) {
            if (teacher.classes) {
              teacher.classes =
                teacher.classes.concat(
                  ', ',
                  theClass.subject
                );
            } else {
              teacher.classes = theClass.subject;
            }
          }
        });
        this.userManagementService.getStudentsOfClass(classId).subscribe((students: any)=> {
          teacher.listStudent = teacher.listStudent.concat(...students);
        })
      })
    })
  }
}
