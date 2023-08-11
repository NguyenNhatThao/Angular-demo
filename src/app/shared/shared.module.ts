import { NgModule } from '@angular/core';
import { ScoreStatusPipe } from './pipes/score.pipe';
import { FocusDirective } from './directives/focus-directive';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UserListComponent } from './components/user-list/user-list.component';
import { LastClickDirective } from './directives/last-click-directive';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

const materialLib = [
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSortModule,
  MatTooltipModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
];

@NgModule({
  declarations: [
    ScoreStatusPipe,
    FocusDirective,
    UserListComponent,
    LastClickDirective,
  ],
  imports: [...materialLib, CommonModule],
  exports: [
    ...materialLib,
    ScoreStatusPipe,
    FocusDirective,
    UserListComponent,
    LastClickDirective,
  ],
})
export class SharedModule {}
