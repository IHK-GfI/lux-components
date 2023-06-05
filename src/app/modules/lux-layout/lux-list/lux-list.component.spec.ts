// noinspection DuplicatedCode

import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuxListComponent } from './lux-list.component';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxListItemComponent } from './lux-list-subcomponents/lux-list-item.component';
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';

describe('LuxListComponent', () => {
  beforeEach(async () => {
    LuxTestHelper.configureTestModule([], [MockListComponent]);
  });

  let testComponent: MockListComponent;
  let fixture: ComponentFixture<MockListComponent>;
  let listComponent: LuxListComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(MockListComponent);
    testComponent = fixture.componentInstance;
    listComponent = fixture.debugElement.query(By.directive(LuxListComponent)).componentInstance;

    fixture.detectChanges();
  });

  it('Sollte erstellt werden', () => {
    fixture.detectChanges();
    expect(testComponent).toBeTruthy();
  });

  it('Sollte Empty-Icon und Empty-Label anzeigen (leere Liste)', fakeAsync(() => {
    expect(fixture.debugElement.query(By.css('lux-icon.lux-list-empty-icon'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('span.lux-list-empty-icon-text strong'))).not.toBeNull();
  }));

  it('Sollte LuxListItems anzeigen (gefüllte Liste)', fakeAsync(() => {
    // Vorbedingungen testen
    expect(fixture.debugElement.query(By.css('lux-icon.lux-list-empty-icon'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('span.lux-list-empty-icon-text strong'))).not.toBeNull();
    expect(fixture.debugElement.queryAll(By.directive(LuxListItemComponent)).length).toBe(0);

    // Änderungen durchführen
    testComponent.addListItems(5);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(fixture.debugElement.query(By.css('lux-icon.lux-list-empty-icon'))).toBeNull();
    expect(fixture.debugElement.query(By.css('span.lux-list-empty-label'))).toBeNull();
    expect(fixture.debugElement.queryAll(By.directive(LuxListItemComponent)).length).toBe(5);
    expect(fixture.debugElement.query(By.css('.lux-card-title-container')).nativeElement.textContent.trim()).toEqual('Title 0');
    expect(fixture.debugElement.query(By.css('.mat-card-subtitle')).nativeElement.textContent.trim()).toEqual('SubTitle 0');
  }));

  it('Sollte ein selektiertes LuxListItem haben (max. 1, via LuxListItem)', fakeAsync(() => {
    // Vorbedingungen testen
    expect(fixture.debugElement.query(By.css('.lux-list-item-selected'))).toBeNull();

    // Änderungen durchführen
    testComponent.addListItems(5);
    LuxTestHelper.wait(fixture);

    const listItems = fixture.debugElement.queryAll(By.directive(LuxListItemComponent));
    (listItems[0].componentInstance as LuxListItemComponent).luxSelected = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(fixture.debugElement.queryAll(By.css('.lux-list-item-selected')).length).toBe(1);
    expect(
      fixture.debugElement.query(By.css('.lux-list-item-selected .lux-card-title-container')).nativeElement.textContent.trim()
    ).toEqual('Title 0');

    // Änderungen durchführen
    (listItems[0].componentInstance as LuxListItemComponent).luxSelected = false;
    LuxTestHelper.wait(fixture);
    (listItems[1].componentInstance as LuxListItemComponent).luxSelected = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(fixture.debugElement.queryAll(By.css('.lux-list-item-selected')).length).toBe(1);
    expect(
      fixture.debugElement.query(By.css('.lux-list-item-selected .lux-card-title-container')).nativeElement.textContent.trim()
    ).toEqual('Title 1');
  }));

  it('Sollte ein selektiertes LuxListItem haben (max. 1, via LuxList)', fakeAsync(() => {
    // Vorbedingungen testen
    const selectedSpy = spyOn(testComponent, 'onSelected');
    const focusedSpy = spyOn(testComponent, 'onFocused');
    const focusedItemSpy = spyOn(testComponent, 'onFocusedItem');

    expect(fixture.debugElement.query(By.css('.lux-list-item-selected'))).toBeNull();

    // Änderungen durchführen
    testComponent.addListItems(5);
    LuxTestHelper.wait(fixture);
    testComponent.selectedPosition = 0;
    LuxTestHelper.wait(fixture);
    const listItems = fixture.debugElement.queryAll(By.directive(LuxListItemComponent));

    // Nachbedingungen prüfen
    expect(selectedSpy).toHaveBeenCalledTimes(1);
    expect(selectedSpy).toHaveBeenCalledWith(0);
    expect(focusedSpy).toHaveBeenCalledTimes(1);
    expect(focusedSpy).toHaveBeenCalledWith(0);
    expect(focusedItemSpy).toHaveBeenCalledTimes(1);
    expect(focusedItemSpy).toHaveBeenCalledWith(listItems[0].componentInstance as LuxListItemComponent);
    expect(fixture.debugElement.queryAll(By.css('.lux-list-item-selected')).length).toBe(1);
    expect(
      fixture.debugElement.query(By.css('.lux-list-item-selected .lux-card-title-container')).nativeElement.textContent.trim()
    ).toEqual('Title 0');

    // Änderungen durchführen
    testComponent.selectedPosition = 1;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(selectedSpy).toHaveBeenCalledTimes(2);
    expect(selectedSpy).toHaveBeenCalledWith(1);
    expect(focusedSpy).toHaveBeenCalledTimes(2);
    expect(focusedSpy).toHaveBeenCalledWith(1);
    expect(focusedItemSpy).toHaveBeenCalledTimes(2);
    expect(focusedItemSpy).toHaveBeenCalledWith(listItems[1].componentInstance as LuxListItemComponent);
    expect(fixture.debugElement.queryAll(By.css('.lux-list-item-selected')).length).toBe(1);
    expect(
      fixture.debugElement.query(By.css('.lux-list-item-selected .lux-card-title-container')).nativeElement.textContent.trim()
    ).toEqual('Title 1');
  }));

  it('Sollte über die Pfeiltasten LuxListItems fokussieren können', fakeAsync(() => {
    // Vorbedingungen testen
    const selectedSpy = spyOn(testComponent, 'onSelected');
    const focusedSpy = spyOn(testComponent, 'onFocused');
    const focusedItemSpy = spyOn(testComponent, 'onFocusedItem');

    expect(fixture.debugElement.query(By.css('.lux-list-item-selected'))).toBeNull();

    // Änderungen durchführen
    testComponent.addListItems(5);
    LuxTestHelper.wait(fixture);

    const listItems = fixture.debugElement.queryAll(By.directive(LuxListItemComponent));
    const listNativeElement = fixture.debugElement.query(By.css('lux-list')).nativeElement;

    listNativeElement.focus();
    fixture.detectChanges();
    LuxTestHelper.dispatchKeyboardEvent(listNativeElement, 'keydown', DOWN_ARROW);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(selectedSpy).toHaveBeenCalledTimes(0);
    expect(focusedSpy).toHaveBeenCalledTimes(1);
    expect(focusedSpy).toHaveBeenCalledWith(0);
    expect(focusedItemSpy).toHaveBeenCalledTimes(1);
    expect(focusedItemSpy).toHaveBeenCalledWith(listItems[0].componentInstance as LuxListItemComponent);
    expect(fixture.debugElement.queryAll(By.css('.lux-list-item-selected')).length).toBe(0);

    // Änderungen durchführen
    LuxTestHelper.dispatchKeyboardEvent(listNativeElement, 'keydown', DOWN_ARROW);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(selectedSpy).toHaveBeenCalledTimes(0);
    expect(focusedSpy).toHaveBeenCalledTimes(2);
    expect(focusedSpy).toHaveBeenCalledWith(1);
    expect(focusedItemSpy).toHaveBeenCalledTimes(2);
    expect(focusedItemSpy).toHaveBeenCalledWith(listItems[1].componentInstance as LuxListItemComponent);
    expect(fixture.debugElement.queryAll(By.css('.lux-list-item-selected')).length).toBe(0);

    // Änderungen durchführen
    LuxTestHelper.dispatchKeyboardEvent(listNativeElement, 'keydown', UP_ARROW);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(selectedSpy).toHaveBeenCalledTimes(0);
    expect(focusedSpy).toHaveBeenCalledTimes(3);
    expect(focusedSpy).toHaveBeenCalledWith(0);
    expect(focusedItemSpy).toHaveBeenCalledTimes(3);
    expect(focusedItemSpy).toHaveBeenCalledWith(listItems[0].componentInstance as LuxListItemComponent);
    expect(fixture.debugElement.queryAll(By.css('.lux-list-item-selected')).length).toBe(0);
  }));

  it('Sollte über die Pfeiltasten + Space/Enter ein LuxListItem selektieren können', fakeAsync(() => {
    // Vorbedingungen testen
    const selectedSpy = spyOn(testComponent, 'onSelected');
    const focusedSpy = spyOn(testComponent, 'onFocused');
    const focusedItemSpy = spyOn(testComponent, 'onFocusedItem');

    expect(fixture.debugElement.query(By.css('.lux-list-item-selected'))).toBeNull();

    // Änderungen durchführen
    testComponent.addListItems(5);
    LuxTestHelper.wait(fixture);

    const listItems = fixture.debugElement.queryAll(By.directive(LuxListItemComponent));
    const listNativeElement = fixture.debugElement.query(By.css('lux-list')).nativeElement;

    listNativeElement.focus();
    fixture.detectChanges();
    LuxTestHelper.dispatchKeyboardEvent(listNativeElement, 'keydown', DOWN_ARROW);
    LuxTestHelper.wait(fixture);
    LuxTestHelper.dispatchKeyboardEvent(listNativeElement, 'keydown', SPACE);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(selectedSpy).toHaveBeenCalledTimes(1);
    expect(selectedSpy).toHaveBeenCalledWith(0);
    expect(focusedSpy).toHaveBeenCalledTimes(1);
    expect(focusedSpy).toHaveBeenCalledWith(0);
    expect(focusedItemSpy).toHaveBeenCalledTimes(1);
    expect(focusedItemSpy).toHaveBeenCalledWith(listItems[0].componentInstance as LuxListItemComponent);
    expect(fixture.debugElement.queryAll(By.css('.lux-list-item-selected')).length).toBe(1);
    expect(
      fixture.debugElement.query(By.css('.lux-list-item-selected .lux-card-title-container')).nativeElement.textContent.trim()
    ).toEqual('Title 0');

    // Änderungen durchführen
    LuxTestHelper.dispatchKeyboardEvent(listNativeElement, 'keydown', DOWN_ARROW);
    LuxTestHelper.wait(fixture);
    LuxTestHelper.dispatchKeyboardEvent(listNativeElement, 'keydown', ENTER);
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(selectedSpy).toHaveBeenCalledTimes(2);
    expect(selectedSpy).toHaveBeenCalledWith(1);
    expect(focusedSpy).toHaveBeenCalledTimes(2);
    expect(focusedSpy).toHaveBeenCalledWith(1);
    expect(focusedItemSpy).toHaveBeenCalledTimes(2);
    expect(focusedItemSpy).toHaveBeenCalledWith(listItems[1].componentInstance as LuxListItemComponent);
    expect(fixture.debugElement.queryAll(By.css('.lux-list-item-selected')).length).toBe(1);
    expect(
      fixture.debugElement.query(By.css('.lux-list-item-selected .lux-card-title-container')).nativeElement.textContent.trim()
    ).toEqual('Title 1');
  }));
});

