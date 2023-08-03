import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public router: Router;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
  }

  navigate(navigateTo: String) {
    this.router.navigate([`/dashboard/${navigateTo}`]);
  }
}
