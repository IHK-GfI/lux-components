import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { LuxActionColorType } from "../lux-action-model/lux-action-component-base.class";

import { LuxMenuComponent } from './lux-menu.component';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LuxMenuComponent', () => {
  const updateExtendedMenuItems = () => {
    LuxTestHelper.wait(fixture);
    menuComponent.updateExtendedMenuItems();
    LuxTestHelper.wait(fixture);
  };

  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;
  let menuComponent: LuxMenuComponent;

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [MockComponent]);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    menuComponent = fixture.debugElement.query(By.directive(LuxMenuComponent)).componentInstance;
  });

  it('Sollte erstellt werden', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('Sollte die MenuItems darstellen (nur im Menu und Extended)', fakeAsync(() => {
    // Vorbedingungen testen
    let menuItems = fixture.debugElement.queryAll(By.css('lux-menu-item'));
    expect(menuItems.length).toBe(0);
    expect(menuComponent.menuItems.length).toBe(0);

    // Änderungen durchführen
    component.generateItems(3);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    menuItems = fixture.debugElement.queryAll(By.css('lux-menu-item'));
    expect(menuItems.length).toBe(3);
    expect(menuComponent.menuItems.length).toBe(3);

    // Änderungen durchführen
    component.displayExtended = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    const extendedMenuItems = fixture.debugElement.queryAll(By.css('.lux-menu-item'));
    expect(extendedMenuItems.length).toBe(3);
  }));

  it('Sollte die MenuItems korrekt ausblenden wenn der Platz nicht mehr ausreicht', fakeAsync(() => {
    // Vorbedingungen testen
    component.generateItems(3);
    updateExtendedMenuItems();

    let extendedMenuItems = fixture.debugElement.queryAll(By.css('.lux-menu-item:not(.lux-display-none)'));
    expect(extendedMenuItems.length).toBe(3);

    // Änderungen durchführen
    const extendedNode = fixture.debugElement.query(By.css('.lux-menu-extended')).nativeElement;
    extendedNode.style.maxWidth = '200px';
    updateExtendedMenuItems();

    // Nachbedingungen prüfen
    extendedMenuItems = fixture.debugElement.queryAll(By.css('.lux-menu-item:not(.lux-display-none)'));
    expect(extendedMenuItems.length).toBeGreaterThan(0);
    expect(extendedMenuItems.length).toBeLessThan(3);
  }));

  it('Sollte einen eigenen Toggle-Button injecten', fakeAsync(() => {
    // Vorbedingungen testen
    component.generateItems(3);
    component.displayExtended = false;
    LuxTestHelper.wait(fixture);

    let defaultTriggerNode = fixture.debugElement.query(By.css('.lux-menu-trigger-default'));
    let mockTriggerNode = fixture.debugElement.query(By.css('.mock-trigger'));

    expect(defaultTriggerNode).not.toBeNull();
    expect(mockTriggerNode).toBeNull();

    // Änderungen durchführen
    component.showMockTrigger = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    defaultTriggerNode = fixture.debugElement.query(By.css('.lux-menu-trigger-default'));
    mockTriggerNode = fixture.debugElement.query(By.css('.mock-trigger'));

    expect(defaultTriggerNode).toBeNull();
    expect(mockTriggerNode).not.toBeNull();
  }));

  it('Sollte nur n (n = luxMaximumExtend) Menu-Items darstellen', fakeAsync(() => {
    // Vorbedingungen testen
    component.generateItems(3);
    updateExtendedMenuItems();

    let extendedMenuItems = fixture.debugElement.queryAll(By.css('.lux-menu-item:not(.lux-display-none)'));
    expect(extendedMenuItems.length).toBe(3);

    // Änderungen durchführen
    component.maximumExtended = 1;
    updateExtendedMenuItems();

    // Nachbedingungen prüfen
    extendedMenuItems = fixture.debugElement.queryAll(By.css('.lux-menu-item:not(.lux-display-none)'));
    expect(extendedMenuItems.length).toBe(1);

    // Änderungen durchführen
    component.maximumExtended = 2;
    updateExtendedMenuItems();

    // Nachbedingungen prüfen
    extendedMenuItems = fixture.debugElement.queryAll(By.css('.lux-menu-item:not(.lux-display-none)'));
    expect(extendedMenuItems.length).toBe(2);
  }));

  it('Sollte das extendedMenu rechtsbündig darstellen', fakeAsync(() => {
    // Vorbedingungen testen
    component.generateItems(3);
    component.maximumExtended = 2;
    updateExtendedMenuItems();

    let menuItems = fixture.debugElement.queryAll(By.css('.lux-menu-item:not(.lux-display-none)'));
    let menu = fixture.debugElement.query(By.css('.lux-menu-trigger'));

    expect(menuItems[0].nativeElement.offsetLeft).toBeLessThan(menu.nativeElement.offsetLeft);
    expect(menuItems[1].nativeElement.offsetLeft).toBeLessThan(menu.nativeElement.offsetLeft);

    // Änderungen durchführen
    component.displayMenuLeft = false;
    updateExtendedMenuItems();

    // Nachbedingungen prüfen
    menuItems = fixture.debugElement.queryAll(By.css('.lux-menu-item:not(.lux-display-none)'));
    menu = fixture.debugElement.query(By.css('.lux-menu-trigger'));

    expect(menuItems[0].nativeElement.offsetLeft).toBeGreaterThan(menu.nativeElement.offsetLeft);
    expect(menuItems[1].nativeElement.offsetLeft).toBeGreaterThan(menu.nativeElement.offsetLeft);
  }));

  it('Sollte Menu-Items deaktivieren', fakeAsync(() => {
    // Vorbedingungen testen
    component.generateItems(3);
    updateExtendedMenuItems();

    menuComponent.menuTriggerElRef!.nativeElement.click();
    LuxTestHelper.wait(fixture);

    let disabledLength = fixture.debugElement.queryAll(By.css('.lux-menu-item:not(.lux-hidden) button[disabled]'))
      .length;
    expect(disabledLength).toBe(0);

    // Änderungen durchführen
    component.items[0].disabled = true;
    component.items[1].disabled = true;
    component.items[2].disabled = true;
    LuxTestHelper.wait(fixture);

    menuComponent.menuTriggerElRef!.nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    disabledLength = fixture.debugElement.queryAll(By.css('.lux-menu-item:not(.lux-hidden) button[disabled]')).length;
    expect(disabledLength).toBe(3);

    flush();
    discardPeriodicTasks();
  }));

  it('Sollte zur Laufzeit weitere Menu-Items hinzufügen können', fakeAsync(() => {
    // Vorbedingungen testen
    component.generateItems(3);
    LuxTestHelper.wait(fixture);

    let items = fixture.debugElement.queryAll(By.css('.lux-menu-item:not(.lux-hidden)'));
    expect(items.length).toBe(3);

    // Änderungen durchführen
    component.pushItems(2);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    items = fixture.debugElement.queryAll(By.css('.lux-menu-item:not(.lux-hidden)'));
    expect(items.length).toBe(5);
  }));
});

