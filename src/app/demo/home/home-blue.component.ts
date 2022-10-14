import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lux-home-blue',
  templateUrl: './home-blue.component.html'
})
export class HomeBlueComponent {
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
