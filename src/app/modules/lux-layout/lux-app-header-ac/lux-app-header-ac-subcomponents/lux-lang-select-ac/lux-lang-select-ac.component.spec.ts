import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxLangSelectAcComponent } from './lux-lang-select-ac.component';

describe('LuxLangSelectAcComponent', () => {
  let component: LuxLangSelectAcComponent;
  let fixture: ComponentFixture<LuxLangSelectAcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxLangSelectAcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxLangSelectAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
