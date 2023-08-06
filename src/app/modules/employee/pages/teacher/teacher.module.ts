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
import { TeacherComponent } from './teacher.component';

const materialLib = [
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatChipsModule,
  MatIconModule,
  MatTableModule,
];

const routes: Routes = [
    { path: '', component: TeacherComponent }
  ];

@NgModule({
  imports: [FlexLayoutModule, HttpClientModule, ...materialLib, RouterModule.forChild(routes)],
  declarations: [TeacherComponent],
  exports: [],
})
export class TeacherModule {}
