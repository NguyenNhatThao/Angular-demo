import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StudentService {
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>('../../../../assets/student-list.json');
  }
}
