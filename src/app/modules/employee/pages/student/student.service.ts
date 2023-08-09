import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StudentService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getStudent() {
    return this.http.get<any[]>(`${this.baseUrl}/student`);
  }

  getClass() {
    return this.http.get<any[]>(`${this.baseUrl}/class`);
  }
}
