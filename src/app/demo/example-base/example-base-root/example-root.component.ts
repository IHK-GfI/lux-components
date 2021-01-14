import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ComponentsOverviewNavigationService } from '../../components-overview/components-overview-navigation.service';
import { LuxMediaQueryObserverService } from '../../../modules/lux-util/lux-media-query-observer.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'example-root',
  templateUrl: './example-root.component.html',
  styleUrls: ['./example-root.component.scss']
})
export class ExampleRootComponent implements OnInit, AfterViewInit, OnDestroy {
  private routerSubscription: Subscription;
  private blockScrolling = false;

  @ViewChild('exampleListElement') exampleListElement: ElementRef;

  constructor(
    private router: Router,
    public navigationService: ComponentsOverviewNavigationService,
    public mediaQueryService: LuxMediaQueryObserverService
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (this.blockScrolling) {
          this.blockScrolling = false;
        } else {
          this.findSelectedExampleEntry();
        }
      }
    });
  }

  ngAfterViewInit() {
    this.findSelectedExampleEntry();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }
  }

  /**
   * Führt die Click-Funktion der Bsp-Component aus.
   *
   * @param component
   */
  onComponentClick(component: any) {
    component.onclick();
    this.blockScrolling = true;
  }

  private findSelectedExampleEntry() {
    setTimeout(() => {
      const activeItem = document.querySelector('.example-component-list-item-active');
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    });
  }
}
