import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxCheckboxAcComponent } from './lux-checkbox-ac.component';

describe('LuxCheckboxAcComponent', () => {
  let component: LuxCheckboxAcComponent;
  let fixture: ComponentFixture<LuxCheckboxAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxCheckboxAcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxCheckboxAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
