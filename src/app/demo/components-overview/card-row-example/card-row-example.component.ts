import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxMediaQueryObserverService } from '../../../modules/lux-util/lux-media-query-observer.service';
import { LuxLayoutCardRowComponent } from '../../../modules/lux-layout/lux-layout/lux-layout-card-row/lux-layout-card-row.component';
import { LuxAppFooterButtonService } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-button.service';
import { LuxAppFooterButtonInfo } from '../../../modules/lux-layout/lux-app-footer/lux-app-footer-button-info';
import { Router } from '@angular/router';
import { LuxLayoutRowMarginConfig } from '../../../modules/lux-layout/lux-layout/base/lux-layout-row-margin-config';
import { LuxLayoutRowGapConfig } from '../../../modules/lux-layout/lux-layout/base/lux-layout-row-gap-config';

@Component({
  selector: 'lux-card-row-example',
  templateUrl: './card-row-example.component.html'
})
export class CardRowExampleComponent implements OnInit, OnDestroy {
  marginLeft = true;
  marginRight = true;

  marginXs = LuxLayoutCardRowComponent.DEFAULT_MARGINS.xs;
  marginSm = LuxLayoutCardRowComponent.DEFAULT_MARGINS.sm;
  marginMd = LuxLayoutCardRowComponent.DEFAULT_MARGINS.md;
  marginLg = LuxLayoutCardRowComponent.DEFAULT_MARGINS.lg;
  marginXl = LuxLayoutCardRowComponent.DEFAULT_MARGINS.xl;

  margin = new LuxLayoutRowMarginConfig({
    xs: this.marginXs,
    sm: this.marginSm,
    md: this.marginMd,
    lg: this.marginLg,
    xl: this.marginXl,
    marginLeft: this.marginLeft,
    marginRight: this.marginRight
  });

  _marginAll = '';

  get marginAll() {
    return this._marginAll;
  }
  set marginAll(margin: string) {
    this._marginAll = margin;
    this.marginXs = margin;
    this.marginSm = margin;
    this.marginMd = margin;
    this.marginLg = margin;
    this.marginXl = margin;
  }

  gapRow = LuxLayoutCardRowComponent.DEFAULT_GAPS.row;
  gapRowItem = LuxLayoutCardRowComponent.DEFAULT_GAPS.rowItem;
  gapColumn = LuxLayoutCardRowComponent.DEFAULT_GAPS.column;

  gap = new LuxLayoutRowGapConfig({
    row: this.gapRow,
    rowItem: this.gapRowItem,
    column: this.gapColumn
  });

  _gapAll = '';

  get gapAll() {
    return this._gapAll;
  }
  set gapAll(gap: string) {
    this._gapAll = gap;
    this.gapRow = gap;
    this.gapRowItem = gap;
    this.gapColumn = gap;
  }

  query: string;

  row1_title = '1. Zeile';
  row2_title = '2. Zeile';
  row3_title = '3. Zeile';
  row4_title = '4. Zeile';
  row5_title = '5. Zeile';
  row6_title = '6. Zeile';

  row1_wrapAt = 'xs';
  row2_wrapAt = 'sm';
  row3_wrapAt = 'md';
  row4_wrapAt = 'md';
  row5_wrapAt = 'md';
  row6_wrapAt = 'md';

  subscription: Subscription;

  constructor(
    private router: Router,
    private buttonService: LuxAppFooterButtonService,
    private queryObserver: LuxMediaQueryObserverService
  ) {
    this.subscription = queryObserver.getMediaQueryChangedAsObservable().subscribe(query => {
      this.query = query;
    });
  }

  ngOnInit(): void {
    this.buttonService.buttonInfos = [
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Dokumentation',
        iconName: 'fas fa-external-link-alt',
        cmd: 'documentation-btn',
        color: 'primary',
        raised: true,
        alwaysVisible: false,
        onClick: () => {
          window.open(
            'https://github.com/IHK-GfI/lux-components/wiki/lux%E2%80%90layout%E2%80%90card%E2%80%90row',
            '_blank'
          );
        }
      }),
      LuxAppFooterButtonInfo.generateInfo({
        label: 'Overview',
        iconName: 'fas fa-caret-left',
        cmd: 'back-btn',
        color: 'primary',
        raised: true,
        alwaysVisible: true,
        onClick: () => {
          this.router.navigate(['/components-overview']);
        }
      })
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.buttonService.buttonInfos = [];
  }

  updateMargin() {
    setTimeout(() => {
      this.margin = new LuxLayoutRowMarginConfig({
        xs: this.marginXs,
        sm: this.marginSm,
        md: this.marginMd,
        lg: this.marginLg,
        xl: this.marginXl,
        marginLeft: this.marginLeft,
        marginRight: this.marginRight
      });
    });
  }

  updateGap() {
    this.gap = new LuxLayoutRowGapConfig({
      row: this.gapRow,
      rowItem: this.gapRowItem,
      column: this.gapColumn
    });
  }
}
