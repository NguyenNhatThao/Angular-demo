/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentDetail } from './student-detail.component';

describe('StudentDetailComponent', () => {
  let component: StudentDetail;
  let fixture: ComponentFixture<StudentDetail>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDetail ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
