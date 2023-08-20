import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '../../user-management.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetail implements OnInit {
  public studentInfo: any;
  public allClass: any[] = [];
  public studentForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    age: new FormControl(0, [this.validateAge]),
    score: new FormControl(0, [this.validateScore]),
    selected: new FormControl(0, [Validators.required]),
  });
  constructor(
    private route: ActivatedRoute,
    private userManagementService: UserManagementService,
    private router: Router
  ) {}

  ngOnInit() {
    const studentId = this.getStudentIdFromUrl();
    forkJoin([
      this.userManagementService.getStudent(studentId),
      this.userManagementService.getAllClass(),
    ]).subscribe((res: any) => {
      if (res) {
        this.allClass = res[1];
        this.studentInfo = {
          name: res[0].name,
          age: res[0].age,
          score: res[0].score,
          class: {
            selected: res[0].selectedClass,
            type: 'multiSelect',
            options: this.allClass,
          }
        };
        this.getInitForm();
      }
    });
    this.studentForm.valueChanges.subscribe((newValue: any) => {});
  }

  getStudentIdFromUrl(): number {
    let studentId = 0;
    this.route.params.subscribe((params) => {
      studentId = params['id'];
    });
    return studentId;
  }

  getInitForm() {
    this.studentForm.get('name')?.setValue(this.studentInfo.name);
    this.studentForm.get('age')?.setValue(this.studentInfo.age);
    this.studentForm.get('score')?.setValue(this.studentInfo.score);
    this.studentForm
      .get('selected')
      ?.setValue(this.studentInfo.class.selected);
  }

  onSubmit(studentForm: any) {
    if (studentForm?.value) {
      studentForm.value.selectedClass = studentForm.get('selected').value;
      delete studentForm.value.selected;
      this.userManagementService
      .updateStudent(this.getStudentIdFromUrl(), studentForm.value)
      .subscribe((student) => {
        this.studentInfo = student;
        this.router.navigate(['/user-management/student']);
      });
    }
  }

  validateAge(control: any) {
    const age = control.value;

    if (!age || age === '') {
      return { required: true, message: "Age is required" };
    }

    if (parseInt(age) < 6 || parseInt(age) > 100) {
      return { ageRange: true, message: "Age is between 6 to 100 years old" };
    }

    if (!/^\d+$/.test(age)) {
      return { pattern: true, message: "Age is decimal number" };
    }

    return null;
  }

  validateScore(control: any) {
    const score = control.value;
    if (!score || score === '') {
      return { required: true, message:  "Score is required"};
    }

    if (parseInt(score) < 0 || parseInt(score) > 10) {
      return { scoreRange: true, message: "Score is between 0 to 10" };
    }

    if (!/^[0-9.]+$/.test(score)) {
      return { pattern: true, message: "Score is a number" };
    }

    return null;
  }
}
