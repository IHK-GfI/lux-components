import {
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild
} from "@angular/core";
import { LuxThemeService } from '../../lux-theme/lux-theme.service';
import { Subscription } from "rxjs";
import { LuxMenuItemComponent } from "./lux-menu-subcomponents/lux-menu-item.component";
import { LuxMenuTriggerComponent } from "./lux-menu-subcomponents/lux-menu-trigger.component";

// @dynamic Erklärung steht in der Datei "lux-decorators.ts".
@Component({
  selector: 'lux-menu',
  templateUrl: './lux-menu.component.html',
  styleUrls: ['./lux-menu.component.scss']
})
export class LuxMenuComponent implements AfterContentInit, AfterViewChecked, OnDestroy {
  // Diese Werte müssen angepasst werden, sollte das Styling dieser Component entsprechend geändert worden sein
  private readonly PADDING_PX: number;
  private readonly MARGIN_PX: number;
  private readonly ICON_PX: number; // 15px breite plus 8px gap zwischen icon - label
  private readonly FONT_SIZE: number;
  private readonly FONT_WEIGHT: number;
  private readonly FONT_FAMILY: String;

  // Alle verfügbaren MenuItems als Array
  private _menuItems: LuxMenuItemComponent[] = [];

  // Das Canvas wird genutzt um die Breite potentieller MenuItem-Texte zu berechnen
  private readonly canvas;

  private menuItemSubscriptions: Subscription[] = [];
  private menuItemChangeSubscription!: Subscription;

  hideToggle = false;

  @ViewChild('defaultTrigger', { read: ElementRef }) defaultTriggerElRef?: ElementRef;
  @ViewChild('menuTrigger', { read: ElementRef }) menuTriggerElRef?: ElementRef;
  @ViewChild('menuExtendedContainer', { read: ElementRef, static: true }) menuExtendedContainer!: ElementRef;
  @ContentChildren(LuxMenuItemComponent) luxMenuItemComponents!: QueryList<LuxMenuItemComponent>;
  @ContentChild(LuxMenuTriggerComponent) luxMenuTriggerComponent?: LuxMenuTriggerComponent;

  @Output() luxMenuClosed: EventEmitter<void> = new EventEmitter<void>();

  @Input() luxMenuLabel = '';
  @Input() luxMenuIconName = 'menu';
  @Input() luxMenuTriggerIconShowRight = false;
  @Input() luxClassName = '';
  @Input() luxTagId: string | null = null;
  @Input() luxToggleDisabled = false;
  @Input() luxAriaMenuTriggerLabel = $localize`:@@luxc.menu.trigger.btn:Menü`;

  _luxDisplayExtended = false;
  visibleMenuItems: LuxMenuItemComponent[] = [];

  get luxDisplayExtended() {
    return this._luxDisplayExtended;
  }

  @Input() set luxDisplayExtended(value: boolean) {
    this._luxDisplayExtended = value;

    if (this.menuTriggerElRef) {
      this.updateExtendedMenuItems();
    }
  }

  @Input() luxDisplayMenuLeft = true;
  @Input() luxMaximumExtended = 5;

  @HostListener('window:resize') windowResize() {
    this.updateExtendedMenuItems();
  }

  get menuItems(): LuxMenuItemComponent[] {
    return this._menuItems;
  }

  set menuItems(menuItems: LuxMenuItemComponent[]) {
    this._menuItems = menuItems ? menuItems : [];
    this._menuItems.sort((a, b) => (a.luxPrio ? a.luxPrio : 0) - (b.luxPrio ? b.luxPrio : 0));

    this.menuItems.forEach((item) => {
      this.menuItemSubscriptions.push(
        item.luxHiddenChange.subscribe(() => {
          this.updateExtendedMenuItems();
        })
      );
      this.menuItemSubscriptions.push(
        item.luxAlwaysVisibleChange.subscribe(() => {
          this.updateExtendedMenuItems();
        })
      );
      this.menuItemSubscriptions.push(
        item.luxHideLabelIfExtendedChange.subscribe(() => {
          this.updateExtendedMenuItems();
        })
      );
    });

    this.cdr.detectChanges();
  }

