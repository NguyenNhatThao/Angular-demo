import { NgModule } from '@angular/core';
import { EmployeeModule } from './employee/employee.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, EmployeeModule],
  exports: [],
})
export class DashboardModule {}