@Component({
  template: `<lux-menu
    luxTagId="mock-menu"
    [luxDisplayMenuLeft]="displayMenuLeft"
    [luxDisplayExtended]="displayExtended"
    [luxMaximumExtended]="maximumExtended"
    [luxClassName]="className"
    (luxMenuClosed)="closed()"
  >
    <lux-menu-item
      [luxLabel]="item.label"
      [luxIconName]="item.iconName"
      [luxTagId]="item.label"
      [luxAlwaysVisible]="item.alwaysVisible"
      [luxDisabled]="item.disabled"
      [luxRaised]="item.raised"
      [luxColor]="item.color"
      (luxClicked)="clicked()"
      *ngFor="let item of items"
    >
    </lux-menu-item>
    <lux-menu-trigger *ngIf="showMockTrigger">
      <span class="mock-trigger">Mock-Spock</span>
    </lux-menu-trigger>
  </lux-menu>`
})
class MockComponent {
  displayMenuLeft = true;
  displayExtended = true;
  maximumExtended = 5;
  className = '';
  showMockTrigger = false;

  items: {
    label: string;
    cmd?: string;
    iconName?: string;
    tagId: string;
    alwaysVisible: boolean;
    disabled: boolean;
    raised?: boolean;
    color: LuxActionColorType;
  }[] = [];

  clicked() {}

  closed() {}

  generateItems(amount: number) {
    this.items = [];
    this.pushItems(amount);
  }

  pushItems(amount: number) {
    for (let i = 0; i < amount; i++) {
      this.items.push({
        label: 'Label ' + i,
        tagId: 'TagId ' + i,
        alwaysVisible: false,
        disabled: false,
        color: 'primary'
      });
    }
  }
}
