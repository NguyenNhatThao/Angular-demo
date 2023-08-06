import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardScreenComponent } from './pages/dashboard-screen/dashboard-screen.component';
import { DashboardRoutingRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, DashboardRoutingRoutingModule],
  declarations: [DashboardScreenComponent],
  exports: [],
})
export class DashboardModule {}