  constructor(private cdr: ChangeDetectorRef, private themeService: LuxThemeService) {
    this.canvas = document.createElement('canvas');

    // die folgenden Werte sind für die Berechnug der Breite der extended Menüitems
    // sie müssen entsprechend des aktuellen Themes gesetzt werden.
    // Wird das Theme geändert müssen auch diese Werte angepasst werden.
    // aktuell wird für die Klasse .lux-extende-menu die Breite der Icons auf 15px gesetzt.
    // bei Änderungend es Icon-Sets muss dieser Wert evtl. angepasst werden

    switch(this.themeService.getTheme().name) {
      case 'green':
        this.PADDING_PX = 16;
        this.MARGIN_PX = 12;
        this.ICON_PX = 23; // 15px Breite plus 8px Gap zwischen Icon - Label
        this.FONT_SIZE = 22;
        this.FONT_WEIGHT = 400;
        this.FONT_FAMILY = '"Korb", "Source Sans Pro","Helvetica","Arial","sans-serif"';
        break;

      default:
        this.PADDING_PX = 16;
        this.MARGIN_PX = 12;
        this.ICON_PX = 23; // 15px Breite plus 8px Gap zwischen Icon - Button-Label
        this.FONT_SIZE = 14;
        this.FONT_WEIGHT = 700;
        this.FONT_FAMILY = 'Roboto, "Helvetica Neue", sans-serif';
    }
  }

  ngAfterContentInit() {
    this.menuItemChangeSubscription = this.luxMenuItemComponents.changes.subscribe(() => {
      this.menuItems = this.luxMenuItemComponents.toArray();
      this.calculateMenuItemWidths();
    });
  }

  ngAfterViewChecked() {
    this.menuItems = this.luxMenuItemComponents.toArray();
    this.calculateMenuItemWidths();
    this.updateExtendedMenuItems();
  }

  ngOnDestroy(): void {
    if (this.menuItemChangeSubscription) {
      this.menuItemChangeSubscription.unsubscribe();
    }

    this.menuItemSubscriptions.forEach((menuItemSubscription) => {
      menuItemSubscription.unsubscribe();
    });
  }

  /**
   * Wird beim Klick auf ein MenuItem aufgerufen.
   *
   * @param menuItem
   * @param $event
   * @param event
   */
  menuItemClicked(menuItem: LuxMenuItemComponent, event: MouseEvent) {
    menuItem.clicked(event);
  }

  /**
   * Wird nach dem Schließen des Menus aufgerufen und emitted die Output-Property.
   * Setzt den Fokus auf den Default-Trigger (Custom-Trigger => eigene Verantwortung).
   */
  onMenuClosed() {
    this.luxMenuClosed.emit();
    if (this.defaultTriggerElRef) {
      (this.defaultTriggerElRef.nativeElement.children.item(0) as any).focus();
    }
  }

