import { ChangeDetectorRef, Component, ContentChild, HostBinding, Input, OnDestroy, Optional, TemplateRef } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { LuxMediaQueryObserverService } from '../../lux-util/lux-media-query-observer.service';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormSelectableBase } from '../lux-form-model/lux-form-selectable-base.class';
import { Subscription } from 'rxjs';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';

@Component({
  selector: 'lux-radio-ac',
  templateUrl: './lux-radio-ac.component.html',
  styleUrls: ['./lux-radio-ac.component.scss']
})
export class LuxRadioAcComponent<O = any, V = any> extends LuxFormSelectableBase<O, V> implements OnDestroy {
  forceVertical = false;

  // Potenziell eingebettetes Template für Darstellung der Labels
  @ContentChild(TemplateRef) tempRef?: TemplateRef<any>;

  @HostBinding('class.lux-pb-3') pb3 = true;
  @Input() luxGroupName = '';
  @Input() luxOrientationVertical = true;
  @Input() luxNoLabels = false;
  @Input() luxNoTopLabel = false;
  @Input() luxNoBottomLabel = false;

  focused = false;

  private mediaSubscription$: Subscription;

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService,
    private mediaObserver: LuxMediaQueryObserverService
  ) {
    super(controlContainer, cdr, logger, config);

    this.mediaSubscription$ = this.mediaObserver.getMediaQueryChangedAsObservable().subscribe(() => {
      this.forceVertical = this.mediaObserver.isXS();
    });
    this.forceVertical = this.mediaObserver.isXS();
  }

  get isVertical(): boolean {
    return this.luxOrientationVertical || this.forceVertical;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.mediaSubscription$.unsubscribe();
  }

  onFocusIn(e: FocusEvent) {
    this.focused = true;
    this.luxFocusIn.emit(e);
  }

  onFocusOut(e: FocusEvent) {
    this.focused = false;
    this.luxFocusOut.emit(e);
  }

  descripedBy() {
    if (this.errorMessage) {
      return this.uid + '-error';
    } else {
      return (this.formHintComponent || this.luxHint) && (!this.luxHintShowOnlyOnFocus || (this.luxHintShowOnlyOnFocus && this.focused))
        ? this.uid + '-hint'
        : undefined;
    }
  }
}
