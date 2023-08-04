import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeeModule } from '../employee/employee.module';
import { DashboardScreenComponent } from './dashboard-screen/dashboard-screen.component';

@NgModule({
  imports: [CommonModule, EmployeeModule, FlexLayoutModule],
  declarations: [DashboardScreenComponent],
  exports: [],
})
export class DashboardModule {}
