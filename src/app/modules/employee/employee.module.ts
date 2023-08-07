import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/common/shared.module';
import { DisplayListEmployeeComponent } from './components/display-list-employee/display-list-employee.component';
import { StudentComponent } from './pages/student/student.component';
import { TeacherComponent } from './pages/teacher/teacher.component';

@NgModule({
  providers: [],
  imports: [FlexLayoutModule, HttpClientModule, SharedModule],
  declarations: [
    DisplayListEmployeeComponent,
    StudentComponent,
    TeacherComponent,
  ],
  exports: [],
})
export class EmployeeModule {}
