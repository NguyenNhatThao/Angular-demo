import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardScreenComponent } from './pages/dashboard-screen/dashboard-screen.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardScreenComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('../employee/employee.module').then((em) => em.EmployeeModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class DashboardRoutingRoutingModule {}
