import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserManagementService } from '../../user-management.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetail implements OnInit {
  private studentInfo: any;
  public allClass: any[] = [];
  public studentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    age: new FormControl(0, [Validators.required, Validators.min(6), Validators.max(100)]),
    score: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(10)]),
    selectedClass: new FormControl('', [Validators.required]),
  });
  constructor(private route: ActivatedRoute, private userManagementService: UserManagementService) {}

  ngOnInit() {
    const studentId = this.getStudentIdFromUrl();
    forkJoin([
      this.userManagementService.getStudent(studentId),
      this.userManagementService.getAllClass()
    ]).subscribe((res: any)=> {
      if (res) {
        this.studentInfo = res[0];
        this.allClass = res[1];
        this.getInitForm();
      }
    })
  }

  getStudentIdFromUrl(): number {
    let studentId = 0;
    this.route.params.subscribe((params) => {
      studentId = params['id'];
    });
    return studentId;
  }

  getInitForm() {
    this.studentForm.controls['name'].setValue(this.studentInfo.name);
    this.studentForm.controls['age'].setValue(this.studentInfo.age);
    this.studentForm.controls['score'].setValue(this.studentInfo.score);
    this.studentForm.controls['selectedClass'].setValue(this.studentInfo.class);
  }

  onSubmit() {
    console.log(this.studentForm.value);
  }
}
