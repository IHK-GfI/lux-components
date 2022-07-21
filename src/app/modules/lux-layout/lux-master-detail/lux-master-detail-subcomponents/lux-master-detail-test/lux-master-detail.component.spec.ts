/* eslint-disable max-classes-per-file */
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxMediaQueryObserverService } from '../../../../lux-util/lux-media-query-observer.service';
import { LuxTestHelper } from '../../../../lux-util/testing/lux-test-helper';
import { LuxMasterDetailMobileHelperService } from '../../lux-master-detail-mobile-helper.service';

import { LuxMockMasterDetailMobileHelperService } from './lux-mock-master-detail-mobile-helper.service';
import { LuxMasterDetailComponent } from '../../lux-master-detail.component';

describe('LuxMasterDetailComponent', () => {
  // region #### Hilfsfunktionen fuer diese Testsuite ###

  const defaultWaitTime = 1000;

  const getMasterList = () => fixture.debugElement.query(By.css('lux-list'));

  const getMasterCards = () => fixture.debugElement.queryAll(By.css('lux-list-item > lux-card > mat-card'));

  const createMockDataArray = (dataAmount: number) => {
    const result = [];
    for (let i = 0; i < dataAmount; i++) {
      const obj = {
        id: i,
        title: 'Title ' + i,
        subtitle: 'Subtitle ' + i,
        icon: 'fa-user'
      };
      result.push(obj);
    }
    return result;
  };

  // endregion

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [
        LuxMediaQueryObserverService,
        {
          provide: LuxMasterDetailMobileHelperService,
          useClass: LuxMockMasterDetailMobileHelperService
        }
      ],
      [LuxMockMasterDetailComponent, LuxMockDetailComponent]
    );
  });

  let component: LuxMockMasterDetailComponent;
  let fixture: ComponentFixture<LuxMockMasterDetailComponent>;
  let masterDetail: LuxMasterDetailComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxMockMasterDetailComponent);
    component = fixture.componentInstance;
    masterDetail = fixture.debugElement.query(By.directive(LuxMasterDetailComponent)).componentInstance;
    masterDetail['liveAnnouncer'] = { announce: (...args) => {} } as any;
  });

  it('sollte erstellt werden', () => {
    // Given

    // When
    fixture.detectChanges();

    // Then
    expect(component).toBeTruthy();
  });

  it('sollte die Detail-Ansicht korrekt neurendern, wenn ein selektierter Wert gewechselt wird', fakeAsync(() => {
    // Given
    component.mockItems = createMockDataArray(3);
    LuxTestHelper.wait(fixture, defaultWaitTime);

    const loadDetailSpy = spyOn(component, 'loadDetail');
    const detailMockSpy = spyOn(component, 'detailInit');
    const luxListItemsEl = getMasterCards();

    // When
    LuxTestHelper.click(fixture, luxListItemsEl[2]);
    LuxTestHelper.wait(fixture, defaultWaitTime);

    // Then
    expect(loadDetailSpy).toHaveBeenCalled();
    expect(detailMockSpy).toHaveBeenCalled();

    // When
    LuxTestHelper.click(fixture, luxListItemsEl[1]);
    LuxTestHelper.wait(fixture, defaultWaitTime);

    // Then
    expect(detailMockSpy).toHaveBeenCalledTimes(2);

    // When
    LuxTestHelper.click(fixture, luxListItemsEl[2]);
    LuxTestHelper.wait(fixture, defaultWaitTime);

    // Then
    expect(detailMockSpy).toHaveBeenCalledTimes(3);

    LuxTestHelper.wait(fixture, defaultWaitTime);
  }));

  it('sollte einen Startwert setzen und dahin scrollen', fakeAsync(() => {
    // Given
    component.mockItems = createMockDataArray(50);
    component.detail = component.mockItems[15];
    LuxTestHelper.wait(fixture, defaultWaitTime);

    const masterCards = getMasterCards();
    const masterList = getMasterList();
    const scrollPosition = masterCards.find((v, i) => i === 0).nativeElement.clientHeight * 15;

    // When

    // Then
    expect(masterCards.length).toBe(50, 'Es sollten 50 Elemente in der Masterliste sein.');
    expect((masterCards[15].nativeElement as HTMLElement).parentElement.className).toContain(
      'selected',
      'Der 15te Eintrag der Masterliste sollte selektiert sein.'
    );
    expect(masterList.nativeElement.scrollTop).toBeGreaterThan(scrollPosition - 100);
    expect(masterList.nativeElement.scrollTop).toBeLessThan(scrollPosition + 100);
  }));

  it('sollte einen Startwert setzen, der erst nachgeladen werden muss und dahin scrollen', fakeAsync(() => {
    // Given
    component.mockItems = createMockDataArray(30);
    LuxTestHelper.wait(fixture, defaultWaitTime);

    component.detail = component.mockItems[40];
    LuxTestHelper.wait(fixture, defaultWaitTime);

    const masterCards = getMasterCards();
    const masterList = getMasterList();
    const scrollPosition = masterCards.find((v, i) => i === 0).nativeElement.clientHeight * 20;
    const noDetailEl = fixture.debugElement.query(By.css('.lux-detail-empty')).nativeElement;

    // When

    // Then
    expect(noDetailEl).toBeDefined();

    // When
    component.detail = component.mockItems[20];
    LuxTestHelper.wait(fixture, defaultWaitTime);
    // Then
    expect((masterCards[20].nativeElement as HTMLElement).parentElement.className).toContain(
      'selected',
      'Der 15te Eintrag der Masterliste sollte selektiert sein.'
    );
    expect(masterList.nativeElement.scrollTop).toBeGreaterThan(scrollPosition - 100);
    expect(masterList.nativeElement.scrollTop).toBeLessThan(scrollPosition + 104 /* 4 für Margin */);
  }));

  it('sollte bei leerem Startwert die Anzeige fuer ein leeres Detail anzeigen', fakeAsync(() => {
    // Given
    component.mockItems = createMockDataArray(50);
    LuxTestHelper.wait(fixture, defaultWaitTime);

    const noDetailEl = fixture.debugElement.query(By.css('.lux-detail-empty')).nativeElement;
    // When

    // Then
    expect(noDetailEl).toBeDefined('Es sollte eine Anzeige fuer ein leeres Detail angezeigt werden.');
  }));

  it('sollte moeglich sein die Selektion anzupassen', fakeAsync(() => {
    // Given
    component.mockItems = createMockDataArray(10);
    component.detail = component.mockItems[0];
    LuxTestHelper.wait(fixture, defaultWaitTime);

    spyOnProperty(document.activeElement, 'className').and.returnValue('lux-master-container');

    // When
    component.masterDetail.selectedPosition = 1;
    LuxTestHelper.wait(fixture, defaultWaitTime);

    // Then
    expect(component.detail).toEqual(component.mockItems[1], 'Das 2te Element der Masterliste sollte selektiert sein.');

    // When
    component.masterDetail.selectedPosition = 2;
    LuxTestHelper.wait(fixture, defaultWaitTime);

    // Then
    expect(component.detail).toEqual(component.mockItems[2], 'Das 3te Element der Masterliste sollte selektiert sein.');

    // When
    component.masterDetail.selectedPosition = 1;
    LuxTestHelper.wait(fixture, defaultWaitTime);

    // Then
    expect(component.detail).toEqual(component.mockItems[1], 'Das 2te Element der Masterliste sollte wieder selektiert sein.');

    discardPeriodicTasks();
  }));

  it('Zuerst das Template laden, dann luxSelectedDetailChange-Event emitten', fakeAsync(() => {
    // Vorbedingungen testen
    component.mockItems = createMockDataArray(10);
    LuxTestHelper.wait(fixture, defaultWaitTime);

    const loadDetailSpy = spyOn(component, 'loadDetail').and.callFake(() => {
      // Nachbedingungen prüfen
      detailId = fixture.debugElement.query(By.css('#detail-id'));
      expect(detailId).toBeDefined();
      expect(detailId.nativeElement.textContent).toEqual('detail: 1');
    });

    let detailId = fixture.debugElement.query(By.css('#detail-id'));
    expect(detailId).toBeFalsy();
    expect(loadDetailSpy).toHaveBeenCalledTimes(0);

    // Änderungen durchführen
    component.detail = component.mockItems[1];
    LuxTestHelper.wait(fixture, defaultWaitTime);
  }));

  it('Sollte bei Änderungen an der Master-Liste korrekt zum selektierten Detail springen', fakeAsync(() => {
    // Vorbedingungen testen
    component.mockItems = createMockDataArray(10);
    component.detail = component.mockItems[2];
    LuxTestHelper.wait(fixture, defaultWaitTime);

    expect(masterDetail.selectedPosition).toBe(2);

    // Änderungen durchführen
    component.mockItems.reverse();
    LuxTestHelper.wait(fixture, defaultWaitTime);

    // Nachbedingungen prüfen
    expect(masterDetail.selectedPosition).toBe(7);

    flush();
  }));

  describe('sollte die Masterliste', () => {
    let masterList: HTMLElement;
    let masterContainer: HTMLElement;

    beforeEach(fakeAsync(() => {
      component.mockItems = createMockDataArray(10);
      LuxTestHelper.wait(fixture, defaultWaitTime);

      masterList = getMasterList().nativeElement;
      masterContainer = fixture.debugElement.query(By.css('.lux-master-container')).nativeElement;
    }));

    it('Ein- und Ausklappen beim Klick', fakeAsync(() => {
      // Given
      component.detail = component.mockItems[0];
      LuxTestHelper.wait(fixture, defaultWaitTime);

      const expandButton = fixture.debugElement.query(By.css('.lux-master-header-collapse button')).nativeElement;

      // When
      LuxTestHelper.dispatchFakeEvent(expandButton, 'click');
      LuxTestHelper.wait(fixture, defaultWaitTime);

      // Then
      expect(masterContainer.style['max-width']).toEqual('5%', 'Die Breite der Masterliste sollte bei 5% liegen.');

      // When
      LuxTestHelper.dispatchFakeEvent(expandButton, 'click');
      LuxTestHelper.wait(fixture, defaultWaitTime);

      // Then
      expect(masterContainer.style['max-width']).toEqual('30%', 'Die Breite der Masterliste sollte bei 30% liegen.');
    }));

    it('Keinen Toggle-Button für das Ein- und Ausklappen in Mobilansicht haben', fakeAsync(
      inject([LuxMasterDetailMobileHelperService], (mobileHelper: LuxMockMasterDetailMobileHelperService) => {
        // Given
        mobileHelper.mockMobile = false;
        component.detail = component.mockItems[0];
        LuxTestHelper.wait(fixture, defaultWaitTime);

        let expandButton = fixture.debugElement.query(By.css('.lux-master-header-collapse button'));

        expect(expandButton).not.toBeNull();

        // When
        mobileHelper.mockMobile = true;
        LuxTestHelper.wait(fixture, defaultWaitTime);

        // Then
        expandButton = fixture.debugElement.query(By.css('.lux-master-header-collapse button'));

        expect(expandButton).toBeNull();
      })
    ));

    it('Einklappen beim Wechsel von Desktop in Mobil', fakeAsync(
      inject([LuxMasterDetailMobileHelperService], (mobileHelper: LuxMockMasterDetailMobileHelperService) => {
        // Given
        const masterCards = getMasterCards();

        // When

        // Then
        expect(masterContainer.style['max-width']).toEqual('30%', 'Die Breite der Masterliste sollte bei 30% liegen.');

        // When
        mobileHelper.mockMobile = true;
        LuxTestHelper.dispatchFakeEvent(masterCards.find((v, i) => i === 0).nativeElement, 'click');
        LuxTestHelper.wait(fixture, defaultWaitTime);

        // Then
        expect(masterContainer.style['max-width']).toEqual('', 'Die Breite der Masterliste sollte bei 0px liegen.');

        discardPeriodicTasks();
      })
    ));

    it('Einklappen beim Laden in Mobilansicht, wenn ein Detail selektiert ist', fakeAsync(
      inject([LuxMasterDetailMobileHelperService], (mobileHelper: LuxMockMasterDetailMobileHelperService) => {
        // Given
        const masterCards = getMasterCards();
        mobileHelper.mockMobile = true;

        // When
        LuxTestHelper.dispatchFakeEvent(masterCards.find((v, i) => i === 0).nativeElement, 'click');
        LuxTestHelper.wait(fixture, defaultWaitTime);

        // Then
        expect(masterContainer.style['max-width']).toEqual('', 'Die Breite der Masterliste sollte bei 0px liegen.');

        discardPeriodicTasks();
      })
    ));

    it('Offen lassen beim Laden in Mobilansicht, wenn kein Detail selektiert ist', fakeAsync(
      inject([LuxMasterDetailMobileHelperService], (mobileHelper: LuxMockMasterDetailMobileHelperService) => {
        // Given
        component.detail = undefined;
        mobileHelper.mockMobile = true;
        mobileHelper.closeMaster();

        // When
        LuxTestHelper.wait(fixture, defaultWaitTime);

        // Then
        expect(masterContainer.style['max-width']).toEqual('100%', 'Die Breite der Masterliste sollte bei 0px liegen.');
      })
    ));

    it('Ein- und Ausklappen, wenn kein Detail selektiert ist', fakeAsync(
      inject([LuxMasterDetailMobileHelperService], (mobileHelper: LuxMockMasterDetailMobileHelperService) => {
        // Given
        component.detail = undefined;
        mobileHelper.mockMobile = false;
        mobileHelper.closeMaster();

        // When
        LuxTestHelper.wait(fixture, defaultWaitTime);

        // Then
        expect(masterContainer.style['max-width']).toEqual('5%', 'Die Breite der Masterliste sollte bei 5% liegen.');

        // When
        mobileHelper.openMaster();
        LuxTestHelper.wait(fixture, defaultWaitTime);

        // Then
        expect(masterContainer.style['max-width']).toEqual('30%', 'Die Breite der Masterliste sollte bei 5% liegen.');
      })
    ));

    it('Selektiertes Detail sollte leer sein, wenn die Masterliste geleert wird', fakeAsync(() => {
      // Given
      component.mockItems = createMockDataArray(50);
      component.detail = component.mockItems[15];
      LuxTestHelper.wait(fixture, defaultWaitTime);
      let masterCards = getMasterCards();

      // When

      // Then
      expect(masterCards.length).toBe(50, 'Es sollten 50 Elemente in der Masterliste sein.');
      expect((masterCards[15].nativeElement as HTMLElement).parentElement.classList).toContain(
        'lux-list-item-selected',
        'Der 15te Eintrag der Masterliste sollte selektiert sein.'
      );

      // When
      component.mockItems = [];
      LuxTestHelper.wait(fixture, defaultWaitTime);
      masterCards = getMasterCards();
      const noDetailLabel = fixture.debugElement.query(By.css('.lux-detail-empty-icon-text'));
      const noMasterElementsLabel = fixture.debugElement.query(By.css('.lux-list-empty-icon-text'));

      // Then
      expect(masterCards.length).toBe(0, 'Es sollten 0 Elemente in der Masterliste sein.');
      expect(component.detail).toBeUndefined('Es sollte kein Eintrag mehr selektiert sein.');
      expect(masterDetail.luxSelectedDetail).toBeUndefined('Die Komponente sollte kein selektiertes Detail besitzen.');
      expect(noDetailLabel).toBeDefined('Es sollte ein Text angezeigt werden, wenn das Detail nicht gesetzt ist.');
      expect(noMasterElementsLabel).toBeDefined('Es sollte ein Text angezeigt werden, wenn die Masterliste leer ist.');

      discardPeriodicTasks();
    }));
  });
});

