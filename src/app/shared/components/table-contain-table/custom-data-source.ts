import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import * as _ from 'lodash';

export class CustomDataSource implements DataSource<any> {
  public dataSubject = new BehaviorSubject<any[]>([]);

  connect(): Observable<readonly any[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(): void {
    this.dataSubject.complete();
  }

  loadData(data: any[]) {
    this.dataSubject.next(data);
  }

  constructor() {}

  onChangeSearchByName(searchName: any, listParent: any, curDataSource: any, curDataSourceFiltered: any) {
    const listParentFiltered = _.cloneDeep(listParent).filter((parent: any) => {
      if (
        searchName &&
        parent.name.toLowerCase().includes(searchName.toLowerCase())
      ) {
        parent.isHighlight = true;
      } else {
        parent.isHighlight = false;
      }
      return this.searchChild(parent, searchName) || parent.isHighlight;
    });
    if (!searchName) {
      this.getInitFilter(curDataSource, curDataSourceFiltered);
      this.dataSubject.next(curDataSourceFiltered);
    } else {
      this.dataSubject.next(listParentFiltered);
    }
  }

  searchChild(parent: any, searchName: any) {
    let hasChildMatched = false;
    parent.childDataSource.connect().subscribe((listChild: any) => {
      if (listChild) {
        listChild.forEach((child: any) => {
          if (
            searchName &&
            child.name.toLowerCase().includes(searchName?.toLowerCase())
          ) {
            child.isHighlight = true;
            parent.isExpanded = true;
            hasChildMatched = true;
          } else {
            child.isHighlight = false;
          }
        });
      }
    });
    return hasChildMatched;
  }

  getInitFilter(curDataSource: any, curDataSourceFiltered: any) {
    curDataSource.forEach((parent: any) => {
      curDataSourceFiltered.forEach((parentFiltered: any) => {
        if (parent.id === parentFiltered.id) {
          parentFiltered.isExpanded = parent.isExpanded;
        }
      });
    });
  }

  onExpandedRow(id: number, curDataSource: any[], listParent: any[], listChildData: any) {
    curDataSource.forEach((teacher: any) => {
      if (teacher.id === id) {
        teacher.isExpanded = !teacher.isExpanded;
      }
    });
    listParent.forEach((data: any) => {
      if (id === data.id) {
        data.isExpanded = !data.isExpanded;
        data.childDataSource = new CustomDataSource();
        data.childDataSource.loadData(listChildData);
        this.dataSubject.next(listParent);
      }
    });
  }
}
