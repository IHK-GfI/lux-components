import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxDetailContentLightComponent } from './lux-detail-content-light.component';

describe('LuxDetailContentLightComponent', () => {
  let component: LuxDetailContentLightComponent;
  let fixture: ComponentFixture<LuxDetailContentLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxDetailContentLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxDetailContentLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
