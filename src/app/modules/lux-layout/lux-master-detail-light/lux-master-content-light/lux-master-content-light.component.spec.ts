import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxMasterContentLightComponent } from './lux-master-content-light.component';

describe('LuxMasterContentLightComponent', () => {
  let component: LuxMasterContentLightComponent;
  let fixture: ComponentFixture<LuxMasterContentLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxMasterContentLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxMasterContentLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
