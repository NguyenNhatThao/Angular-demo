import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '../../user-management.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss'],
})
export class TeacherDetail implements OnInit {
    public teacherInfo: any;
    public allClass: any[] = [];
    public teacherForm: FormGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
      ]),
      selected: new FormControl([], [Validators.required]),
    });
    constructor(
      private route: ActivatedRoute,
      private userManagementService: UserManagementService,
      private router: Router
    ) {}
  
    ngOnInit() {
      const teacherId = this.getTeacherIdFromUrl();
      forkJoin([
        this.userManagementService.getTeacher(teacherId),
        this.userManagementService.getAllClass(),
      ]).subscribe((res: any) => {
        if (res) {
          this.allClass = res[1];
          this.teacherInfo = {
            name: res[0].name,
            class: {
              selected: res[0].listClass,
              type: 'checkbox',
              options: this.allClass,
            }
          };
          this.getInitForm();
        }
      });
      this.teacherForm.valueChanges.subscribe((newValue: any) => {});
    }
  
    getTeacherIdFromUrl(): number {
      let teacherId = 0;
      this.route.params.subscribe((params) => {
        teacherId = params['id'];
      });
      return teacherId;
    }
  
    getInitForm() {
      this.teacherForm.get('name')?.setValue(this.teacherInfo.name);
      this.teacherForm
        .get('selected')
        ?.setValue(this.teacherInfo.class.selected);
    }
  
    onSubmit(teacherForm: any) {
      if (teacherForm?.value) {
        teacherForm.value.listClass = teacherForm.get('selected').value;
        delete teacherForm.value.selected;
        this.userManagementService
        .updateTeacher(this.getTeacherIdFromUrl(), teacherForm.value)
        .subscribe((teacher) => {
          this.teacherInfo = teacher;
          this.router.navigate(['/user-management/teacher']);
        });
      }
    }
}
