import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutingRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  imports: [FlexLayoutModule, DashboardRoutingRoutingModule],
  declarations: [DashboardComponent],
  exports: [],
})
export class DashboardModule {}
