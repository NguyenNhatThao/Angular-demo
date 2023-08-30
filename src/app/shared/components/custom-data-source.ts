import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

export class CustomDataSource implements DataSource<any> {
  public dataSubject = new BehaviorSubject<any[]>([]);

  constructor() {}

  connect(): Observable<readonly any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(): void {
    this.dataSubject.complete();
  }

  loadData(data: any[]) {
    this.dataSubject.next(data);
  }
}
