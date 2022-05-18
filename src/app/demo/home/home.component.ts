import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private router: Router) {}

  goTo(target: string) {
    switch (target) {
      case 'Components':
        this.router.navigate(['/components-overview']);
        break;
      case 'Form':
        this.router.navigate(['/form']);
        break;
      case 'Configuration':
        this.router.navigate(['/configuration']);
        break;
      case 'Baseline':
        this.router.navigate(['/baseline']);
        break;
    }
  }
}
