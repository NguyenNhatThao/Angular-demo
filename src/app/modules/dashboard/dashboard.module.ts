import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardScreenComponent } from './pages/dashboard-screen/dashboard-screen.component';
import { DashboardRoutingRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/common/shared.module';

@NgModule({
  imports: [FlexLayoutModule, DashboardRoutingRoutingModule],
  declarations: [DashboardScreenComponent],
  exports: [],
})
export class DashboardModule {}
