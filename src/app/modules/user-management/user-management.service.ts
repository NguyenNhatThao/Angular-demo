import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserManagementService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllStudent() {
    return this.http.get<any[]>(`${this.baseUrl}/students`);
  }

  getStudent(studentId: number) {
    return this.http.get<any>(`${this.baseUrl}/students/${studentId}`);
  }

  getAllClass() {
    return this.http.get<any[]>(`${this.baseUrl}/classes`);
  }

  getClass(classId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/classes/${classId}`);
  }

  getPagedData(
    type: string,
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    const startIndex = pageIndex * pageSize;
    return this.http.get<any[]>(
      `${this.baseUrl}/${type}?_start=${startIndex}&_limit=${pageSize}`
    );
  }

  updateStudent(studentId: number, studentInfo: any) {
    return this.http.put(`${this.baseUrl}/students/${studentId}`, studentInfo);
  }

  getStudentsOfClass(classId: number) {
    return this.http.get<any[]>(
      `${this.baseUrl}/students?selectedClass=${classId}`
    );
  }

  getAllTeacher() {
    return this.http.get<any[]>(`${this.baseUrl}/teachers`);
  }

  getClassOfTeacher(classId: number) {
    return this.http.get<any>(`${this.baseUrl}/classes/${classId}`);
  }
}
