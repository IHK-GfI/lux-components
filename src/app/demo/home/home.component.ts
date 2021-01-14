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
      case 'MasterDetail':
        this.router.navigate(['/components-overview/example/master-detail']);
        break;
      case 'Stepper':
        this.router.navigate(['/components-overview/example/stepper']);
        break;
      case 'Tabs':
        this.router.navigate(['/components-overview/example/tabs']);
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
