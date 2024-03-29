import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit() {}

  navigate(navigateTo: String) {
    this.router.navigate([`/user-management/${navigateTo}`]);
  }
}
