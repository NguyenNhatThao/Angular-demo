import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StudentList } from './pages/student-list/student-list.component';
import { StudentDetail } from './pages/student-detail/student-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { TeacherList } from './pages/teacher-list/teacher-list.component';
import { UserManagementService } from './user-management.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherDetail } from './pages/teacher-detail/teacher-detail.component';

@NgModule({
  providers: [UserManagementService],
  imports: [
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    UserManagementRoutingModule,
  ],
  declarations: [StudentList, TeacherList, StudentDetail, TeacherDetail],
  exports: [],
})
export class UserManagementModule {}
