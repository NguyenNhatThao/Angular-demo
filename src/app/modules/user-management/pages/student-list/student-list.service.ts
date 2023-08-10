import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StudentListService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getStudent() {
    return this.http.get<any[]>(`${this.baseUrl}/student`);
  }

  getClass() {
    return this.http.get<any[]>(`${this.baseUrl}/class`);
  }

  getPagedData(pageIndex: number, pageSize: number): Observable<any> {
    const startIndex = pageIndex * pageSize;
    return this.http.get<any[]>(
      `${this.baseUrl}/student?_start=${startIndex}&_limit=${pageSize}`
    );
  }
}
