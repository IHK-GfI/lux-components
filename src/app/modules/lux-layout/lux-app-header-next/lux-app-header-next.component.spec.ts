import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxAppHeaderNextComponent } from './lux-app-header-next.component';

describe('LuxAppHeaderNextComponent', () => {
  let component: LuxAppHeaderNextComponent;
  let fixture: ComponentFixture<LuxAppHeaderNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxAppHeaderNextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxAppHeaderNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
