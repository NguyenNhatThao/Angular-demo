import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { CommonModule } from '@angular/common';
import { StudentService } from './student.service';

const materialLib = [
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatChipsModule,
  MatIconModule,
  MatTableModule,
];

const routes: Routes = [
    { path: '', component: StudentComponent }
  ];

@NgModule({
    providers: [StudentService],
  imports: [CommonModule, FlexLayoutModule, HttpClientModule, ...materialLib, RouterModule.forChild(routes)],
  declarations: [StudentComponent],
  exports: [],
})
export class StudentModule {}
