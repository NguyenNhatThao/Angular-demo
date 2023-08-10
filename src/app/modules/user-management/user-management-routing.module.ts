import { NgModule } from '@angular/core';
import { StudentList } from './pages/student-list/student-list.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetail } from './pages/student-detail/student-detail.component';
import { TeacherList } from './pages/teacher-list/teacher-list.component';

const routes: Routes = [
  { path: 'student', component: StudentList },
  { path: 'teacher', component: TeacherList },
  { path: 'student-detail/:id', component: StudentDetail },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class UserManagementRoutingModule {}
