import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxMasterDetailLightComponent } from './lux-master-detail-light.component';

describe('LuxMasterDetailLightComponent', () => {
  let component: LuxMasterDetailLightComponent;
  let fixture: ComponentFixture<LuxMasterDetailLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxMasterDetailLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxMasterDetailLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
