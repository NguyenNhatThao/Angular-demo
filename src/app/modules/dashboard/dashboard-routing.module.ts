import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardScreenComponent } from './pages/dashboard-screen/dashboard-screen.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardScreenComponent,
  },
  {
    path: 'student',
    loadChildren: () =>
      import('../employee/pages/student/student.module').then(
        (sm) => sm.StudentModule
      ),
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('../employee/pages/teacher/teacher.module').then(
        (tm) => tm.TeacherModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class DashboardRoutingRoutingModule {}
