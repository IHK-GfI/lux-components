import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LuxProgressComponent } from './lux-progress.component';
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
      // Vorbedingungen prüfen
      // Standardmäßig immer ProgressBar
      const progressbar = fixture.debugElement.query(By.css('mat-progress-bar'));
      expect(progressbar).not.toBe(null, 'Bedingung 1');
      // Änderungen durchführen
      // n.A.
      // Nachbedingungen prüfen
      // n.A.
    });

    it('Sollte die CSS-Klassen für Farben eintragen', () => {
      // Vorbedingungen prüfen
      const blue = fixture.debugElement.query(By.css('.lux-bg-color-blue'));
      expect(blue).toBeDefined('Vorbedingung 1');
      // Änderungen durchführen
      component.color = 'red';
      fixture.detectChanges();
      // Nachbedingungen prüfen
      const red = fixture.debugElement.query(By.css('.lux-bg-color-red'));
      expect(red).toBeDefined('Nachbedingung 1');
      // Änderungen durchführen
      component.color = 'yellow';
      fixture.detectChanges();
      // Nachbedingungen prüfen
      const yellow = fixture.debugElement.query(By.css('.lux-bg-color-yellow'));
      expect(yellow).toBeDefined('Nachbedingung 2');
    });

    it('Sollte den Wert ändern (mode = determinate)', fakeAsync(() => {
      // Vorbedingungen prüfen
      component.mode = 'determinate';
      const matProgress: MatProgressBar = fixture.debugElement.query(By.directive(MatProgressBar)).componentInstance;
      LuxTestHelper.wait(fixture);
      expect(matProgress.value).toBe(0, 'Vorbedingung 1');
      // Änderungen durchführen
      component.value = 10;
      LuxTestHelper.wait(fixture);
      // Nachbedingungen prüfen
      expect(matProgress.value).toBe(10, 'Nachbedingung 1');
    }));
  });

  describe('Als Spinner', () => {
    it('Sollte einen Spinner erzeugen', () => {
      // Vorbedingungen prüfen
      // Standardmäßig immer ProgressBar
      let progressbar = fixture.debugElement.query(By.css('mat-progress-bar'));
      let spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
      expect(progressbar).not.toBe(null, 'Vorbedingung 1');
      expect(spinner).toBe(null, 'Vorbedingung 2');
      // Änderungen durchführen
      component.type = 'Spinner';
      fixture.detectChanges();
      // Nachbedingungen prüfen
      progressbar = fixture.debugElement.query(By.css('mat-progress-bar'));
      spinner = fixture.debugElement.query(By.css('mat-progress-spinner'));
      expect(progressbar).toBe(null, 'Nachbedingung 1');
      expect(spinner).toBeDefined('Nachbedingung 2');
    });

    it('Sollte die CSS-Klassen für Farben eintragen', fakeAsync(() => {
      // Vorbedingungen prüfen
      component.type = 'Spinner';
      fixture.detectChanges();
      const blue = fixture.debugElement.query(By.css('.lux-bg-color-blue'));
      expect(blue).toBeDefined('Vorbedingung 1');
      // Änderungen durchführen
      component.color = 'red';
      fixture.detectChanges();
      // Nachbedingungen prüfen
      const red = fixture.debugElement.query(By.css('.lux-bg-color-red'));
      expect(red).toBeDefined('Nachbedingung 1');
      // Änderungen durchführen
      component.color = 'yellow';
      fixture.detectChanges();
      // Nachbedingungen prüfen
      const yellow = fixture.debugElement.query(By.css('.lux-bg-color-yellow'));
      expect(yellow).toBeDefined('Nachbedingung 2');
    }));

    it('Sollte den Wert ändern (mode = determinate)', fakeAsync(() => {
      // Vorbedingungen prüfen
      component.type = 'Spinner';
      fixture.detectChanges();

      const matProgress: MatProgressBar = fixture.debugElement.query(By.directive(MatProgressSpinner))
        .componentInstance;
      component.mode = 'determinate';
      LuxTestHelper.wait(fixture);
      expect(matProgress.value).toBe(0, 'Vorbedingung 1');
      // Änderungen durchführen
      component.value = 10;
      LuxTestHelper.wait(fixture);
      // Nachbedingungen prüfen
      expect(matProgress.value).toBe(10, 'Nachbedingung 1');
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
  type;
  mode;
  color;
  size;
  value;

  constructor() {}
}
