import { waitForAsync, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { LuxLayoutFormRowComponent } from './lux-layout-form-row.component';
import { LuxMediaQueryObserverService } from '../../../lux-util/lux-media-query-observer.service';
import { LuxLayoutRowGapConfig } from '../base/lux-layout-row-gap-config';
import { LuxLayoutRowMarginConfig } from '../base/lux-layout-row-margin-config';

describe('LuxLayoutFormRowComponent', () => {
  let component: LuxLayoutFormRowComponent;
  let fixture: ComponentFixture<LuxLayoutFormRowComponent>;
  let queryService: MockLuxMediaQueryObserverService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LuxLayoutFormRowComponent],
      providers: [{ provide: LuxMediaQueryObserverService, useClass: MockLuxMediaQueryObserverService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuxLayoutFormRowComponent);
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
    component.luxMargin = new LuxLayoutRowMarginConfig({
      xs: '11%',
      sm: '12%',
      md: '13%',
      lg: '14%',
      xl: '15%'
    });

    queryService.query = 'xs';
    fixture.detectChanges();
    expect(component.margin).toEqual(component.luxMargin.xs);

    queryService.query = 'sm';
    fixture.detectChanges();
    expect(component.margin).toEqual(component.luxMargin.sm);

    queryService.query = 'md';
    fixture.detectChanges();
    expect(component.margin).toEqual(component.luxMargin.md);

    queryService.query = 'lg';
    fixture.detectChanges();
    expect(component.margin).toEqual(component.luxMargin.lg);

    queryService.query = 'xl';
    fixture.detectChanges();
    expect(component.margin).toEqual(component.luxMargin.xl);
  });

  it('margin sollte die Defaults korrekt setzen', () => {
    queryService.query = 'xs';
    fixture.detectChanges();
    expect(component.margin).toEqual(LuxLayoutFormRowComponent.DEFAULT_MARGINS.xs);

    queryService.query = 'sm';
    fixture.detectChanges();
    expect(component.margin).toEqual(LuxLayoutFormRowComponent.DEFAULT_MARGINS.sm);

    queryService.query = 'md';
    fixture.detectChanges();
    expect(component.margin).toEqual(LuxLayoutFormRowComponent.DEFAULT_MARGINS.md);

    queryService.query = 'lg';
    fixture.detectChanges();
    expect(component.margin).toEqual(LuxLayoutFormRowComponent.DEFAULT_MARGINS.lg);

    queryService.query = 'xl';
    fixture.detectChanges();
    expect(component.margin).toEqual(LuxLayoutFormRowComponent.DEFAULT_MARGINS.xl);
  });

  it('gaps sollten korrekt gesetzt sein', () => {
    component.luxGap = new LuxLayoutRowGapConfig({ row: '1px', rowItem: '2px', column: '3px' });

    queryService.query = 'xs';
    fixture.detectChanges();
    expect(component.rowGap).toEqual(component.luxGap.column);
    expect(component.rowItemGap).toEqual(component.luxGap.column);

    queryService.query = 'xl';
    fixture.detectChanges();
    expect(component.rowGap).toEqual(component.luxGap.row);
    expect(component.rowItemGap).toEqual(component.luxGap.rowItem);
  });
});

class MockLuxMediaQueryObserverService extends LuxMediaQueryObserverService {
  public get query() {
    return this._mediaQueryChanged.getValue();
  }

  public set query(query: string) {
    this._mediaQueryChanged.next(query);
  }
}
