/* eslint-disable max-classes-per-file */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NgModule, Injectable } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, inject, TestBed } from '@angular/core/testing';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { LuxActionModule } from '../../../lux-action/lux-action.module';
import { LuxLayoutModule } from '../../../lux-layout/lux-layout.module';
import { LuxMasterDetailMobileHelperService } from '../../../lux-layout/lux-master-detail/lux-master-detail-mobile-helper.service';
import { LuxStorageService } from '../../../lux-util/lux-storage.service';
import { LuxTestHelper } from '../../../lux-util/testing/lux-test-helper';
import { LuxPopupsModule } from '../../lux-popups.module';
import { LuxSnackbarService } from '../lux-snackbar.service';
import { LuxSnackbarComponent } from './lux-snackbar.component';

describe('LuxSnackbarComponent', () => {

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MockSnackbarModule, HttpClientTestingModule]
    });
  });

  let fixture: ComponentFixture<MockSnackbarComponent>;
  let testComponent: MockSnackbarComponent;
  let snackbarService: LuxSnackbarService;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(MockSnackbarComponent);
    testComponent = fixture.componentInstance;
    LuxTestHelper.wait(fixture);
    flush();
    discardPeriodicTasks();
  }));

  beforeEach(inject([LuxSnackbarService], (service: LuxSnackbarService) => {
    snackbarService = service;
  }));

  it('Sollte nicht den lux-app-header überlagern', fakeAsync(() => {
    // Vorbedingungen testen
    const rightNavTrigger: HTMLButtonElement = fixture.debugElement.query(By.css('.lux-menu-trigger')).nativeElement;
    const spy = spyOn(rightNavTrigger, 'click').and.callThrough();
    const x = rightNavTrigger.getBoundingClientRect().left;
    const y = rightNavTrigger.getBoundingClientRect().top;

    const toggleElement = findToggleElement(document.elementFromPoint(x, y) as any);

    toggleElement.click();
    LuxTestHelper.wait(fixture);
    expect(spy).toHaveBeenCalledTimes(1);

    // Änderungen durchführen
    snackbarService.open(10000, {
      text: 'Hallo Test'
    });
    LuxTestHelper.wait(fixture);

    // Nachbedingungen testen
    toggleElement.click();
    LuxTestHelper.wait(fixture, 11000);

    expect(spy).toHaveBeenCalledTimes(2);
  }));
});

const findToggleElement = (toggleElement: any) => {
  // Wenn das Element nicht die richtige CSS-Klasse hat, prüfe den Parent und
  // die Children (browserabhängig welches gecatched wird).
  if (toggleElement.className.indexOf('lux-menu-trigger') === -1) {
    if (toggleElement.parentElement.className.indexOf('lux-menu-trigger') > -1) {
      toggleElement = toggleElement.parentElement;
    } else {
      if (toggleElement.children) {
        for (let i = 0; i < toggleElement.children.length; i++) {
          const child = toggleElement.children.item(i);
          if (child.className.indexOf('lux-menu-trigger') > -1) {
            toggleElement = child;
          }
        }
      }
    }
  }
  return toggleElement;
};

@Component({
  template: `
    <lux-app-header>
      <lux-side-nav></lux-side-nav>
      <lux-app-header-right-nav>
        <lux-menu-item luxLabel="Test"></lux-menu-item>
      </lux-app-header-right-nav>
    </lux-app-header>
  `,
  providers: []
})
class MockSnackbarComponent {}

@Injectable()
class MockMobileHelperService {
  masterCollapsedObservable = of({});
  isRegisteredObservable = of({});
  hasValueObservable = of({});

  isMobile() {
    return false;
  }
}

@Injectable()
class MockStorageService {
  getItem() {
    return 1;
  }
}

@NgModule({
    imports: [MatSnackBarModule, LuxPopupsModule, LuxLayoutModule, LuxActionModule, NoopAnimationsModule],
    exports: [],
    providers: [
        { provide: LuxMasterDetailMobileHelperService, useClass: MockMobileHelperService },
        { provide: LuxStorageService, useClass: MockStorageService }
    ],
    declarations: [MockSnackbarComponent]
})
class MockSnackbarModule {}
