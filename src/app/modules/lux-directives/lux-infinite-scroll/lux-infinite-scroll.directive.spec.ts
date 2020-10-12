import { Component } from '@angular/core';
import { waitForAsync, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxInfiniteScrollDirective } from './lux-infinite-scroll.directive';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';

describe('LuxInfiniteScrollDirective', () => {
  const WAIT_TIME = LuxInfiniteScrollDirective.SCROLL_DEBOUNCE_TIME + 50;

  const scrollTo = (px: number, src: HTMLElement, componentFixture: ComponentFixture<any>) => {
    src.scrollTop = px;

    let scrollEvent = null;

    // Workaround, da der IE "new Event()" nicht supportet
    if (typeof Event === 'function') {
      scrollEvent = new Event('scroll');
    } else {
      scrollEvent = document.createEvent('Event');
      scrollEvent.initEvent('scroll', true, true);
    }

    spyOnProperty(scrollEvent, 'target', 'get').and.returnValue(src);
    document.dispatchEvent(scrollEvent);

    LuxTestHelper.wait(componentFixture, WAIT_TIME);
    flush();
  };

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [MockComponent, MockWithoutScrollBarAndImmediateCallbackComponent]);
  });

  describe('Mit Scrollbar', () => {
    let fixture: ComponentFixture<MockComponent>;
    let mockComp: MockComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(MockComponent);
      mockComp = fixture.componentInstance;
    }));

    it('Sollte erstellt werden', () => {
      expect(mockComp).toBeTruthy();
      fixture.detectChanges();
    });

    it('Sollte luxScrolled nach Initialisierung emitten', fakeAsync(() => {
      const spy = spyOn(mockComp, 'onMockEvent');
      LuxTestHelper.wait(fixture);

      expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('Sollte luxScrolled ein zweites Mal emitten, wenn weit genug gescrollt worden ist', fakeAsync(() => {
      // Vorbedingungen prüfen
      const el = fixture.debugElement.query(By.css('#toggleMasterFocus-element'));
      const spy = spyOn(mockComp, 'onMockEvent');
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);

      // Änderungen durchführen
      scrollTo(50, el.nativeElement, fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(2);
    }));

    it('Sollte luxScrolled nicht emitten, wenn nach oben gescrollt worden ist', fakeAsync(() => {
      // Vorbedingungen prüfen
      const el = fixture.debugElement.query(By.css('#toggleMasterFocus-element'));
      const spy = spyOn(mockComp, 'onMockEvent');
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledTimes(1);

      // Änderungen durchführen
      LuxTestHelper.wait(fixture, WAIT_TIME);
      scrollTo(1000, el.nativeElement, fixture);

      LuxTestHelper.wait(fixture, WAIT_TIME);
      scrollTo(0, el.nativeElement, fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(2);
    }));

    it('Sollte luxScrolled nicht emitten, wenn luxImmediateCallback = false ist', fakeAsync(() => {
      // Vorbedingungen prüfen
      mockComp.immediateCallback = false;
      const spy = spyOn(mockComp, 'onMockEvent');
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      LuxTestHelper.wait(fixture, WAIT_TIME);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(0);
    }));

    it('Sollte luxScrolled nicht emitten, wenn luxImmediateCallback = true und luxIsLoading = true ist', fakeAsync(() => {
      // Vorbedingungen prüfen
      mockComp.immediateCallback = true;
      mockComp.isLoading = true;
      const spy = spyOn(mockComp, 'onMockEvent');
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      LuxTestHelper.wait(fixture, WAIT_TIME);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(0);
    }));

    it('Sollte luxScrolled nicht emitten, wenn nach unten gescrollt wird und luxIsLoading = true ist', fakeAsync(() => {
      // Vorbedingungen prüfen
      mockComp.immediateCallback = true;
      const el = fixture.debugElement.query(By.css('#toggleMasterFocus-element'));
      const spy = spyOn(mockComp, 'onMockEvent');
      fixture.detectChanges();
      LuxTestHelper.wait(fixture, WAIT_TIME);

      expect(spy).toHaveBeenCalledTimes(1);

      // Änderungen durchführen
      mockComp.isLoading = true;
      LuxTestHelper.wait(fixture, WAIT_TIME);
      scrollTo(50, el.nativeElement, fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(1);
    }));
  });

  describe('Ohne Scrollbar', () => {
    let fixture: ComponentFixture<MockWithoutScrollBarAndImmediateCallbackComponent>;
    let mockComp: MockWithoutScrollBarAndImmediateCallbackComponent;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(MockWithoutScrollBarAndImmediateCallbackComponent);
      mockComp = fixture.componentInstance;
    }));

    it('Sollte luxScrolled nicht emitten wenn luxImmediateCallback = true ist', fakeAsync(() => {
      // Vorbedingungen prüfen
      const el = fixture.debugElement.query(By.css('#toggleMasterFocus-element'));
      const spy = spyOn(mockComp, 'onMockEvent');

      LuxTestHelper.wait(fixture, WAIT_TIME);
      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      scrollTo(50, el.nativeElement, fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(0);
    }));

    it('Sollte luxScrolled nicht emitten wenn luxImmediateCallback = false ist', fakeAsync(() => {
      // Vorbedingungen prüfen
      mockComp.immediateCallback = false;
      const el = fixture.debugElement.query(By.css('#toggleMasterFocus-element'));
      const spy = spyOn(mockComp, 'onMockEvent');

      LuxTestHelper.wait(fixture, WAIT_TIME);
      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      scrollTo(50, el.nativeElement, fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(0);
    }));
  });
});

/* Mock-Klassen */

@Component({
  selector: 'mock-component',
  template:
    '<div style="overflow-y: scroll; height: 50px;" id="toggleMasterFocus-element" luxInfiniteScroll ' +
    '(luxScrolled)="onMockEvent()" [luxScrollPercent]="1" [luxImmediateCallback]="immediateCallback" [luxIsLoading]="isLoading">' +
    'Text' +
    '<ul><li *ngFor="let testText of testArr">{{ testText }}</li> </ul>' +
    '</div>'
})
class MockComponent {
  // Wird benutzt um einen Y-Overflow und damit ein Scrollbar im Testelement zu forcieren
  private testArr = [];
  immediateCallback = true;
  isLoading = false;

  constructor() {
    this.testArr = Array(10).fill('Test');
  }

  public onMockEvent() {}
}

@Component({
  selector: 'mock-component-without-scrollbar',
  template:
    '<div id="toggleMasterFocus-element" luxInfiniteScroll (luxScrolled)="onMockEvent()" [luxImmediateCallback]="immediateCallback"></div>'
})
class MockWithoutScrollBarAndImmediateCallbackComponent {
  immediateCallback = true;

  public constructor() {}

  public onMockEvent() {}
}
