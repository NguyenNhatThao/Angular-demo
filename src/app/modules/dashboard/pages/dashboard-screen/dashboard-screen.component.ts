import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-screen',
  templateUrl: './dashboard-screen.component.html',
  styleUrls: ['./dashboard-screen.component.scss'],
})
export class DashboardScreenComponent implements OnInit {
  // public router: Router;

  // constructor(injector: Injector) {
  //   this.router = injector.get(Router);
  // }

  constructor(public router: Router) {}

  ngOnInit() {}

  navigate(navigateTo: String) {
    this.router.navigate([`dashboard/${navigateTo}`]);
  }
}
