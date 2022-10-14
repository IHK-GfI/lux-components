import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxThemeService } from '../../modules/lux-theme/lux-theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  themeName: string;
  subscription?: Subscription;

  constructor(private themeService: LuxThemeService) {
    this.themeName = this.themeService.getTheme().name;
    this.subscription = this.themeService.getThemeAsObservable().subscribe((theme) => {
      this.themeName = theme.name;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
