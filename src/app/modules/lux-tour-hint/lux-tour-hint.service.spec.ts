/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LuxTestHelper } from '../lux-util/testing/lux-test-helper';
import { LuxTourHintRef } from './lux-tour-hint-model/lux-tour-hint-ref.class';
import { LuxTourHintModule } from './lux-tour-hint.module';
import { LuxTourHintService } from './lux-tour-hint.service';

describe('LuxTourHintService', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule([LuxTourHintService], [MockTourHintComponent], [LuxTourHintModule]);
  });

  let fixture: ComponentFixture<MockTourHintComponent>;
  let testComponent: MockTourHintComponent;
  let tourHintRef: LuxTourHintRef;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(MockTourHintComponent);

    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  }));

  describe('[LuxTourHintPresetComponent]', () => {
    it('Sollte die Tour-Hint öffnen', fakeAsync(() => {
      let titleData = 'Hello';
      let contentData = 'World!';

      /* ___Vorbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(0);

      /* ___Änderungen durchführen___ */
      tourHintRef = testComponent.tourHintService.open({
        targetId: 'test1',
        data: {
          title: titleData,
          content: contentData
        }
      });
      LuxTestHelper.wait(fixture);

      /* ___Nachbedingungen testen___ */

      //Tour-Hint Modal exists
      let tourHintElements = document.body.getElementsByTagName('lux-tour-hint');
      expect(tourHintElements.length).toBe(1);

      let tourHintEl = tourHintElements.item(0);
      expect(tourHintEl).toBe((<any>tourHintRef).tourHintContainer.element.nativeElement);

      //Target is the test div
      expect(tourHintRef.target).toBeTruthy();
      expect(tourHintRef.target.textContent).toEqual('Test Div');

      //Content is present
      let tourHintDataList = tourHintEl?.getElementsByClassName('tour-hint-data');
      expect(tourHintDataList).toBeTruthy();
      expect(tourHintDataList?.length).toBe(1);

      let tourHintData = tourHintDataList?.item(0);
      expect(tourHintData).toBeTruthy();

      let tourHintTitleList = tourHintData?.getElementsByClassName('tour-hint-title');
      expect(tourHintTitleList).toBeTruthy();
      expect(tourHintTitleList?.length).toBe(1);

      let tourHintContentList = tourHintData?.getElementsByClassName('tour-hint-content');
      expect(tourHintContentList).toBeTruthy();
      expect(tourHintContentList?.length).toBe(1);

      let tourHintTitle = tourHintTitleList?.item(0);
      expect(tourHintTitle).toBeTruthy();
      expect(tourHintTitle?.textContent).toContain(titleData);

      let tourHintContent = tourHintContentList?.item(0);
      expect(tourHintContent).toBeTruthy();
      expect(tourHintContent?.textContent).toContain(contentData);
    }));

    it("Sollte die Tour-Hint öffnen und ein 'Nicht wieder anzeigen' - Toggel haben und keine Navigation.", fakeAsync(() => {
      /* ___Vorbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(0);

      /* ___Änderungen durchführen___ */
      tourHintRef = testComponent.tourHintService.open(
        {
          targetId: 'test1',
          data: {
            title: 'title',
            content: 'content'
          }
        },
        true
      );
      LuxTestHelper.wait(fixture);

      /* ___Nachbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(1);

      // Check if DSA is showing and no navigation is showing
      let tourHintContainer = document.body.getElementsByTagName('lux-tour-hint').item(0);
      let tourHintActions = tourHintContainer?.getElementsByClassName('tour-hint-actions').item(0);
      expect(tourHintActions?.children.length).toBe(1);
      let dsaAction = tourHintActions?.getElementsByClassName('action-dont-show-again').item(0);
      expect(dsaAction).toBeTruthy();
      expect(dsaAction?.childElementCount).toBe(1);
    }));

    it("Sollte die Tour-Hint öffnen und kein 'Nicht wieder anzeigen' - Toggel haben und keine Navigation.", fakeAsync(() => {
      /* ___Vorbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(0);

      /* ___Änderungen durchführen___ */
      tourHintRef = testComponent.tourHintService.open(
        {
          targetId: 'test1',
          data: {
            title: 'title',
            content: 'content'
          }
        },
        false
      );
      LuxTestHelper.wait(fixture);

      /* ___Nachbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(1);

      // Check if DSA is showing and no navigation is showing
      let tourHintContainer = document.body.getElementsByTagName('lux-tour-hint').item(0);
      let tourHintActions = tourHintContainer?.getElementsByClassName('tour-hint-actions').item(0);
      expect(tourHintActions?.children.length).toBe(1);
      let dsaAction = tourHintActions?.getElementsByClassName('action-dont-show-again').item(0);
      expect(dsaAction).toBeTruthy();
      expect(dsaAction?.childElementCount).toBe(0);
    }));

    it('Sollte die Tour-Hint öffnen eine Navigation anzeigen.', fakeAsync(() => {
      /* ___Vorbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(0);

      /* ___Änderungen durchführen___ */
      tourHintRef = testComponent.tourHintService.open([
        {
          targetId: 'test1',
          data: {
            title: 'title',
            content: 'content'
          }
        },
        {
          targetId: 'test2',
          data: {
            title: 'title 2',
            content: 'content 2'
          }
        },
        {
          targetId: 'test3',
          data: {
            title: 'title 3',
            content: 'content 3'
          }
        }
      ]);
      LuxTestHelper.wait(fixture);

      /* ___Nachbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(1);

      // Check Navigation is showing
      let tourHintContainer = document.body.getElementsByTagName('lux-tour-hint').item(0);
      let tourHintActions = tourHintContainer?.getElementsByClassName('tour-hint-actions').item(0);
      expect(tourHintActions?.children.length).toBe(2);
      let navigationContainer: any = tourHintActions?.getElementsByClassName('action-navigation').item(0);
      expect(navigationContainer).toBeTruthy();

      // Check if navigation has 3 children, the the "step" - Label and "next" - Button
      expect(navigationContainer?.childElementCount).toBe(2);
      expect(navigationContainer.getElementsByClassName('action-nav-previous').length).toBe(0);
      expect(navigationContainer.getElementsByClassName('nav-label-step').length).toBe(1);
      expect(navigationContainer.getElementsByClassName('action-nav-next').length).toBe(1);

      /* ___Änderungen durchführen___ */
      tourHintRef.next();
      LuxTestHelper.wait(fixture);

      // Check if navigation has 3 children, the "prev" - Button, the "step" - Label and "next" - Button
      expect(navigationContainer?.childElementCount).toBe(3);
      expect(navigationContainer.getElementsByClassName('action-nav-previous').length).toBe(1);
      expect(navigationContainer.getElementsByClassName('nav-label-step').length).toBe(1);
      expect(navigationContainer.getElementsByClassName('action-nav-next').length).toBe(1);

      /* ___Änderungen durchführen___ */
      tourHintRef.next();
      LuxTestHelper.wait(fixture);

      // Check if navigation has 2 children, the "prev" - Button and the "step" - Label
      expect(navigationContainer?.childElementCount).toBe(2);
      expect(navigationContainer.getElementsByClassName('action-nav-previous').length).toBe(1);
      expect(navigationContainer.getElementsByClassName('nav-label-step').length).toBe(1);
      expect(navigationContainer.getElementsByClassName('action-nav-next').length).toBe(0);
    }));

    it("Sollte die Tour-Hint nicht mehr öffnen, nachdem die Tour mit 'Nicht wieder anzeigen' geschlossen wurde.", fakeAsync(() => {
      let tourConfig = {
        targetId: 'test1',
        data: {
          title: 'title',
          content: 'content'
        }
      };

      /* ___Vorbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(0);

      /* ___Änderungen durchführen___ */
      tourHintRef = testComponent.tourHintService.open(tourConfig);
      LuxTestHelper.wait(fixture);

      /* ___Nachbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(1);

      /* ___Änderungen durchführen___ */
      tourHintRef.close(false);
      LuxTestHelper.wait(fixture);

      /* ___Nachbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(0);

      /* ___Änderungen durchführen___ */
      tourHintRef = testComponent.tourHintService.open(tourConfig);
      LuxTestHelper.wait(fixture);

      /* ___Nachbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(1);

      /* ___Änderungen durchführen___ */
      tourHintRef.close(true);
      LuxTestHelper.wait(fixture);

      /* ___Nachbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(0);

      /* ___Änderungen durchführen___ */
      tourHintRef = testComponent.tourHintService.open(tourConfig);
      LuxTestHelper.wait(fixture);

      /* ___Nachbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(0);

      //For other tests
      testComponent.tourHintService.clearDSACacheForConfig(tourConfig);
      LuxTestHelper.wait(fixture);
    }));
  });

  describe('[Custom LuxTourHintComponent]', () => {
    it('Sollte die Tour-Hint öffnen', fakeAsync(() => {
      /* ___Vorbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(0);

      /* ___Änderungen durchführen___ */
      tourHintRef = testComponent.tourHintService.openComponent(MockCustomTourHintComponent, [
        {
          targetId: 'test1',
          data: {
            title1: 'H3',
            content1: 'Cool content',
            title2: 'H4',
            content2: 'Actual content'
          }
        },
        {
          targetId: 'test2',
          data: {
            title1: 'H3 (2)',
            content1: 'Cool content ...',
            title2: 'H4 (2)',
            content2: 'Actual content !'
          }
        }
      ]);
      LuxTestHelper.wait(fixture);

      /* ___Nachbedingungen testen___ */
      expect(document.body.getElementsByTagName('lux-tour-hint').length).toBe(1);
    }));
  });
});

@Component({
  template: ` <div id="test1">Test Div</div>
    <div id="test2">Another Test Div</div>
    <div id="test3">3rd Test Div</div>`
})
class MockTourHintComponent {
  constructor(public tourHintService: LuxTourHintService) {}

  tourHintClosed() {}
}

@Component({
  template: `
    <div>
      <h3>{{ tourHintRef.data.title1 }}</h3>
      <p>{{ tourHintRef.data.content1 }}</p>
      <h4>{{ tourHintRef.data.title2 }}</h4>
      <p>{{ tourHintRef.data.content2 }}</p>

      <button (click)="tourHintRef.prev()">Prev</button>
      <span>{{ tourHintRef.step }}</span>
      <button (click)="tourHintRef.next()">Next</button>
    </div>
  `
})
class MockCustomTourHintComponent {
  constructor(public tourHintRef: LuxTourHintRef) {}
}
