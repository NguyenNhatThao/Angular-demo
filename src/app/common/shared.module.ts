import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ScoreStatusPipe } from './pipes/score.pipe';

const materialLib = [
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatChipsModule,
  MatIconModule,
  MatTableModule,
];

@NgModule({
  declarations: [ScoreStatusPipe],
  imports: [CommonModule, ...materialLib],
  exports: [CommonModule, ...materialLib, ScoreStatusPipe],
})
export class SharedModule {}
