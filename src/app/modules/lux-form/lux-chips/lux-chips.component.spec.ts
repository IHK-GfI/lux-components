import { Component, ViewChild } from '@angular/core';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxChipComponent } from './lux-chips-subcomponents/lux-chip.component';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed } from '@angular/core/testing';
import { LuxChipsComponent } from './lux-chips.component';
import { By } from '@angular/platform-browser';
import { LuxOverlayHelper } from '../../lux-util/testing/lux-test-overlay-helper';
import { LuxChipGroupComponent } from './lux-chips-subcomponents/lux-chip-group.component';

describe('LuxChipComponent', () => {
  LuxTestHelper.configureTestSuite();

  beforeAll(async () => {
    LuxTestHelper.configureTestModule([], [ChipsComponent]);
  });

  let fixture: ComponentFixture<ChipsComponent>;
  let testComponent: ChipsComponent;
  let chipsComponent: LuxChipsComponent;
  let overlayHelper: LuxOverlayHelper;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ChipsComponent);
    overlayHelper = new LuxOverlayHelper();
    testComponent = fixture.componentInstance;
    chipsComponent = fixture.debugElement.query(By.directive(LuxChipsComponent)).componentInstance;
    discardPeriodicTasks();
  }));

  it('Sollte Chips und ChipGroups darstellen', fakeAsync(() => {
    // Vorbedingungen prüfen
    let chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
    expect(chipElements.length).toBe(0);

    // Änderungen durchführen
    testComponent.addMockChips();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
    expect(chipElements.length).toBe(4);

    // Änderungen durchführen
    testComponent.addMockGroupLabels();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
    expect(chipElements.length).toBe(7);
    discardPeriodicTasks();
  }));

  it('Sollte alle Chips deaktivieren', fakeAsync(() => {
    // Vorbedingungen prüfen
    LuxTestHelper.wait(fixture);
    testComponent.chipGroup = testComponent.chipGroupComponent;
    LuxTestHelper.wait(fixture);
    testComponent.addMockGroupLabels();
    testComponent.addMockChips();
    LuxTestHelper.wait(fixture);

    let disabledChipElements = fixture.debugElement.queryAll(By.css('.mat-chip-disabled'));
    expect(disabledChipElements.length).toBe(0);

    // Änderungen durchführen
    testComponent.disabled = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    disabledChipElements = fixture.debugElement.queryAll(By.css('.mat-chip-disabled'));
    expect(disabledChipElements.length).toBe(7);
    discardPeriodicTasks();
  }));

  it('Sollte alle Grouped-Chips deaktivieren', fakeAsync(() => {
    // Vorbedingungen prüfen
    LuxTestHelper.wait(fixture);
    testComponent.chipGroup = testComponent.chipGroupComponent;
    LuxTestHelper.wait(fixture);
    testComponent.addMockGroupLabels();
    testComponent.addMockChips();
    LuxTestHelper.wait(fixture);

    let disabledChipElements = fixture.debugElement.queryAll(By.css('.mat-chip-disabled'));
    expect(disabledChipElements.length).toBe(0);

    // Änderungen durchführen
    testComponent.groupDisabled = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    disabledChipElements = fixture.debugElement.queryAll(By.css('.mat-chip-disabled'));
    expect(disabledChipElements.length).toBe(3);
    discardPeriodicTasks();
  }));

  it('Sollte einzelne Chips deaktivieren', fakeAsync(() => {
    // Vorbedingungen prüfen
    LuxTestHelper.wait(fixture);
    testComponent.chipGroup = testComponent.chipGroupComponent;
    LuxTestHelper.wait(fixture);
    testComponent.addMockGroupLabels();
    testComponent.addMockChips();
    LuxTestHelper.wait(fixture);

    let disabledChipElements = fixture.debugElement.queryAll(By.css('.mat-chip-disabled'));
    expect(disabledChipElements.length).toBe(0);

    // Änderungen durchführen
    testComponent.chips[0].disabled = true;
    testComponent.chips[1].disabled = true;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    disabledChipElements = fixture.debugElement.queryAll(By.css('.mat-chip-disabled'));
    expect(disabledChipElements.length).toBe(2);
    discardPeriodicTasks();
  }));

  it('Sollte alle Grouped-Chips un-removeable machen', fakeAsync(() => {
    // Vorbedingungen prüfen
    LuxTestHelper.wait(fixture);
    testComponent.chipGroup = testComponent.chipGroupComponent;
    LuxTestHelper.wait(fixture);
    testComponent.addMockGroupLabels();
    testComponent.addMockChips();
    LuxTestHelper.wait(fixture);

    let disabledChipElements = fixture.debugElement.queryAll(By.css('.mat-chip-remove'));
    expect(disabledChipElements.length).toBe(7);

    // Änderungen durchführen
    testComponent.groupRemovable = false;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    disabledChipElements = fixture.debugElement.queryAll(By.css('.mat-chip-remove'));
    expect(disabledChipElements.length).toBe(4);
    discardPeriodicTasks();
  }));

  it('Sollte einzelne Chips un-removeable machen', fakeAsync(() => {
    // Vorbedingungen prüfen
    LuxTestHelper.wait(fixture);
    testComponent.chipGroup = testComponent.chipGroupComponent;
    LuxTestHelper.wait(fixture);
    testComponent.addMockGroupLabels();
    testComponent.addMockChips();
    LuxTestHelper.wait(fixture);

    let disabledChipElements = fixture.debugElement.queryAll(By.css('.mat-chip-remove'));
    expect(disabledChipElements.length).toBe(7);

    // Änderungen durchführen
    testComponent.chips[0].removable = false;
    testComponent.chips[1].removable = false;
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    disabledChipElements = fixture.debugElement.queryAll(By.css('.mat-chip-remove'));
    expect(disabledChipElements.length).toBe(5);
    discardPeriodicTasks();
  }));

  it('Sollte neue Chips über das Input hinzufügen', fakeAsync(() => {
    // Vorbedingungen prüfen
    const spy = spyOn(testComponent, 'chipAdded').and.callThrough();
    let chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
    expect(chipElements.length).toBe(0);

    // Änderungen durchführen
    testComponent.inputAllowed = true;
    LuxTestHelper.wait(fixture);
    const input = fixture.debugElement.query(By.css('input'));
    chipsComponent.add('test');
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
    expect(chipElements.length).toBe(1);
    expect(spy).toHaveBeenCalledTimes(1);
    discardPeriodicTasks();
  }));

  it('Sollte neue Grouped-Chips über das Input hinzufügen', fakeAsync(() => {
    // Vorbedingungen prüfen
    const spy = spyOn(testComponent, 'groupChipAdded');
    let chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
    expect(chipElements.length).toBe(0);

    // Änderungen durchführen
    LuxTestHelper.wait(fixture);
    testComponent.chipGroup = testComponent.chipGroupComponent;
    testComponent.inputAllowed = true;
    LuxTestHelper.wait(fixture);
    const input = fixture.debugElement.query(By.css('input'));
    chipsComponent.add('test');
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
    expect(chipElements.length).toBe(1);
    expect(spy).toHaveBeenCalledTimes(1);
    discardPeriodicTasks();
  }));

  it('Sollte Chips bei Click auf Remove-Icon entfernen', fakeAsync(() => {
    // Vorbedingungen prüfen
    testComponent.addMockChips();
    LuxTestHelper.wait(fixture);

    let chipElements = fixture.debugElement.queryAll(By.css('.mat-chip'));
    expect(chipElements.length).toBe(4);

    // Änderungen durchführen
    const removeButtonElements = fixture.debugElement.queryAll(By.css('.mat-chip-remove'));
    removeButtonElements[0].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    chipElements = fixture.debugElement.queryAll(By.css('.mat-chip'));
    expect(chipElements.length).toBe(3);
    discardPeriodicTasks();
  }));

  it('Sollte Grouped-Chips bei Click auf Remove-Icon entfernen', fakeAsync(() => {
    // Vorbedingungen prüfen
    LuxTestHelper.wait(fixture);
    testComponent.chipGroup = testComponent.chipGroupComponent;
    LuxTestHelper.wait(fixture);
    testComponent.addMockGroupLabels();
    LuxTestHelper.wait(fixture);

    let chipElements = fixture.debugElement.queryAll(By.css('.mat-chip'));
    expect(chipElements.length).toBe(3);

    // Änderungen durchführen
    const removeButtonElements = fixture.debugElement.queryAll(By.css('.mat-chip-remove'));
    removeButtonElements[0].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    chipElements = fixture.debugElement.queryAll(By.css('.mat-chip'));
    expect(chipElements.length).toBe(2);
    discardPeriodicTasks();
  }));

  it('Sollte Chips über Autocomplete hinzufügen', fakeAsync(() => {
    // Vorbedingungen prüfen
    testComponent.addMockChips();
    testComponent.inputAllowed = true;
    testComponent.autocomplete = true;
    testComponent.autocompleteOptions = ['Option 1', 'Option 2', 'Option 3'];
    LuxTestHelper.wait(fixture);

    let chipElements = fixture.debugElement.queryAll(By.css('.mat-chip'));
    expect(chipElements.length).toBe(4);

    // Änderungen durchführen
    const inputElement = fixture.debugElement.query(By.css('input'));
    LuxTestHelper.typeInElementAsynch('Option 1', fixture, inputElement.nativeElement, () => {
      const optionElement = overlayHelper.selectOneFromOverlay('mat-option');
      optionElement.click();
      LuxTestHelper.wait(fixture, 500);

      // Nachbedingungen prüfen
      chipElements = fixture.debugElement.queryAll(By.css('.mat-chip'));
      expect(chipElements.length).toBe(5);
      expect(inputElement.nativeElement.textContent).toBe('');
    });
    LuxTestHelper.wait(fixture);
    discardPeriodicTasks();
  }));

  it('Sollte eine einzelne FilteredOption als neuen Chip ergänzen', fakeAsync(() => {
    // Vorbedingungen prüfen
    testComponent.addMockChips();
    testComponent.inputAllowed = true;
    testComponent.autocomplete = true;
    testComponent.autocompleteOptions = ['Option 1', 'Option 2', 'Option 3'];
    LuxTestHelper.wait(fixture);

    let chipElements = fixture.debugElement.queryAll(By.css('.mat-chip'));
    expect(chipElements.length).toBe(4);

    // Änderungen durchführen
    const inputElement = fixture.debugElement.query(By.css('input'));
    chipsComponent.inputValue$.next('1');
    // eigentlich muss ein "blur"-Event stattfinden um die Options auszublenden, wir machen das im Test per Hand.
    spyOnProperty(chipsComponent.matAutocomplete, 'isOpen', 'get').and.returnValue(false);

    LuxTestHelper.typeInElementAsynch('1', fixture, inputElement.nativeElement, () => {
      LuxTestHelper.dispatchEvent(inputElement.nativeElement, new Event('blur'));
      LuxTestHelper.wait(fixture, 500);

      // Nachbedingungen prüfen
      chipElements = fixture.debugElement.queryAll(By.css('.mat-chip'));
      expect(chipElements.length).toBe(5);
      expect(inputElement.nativeElement.textContent).toBe('');
      expect(chipElements[chipElements.length - 1].nativeElement.textContent.trim()).toContain('Option 1');
    });
    LuxTestHelper.wait(fixture);
    discardPeriodicTasks();
  }));

  it('Sollte die angeklickten Chips als Event ausgeben', fakeAsync(() => {
    // Vorbedingungen prüfen
    LuxTestHelper.wait(fixture);
    testComponent.chipGroup = testComponent.chipGroupComponent;
    LuxTestHelper.wait(fixture);
    testComponent.addMockGroupLabels();
    testComponent.addMockChips();
    LuxTestHelper.wait(fixture);
    const spy = spyOn(testComponent, 'chipClicked');

    const chipElements = fixture.debugElement.queryAll(By.css('.mat-chip'));
    expect(chipElements.length).toBe(7);

    // Änderungen durchführen
    chipElements[0].nativeElement.click();
    LuxTestHelper.wait(fixture);

    // Nachbedingungen prüfen
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(0);
    discardPeriodicTasks();
  }));
});

