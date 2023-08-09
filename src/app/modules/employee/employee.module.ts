import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/common/shared.module';
import { DisplayListEmployeeComponent } from './components/display-list-employee/display-list-employee.component';
import { StudentComponent } from './pages/student/student.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentService } from './pages/student/student.service';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';

const routes: Routes = [
  { path: 'student', component: StudentComponent },
  { path: 'teacher', component: TeacherComponent },
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('../employee/employee.module').then((em) => em.EmployeeModule),
  // },
  { path: 'student-detail/:id', component: StudentDetailComponent },
];
@NgModule({
  providers: [StudentService],
  imports: [FlexLayoutModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [
    DisplayListEmployeeComponent,
    StudentComponent,
    TeacherComponent,
    StudentDetailComponent,
  ],
  exports: [],
})
export class EmployeeModule {}
