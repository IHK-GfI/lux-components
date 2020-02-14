/*
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxLayoutModule } from '../../lux-layout/lux-layout.module';

describe('Performancetest', () => {
  let fixture: ComponentFixture<LuxMockComponent>;
  let component: LuxMockComponent;

  beforeEach(() => {
    console.log('********* Start-Time: ' + new Date() + '*********');
  });

  afterEach(() => {
    console.log('********* End-Time: ' + new Date() + '*********');
  });

  it('Mit Testhelper', () => {
    fixture = LuxTestHelper.createComponent(LuxMockComponent, []);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Ohne Testhelper', () => {
    TestBed.configureTestingModule({
      imports: [LuxLayoutModule],
      declarations: [LuxMockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LuxMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});

@Component({
  template: `
    <lux-label>Test</lux-label>`
})
class LuxMockComponent {
}
*/