@Component({
  template: `
    <lux-chips
      [luxDisabled]="disabled"
      [luxInputAllowed]="inputAllowed"
      [luxInputLabel]="inputLabel"
      [luxOrientation]="chipOrientation"
      [luxNewChipGroup]="chipGroup"
      (luxChipAdded)="chipAdded($event)"
      [luxAutocompleteOptions]="autocompleteOptions"
    >
      <lux-chip
        [luxDisabled]="chip.disabled"
        [luxColor]="chip.color"
        [luxRemovable]="chip.removable"
        (luxChipClicked)="chipClicked($event)"
        (luxChipRemoved)="chipRemoved($event)"
        *ngFor="let chip of chips; let i = index"
      >
        {{ chip.label }}
      </lux-chip>
      <lux-chip-group
        [luxRemovable]="groupRemovable"
        [luxColor]="groupColor"
        [luxLabels]="groupLabels"
        [luxDisabled]="groupDisabled"
        (luxChipRemoved)="groupChipRemoved($event)"
        (luxChipAdded)="groupChipAdded($event)"
        (luxChipClicked)="groupChipClicked($event)"
      >
      </lux-chip-group>
    </lux-chips>
  `
})
class ChipsComponent {
  disabled = false;
  inputAllowed = false;
  inputLabel = 'Neu';
  chipOrientation = 'horizontal';
  autocomplete = false;
  autocompleteOptions;

