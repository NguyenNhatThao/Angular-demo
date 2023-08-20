import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  @Input() userInfo: any;
  @Input() userForm: any;
  @Output() submit = new EventEmitter<any>();

  constructor() {}

  onSubmit() {
    this.submit.emit(this.userForm);
  }

  getFieldValue(value: any): string | number {
    if(typeof value === 'string' || typeof value === 'number') {
      return value as string | number;
    }
    return '';
  }
  
  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }
  
  getValue(value: any) {
    return value;
  }
}
