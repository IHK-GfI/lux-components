import { AfterContentInit, Component, ContentChildren, Input, OnDestroy, OnInit, QueryList } from '@angular/core';
import { LuxLayoutRowItemDirective } from '../base/lux-layout-row-item.directive';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../../lux-util/lux-media-query-observer.service';
import { LuxLayoutRowGapConfig } from '../base/lux-layout-row-gap-config';
import { LuxComponentsConfigService } from '../../../lux-components-config/lux-components-config.service';
import { LuxLayoutRowMarginConfig } from '../base/lux-layout-row-margin-config';

@Component({
  selector: 'lux-layout-form-row',
  templateUrl: './lux-layout-form-row.component.html',
  styleUrls: ['./lux-layout-form-row.component.scss']
})
export class LuxLayoutFormRowComponent implements OnInit, AfterContentInit, OnDestroy {
  public static readonly DEFAULT_WRAP_AT = 'sm';

  public static readonly DEFAULT_MARGINS = new LuxLayoutRowMarginConfig({
    xs: '0%',
    sm: '0%',
    md: '0%',
    lg: '0%',
    xl: '0%',
    marginLeft: false,
    marginRight: false
  });

  public static readonly DEFAULT_GAPS = new LuxLayoutRowGapConfig({
    row: '0px',
    rowItem: '24px',
    column: '0px'
  });

  @ContentChildren(LuxLayoutRowItemDirective) rowItems!: QueryList<LuxLayoutRowItemDirective>;

  _luxMargin = new LuxLayoutRowMarginConfig(LuxLayoutFormRowComponent.DEFAULT_MARGINS);
  _luxGap = new LuxLayoutRowGapConfig(LuxLayoutFormRowComponent.DEFAULT_GAPS);

  @Input()
  luxTitle = '';

  @Input()
  luxWrapAt = LuxLayoutFormRowComponent.DEFAULT_WRAP_AT;

  @Input()
  get luxMargin(): LuxLayoutRowMarginConfig {
    return this._luxMargin;
  }

  set luxMargin(margin: LuxLayoutRowMarginConfig) {
    this._luxMargin = new LuxLayoutRowMarginConfig(margin);

    this.updateMargins();
  }

  @Input()
  get luxGap(): LuxLayoutRowGapConfig {
    return this._luxGap;
  }

  set luxGap(gap: LuxLayoutRowGapConfig) {
    this._luxGap = new LuxLayoutRowGapConfig(gap);

    this.updateGaps();
  }

  headerPaddingLeft = '0';
  rowItemCount = 0;
  rowItemWidthInPercent?: number;
  rowGap?: string;
  rowItemGap?: string;
  layoutOrientation?: string;
  margin?: string;
  subscription?: Subscription;
  query?: string;
  greaterWrapAt?: boolean;

  constructor(private config: LuxComponentsConfigService, private queryObserver: LuxMediaQueryObserverService) {}

  ngOnInit(): void {
    // Initialisiere das Umbrechverhalten, wenn kein individueller Wert mitgegeben wurde.
    // 1. Wenn es einen Wert in der zentralen Konfiguration gibt, wird dieser verwendet.
    // 2. Wenn es keinen Wert gibt, wird der Default aus dieser Component (siehe oben) verwendet.
    if (!this.luxWrapAt) {
      let wrapAtConfig = this.config.currentConfig?.layout?.formRow?.warpAt;
      if (!wrapAtConfig) {
        wrapAtConfig = LuxLayoutFormRowComponent.DEFAULT_WRAP_AT;
      }
      this.luxWrapAt = wrapAtConfig;
    }

    // Initialisiere die Gaps, wenn keine individuellen Werte mitgegeben wurden.
    // 1. Wenn es Werte in der zentralen Konfiguration gibt, werden diese verwendet.
    // 2. Wenn es keine Werte gibt, werden die Defaultwerte aus dieser Component (siehe oben) verwendet.
    if (!this._luxGap) {
      let gapConfig = this.config.currentConfig?.layout?.formRow?.gapConfig;
      if (!gapConfig) {
        gapConfig = LuxLayoutFormRowComponent.DEFAULT_GAPS;
      }
      this._luxGap = new LuxLayoutRowGapConfig(gapConfig);
    }

    // Initialisiere die Margins, wenn keine individuellen Werte mitgegeben wurden.
    // 1. Wenn es Werte in der zentralen Konfiguration gibt, werden diese verwendet.
    // 2. Wenn es keine Werte gibt, werden die Defaultwerte aus dieser Component (siehe oben) verwendet.
    if (!this._luxMargin) {
      let marginConfig = this.config.currentConfig?.layout?.formRow?.marginConfig;
      if (!marginConfig) {
        marginConfig = LuxLayoutFormRowComponent.DEFAULT_MARGINS;
      }
      this._luxMargin = new LuxLayoutRowMarginConfig(marginConfig);
    }
  }

