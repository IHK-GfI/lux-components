import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import { LuxListItemComponent } from './lux-list-subcomponents/lux-list-item.component';
import { Subscription } from 'rxjs';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { LuxUtil } from '../../lux-util/lux-util';

@Component({
  selector: 'lux-list',
  templateUrl: './lux-list.component.html'
})
export class LuxListComponent implements AfterViewInit, OnDestroy {
  private _luxSelectedPosition = 0;

  private previousFocusedPosition?: number;
  private clickSubscriptions: Subscription[] = [];
  private listItemsSubscription?: Subscription;
  private keyManager: FocusKeyManager<LuxListItemComponent> = new FocusKeyManager<LuxListItemComponent>([]);

  @ContentChildren(LuxListItemComponent) luxItems!: QueryList<LuxListItemComponent>;

  @Output() luxFocusedItemChange = new EventEmitter<LuxListItemComponent>();
  @Output() luxFocusedPositionChange = new EventEmitter<number>();
  @Output() luxSelectedPositionChange = new EventEmitter<number>();

  @Input() luxEmptyIconName = 'lux-interface-alert-information-circle';
  @Input() luxEmptyIconSize = '5x';
  @Input() luxEmptyLabel = $localize`:@@luxc.list.empty_label:Keine Einträge vorhanden`;

  @HostBinding('attr.role') role = 'listbox';
  @HostBinding('attr.tabindex') tabindex = '0';
  @HostBinding('attr.aria-multiselectable') ariaMulti = 'true';

  @HostListener('focus') onFocus() {
    // Wenn die Liste den Focus erhält, soll direkt das selektierte Element (bzw. das erste Element) focussiert werden.
    if (this.luxItems.length > 0) {
      if (this.luxSelectedPosition >= 0) {
        this.focus(this.luxSelectedPosition);
      } else {
        this.focus(0);
      }
    }
  }

  @HostListener('keydown', ['$event']) onKeydown(keyboardEvent: KeyboardEvent) {
    this.keydown(keyboardEvent);
  }

  get luxSelectedPosition(): number {
    return this._luxSelectedPosition;
  }

  @Input() set luxSelectedPosition(position: number) {
    if (position === this.luxSelectedPosition) {
      return;
    }

    this.focus(position);
    this.select(position);
    this.scroll(position);
  }

  constructor() {}

  isEmpty() {
    return !this.luxItems || this.luxItems.length === 0;
  }

  ngAfterViewInit() {
    // Click-Events der LuxListItems erhalten
    this.listItemsSubscription = this.luxItems.changes.subscribe(() => {
      this.listenForClicks();
      this.keyManager = new FocusKeyManager<LuxListItemComponent>(this.luxItems);
      if (this.previousFocusedPosition) {
        this.keyManager.setActiveItem(this.previousFocusedPosition);
      }
    });
    this.listenForClicks();
    this.keyManager = new FocusKeyManager<LuxListItemComponent>(this.luxItems);
    if (this.luxSelectedPosition) {
      this.keyManager.setActiveItem(this.luxSelectedPosition);
    }
  }

  ngOnDestroy() {
    if (this.listItemsSubscription) {
      this.listItemsSubscription.unsubscribe();
    }

    this.clickSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Wird beim Drücken einer Taste ausgeführt und handelt die Aktionen bei speziellen Tasten
   * (UP_ARROW || DOWN_ARROW werden vom KeyManager selbstständig gepflegt)
   * @param keyboardEvent
   */
  keydown(keyboardEvent: KeyboardEvent) {
    if (LuxUtil.isKeySpace(keyboardEvent) || LuxUtil.isKeyEnter(keyboardEvent)) {
      this.select(this.keyManager.activeItemIndex!);
      keyboardEvent.preventDefault();
    } else if (LuxUtil.isKeyHome(keyboardEvent)) {
      this.keyManager.setFirstItemActive();
      this.focus(this.keyManager.activeItemIndex!);
      keyboardEvent.preventDefault();
    } else if (LuxUtil.isKeyEnd(keyboardEvent)) {
      this.keyManager.setLastItemActive();
      this.focus(this.keyManager.activeItemIndex!);
      keyboardEvent.preventDefault();
    } else if (LuxUtil.isKeyArrowUp(keyboardEvent)) {
      this.keyManager.setPreviousItemActive();
      this.focus(this.keyManager.activeItemIndex!);
      keyboardEvent.preventDefault();
    } else if (LuxUtil.isKeyArrowDown(keyboardEvent)) {
      this.keyManager.setNextItemActive();
      this.focus(this.keyManager.activeItemIndex!);
      keyboardEvent.preventDefault();
    } else {
      this.keyManager.onKeydown(keyboardEvent);
    }
  }

  /**
   * Auf Click-Events der hier bekannten LuxListItems hören und entsprechend das selektierte ListItem aktualisieren.
   */
  private listenForClicks() {
    this.clickSubscriptions.forEach((sub) => sub.unsubscribe());
    this.clickSubscriptions = [];

    this.luxItems.forEach((listItem: LuxListItemComponent, index: number) => {
      this.clickSubscriptions.push(
        listItem.luxClicked.subscribe(() => {
          this.focus(index);
          this.select(index);
        })
      );
    });
  }

  /**
   * Merkt sich die Position als Selektionsposition und aktualisiert den luxSelected-Wert
   * aller luxItems, die hier bekannt sind.
   * @param position
   */
  private select(position: number) {
    this._luxSelectedPosition = position;
    this.previousFocusedPosition = position;
    this.luxSelectedPositionChange.emit(position);

    if (this.luxItems) {
      this.luxItems.forEach((listItem: LuxListItemComponent) => {
        listItem.luxSelected = false;
      });

      const selectedListItem = this.findListItem(position);
      if (selectedListItem) {
        selectedListItem.luxSelected = true;
      }
    }
  }

  /**
   * Merkt sich die position als Fokus-Position und aktualisiert die CSS-Klassen der ListItems.
   * @param position
   */
  private focus(position: number) {
    this.keyManager.setActiveItem(position);

    this.luxFocusedPositionChange.emit(position);
    this.luxFocusedItemChange.emit(this.keyManager.activeItem!);

    this.previousFocusedPosition = position;
  }

  /**
   * Scrollt zu dem Element an der position.
   * @param position
   */
  private scroll(position: number) {
    if (this.luxItems) {
      const listItem = this.keyManager.activeItem;

      if (listItem) {
        listItem.elementRef.nativeElement.scrollIntoView(true);
      }
    }
  }

  /**
   * Gibt das ListItem an der position zurück bzw. "null" wenn die luxItems undefined/null sind.
   * @param position
   */
  private findListItem(position: number): LuxListItemComponent | null {
    const item = this.luxItems ? this.luxItems.find((listItem: LuxListItemComponent, index: number) => index === position) : null;

    return item ?? null;
  }
}
