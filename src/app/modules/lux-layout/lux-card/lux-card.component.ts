import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import { Subscription } from 'rxjs';
import { LuxComponentsConfigParameters } from '../../lux-components-config/lux-components-config-parameters.interface';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxIconComponent } from '../../lux-icon/lux-icon/lux-icon.component';
import { LuxUtil } from '../../lux-util/lux-util';
import { expansionAnim } from './lux-card-model/lux-card-animations';
import { LuxCardActionsComponent } from './lux-card-subcomponents/lux-card-actions.component';
import { LuxCardContentExpandedComponent } from './lux-card-subcomponents/lux-card-content-expanded.component';
import { LuxCardContentComponent } from './lux-card-subcomponents/lux-card-content.component';
import { LuxCardInfoComponent } from './lux-card-subcomponents/lux-card-info.component';

@Component({
  selector: 'lux-card',
  templateUrl: './lux-card.component.html',
  styleUrls: ['./lux-card.component.scss'],
  animations: [expansionAnim]
})
export class LuxCardComponent implements OnInit, AfterViewInit, OnDestroy {
  private configSubscription: Subscription;

  @Input() luxTitle: string;
  @Input() luxSubTitle: string;
  @Input() luxDisabled: boolean;
  @Input() luxTagId: string | null = null;
  @Input() luxTitleLineBreak = true;
  @Input() luxExpanded = false;
  @Input() luxUseTabIndex = true;
  @Input() luxHeading = 2;
  @Output() luxExpandedChange: EventEmitter<boolean> = new EventEmitter();
  @Output() luxAfterExpansion: EventEmitter<void> = new EventEmitter();
  @Output() luxClicked: EventEmitter<any> = new EventEmitter();

  @ContentChildren(LuxIconComponent, { descendants: false }) iconComponents: QueryList<LuxIconComponent>;
  @ContentChild(LuxCardActionsComponent) actionsComponent: LuxCardActionsComponent;
  @ContentChild(LuxCardInfoComponent) infoComponent: LuxCardInfoComponent;
  @ContentChild(LuxCardContentExpandedComponent)
  contentExpandedComponent: LuxCardContentExpandedComponent;
  @ContentChild(LuxCardContentComponent) contentComponent: LuxCardContentComponent;

  hasCardAction: boolean;
  animationDisabled = true;

  constructor(private componentsConfigService: LuxComponentsConfigService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.luxTagId) {
      this.luxTagId = this.luxTitle;
    }

    if (this.luxClicked.observers && this.luxClicked.observers.length > 0) {
      this.hasCardAction = true;
    }
  }

  ngAfterViewInit() {
    // Über die Konfiguration abfragen, ob die Animationen für Cards deaktiviert sind.
    this.configSubscription = this.componentsConfigService.config.subscribe((config: LuxComponentsConfigParameters) => {
      this.animationDisabled = !config.cardExpansionAnimationActive;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
  }

  get showButtons() {
    return !!this.actionsComponent;
  }

  get showIcon() {
    return this.iconComponents && this.iconComponents.length === 1;
  }

  get showExpandedToggle() {
    return !!this.contentExpandedComponent;
  }

  changeContentExpansion(event: any) {
    LuxUtil.stopEventPropagation(event);

    this.luxExpanded = !this.luxExpanded;
    this.luxExpandedChange.emit(this.luxExpanded);
  }

  clicked() {
    if (!this.luxDisabled && !this.showButtons) {
      this.luxClicked.emit(null);
    }
  }

  /**
   * setzt das korrekte Alignment der Titelzeile. Ist der Titel im Zweifel mehrzeilig, so wird das Icon
   * im Titel nach oben ausgerichtet, damit es nicht mittig nebem dem Titel schwebt. Ist der Titel aber
   * einzeilig, so wird das Icon vertikal zum Titel alignt.
   */
  getTitleAlignment(): string {
    if (this.luxTitleLineBreak && this.showIcon) {
      return 'left top';
    }

    return 'left center';
  }

  /**
   * Gibt den Status der Animation zurück.
   */
  getAnimState(): string {
    return this.luxExpanded ? 'expand' : 'void';
  }

  /**
   * Gibt die Dauer der Animation abhängig davon ob sie via Config deaktiviert wurden oder nicht zurück.
   */
  getAnimDuration() {
    return this.animationDisabled ? 0 : 300;
  }

  /**
   * Wird am Ende der Ausklappanimation aufgerufen und setzt das animationActive-Flag auf false und gibt ein Event
   * über den luxAfterExpansion-EventEmitter ab.
   */
  expansionDone() {
    this.luxAfterExpansion.emit();
  }
}