@Component({
  selector: 'mock-list',
  template: `
    <lux-list
      luxEmptyLabel="Empty-Label"
      luxEmptyIconName="lux-interface-delete-1"
      luxEmptyIconSize="5x"
      [luxSelectedPosition]="selectedPosition"
      (luxSelectedPositionChange)="onSelected($event)"
      (luxFocusedPositionChange)="onFocused($event)"
      (luxFocusedItemChange)="onFocusedItem($event)"
    >
      <lux-list-item
        [luxTitle]="item.title"
        [luxSubTitle]="item.subTitle"
        [luxSelected]="item.selected"
        *ngFor="let item of list; let i = index"
      >
        <lux-list-item-icon>
          <lux-icon luxIconName="lux-interface-user-single"></lux-icon>
        </lux-list-item-icon>
        <lux-list-item-content> Item-Content #{{ i }} </lux-list-item-content>
      </lux-list-item>
    </lux-list>
  `
})
class MockListComponent {
  selectedPosition?: number;

  list: { title: string; subTitle: string; selected: boolean }[] = [];

  constructor() {}

  onSelected(event: number) {}

  onFocused(event: number) {}

  onFocusedItem(event: LuxListItemComponent) {}

  addListItems(amount: number) {
    for (let i = 0; i < amount; i++) {
      this.list.push({
        title: 'Title ' + i,
        subTitle: 'SubTitle ' + i,
        selected: false
      });
    }
  }
}
