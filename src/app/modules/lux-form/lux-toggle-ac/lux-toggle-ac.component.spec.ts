import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxToggleAcComponent } from './lux-toggle-ac.component';

describe('LuxToggleAcComponent', () => {
  let component: LuxToggleAcComponent;
  let fixture: ComponentFixture<LuxToggleAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxToggleAcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxToggleAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
