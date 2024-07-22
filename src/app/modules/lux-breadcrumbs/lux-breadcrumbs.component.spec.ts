import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LuxBreadcrumbsComponent } from './lux-breadcrumbs.component';

describe('LuxBreadcrumbsComponent', () => {
  let component: LuxBreadcrumbsComponent;
  let fixture: ComponentFixture<LuxBreadcrumbsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LuxBreadcrumbsComponent]
    });
    fixture = TestBed.createComponent(LuxBreadcrumbsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`luxEntries has default value`, () => {
    expect(component.luxEntries).toEqual([]);
  });
});
