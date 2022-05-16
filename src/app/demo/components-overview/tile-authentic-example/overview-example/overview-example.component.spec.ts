import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewExampleComponent } from './overview-example.component';

describe('OverviewExampleComponent', () => {
  let component: OverviewExampleComponent;
  let fixture: ComponentFixture<OverviewExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
