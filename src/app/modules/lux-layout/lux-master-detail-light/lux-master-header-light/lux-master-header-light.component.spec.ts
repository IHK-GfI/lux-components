import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxMasterHeaderLightComponent } from './lux-master-header-light.component';

describe('LuxMasterHeaderLightComponent', () => {
  let component: LuxMasterHeaderLightComponent;
  let fixture: ComponentFixture<LuxMasterHeaderLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxMasterHeaderLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxMasterHeaderLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
