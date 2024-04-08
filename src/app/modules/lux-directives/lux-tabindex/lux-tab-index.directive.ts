import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';

@Directive({
  selector: '[luxTabIndex]'
})
export class LuxTabIndexDirective implements AfterViewInit, OnChanges, OnDestroy {
  private changesSubscription?: Subscription;
  private changes$: ReplaySubject<SimpleChanges> = new ReplaySubject<SimpleChanges>(1);

  @Input() luxTabIndex = '0';
  @Input() luxApplyToParent = false;
  @Input() luxApplyToChildren = true;
  @Input() luxPotentialChildren: string[] = ['input', 'textarea', 'a', 'button', 'mat-select'];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.changes$.next(simpleChanges);
  }

  ngAfterViewInit() {
    this.updateElementsWithTabIndex();
    // Dadurch verhindern wir, dass Changes vor afterViewInit zu etwaigen Fehlern führen könnten und erst danach aufgelöst werden
    this.changesSubscription = this.changes$.subscribe(this.onChanges.bind(this));
  }

  ngOnDestroy() {
    if (this.changesSubscription) {
      this.changesSubscription.unsubscribe();
    }
  }

  /**
   * Eigener Listener für Änderungen, der erst nach dem AfterViewInit-Lifecycle greift.
   * Sicherheitshalber, um evtl. noch unaufgelösten Elementen zu entgehen.
   * @param simpleChanges
   */
  private onChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.luxTabIndex) {
      this.updateElementsWithTabIndex();
    }
  }

  /**
   * Aktualisiert den Tabindex für
   *  - das Zielelement, wenn luxApplyToParent === true (default = false) ist
   *  - potentielle Kindelemente, wenn luxApplyToChildren === true (default) ist
   */
  private updateElementsWithTabIndex() {
    if (this.luxApplyToParent) {
      this.setTabIndexForElement(this.elementRef.nativeElement);
    }

    if (this.luxApplyToChildren) {
      this.luxPotentialChildren.forEach((childQuery: string) => this.setTabIndexByQuery(childQuery));
    }
  }

  private setTabIndexByQuery(elementQuery: string) {
    const elements = this.elementRef.nativeElement.querySelectorAll(elementQuery);
    for (const element of elements) {
      this.setTabIndexForElement(element);
    }
  }

  private setTabIndexForElement(element: HTMLElement) {
    this.renderer.setAttribute(element, 'tabIndex', this.luxTabIndex);
  }
}
