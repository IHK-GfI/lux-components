import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxDetailFooterLightComponent } from './lux-detail-footer-light.component';

describe('LuxDetailFooterLightComponent', () => {
  let component: LuxDetailFooterLightComponent;
  let fixture: ComponentFixture<LuxDetailFooterLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxDetailFooterLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxDetailFooterLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
