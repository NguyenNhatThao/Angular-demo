import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserManagementService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllStudent() {
    return this.http.get<any[]>(`${this.baseUrl}/student`);
  }

  getStudent(studentId: number) {
    return this.http.get<any>(`${this.baseUrl}/student/${studentId}`)
  }

  getAllClass() {
    return this.http.get<any[]>(`${this.baseUrl}/class`);
  }

  getClass(classId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/class/${classId}`);
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
}
