import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { LuxImageComponent } from './lux-image.component';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';

describe('LuxImageComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [MockComponent]);
  });

  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
  });

  it('Sollte den Bild-Pfad auf /assets umleiten', () => {
    // Given
    component.href = '/png/example.png';
    // When
    fixture.detectChanges();
    // Then
    expect(component.imageCmp.luxImageSrc).toEqual(
      'assets/png/example.png',
      'Der Pfad zum Assets-Ordner sollte hinzugefügt werden!'
    );
  });

  it('Sollte mehrfache und anführende Schrägstriche entfernen', () => {
    // Given
    component.href = '/assets///////png//example.png';
    // When
    fixture.detectChanges();
    // Then
    expect(component.imageCmp.luxImageSrc).toEqual(
      'assets/png/example.png',
      'Doppelte Backslashes sollten entfernt werden!'
    );
  });

  it('Sollte den Pfad zum Bild enthalten', fakeAsync(() => {
    // Given
    component.href = 'assets/png/example.png';
    // When
    fixture.detectChanges();
    const imageEl = fixture.debugElement.query(By.css('.lux-image'));
    // Then
    expect(imageEl.nativeElement.src).toContain(
      'assets/png/example.png',
      'Der Pfad muss zum Bild im Assets-Ordner weisen!'
    );
  }));

  it('Sollte den Pfad ohne Bearbeitung anzeigen [luxRawSrc]', fakeAsync(() => {
    // Given
    component.href = '/fb/myimage.png';
    component.raw = true;
    // When
    fixture.detectChanges();
    const imageEl = fixture.debugElement.query(By.css('.lux-image'));
    // Then
    expect(imageEl.nativeElement.src).toContain('/fb/myimage.png');
  }));
});

@Component({
  selector: 'mock-component',
  template: `
    <lux-image [luxImageSrc]="href" [luxRawSrc]="raw"></lux-image>
  `
})
class MockComponent {
  href: string;
  raw: boolean;
  @ViewChild(LuxImageComponent) imageCmp: LuxImageComponent;
}
