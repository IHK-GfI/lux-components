import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LuxProgressColor } from "../../lux-util/lux-colors.enum";
import { LuxProgressComponent, LuxProgressModeType, LuxProgressSizeType, LuxProgressType } from "./lux-progress.component";
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

describe('LuxProgressComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [LuxMockProgressBarComponent]);
  });

  let component: LuxMockProgressBarComponent;
  let fixture: ComponentFixture<LuxMockProgressBarComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxMockProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Als ProgressBar', () => {
    it('Sollte eine ProgressBar erzeugen', () => {
      // Vorbedingungen testen
      // Standardmäßig immer ProgressBar
      const progressbar = fixture.debugElement.query(By.css('mat-progress-bar'));
      expect(progressbar).not.toBeNull();
      // Änderungen durchführen
      // n.A.
      // Nachbedingungen prüfen
      // n.A.
    });

    it('Sollte die CSS-Klassen für Farben eintragen', () => {
      // Vorbedingungen testen
      const blue = fixture.debugElement.query(By.css('.lux-bg-color-blue'));
      expect(blue).toBeDefined();
      // Änderungen durchführen
      component.color = 'red';
      fixture.detectChanges();
      // Nachbedingungen prüfen
      const red = fixture.debugElement.query(By.css('.lux-bg-color-red'));
      expect(red).toBeDefined();
      // Änderungen durchführen
      component.color = 'purple';
      fixture.detectChanges();
      // Nachbedingungen prüfen
      const purple = fixture.debugElement.query(By.css('.lux-bg-color-purple'));
      expect(purple).toBeDefined();
    });

    it('Sollte den Wert ändern (mode = determinate)', fakeAsync(() => {
      // Vorbedingungen testen
      component.mode = 'determinate';
      const matProgress: MatProgressBar = fixture.debugElement.query(By.directive(MatProgressBar)).componentInstance;
      LuxTestHelper.wait(fixture);
      expect(matProgress.value).toBe(0);
      // Änderungen durchführen
      component.value = 10;
      LuxTestHelper.wait(fixture);
      // Nachbedingungen prüfen
      expect(matProgress.value).toBe(10);
    }));
  });

  describe('Als Spinner', () => {
    it('Sollte einen Spinner erzeugen', () => {
      // Vorbedingungen testen
      // Standardmäßig immer ProgressBar
      let progressbar = fixture.debugElement.query(By.css('mat-progress-bar'));
      let spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
      expect(progressbar).not.toBeNull();
      expect(spinner).toBeNull();
      // Änderungen durchführen
      component.type = 'Spinner';
      fixture.detectChanges();
      // Nachbedingungen prüfen
      progressbar = fixture.debugElement.query(By.css('mat-progress-bar'));
      spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
      expect(progressbar).toBeNull();
      expect(spinner).toBeDefined();
    });

    it('Sollte die CSS-Klassen für Farben eintragen', fakeAsync(() => {
      // Vorbedingungen testen
      component.type = 'Spinner';
      fixture.detectChanges();
      const blue = fixture.debugElement.query(By.css('.lux-bg-color-blue'));
      expect(blue).toBeDefined();
      // Änderungen durchführen
      component.color = 'red';
      fixture.detectChanges();
      // Nachbedingungen prüfen
      const red = fixture.debugElement.query(By.css('.lux-bg-color-red'));
      expect(red).toBeDefined();
      // Änderungen durchführen
      component.color = 'purple';
      fixture.detectChanges();
      // Nachbedingungen prüfen
      const purple = fixture.debugElement.query(By.css('.lux-bg-color-purple'));
      expect(purple).toBeDefined();
    }));

    it('Sollte den Wert ändern (mode = determinate)', fakeAsync(() => {
      // Vorbedingungen testen
      component.type = 'Spinner';
      fixture.detectChanges();

      const matProgress: MatProgressBar = fixture.debugElement.query(By.directive(MatProgressSpinner))
        .componentInstance;
      component.mode = 'determinate';
      LuxTestHelper.wait(fixture);
      expect(matProgress.value).toBe(0);
      // Änderungen durchführen
      component.value = 10;
      LuxTestHelper.wait(fixture);
      // Nachbedingungen prüfen
      expect(matProgress.value).toBe(10);
    }));
  });
});

@Component({
  selector: 'lux-mock-progress-bar',
  template:
    '<lux-progress [luxType]="type" [luxMode]="mode" [luxColor]="color"' +
    '                    [luxSize]="size" [luxValue]="value"></lux-progress>'
})
class LuxMockProgressBarComponent {
  type?: LuxProgressType;
  mode?: LuxProgressModeType;
  color?: LuxProgressColor;
  size?: LuxProgressSizeType;
  value = 0;

  constructor() {}
}