  chips = [];

  groupRemovable = true;
  groupDisabled = false;
  groupColor = 'Keine Farbe';
  groupLabels = [];

  chipGroup;
  @ViewChild(LuxChipGroupComponent, { static: false }) chipGroupComponent: LuxChipGroupComponent;

  chipAdded($event: string) {
    this.chips.push({
      label: $event,
      color: 'warn',
      removable: true,
      disabled: false
    });
  }

  chipClicked($event: number) {}

  chipRemoved($event: number) {
    this.chips = this.chips.filter((value: any, index: number) => index !== $event);
  }

  groupChipRemoved($event: number) {
    console.log('[GROUP] Chip removed', $event);
  }

  groupChipAdded($event: string) {
    console.log('[GROUP] Chip added', $event);
  }

  groupChipClicked($event: number) {
    console.log('[GROUP] Chip clicked', $event);
  }

  addMockChips() {
    this.chips = [
      { label: 'Hallo Welt!', color: 'Keine Farbe', removable: true, disabled: false },
      { label: 'Hello World!', color: 'primary', removable: true, disabled: false },
      { label: 'Ciao Mundo!', color: 'warn', removable: true, disabled: false },
      { label: 'Привет мир!', color: 'accent', removable: true, disabled: false }
    ];
  }

  addMockGroupLabels() {
    this.groupLabels = ['Group Label 0', 'Group Label 1', 'Group Label 2'];
  }
}
