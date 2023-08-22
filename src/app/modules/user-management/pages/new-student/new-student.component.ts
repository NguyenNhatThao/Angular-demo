import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserManagementService } from '../../user-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss'],
})
export class NewStudent implements OnInit {
  public studentInfo: any;
  public allClass: any[] = [];
  public studentForm: FormGroup = new FormGroup({
    name: new FormControl('', [this.validateName]),
    age: new FormControl(0, [this.validateAge]),
    score: new FormControl(0, [this.validateScore]),
    selected: new FormControl(0),
  });
  constructor(
    private userManagementService: UserManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userManagementService.getAllClass().subscribe((res: any) => {
      if (res) {
        this.allClass = res;
        this.studentInfo = {
          name: '',
          age: '',
          score: '',
          class: {
            selected: 0,
            type: 'multiSelect',
            options: this.allClass,
          },
        };
        this.getInitForm();
      }
    });
    this.studentForm.valueChanges.subscribe((newValue: any) => {});
  }

  getInitForm() {
    this.studentForm.get('name')?.setValue(this.studentInfo.name);
    this.studentForm.get('age')?.setValue(this.studentInfo.age);
    this.studentForm.get('score')?.setValue(this.studentInfo.score);
    this.studentForm.get('selected')?.setValue(this.studentInfo.class.selected);
  }

  onSubmit(studentForm: any) {
    if (studentForm?.value) {
      studentForm.value.selectedClass = studentForm.get('selected').value;
      delete studentForm.value.selected;
      this.userManagementService
        .createNewStudent(studentForm.value)
        .subscribe((student) => {
          this.studentInfo = student;
          this.router.navigate(['/user-management/student']);
        });
    }
  }

  validateAge(control: any) {
    const age = control.value;

    if (!age || age === '') {
      return { required: true, message: 'Age is required' };
    }

    if (parseInt(age) < 6 || parseInt(age) > 100) {
      return { ageRange: true, message: 'Age is between 6 to 100 years old' };
    }

    if (!/^\d+$/.test(age)) {
      return { pattern: true, message: 'Age is decimal number' };
    }

    return null;
  }

  validateScore(control: any) {
    const score = control.value;
    if (!score || score === '') {
      return { required: true, message: 'Score is required' };
    }

    if (parseInt(score) < 0 || parseInt(score) > 10) {
      return { scoreRange: true, message: 'Score is between 0 to 10' };
    }

    if (!/^[0-9.]+$/.test(score)) {
      return { pattern: true, message: 'Score is a number' };
    }

    return null;
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

  createNewTeacher() {
    this.router.navigate(['/user-management/new-teacher']);
  }
}
