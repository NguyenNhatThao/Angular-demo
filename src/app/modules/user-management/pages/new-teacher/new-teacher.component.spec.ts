/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewTeacher } from './new-teacher.component';

describe('NewTeacherComponent', () => {
  let component: NewTeacher;
  let fixture: ComponentFixture<NewTeacher>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewTeacher],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTeacher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
