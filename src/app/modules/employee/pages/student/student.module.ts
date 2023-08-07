import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentService } from './student.service';
import { EmployeeModule } from '../../employee.module';

const routes: Routes = [{ path: '', component: StudentComponent }];

@NgModule({
  providers: [StudentService],
  imports: [EmployeeModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [],
})
export class StudentModule {}
