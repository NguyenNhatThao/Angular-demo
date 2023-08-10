import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardRoutingRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [FlexLayoutModule, DashboardRoutingRoutingModule, SharedModule],
  declarations: [DashboardComponent],
  exports: [],
})
export class DashboardModule {}
