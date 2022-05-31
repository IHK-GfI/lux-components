import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxInputAcComponent } from './lux-input-ac.component';

describe('LuxInputAcComponent', () => {
  let component: LuxInputAcComponent;
  let fixture: ComponentFixture<LuxInputAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxInputAcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxInputAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
