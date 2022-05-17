import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxDetailHeaderLightComponent } from './lux-detail-header-light.component';

describe('LuxDetailHeaderLightComponent', () => {
  let component: LuxDetailHeaderLightComponent;
  let fixture: ComponentFixture<LuxDetailHeaderLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxDetailHeaderLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxDetailHeaderLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