@Component({
  selector: 'lux-mock-detail',
  template: '<h2>Mock-Detail</h2><ng-content></ng-content>'
})
class LuxMockDetailComponent implements OnInit {
  @Output() init: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.init.emit();
  }
}

@Component({
  selector: 'lux-mock-master-detail',
  template:
    '<div fxLayout="column" style="height: 100vh;">' +
    '<lux-master-detail   fxFlex="grow" [luxSelectedDetail]="detail"' +
    '                     [luxMasterList]="mockItems" (luxSelectedDetailChange)="loadDetail($event)">' +
    '    <lux-master-simple luxTitleProp="title" luxSubTitleProp="subtitle">' +
    '      <ng-template #luxSimpleIcon let-master>' +
    '        <lux-icon [luxIconName]="master.icon"></lux-icon>' +
    '      </ng-template>' +
    '      <ng-template #luxSimpleContent let-master>' +
    '        <p>Masteransicht {{ master.id }}</p>' +
    '      </ng-template>' +
    '    </lux-master-simple>' +
    '    <lux-detail-view #detailView>' +
    '      <ng-template let-detail #detailTemplate>' +
    '         <lux-mock-detail #detailMock (init)="detailInit()"><p id="detail-id">detail: {{ detail.id }}</p></lux-mock-detail>' +
    '      </ng-template>' +
    '     </lux-detail-view>' +
    '</lux-master-detail>' +
    '</div>'
})
class LuxMockMasterDetailComponent {
  mockItems: any[];
  detail: any;
  @ViewChild('detailMock') detailMock: LuxMockDetailComponent;
  @ViewChild(LuxMasterDetailComponent) masterDetail: LuxMasterDetailComponent;

  constructor() {}

  loadDetail(eventData: any) {
    this.detail = eventData;
  }

  detailInit() {
    // Ich bin nur hier damit der Test weiss ob das Detail initialisiert wurde...
  }
}
