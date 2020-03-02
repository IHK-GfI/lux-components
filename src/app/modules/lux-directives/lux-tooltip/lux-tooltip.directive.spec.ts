import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flushMicrotasks, inject, TestBed, tick } from '@angular/core/testing';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxTooltipDirective } from './lux-tooltip.directive';
import { TooltipPosition } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';

describe('LuxTooltipDirective', () => {
  LuxTestHelper.configureTestSuite();

  beforeAll(async () => {
    LuxTestHelper.configureTestModule([], [MockComponent]);
  });

  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let focusMonitor: FocusMonitor;

  let fixture: ComponentFixture<MockComponent>;
  let mockComp: MockComponent;
  let tooltipSpanDebug: DebugElement;
  let tooltipSpan: HTMLElement;
  let tooltip: LuxTooltipDirective;

  const showTooltip = (wait: number = 500) => {
    tooltip.show(mockComp.showDelay);
    LuxTestHelper.wait(fixture, wait);
  };

  const hideTooltip = (wait: number = 500) => {
    tooltip.hide(mockComp.hideDelay);
    LuxTestHelper.wait(fixture, wait);
    flushMicrotasks();
  };

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MockComponent);
    mockComp = fixture.componentInstance;
    fixture.detectChanges();

    tooltipSpanDebug = fixture.debugElement.query(By.css('span'));
    tooltipSpan = tooltipSpanDebug.nativeElement as HTMLElement;
    tooltip = tooltipSpanDebug.injector.get<LuxTooltipDirective>(LuxTooltipDirective);

    inject([OverlayContainer, FocusMonitor], (oc: OverlayContainer, fm: FocusMonitor) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
      focusMonitor = fm;
    })();
  }));

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    // Since we're resetting the testing module in some of the tests,
    // we can potentially have multiple overlay containers.
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  it('should create an instance', () => {
    expect(mockComp).toBeTruthy();
    expect(tooltip).toBeTruthy();
  });

  it('should show the correct message', fakeAsync(() => {
    // Given
    mockComp.message = 'DEMO';
    fixture.detectChanges();
    // When
    showTooltip();
    // Then
    expect(tooltip._isTooltipVisible()).toBe(true);
    expect(overlayContainerElement.textContent).toEqual('DEMO');

    // When
    hideTooltip(500);
    LuxTestHelper.wait(fixture, 500); // Zusatz, weil sonst der Tooltip noch nicht entfernt wurde
    // Then
    expect(tooltip._isTooltipVisible()).toBe(false);
    expect(overlayContainerElement.childElementCount).toBe(0);
  }));

  it('should be disabled', fakeAsync(() => {
    // Given
    mockComp.message = 'DEMO';
    mockComp.disabled = true;
    fixture.detectChanges();
    // When
    showTooltip();
    // Then
    expect(tooltip._isTooltipVisible()).toBe(false);
    expect(overlayContainerElement.textContent).toEqual('');
    expect(overlayContainerElement.childElementCount).toBe(0);
  }));

  it('should show after delay', fakeAsync(() => {
    // Given
    mockComp.message = 'DEMO';
    mockComp.showDelay = 1000;
    fixture.detectChanges();
    // When
    showTooltip(500);
    // Then
    expect(tooltip.showDelay).toBe(1000);
    expect(tooltip._isTooltipVisible()).toBe(false);

    // When
    tick(500);
    // Then
    expect(tooltip._isTooltipVisible()).toBe(true);
  }));

  it('should hide after delay', fakeAsync(() => {
    // Given
    mockComp.message = 'DEMO';
    mockComp.hideDelay = 1000;
    fixture.detectChanges();
    // When
    showTooltip(0);
    // Then
    expect(tooltip._isTooltipVisible()).toBe(true);

    // When
    hideTooltip(500);
    // Then
    expect(tooltip._isTooltipVisible()).toBe(true);

    // When
    tick(500);
    // Then
    expect(tooltip._isTooltipVisible()).toBe(false);
  }));
});

/* Mock-Klassen */

@Component({
  selector: 'mock-component',
  template:
    '<span luxTooltip [luxTooltip]="message" [luxTooltipHideDelay]="hideDelay"' +
    ' [luxTooltipShowDelay]="showDelay" [luxTooltipPosition]="position"' +
    ' [luxTooltipDisabled]="disabled">Ich bin ein Demotext</span>'
})
class MockComponent {
  message: string;
  hideDelay: number;
  showDelay: number;
  position: TooltipPosition = 'above';
  disabled: boolean;

  constructor() {}
}
