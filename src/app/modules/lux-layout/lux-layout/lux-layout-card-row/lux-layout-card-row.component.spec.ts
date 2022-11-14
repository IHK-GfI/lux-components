/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { Component, Injectable, ViewChild } from '@angular/core';
import { waitForAsync, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LuxLayoutModule } from '../../lux-layout.module';

import { LuxLayoutCardRowComponent } from './lux-layout-card-row.component';
import { LuxMediaQueryObserverService } from '../../../lux-util/lux-media-query-observer.service';
import { LuxLayoutRowMarginConfig } from '../base/lux-layout-row-margin-config';
import { LuxLayoutRowGapConfig } from '../base/lux-layout-row-gap-config';

describe('LuxLayoutCardRowComponent', () => {
  let component: MockLayoutComponent;
  let fixture: ComponentFixture<MockLayoutComponent>;
  let queryService: MockLuxMediaQueryObserverService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LuxLayoutCardRowComponent, MockLayoutComponent],
      imports: [FlexLayoutModule, LuxLayoutModule],
      providers: [{ provide: LuxMediaQueryObserverService, useClass: MockLuxMediaQueryObserverService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([LuxMediaQueryObserverService], (service: MockLuxMediaQueryObserverService) => {
    queryService = service;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('margin sollte korrekt gesetzt sein', () => {
    component.layoutComponent.luxMargin = new LuxLayoutRowMarginConfig({
      xs: '11%',
      sm: '12%',
      md: '13%',
      lg: '14%',
      xl: '15%'
    });

    queryService.query = 'xs';
    fixture.detectChanges();
    expect(component.layoutComponent.margin).toEqual(component.layoutComponent.luxMargin.xs);

    queryService.query = 'sm';
    fixture.detectChanges();
    expect(component.layoutComponent.margin).toEqual(component.layoutComponent.luxMargin.sm);

    queryService.query = 'md';
    fixture.detectChanges();
    expect(component.layoutComponent.margin).toEqual(component.layoutComponent.luxMargin.md);

    queryService.query = 'lg';
    fixture.detectChanges();
    expect(component.layoutComponent.margin).toEqual(component.layoutComponent.luxMargin.lg);

    queryService.query = 'xl';
    fixture.detectChanges();
    expect(component.layoutComponent.margin).toEqual(component.layoutComponent.luxMargin.xl);
  });

  it('margin sollte die Defaults korrekt setzen', () => {
    queryService.query = 'xs';
    fixture.detectChanges();
    expect(component.layoutComponent.margin).toEqual(LuxLayoutCardRowComponent.DEFAULT_MARGINS.xs);

    queryService.query = 'sm';
    fixture.detectChanges();
    expect(component.layoutComponent.margin).toEqual(LuxLayoutCardRowComponent.DEFAULT_MARGINS.sm);

    queryService.query = 'md';
    fixture.detectChanges();
    expect(component.layoutComponent.margin).toEqual(LuxLayoutCardRowComponent.DEFAULT_MARGINS.md);

    queryService.query = 'lg';
    fixture.detectChanges();
    expect(component.layoutComponent.margin).toEqual(LuxLayoutCardRowComponent.DEFAULT_MARGINS.lg);

    queryService.query = 'xl';
    fixture.detectChanges();
    expect(component.layoutComponent.margin).toEqual(LuxLayoutCardRowComponent.DEFAULT_MARGINS.xl);
  });

  it('gaps sollten korrekt gesetzt sein', () => {
    component.layoutComponent.luxGap = new LuxLayoutRowGapConfig({ row: '1px', rowItem: '2px', column: '3px' });

    queryService.query = 'xs';
    fixture.detectChanges();
    expect(component.layoutComponent.rowGap).toEqual(component.layoutComponent.luxGap.column);
    expect(component.layoutComponent.rowItemGap).toEqual(component.layoutComponent.luxGap.column);

    queryService.query = 'xl';
    fixture.detectChanges();
    expect(component.layoutComponent.rowGap).toEqual(component.layoutComponent.luxGap.row);
    expect(component.layoutComponent.rowItemGap).toEqual(component.layoutComponent.luxGap.rowItem);
  });
});

@Injectable()
class MockLuxMediaQueryObserverService extends LuxMediaQueryObserverService {
  public get query() {
    return this._mediaQueryChanged.getValue();
  }

  public set query(query: string) {
    this._mediaQueryChanged.next(query);
  }
}

@Component({
  template: `
    <lux-layout-card-row>
      <div *luxLayoutRowItem="{}"></div>
    </lux-layout-card-row>
  `
})
class MockLayoutComponent {

  @ViewChild(LuxLayoutCardRowComponent) layoutComponent!: LuxLayoutCardRowComponent;

}
