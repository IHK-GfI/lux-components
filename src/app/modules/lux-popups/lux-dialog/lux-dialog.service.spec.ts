import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { LuxDialogService } from './lux-dialog.service';
import { Component, NgModule, TemplateRef, ViewChild } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxOverlayHelper } from '../../lux-util/testing/lux-test-overlay-helper';
import { LuxDialogRef } from './lux-dialog-model/lux-dialog-ref.class';
import { LuxPopupsModule } from '../lux-popups.module';
import { LuxActionModule } from '../../lux-action/lux-action.module';

describe('LuxDialogService', () => {
  LuxTestHelper.configureTestSuite();

  beforeAll(async () => {
    LuxTestHelper.configureTestModule([LuxDialogService], [MockDialogComponent], [TestModule]);
  });

  let fixture: ComponentFixture<MockDialogComponent>;

  let testComponent: MockDialogComponent;
  let overlayHelper: LuxOverlayHelper;
  let dialogRef: LuxDialogRef;

  const waitForDialogClosure = () => {
    LuxTestHelper.wait(fixture);
    flush();
    discardPeriodicTasks();
    LuxTestHelper.wait(fixture);
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(MockDialogComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    overlayHelper = new LuxOverlayHelper();
    fixture.detectChanges();
  });

  afterEach(fakeAsync(() => {
    dialogRef.closeDialog(true);
    waitForDialogClosure();
  }));

  describe('[LuxDialogPresetComponent]', () => {
    it('Sollte den Dialog öffnen', fakeAsync(() => {
      // Vorbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);

      // Änderungen durchführen
      dialogRef = testComponent.dialogService.open({});
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).not.toBe(null);
    }));

    it('Sollte den Titel setzen', fakeAsync(() => {
      dialogRef = testComponent.dialogService.open({
        title: 'Hallo Welt'
      });
      LuxTestHelper.wait(fixture);

      expect(overlayHelper.selectOneFromOverlay('lux-dialog-title')).not.toBe(null);
      expect(overlayHelper.selectOneFromOverlay('lux-dialog-title').textContent.trim()).toEqual('Hallo Welt');
    }));

    it('Sollte den Content setzen', fakeAsync(() => {
      dialogRef = testComponent.dialogService.open({
        content: 'Hallo Welt'
      });
      LuxTestHelper.wait(fixture);

      expect(overlayHelper.selectOneFromOverlay('lux-dialog-content')).not.toBe(null);
      expect(overlayHelper.selectOneFromOverlay('lux-dialog-content').textContent.trim()).toEqual('Hallo Welt');
    }));

    it('Sollte den Content via TemplateRef setzen', fakeAsync(() => {
      dialogRef = testComponent.dialogService.open({
        contentTemplate: testComponent.templateRef
      });
      LuxTestHelper.wait(fixture);

      expect(overlayHelper.selectOneFromOverlay('lux-dialog-content')).not.toBe(null);
      expect(overlayHelper.selectOneFromOverlay('lux-dialog-content').textContent.trim()).toEqual('Hallo Welt');
    }));

    it('Sollte die ConfirmAction beachten', fakeAsync(() => {
      // Vorbedingungen prüfen
      dialogRef = testComponent.dialogService.open({
        confirmAction: undefined
      });
      LuxTestHelper.wait(fixture);

      expect(overlayHelper.selectOneFromOverlay('.lux-dialog-preset-confirm')).toBe(null);

      // Änderungen durchführen
      dialogRef.closeDialog(true);
      waitForDialogClosure();

      dialogRef = testComponent.dialogService.open({
        confirmAction: {
          label: 'Hallo Welt',
          raised: true
        }
      });
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog-preset-confirm')).not.toBe(null);
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog-preset-confirm .mat-raised-button')).not.toBe(null);
      expect(
        overlayHelper.selectOneFromOverlay('.lux-dialog-preset-confirm .lux-button-label').textContent.trim()
      ).toEqual('Hallo Welt');
    }));

    it('Sollte die DeclineAction beachten', fakeAsync(() => {
      // Vorbedingungen prüfen
      dialogRef = testComponent.dialogService.open({
        declineAction: undefined
      });
      LuxTestHelper.wait(fixture);

      expect(overlayHelper.selectOneFromOverlay('.lux-dialog-preset-decline')).toBe(null);

      // Änderungen durchführen
      dialogRef.closeDialog(true);
      waitForDialogClosure();

      dialogRef = testComponent.dialogService.open({
        declineAction: {
          label: 'Hallo Welt',
          raised: true
        }
      });
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog-preset-decline')).not.toBe(null);
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog-preset-decline .mat-raised-button')).not.toBe(null);
      expect(
        overlayHelper.selectOneFromOverlay('.lux-dialog-preset-decline .lux-button-label').textContent.trim()
      ).toEqual('Hallo Welt');
    }));

    it('Sollte den Dialog schließen', fakeAsync(() => {
      // Vorbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);

      // Änderungen durchführen
      dialogRef = testComponent.dialogService.open({});
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).not.toBe(null);

      // Änderungen durchführen
      dialogRef.closeDialog(true);
      waitForDialogClosure();

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);
    }));

    it('Sollte dialogConfirmed aufrufen', fakeAsync(() => {
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);

      // Änderungen durchführen
      dialogRef = testComponent.dialogService.open({
        confirmAction: {
          label: 'Hallo Welt'
        }
      });

      LuxTestHelper.wait(fixture);
      dialogRef.dialogConfirmed.subscribe(() => {
        testComponent.dialogConfirmed();
      });

      const spy = spyOn(testComponent, 'dialogConfirmed');
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).not.toBe(null);
      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      overlayHelper.selectOneFromOverlay('.lux-dialog-preset-confirm button').click();
      waitForDialogClosure();

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);
      expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('Sollte declineConfirmed aufrufen', fakeAsync(() => {
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);

      // Änderungen durchführen
      dialogRef = testComponent.dialogService.open({
        declineAction: {
          label: 'Hallo Welt'
        }
      });

      LuxTestHelper.wait(fixture);
      dialogRef.dialogDeclined.subscribe(() => {
        testComponent.dialogDeclined();
      });

      const spy = spyOn(testComponent, 'dialogDeclined');
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).not.toBe(null);
      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      overlayHelper.selectOneFromOverlay('.lux-dialog-preset-decline button').click();
      waitForDialogClosure();

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);
      expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('Sollte dialogClosed aufrufen', fakeAsync(() => {
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);

      // Änderungen durchführen
      dialogRef = testComponent.dialogService.open({
        confirmAction: {
          label: 'Hallo Welt'
        }
      });

      LuxTestHelper.wait(fixture);
      dialogRef.dialogClosed.subscribe(() => {
        testComponent.dialogClosed();
      });

      const spy = spyOn(testComponent, 'dialogClosed');
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).not.toBe(null);
      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      overlayHelper.selectOneFromOverlay('.lux-dialog-preset-confirm button').click();
      waitForDialogClosure();

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);
      expect(spy).toHaveBeenCalledTimes(1);
    }));
  });

  describe('[LuxDialogStructureComponent]', () => {
    it('Sollte den Dialog öffnen', fakeAsync(() => {
      // Vorbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);

      // Änderungen durchführen
      dialogRef = testComponent.dialogService.openComponent(MockCustomDialogComponent);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).not.toBe(null);
      expect(overlayHelper.selectOneFromOverlay('.mock-dialog-title').textContent.trim()).toEqual('Title');
      expect(overlayHelper.selectOneFromOverlay('.mock-dialog-content').textContent.trim()).toEqual('Content');
      expect(overlayHelper.selectOneFromOverlay('.mock-dialog-action-ok')).not.toBe(null);
    }));

    it('Sollte den Dialog schließen', fakeAsync(() => {
      // Vorbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);

      // Änderungen durchführen
      dialogRef = testComponent.dialogService.openComponent(MockCustomDialogComponent);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).not.toBe(null);

      // Änderungen durchführen
      overlayHelper.selectOneFromOverlay('.mock-dialog-action-ok button').click();
      waitForDialogClosure();

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);
    }));

    it('Sollte dialogClosed aufrufen', fakeAsync(() => {
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);

      // Änderungen durchführen
      dialogRef = testComponent.dialogService.openComponent(MockCustomDialogComponent);

      LuxTestHelper.wait(fixture);
      dialogRef.dialogClosed.subscribe(() => {
        testComponent.dialogClosed();
      });

      const spy = spyOn(testComponent, 'dialogClosed');
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).not.toBe(null);
      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      overlayHelper.selectOneFromOverlay('.mock-dialog-action-ok button').click();
      waitForDialogClosure();

      // Nachbedingungen prüfen
      expect(overlayHelper.selectOneFromOverlay('.lux-dialog')).toBe(null);
      expect(spy).toHaveBeenCalledTimes(1);
    }));
  });
});

@Component({
  template: `
    <ng-template #testContentTemplate><span>Hallo Welt</span></ng-template>
  `
})
class MockDialogComponent {
  @ViewChild('testContentTemplate') templateRef: TemplateRef<any>;

  constructor(public dialogService: LuxDialogService) {}

  dialogConfirmed() {}

  dialogDeclined() {}

  dialogClosed() {}
}

@Component({
  template: `
    <lux-dialog-structure>
      <lux-dialog-title>
        <span class="mock-dialog-title">Title</span>
      </lux-dialog-title>
      <lux-dialog-content>
        <span class="mock-dialog-content">Content</span>
      </lux-dialog-content>
      <lux-dialog-actions>
        <lux-button class="mock-dialog-action-ok" luxLabel="OK" (luxClicked)="dialogRef.closeDialog(true)"></lux-button>
      </lux-dialog-actions>
    </lux-dialog-structure>
  `
})
class MockCustomDialogComponent {
  constructor(public dialogRef: LuxDialogRef) {}

  dialogClosed() {}
}

@NgModule({
  declarations: [MockCustomDialogComponent],
  entryComponents: [MockCustomDialogComponent],
  imports: [LuxPopupsModule, LuxActionModule]
})
class TestModule {}