  ngAfterContentInit(): void {
    if (!this.rowItems || this.rowItems.length === 0) {
      this.printWarningEmptyRowItems();
    }
    this.update();

    this.subscription = this.queryObserver.getMediaQueryChangedAsObservable().subscribe((query: string) => {
      this.query = query;
      this.greaterWrapAt = this.queryObserver.isGreater(this.luxWrapAt);
      this.update();
    });
  }

  private printWarningEmptyRowItems() {
    console.warn(`
      Das Layout hat keine Elemente. Bitte die Elemente mit der Directive "*luxLayoutRowItem" kennzeichnen.
      Beispiele:
       - <lux-... *luxLayoutRowItem="{}">...</lux-...> (normale Elemente)
       - <lux-... *luxLayoutRowItem="{ colSpan: 2 }">...</lux-...> (spaltenübergreifende Elemente)
       - <lux-... *luxLayoutRowItem="{ flex: 'none' }">...</lux-...> (Spalte nur so groß wie der Inhalt z.B. Icon-Button)
       - <div *luxLayoutRowItem="{ empty: true }"></div> (leere Elemente)
      `);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  update() {
    // Anzahl der Elemente in der Zeile bestimmen.
    this.updateRowItemCount();

    // Berechnen wie viel Prozent jedes Element an Platz benötigt.
    this.updateRowItemWidthInPercent();

    // Layoutausrichtung (row/column) festlegen.
    this.updateLayoutOrientation();

    // Gap der Row und der Elemente bestimmen.
    this.updateGaps();

    // Margin links/rechts der Zeile bestimmen.
    this.updateMargins();
  }

  updateLayoutOrientation() {
    if (this.greaterWrapAt) {
      this.layoutOrientation = 'row';
    } else {
      this.layoutOrientation = 'column';
    }
  }

  updateRowItemCount() {
    this.rowItemCount = 0;
    this.rowItems.forEach(rowItem => (this.rowItemCount += rowItem.luxLayoutRowItem.colSpan!));
  }

  updateRowItemWidthInPercent() {
    this.rowItemWidthInPercent = Math.floor(100 / this.rowItemCount);
  }

  updateGaps() {
    if (this.greaterWrapAt) {
      this.rowGap = this.luxGap.row;
      this.rowItemGap = this.luxGap.rowItem;
    } else {
      this.rowGap = this.luxGap.column;
      this.rowItemGap = this.luxGap.column;
    }
  }

  updateMargins() {
    if (this.query === 'xs') {
      this.margin = this.luxMargin['xs'];
    } else if (this.query === 'sm') {
      this.margin = this.luxMargin['sm'];
    } else if (this.query === 'md') {
      this.margin = this.luxMargin['md'];
    } else if (this.query === 'lg') {
      this.margin = this.luxMargin['lg'];
    } else {
      this.margin = this.luxMargin['xl'];
    }
  }

  calculateWidth(rowItem: LuxLayoutRowItemDirective) {
    const width = this.calculateRowItemWidth(rowItem);
    const gap = this.calculateRowItemGap(rowItem);

    return this.greaterWrapAt ? `calc(${width}% - ${gap}px)` : '1 1 auto';
  }

  private calculateRowItemWidth(rowItem: LuxLayoutRowItemDirective) {
    return rowItem.luxLayoutRowItem.colSpan! * this.rowItemWidthInPercent!;
  }

  private calculateRowItemGap(rowItem: LuxLayoutRowItemDirective) {
    const gapAsNumber = +this.rowItemGap!.replace('px', '');
    if (rowItem.luxLayoutRowItem.colSpan! > 1) {
      return (this.rowItems.length / this.rowItemCount) * gapAsNumber;
    } else {
      return gapAsNumber;
    }
  }
}
