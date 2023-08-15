import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../../user-management.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetail implements OnInit {
  private studentInfo: any;
  public allClass: any[] = [];
  public submited = false;
  public studentForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    age: new FormControl(0, [this.validateAge]),
    score: new FormControl(0, [this.validateScore]),
    selectedClass: new FormControl(0, [Validators.required]),
  });
  constructor(
    private route: ActivatedRoute,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit() {
    const studentId = this.getStudentIdFromUrl();
    forkJoin([
      this.userManagementService.getStudent(studentId),
      this.userManagementService.getAllClass(),
    ]).subscribe((res: any) => {
      if (res) {
        this.studentInfo = res[0];
        this.allClass = res[1];
        this.getInitForm();
      }
    });
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
      .get('selectedClass')
      ?.setValue(this.studentInfo.selectedClass);
  }

  onSubmit() {
    this.submited = true;
    this.userManagementService
      .updateStudent(this.studentInfo.id, this.studentForm.value)
      .subscribe((student) => {
        this.studentInfo = student;
        this.submited = false;
      });
  }

  validateAge(control: any) {
    const age = control.value;

    if (!age || age === '') {
      return { required: true };
    }

    if (parseInt(age) < 6 || parseInt(age) > 100) {
      return { ageRange: true };
    }

    if (!/^\d+$/.test(age)) {
      return { pattern: true };
    }

    return null;
  }

  validateScore(control: any) {
    const score = control.value;
    if (!score || score === '') {
      return { required: true };
    }

    if (parseInt(score) < 0 || parseInt(score) > 10) {
      return { scoreRange: true };
    }

    if (!/^[0-9.]+$/.test(score)) {
      return { pattern: true };
    }

    return null;
  }
}
