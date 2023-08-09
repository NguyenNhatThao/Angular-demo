import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StudentComponent } from './pages/student-list/student-list.component';
import { StudentListService } from './pages/student-list/student-list.service';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';


@NgModule({
  providers: [StudentListService],
  imports: [FlexLayoutModule, SharedModule, UserManagementRoutingModule],
  declarations: [
    StudentComponent,
    TeacherListComponent,
    StudentDetailComponent,
  ],
  exports: [],
})
export class UserManagementModule {}
