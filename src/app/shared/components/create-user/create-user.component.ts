import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  @Input() userInfo: any;
  @Input() userForm: any;
  @Output() submit = new EventEmitter<any>();

  constructor() {}

  onSubmit() {
    this.submit.emit(this.userForm);
  }

  getFieldValue(value: any): string | number {
    if (typeof value === 'string' || typeof value === 'number') {
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

  capitalize(name: any) {
    return name[0].toUpperCase() + name.slice(1);
  }
}
