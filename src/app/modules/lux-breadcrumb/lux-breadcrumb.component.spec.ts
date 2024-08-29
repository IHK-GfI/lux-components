import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LuxBreadcrumbComponent } from './lux-breadcrumb.component';

describe('LuxBreadcrumbComponent', () => {
  let component: LuxBreadcrumbComponent;
  let fixture: ComponentFixture<LuxBreadcrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LuxBreadcrumbComponent]
    });
    fixture = TestBed.createComponent(LuxBreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`luxEntries has default value`, () => {
    expect(component.luxEntries).toEqual([]);
  });
});
