import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetail implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getInforFromUrl();
  }

  getInforFromUrl() {
    // const href = window.location.href;
    // const hrefArr = href.split(';');
    // const studentIdPath = hrefArr.find((item) => item.includes('studentId='));
    // if (studentIdPath) {
    //   const index = studentIdPath.indexOf('studentId=');
    //   const studentId = studentIdPath.substring(index + 'studentId='.length);
    //   console.log('studentId: ', studentId);
    // }
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
    });

    this.route.queryParams.subscribe((queryParams) => {
      const name = queryParams['name'];
      console.log(name);
    });
  }
}
