import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './employee/student/student.component';
import { TeacherComponent } from './employee/teacher/teacher.component';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'student',
    component: StudentComponent,
    // canActivate: [AuthGuardService],
    // data: { screenId: '10223' },
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    // canActivate: [AuthGuardService],
    // data: { screenId: '10223' },
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
