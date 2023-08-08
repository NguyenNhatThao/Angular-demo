import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ScoreStatusPipe } from './pipes/score.pipe';
import { FocusDirective } from './directives/focus-directive';

const materialLib = [
  MatPaginatorModule,
  MatSortModule,
  MatTooltipModule,
  MatChipsModule,
  MatIconModule,
  MatTableModule,
];

@NgModule({
  declarations: [ScoreStatusPipe, FocusDirective],
  imports: [CommonModule, ...materialLib],
  exports: [CommonModule, ...materialLib, ScoreStatusPipe, FocusDirective],
})
export class SharedModule {}
