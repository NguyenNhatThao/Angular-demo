import { NgModule } from '@angular/core';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

const materialLib = [
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatChipsModule,
  MatIconModule,
  MatTableModule,
];

@NgModule({
  imports: [FlexLayoutModule, HttpClientModule, ...materialLib],
  declarations: [StudentComponent, TeacherComponent],
  exports: [],
})
export class EmployeeModule {}