  /**
   * Berechnet anhand der verfügbaren Breite des Containers (CSS-Class: lux-menu-extended) und der maximalen Anzahl an
   * extended MenuItems die Anzahl an möglichen MenuItems, die außerhalb des eigentlichen Menus dargestellt werden können.
   */
  updateExtendedMenuItems() {
    if (!this.luxDisplayExtended) {
      this.hideToggle = false;
      this.menuItems.forEach((menuItem: LuxMenuItemComponent) => {
        menuItem.extended = false;
      });
      return;
    }

    const menuTriggerOffsetWidth = this.menuTriggerElRef?.nativeElement.offsetWidth;
    const menuTriggerWidth = Math.max(menuTriggerOffsetWidth ? menuTriggerOffsetWidth : 0, 50);

    let availableWidth: number = this.menuExtendedContainer.nativeElement.offsetWidth;
    let count = 0;

    availableWidth -= menuTriggerWidth;

    // mit condition sind hier die Zustände luxVisible = true || false gemeint
    this.visibleMenuItems = []; // die sichtbaren Menuitems werden neu einsortiert
    for (const condition of [true, false]) {
      for (let i = 0; i < this.menuItems.length; i++) {
        const menuItem = this.menuItems[i];
        if (menuItem.luxAlwaysVisible === condition && !menuItem.luxHidden) {
          this.visibleMenuItems.push(menuItem)
        }
      }
    }
    for (let i = 0; i < this.visibleMenuItems.length; i++) {
      const menuItem = this.visibleMenuItems[i];
      // Wenn es das letzte sichtbare Menüitem ist, wird geprüft, ob es anstelle des
      // Menüitemtriggers dargestellt werden kann.
      if (
        menuItem === this.visibleMenuItems[this.visibleMenuItems.length - 1] &&
        availableWidth + menuTriggerWidth >= menuItem.width
      ) {
        availableWidth += menuTriggerWidth;
      }

      availableWidth -= menuItem.width;

      if (availableWidth >= 0 && count < this.luxMaximumExtended) {
        menuItem.extended = true;
        count++;
      } else {
        menuItem.extended = false;
      }
    }

    // Jetzt müssen die sichtbaren Items noch nach der Priorität sortiert werden.
    //
    // Erklärung:
    // Das Array "visibleMenuItems" wurde initial wie folgt aufgebaut:
    // - zu erst alle Items mit "luxAlwaysVisible=true" und
    // - danach alle Items mit "luxAlwaysVisible=false".
    // Dies wurde gemacht, damit der zur Verfügung stehende Raum an die Items
    // verteilt wird, die nach Möglichkeit immer angezeigt werden sollten.
    // Bis zu diesem Zeitpunkt wurde bewusst auf die Berücksichtigung der
    // Priorität verzichtet. Nachdem aber jetzt festgelegt wurde, welche Items
    // überhaupt dargestellt werden, kann nach der Priorität sortiert werden.
    this.visibleMenuItems.sort((a, b) => (a.luxPrio ? a.luxPrio : 0) - (b.luxPrio ? b.luxPrio : 0));

    // wenn die Anzahl der extended dargestellten Items der Gesamtzahl entspricht blenden wir den Toggle aus
    const extendedMenuItems = this.visibleMenuItems.filter((item: LuxMenuItemComponent) => item.extended);
    this.hideToggle = extendedMenuItems.length === this.visibleMenuItems.length;
    this.cdr.detectChanges();
  }

  /**
   * Berechnet die Breite für jedes Menuitem und speichert diese abhängig davon ob das Item immer sichtbar sein soll oder nicht
   * in 2 verschiedenen Maps.
   */
  private calculateMenuItemWidths() {
    this.menuItems.forEach((menuItem: LuxMenuItemComponent) => {
      menuItem.extended = false;
      menuItem.width = this.getMenuItemWidth(menuItem);
    });
  }

  /**
   * Gibt die berechnete Breite des MenuItems zurück.
   * Diese setzt sich aus dem Padding (links und rechts, je 16px), dem Icon (wenn vorhanden, 15px) und der berechneten
   * Textbreite zusammen.
   *
   * @param menuItem
   */
  private getMenuItemWidth(menuItem: LuxMenuItemComponent): number {
    if (!menuItem) {
      return 0;
    }

    return (
      this.PADDING_PX +
      (menuItem.luxIconName ? this.ICON_PX : 0) +
      (!menuItem.luxHideLabelIfExtended ? this.getTextWidth(menuItem.luxLabel) : 0) +
      this.MARGIN_PX
    );
  }

  /**
   * Berechnet mithilfe eines Canvas-Objekts die Breite eines einzelnen Textes
   *
   * @param text
   */
  private getTextWidth(text: string | null | undefined): number {
    if (!text) {
      return 0;
    }

    const canvas = this.canvas;
    const context = canvas.getContext('2d')!;
    context.font = `${this.FONT_WEIGHT} ${this.FONT_SIZE}px ${this.FONT_FAMILY}`;
    const metrics = context.measureText(text);
    // zusätzlich nutzen wir hier einen Standard-Offset von 20px, mit den angepassten Werten für die Themes, aktuell auf 0 gesetzt
    let offset = 0;
    return metrics.width + offset;
  }

  hasVisibleMenuItems(): boolean {
    let hasVisibleMenuItems = false;

    for (const element of this.menuItems) {
      if (!element.luxHidden && !element.extended) {
        hasVisibleMenuItems = true;
        break;
      }
    }

    return hasVisibleMenuItems;
  }
}
