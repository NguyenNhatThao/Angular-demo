import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserManagementService } from '../../user-management.service';
import { ScoreStatusPipe } from 'src/app/shared/pipes/score.pipe';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Constants } from 'src/app/shared/constants/constants';
import { CustomDataSource } from 'src/app/shared/components/table-contain-table/custom-data-source';
import * as _ from 'lodash';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherList implements OnInit {
  dataSource!: CustomDataSource;
  displayedColumns: string[] = ['id', 'name', 'classes', 'edit'];
  typeColumns = ['number', 'string', 'string', Constants.EDIT];
  displayedChildColumns: string[] = ['name', 'age', 'score', 'class'];
  searchName = '';
  totalRecords = 0;
  pageSize = 2;
  listTeacher = [];
  listClass = [];
  listStudent = [];
  studentMapByClassId = new Map();
  classMapByClassId = new Map();
  curDataSource: any;
  curDataSourceFiltered: any[] = [];

  constructor( private router: Router, private userManagementService: UserManagementService ) {
    this.dataSource = new CustomDataSource();
  }

  ngOnInit() {
    forkJoin([
      this.userManagementService.getAllTeacher(),
      this.userManagementService.getAllClass(),
      this.userManagementService.getAllStudent(),
    ]).subscribe((res: any) => {
      if (res) {
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
    this.userManagementService
      .getPagedData('teachers', event.pageIndex, event.pageSize)
      .subscribe((res: any) => {
        if (res) {
          this.listTeacher = res;
          this.dataSource.loadData(this.listTeacher);
          this.getInfoOfTeachers();
          this.onChangeSearchByName();
        }
      });
    this.curDataSourceFiltered = this.curDataSourceFiltered.slice(
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
    this.curDataSourceFiltered = _.cloneDeep(this.listTeacher);
  }

  getTeacherDetail(id: number) {
    this.router.navigate(['/user-management/teacher-detail/', id]);
  }

  createNewTeacher() {
    this.router.navigate(['/user-management/new-teacher']);
  }

  onChangeSearchByName() {
    this.dataSource.onChangeSearchByName(this.searchName, this.listTeacher, this.curDataSource, this.curDataSourceFiltered);
  }

  onExpandedRow(id: number) {
    let listChildData: any;
    this.listTeacher.forEach((teacher: any) => {
      if (teacher.id === id) {
        teacher.childDataSource.connect().subscribe((listChild: any) => {
          listChildData = listChild;
        })
      }
    });
    this.dataSource.onExpandedRow(id, this.curDataSource, this.listTeacher, listChildData);
  }
}
