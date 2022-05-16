import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxInputAuthenticComponent } from './lux-input-authentic.component';

describe('LuxInputAuthenticComponent', () => {
  let component: LuxInputAuthenticComponent;
  let fixture: ComponentFixture<LuxInputAuthenticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxInputAuthenticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxInputAuthenticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
