import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserManagementService } from '../../user-management.service';
import { ScoreStatusPipe } from 'src/app/shared/pipes/score.pipe';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Constants } from 'src/app/shared/constants/constants';
import { CustomDataSource } from 'src/app/shared/components/custom-data-source';
import * as _ from 'lodash';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherList implements OnInit {
  dataSource: CustomDataSource = new CustomDataSource();
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
  searchName: any;
  curDataSource: any;
  curDataSourceFitered: any[] = [];

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
        // this.listTeacher = res[0];
        this.curDataSource = res[0];
        this.listClass = res[1];
        this.listStudent = res[2];
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize });
        this.totalRecords = res[0].length;
      }
    });
  }

  onPageChange(event: any) {
    const startIndex = event.pageIndex * event.pageSize;
    // this.listTeacher.slice(
    //   startIndex,
    //   startIndex + event.pageSize
    // );
    this.userManagementService
      .getPagedData('teachers', event.pageIndex, event.pageSize)
      .subscribe((res: any) => {
        if (res) {
          this.listTeacher = res;
          this.dataSource.loadData(this.listTeacher);
          this.getInfoOfTeachers();
          // this.curDataSource = _.cloneDeep(res);
          this.onChangeSearchByName();
        }
      });
    this.curDataSourceFitered = this.curDataSourceFitered.slice(
      startIndex,
      startIndex + event.pageSize
    );
  }

  getListStudentInfo() {
    this.studentMapByClassId = new Map();
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
    this.listTeacher.forEach((teacher: any) => {
      teacher.childDataSource = new CustomDataSource();
      // teacher.childDataSource = [];
      teacher.classes = '';
      let childList: any[] = [];
      teacher.listClass.forEach((classId: any) => {
        childList = childList.concat(
          ...this.studentMapByClassId.get(parseInt(classId))
        );
        teacher.classes = teacher.classes
        ? teacher.classes.concat(
          ', ',
          this.classMapByClassId.get(parseInt(classId))
          )
          : this.classMapByClassId.get(parseInt(classId));
      });
      teacher.childDataSource.loadData(childList);
    });
    this.curDataSourceFitered = _.cloneDeep(this.listTeacher);
  }

  getTeacherDetail(id: number) {
    this.router.navigate(['/user-management/teacher-detail/', id]);
  }

  createNewTeacher() {
    this.router.navigate(['/user-management/new-teacher']);
  }

  onChangeSearchByName() {
    const listTeacher = _.cloneDeep(this.listTeacher).filter((teacher: any) => {
      if (
        this.searchName &&
        teacher.name.toLowerCase().includes(this.searchName.toLowerCase())
      ) {
        teacher.isHighlight = true;
      } else {
        teacher.isHighlight = false;
      }
      return this.searchStudent(teacher) || teacher.isHighlight;
    });
    if (!this.searchName) {
      this.teacherFilteredWithCur();
      this.dataSource.loadData(this.curDataSourceFitered);
    } else {
      this.dataSource.loadData(listTeacher);
    }
  }

  searchStudent(teacher: any) {
    let hasStudentMatched = false;
    teacher.childDataSource.connect().subscribe((listChild: any) => {
      if (listChild) {
        listChild.forEach((student: any) => {
          if (
            this.searchName &&
            student.name.toLowerCase().includes(this.searchName?.toLowerCase())
          ) {
            student.isHighlight = true;
            teacher.isExpanded = true;
            hasStudentMatched = true;
          } else {
            student.isHighlight = false;
          }
        });
      }
    });
    return hasStudentMatched;
  }

  onExpandedRow(id: number) {
    this.curDataSource.forEach((teacher: any) => {
      if (teacher.id === id) {
        teacher.isExpanded = !teacher.isExpanded;
      }
    });
  }

  teacherFilteredWithCur() {
    this.curDataSource.forEach((teacher: any) => {
      this.curDataSourceFitered.forEach((teacherFiltered: any) => {
        if (teacher.id === teacherFiltered.id) {
          teacherFiltered.isExpanded = teacher.isExpanded;
        }
      });
    });
  }
}
