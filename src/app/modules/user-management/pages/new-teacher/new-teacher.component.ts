import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from '../../user-management.service';

@Component({
  selector: 'app-new-teacher',
  templateUrl: './new-teacher.component.html',
  styleUrls: ['./new-teacher.component.scss'],
})
export class NewTeacher implements OnInit {
  public teacherInfo: any;
  public allClass: any[] = [];
  public teacherForm: FormGroup = new FormGroup({
    name: new FormControl('', [this.validateName]),
    selected: new FormArray([]),
  });
  constructor(
    private userManagementService: UserManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userManagementService.getAllClass().subscribe((res: any) => {
      if (res) {
        this.allClass = res;
        this.teacherInfo = {
          name: '',
          class: {
            selected: [],
            type: 'checkbox',
            options: this.allClass,
          },
        };
        this.getInitForm();
      }
    });
    this.teacherForm.valueChanges.subscribe((newValue: any) => {});
  }

  getInitForm() {
    this.teacherForm.get('name')?.setValue(this.teacherInfo.name);
    this.allClass.forEach(() => {
      (this.teacherForm.get('selected') as FormArray).push(
        new FormControl(false)
      );
    });
  }

  onSubmit(teacherForm: any) {
    if (teacherForm?.value) {
      teacherForm.value.listClass = teacherForm
        .get('selected')
        .value.map((item: boolean, index: number) => {
          return item && index + 1;
        })
        .filter((item: any) => typeof item === 'number');
      console.log(teacherForm?.value.listClass);
      delete teacherForm.value.selected;
      this.userManagementService
        .createNewTeacher(teacherForm.value)
        .subscribe((teacher) => {
          this.teacherInfo = teacher;
          this.router.navigate(['/user-management/teacher']);
        });
    }
  }

  validateName(control: any) {
    const name = control.value;
    if (!name || name === '') {
      return { required: true, message: 'Name is required' };
    }

    if (!/^[a-zA-Z ]+$/.test(name)) {
      return {
        pattern: true,
        message: 'Name is not contain speacial character',
      };
    }

    return null;
  }
}
