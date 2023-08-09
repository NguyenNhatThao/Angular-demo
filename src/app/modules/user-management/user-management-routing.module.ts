import { NgModule } from '@angular/core';
import { StudentComponent } from './pages/student-list/student-list.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';

const routes: Routes = [
  { path: 'student', component: StudentComponent },
  { path: 'teacher', component: TeacherListComponent },
  { path: 'student-detail/:id', component: StudentDetailComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class UserManagementRoutingModule {}
