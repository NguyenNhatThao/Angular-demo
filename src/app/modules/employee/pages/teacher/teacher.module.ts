import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { EmployeeModule } from '../../employee.module';

const routes: Routes = [{ path: '', component: TeacherComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), EmployeeModule],
  declarations: [],
  exports: [],
})
export class TeacherModule {}
