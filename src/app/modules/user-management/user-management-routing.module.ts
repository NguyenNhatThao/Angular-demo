import { NgModule } from '@angular/core';
import { StudentList } from './pages/student-list/student-list.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetail } from './pages/student-detail/student-detail.component';
import { TeacherList } from './pages/teacher-list/teacher-list.component';
import { TeacherDetail } from './pages/teacher-detail/teacher-detail.component';
import { NewTeacher } from './pages/new-teacher/new-teacher.component';
import { NewStudent } from './pages/new-student/new-student.component';

const routes: Routes = [
  { path: 'student', component: StudentList },
  { path: 'teacher', component: TeacherList },
  { path: 'student-detail/:id', component: StudentDetail },
  { path: 'teacher-detail/:id', component: TeacherDetail },
  { path: 'new-student', component: NewStudent },
  { path: 'new-teacher', component: NewTeacher },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class UserManagementRoutingModule {}
