import { NgModule } from '@angular/core';
import { EmployeeModule } from './employee/employee.module';
import { CommonModule } from '@angular/common';
import { ScreenManagementRoutingModule } from './screen-management-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    ScreenManagementRoutingModule,
    EmployeeModule,
    DashboardModule,
  ],
  exports: [],
})
export class ScreenManagementModule {}
