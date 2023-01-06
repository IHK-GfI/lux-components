/* eslint-disable max-classes-per-file */
// noinspection DuplicatedCode

import { Component, ViewChild } from '@angular/core';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LuxThemePalette } from '../../lux-util/lux-colors.enum';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { LuxChipsAcComponent, LuxChipsAcOrientation } from './lux-chips-ac.component';
import { By } from '@angular/platform-browser';
import { LuxOverlayHelper } from '../../lux-util/testing/lux-test-overlay-helper';
import { LuxChipAcGroupComponent } from './lux-chips-subcomponents/lux-chip-ac-group.component';

describe('LuxChipComponent-Authentic', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [],
      [ChipsComponent, LuxStrictFormComponent, LuxStrictNoFormComponent, LuxFormInitValueComponent, LuxFormRequiredValueComponent]
    );
  });

  describe('Allgemein', () => {
    let fixture: ComponentFixture<ChipsComponent>;
    let testComponent: ChipsComponent;
    let chipsComponent: LuxChipsAcComponent;
    let overlayHelper: LuxOverlayHelper;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(ChipsComponent);
      overlayHelper = new LuxOverlayHelper();
      testComponent = fixture.componentInstance;
      chipsComponent = fixture.debugElement.query(By.directive(LuxChipsAcComponent)).componentInstance;
      discardPeriodicTasks();
      flush();
    }));

    it('Sollte Chips und ChipGroups darstellen', fakeAsync(() => {
      // Vorbedingungen testen
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
      flush();
    }));

    it('Sollte alle Chips deaktivieren', fakeAsync(() => {
      // Vorbedingungen testen
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
      flush();
    }));

    it('Sollte alle Grouped-Chips deaktivieren', fakeAsync(() => {
      // Vorbedingungen testen
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
      flush();
    }));

    it('Sollte einzelne Chips deaktivieren', fakeAsync(() => {
      // Vorbedingungen testen
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
      flush();
    }));

    it('Sollte alle Grouped-Chips unlöschbar machen', fakeAsync(() => {
      // Vorbedingungen testen
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
      flush();
    }));

    it('Sollte einzelne Chips unlöschbar machen', fakeAsync(() => {
      // Vorbedingungen testen
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
      flush();
    }));

    it('Sollte neue Chips über das Input hinzufügen', fakeAsync(() => {
      // Vorbedingungen testen
      const spy = spyOn(testComponent, 'chipAdded').and.callThrough();
      let chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
      expect(chipElements.length).toBe(0);

      // Änderungen durchführen
      testComponent.inputAllowed = true;
      LuxTestHelper.wait(fixture);
      chipsComponent.add('test');
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
      expect(chipElements.length).toBe(1);
      expect(spy).toHaveBeenCalledTimes(1);
      discardPeriodicTasks();
      flush();
    }));

    it('Sollte neue Grouped-Chips über das Input hinzufügen', fakeAsync(() => {
      // Vorbedingungen testen
      const spy = spyOn(testComponent, 'groupChipAdded');
      let chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
      expect(chipElements.length).toBe(0);

      // Änderungen durchführen
      LuxTestHelper.wait(fixture);
      testComponent.chipGroup = testComponent.chipGroupComponent;
      testComponent.inputAllowed = true;
      LuxTestHelper.wait(fixture);
      chipsComponent.add('test');
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
      expect(chipElements.length).toBe(1);
      expect(spy).toHaveBeenCalledTimes(1);
      discardPeriodicTasks();
      flush();
    }));

    it('Sollte Chips bei Click auf Remove-Icon entfernen', fakeAsync(() => {
      // Vorbedingungen testen
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
      flush();
    }));

    it('Sollte Grouped-Chips bei Click auf Remove-Icon entfernen', fakeAsync(() => {
      // Vorbedingungen testen
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
      flush();
    }));

    it('Sollte Chips über Autocomplete hinzufügen', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.addMockChips();
      testComponent.inputAllowed = true;
      testComponent.autocomplete = true;
      testComponent.autocompleteOptions = ['Option 1', 'Option 2', 'Option 3'];
      LuxTestHelper.wait(fixture);

      let chipElements = fixture.debugElement.queryAll(By.css('.mat-chip'));
      expect(chipElements.length).toBe(4);

      // Änderungen durchführen
      const inputElement = fixture.debugElement.query(By.css('input'));
      LuxTestHelper.typeInElementAsync('Option 1', fixture, inputElement.nativeElement, () => {
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
      flush();
    }));

    it('Sollte eine einzelne FilteredOption als neuen Chip ergänzen', fakeAsync(() => {
      // Vorbedingungen testen
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
      // Eigentlich muss ein "blur"-Event stattfinden, um die Options auszublenden, wir machen das im Test per Hand.
      spyOnProperty(chipsComponent.matAutocomplete!, 'isOpen', 'get').and.returnValue(false);

      LuxTestHelper.typeInElementAsync('1', fixture, inputElement.nativeElement, () => {
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
      flush();
    }));

    it('Sollte die angeklickten Chips als Event ausgeben', fakeAsync(() => {
      // Vorbedingungen testen
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
      flush();
    }));
  });

  describe('Formular', () => {

    it('Sollte die Werte aus dem initialen Array anzeigen', fakeAsync(() => {
      const localFixture = TestBed.createComponent(LuxFormInitValueComponent);
      const testComponent = localFixture.componentInstance;
      localFixture.detectChanges();

      expect(testComponent.form.get('names')!.value?.length).toEqual(2);
      expect(testComponent.form.get('names')!.value![0]).toContain('Emma');
      expect(testComponent.form.get('names')!.value![1]).toContain('Marie');

      const chipElements = localFixture.debugElement.queryAll(By.css('mat-chip'));

      expect(chipElements.length).toEqual(2);
      flush();
    }));

    it('Sollte einen Chip löschen', fakeAsync(() => {
      const localFixture = TestBed.createComponent(LuxFormInitValueComponent);
      const testComponent = localFixture.componentInstance;
      localFixture.detectChanges();

      expect(testComponent.form.get('names')!.value?.length).toEqual(2);
      expect(testComponent.form.get('names')!.value![0]).toContain('Emma');
      expect(testComponent.form.get('names')!.value![1]).toContain('Marie');

      const iconElement = localFixture.debugElement.query(By.css('lux-icon'));
      iconElement.nativeElement.click();
      LuxTestHelper.wait(localFixture);

      expect(testComponent.form.get('names')!.value).toEqual(['Marie']);
    }));

    it('Sollte die required-Fehlermeldung zeigen', fakeAsync(() => {
      const localFixture = TestBed.createComponent(LuxFormRequiredValueComponent);
      const testComponent = localFixture.componentInstance;
      localFixture.detectChanges();

      expect(testComponent.form.get('names')!.value).toBeNull();

      testComponent.form.get('names')!.markAsTouched();
      LuxTestHelper.wait(localFixture);

      let errorElement = localFixture.debugElement.query(By.css('mat-error'));

      expect(errorElement.nativeElement.innerHTML).toContain('* Pflichtfeld');
    }));

    it('Sollte die Werte über das Formular ändern', fakeAsync(() => {
      const localFixture = TestBed.createComponent(LuxFormRequiredValueComponent);
      const testComponent = localFixture.componentInstance;
      localFixture.detectChanges();

      expect(testComponent.form.get('names')!.value).toBeNull();

      testComponent.form.get('names')!.setValue(['Emma', 'Marie', 'Martha']);
      LuxTestHelper.wait(localFixture);

      let chipElements = localFixture.debugElement.queryAll(By.css('mat-chip'));

      expect(chipElements.length).toEqual(3);

      testComponent.form.get('names')!.setValue(null);
      LuxTestHelper.wait(localFixture);

      chipElements = localFixture.debugElement.queryAll(By.css('mat-chip'));

      expect(chipElements.length).toEqual(0);
    }));

  });

  describe('luxStrict', () => {

    describe('außerhalb eines Formulars', () => {
      let fixture: ComponentFixture<LuxStrictNoFormComponent>;
      let testComponent: LuxStrictNoFormComponent;
      let overlayHelper: LuxOverlayHelper;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxStrictNoFormComponent);
        testComponent = fixture.componentInstance;
        overlayHelper = new LuxOverlayHelper();
        fixture.detectChanges();
        tick();
      }));

      it('Sollte keine Option mehrfach hinzufügen', fakeAsync(() => {
        const inputElement = fixture.debugElement.query(By.css('input'));

        // Den strikten Modus aktivieren.
        testComponent.strict = true;
        fixture.detectChanges();

        // Die Option "Emma" hinzufügen.
        LuxTestHelper.typeInElement(inputElement.nativeElement, 'Emma', false);
        LuxTestHelper.dispatchEvent(inputElement.nativeElement, new Event('blur'));
        LuxTestHelper.wait(fixture);

        expect(testComponent.chips.length).toEqual(1);
        expect(testComponent.chips[0]).toContain('Emma');

        // Versuchen noch einmal die Option "Emma" hinzuzufügen.
        LuxTestHelper.typeInElement(inputElement.nativeElement, 'Emma', false);
        LuxTestHelper.dispatchEvent(inputElement.nativeElement, new Event('blur'));
        LuxTestHelper.wait(fixture);

        expect(testComponent.chips.length).toEqual(1);
        expect(testComponent.chips[0]).toContain('Emma');

        // Eine andere Option hinzufügen
        LuxTestHelper.typeInElement(inputElement.nativeElement, 'Martha', false);
        LuxTestHelper.dispatchEvent(inputElement.nativeElement, new Event('blur'));
        LuxTestHelper.wait(fixture);

        expect(testComponent.chips.length).toEqual(2);
        expect(testComponent.chips[0]).toContain('Emma');
        expect(testComponent.chips[1]).toContain('Martha');
      }));
    });

    describe('innerhalb eines Formulars', () => {
      let fixture: ComponentFixture<LuxStrictFormComponent>;
      let testComponent: LuxStrictFormComponent;
      let overlayHelper: LuxOverlayHelper;

      beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(LuxStrictFormComponent);
        testComponent = fixture.componentInstance;
        overlayHelper = new LuxOverlayHelper();
        fixture.detectChanges();
        tick();
      }));

      it('Sollte keine Option mehrfach hinzufügen', fakeAsync(() => {
        const inputElement = fixture.debugElement.query(By.css('input'));

        // Den strikten Modus aktivieren.
        testComponent.strict = true;
        fixture.detectChanges();

        // Die Option "Emma" hinzufügen.
        LuxTestHelper.typeInElement(inputElement.nativeElement, 'Emma', false);
        LuxTestHelper.dispatchEvent(inputElement.nativeElement, new Event('blur'));
        LuxTestHelper.wait(fixture);

        expect(testComponent.form.get('names')!.value.length).toEqual(1);
        expect(testComponent.form.get('names')!.value[0]).toContain('Emma');

        // Versuchen noch einmal die Option "Emma" hinzuzufügen.
        LuxTestHelper.typeInElement(inputElement.nativeElement, 'Emma', false);
        LuxTestHelper.dispatchEvent(inputElement.nativeElement, new Event('blur'));
        LuxTestHelper.wait(fixture);

        expect(testComponent.form.get('names')!.value.length).toEqual(1);
        expect(testComponent.form.get('names')!.value[0]).toContain('Emma');

        // Eine andere Option hinzufügen
        LuxTestHelper.typeInElement(inputElement.nativeElement, 'Martha', false);
        LuxTestHelper.dispatchEvent(inputElement.nativeElement, new Event('blur'));
        LuxTestHelper.wait(fixture);

        expect(testComponent.form.get('names')!.value.length).toEqual(2);
        expect(testComponent.form.get('names')!.value[0]).toContain('Emma');
        expect(testComponent.form.get('names')!.value[1]).toContain('Martha');
      }));
    });

  });
});

@Component({
  template: `
    <lux-chips-ac
      luxInputLabel="Strict"
      [luxNewChipGroup]="myChipGroup"
      [luxInputAllowed]="true"
      [luxStrict]="strict"
      [luxAutocompleteOptions]="[]"
    >
      <lux-chip-ac-group
        [luxRemovable]="true"
        luxColor="primary"
        [luxLabels]="chips"
        #myChipGroup
      >
      </lux-chip-ac-group>
    </lux-chips-ac>
  `
})
class LuxStrictNoFormComponent {

  strict = false;
  chips: string[] = [];

}

@Component({
  template: `
    <div [formGroup]="form">
      <lux-chips-ac
        luxInputLabel="Strict"
        [luxNewChipGroup]="myChipGroup"
        luxControlBinding="names"
        [luxInputAllowed]="true"
        [luxStrict]="strict"
      >
        <lux-chip-ac-group
          [luxRemovable]="true"
          luxColor="primary"
          #myChipGroup
        >
        </lux-chip-ac-group>
      </lux-chips-ac>
    </div>
  `
})
class LuxStrictFormComponent {

  strict = false;
  form = new FormGroup({
    names: new FormControl()
  });

}

@Component({
  template: `
    <div [formGroup]="form">
      <lux-chips-ac
        luxInputLabel="Strict"
        [luxNewChipGroup]="myChipGroup"
        luxControlBinding="names"
        [luxInputAllowed]="true"
        [luxStrict]="strict"
      >
        <lux-chip-ac-group
          [luxRemovable]="true"
          luxColor="primary"
          #myChipGroup
        >
        </lux-chip-ac-group>
      </lux-chips-ac>
    </div>
  `
})
class LuxFormInitValueComponent {

  strict = false;
  form = new FormGroup({
    names: new FormControl(['Emma', 'Marie'])
  });

}

@Component({
  template: `
    <div [formGroup]="form">
      <lux-chips-ac
        luxInputLabel="Strict"
        [luxNewChipGroup]="myChipGroup"
        luxControlBinding="names"
        [luxInputAllowed]="true"
        [luxStrict]="strict"
      >
        <lux-chip-ac-group
          [luxRemovable]="true"
          luxColor="primary"
          #myChipGroup
        >
        </lux-chip-ac-group>
      </lux-chips-ac>
    </div>
  `
})
class LuxFormRequiredValueComponent {

  strict = false;
  form = new FormGroup({
    names: new FormControl<string[] | null>(null, Validators.required)
  });

}

@Component({
  template: `
    <lux-chips-ac
      [luxDisabled]="disabled"
      [luxInputAllowed]="inputAllowed"
      [luxInputLabel]="inputLabel"
      [luxOrientation]="chipOrientation"
      [luxNewChipGroup]="chipGroup"
      (luxChipAdded)="chipAdded($event)"
      [luxAutocompleteOptions]="autocompleteOptions"
    >
      <lux-chip-ac
        [luxDisabled]="chip.disabled"
        [luxColor]="chip.color"
        [luxRemovable]="chip.removable"
        (luxChipClicked)="chipClicked($event)"
        (luxChipRemoved)="chipRemoved($event)"
        *ngFor="let chip of chips; let i = index"
      >
        {{ chip.label }}
      </lux-chip-ac>
      <lux-chip-ac-group
        [luxRemovable]="groupRemovable"
        [luxColor]="groupColor"
        [luxLabels]="groupLabels"
        [luxDisabled]="groupDisabled"
        (luxChipRemoved)="groupChipRemoved($event)"
        (luxChipAdded)="groupChipAdded($event)"
        (luxChipClicked)="groupChipClicked($event)"
      >
      </lux-chip-ac-group>
    </lux-chips-ac>
  `
})
class ChipsComponent {
  disabled = false;
  inputAllowed = false;
  inputLabel = 'Neu';
  chipOrientation: LuxChipsAcOrientation = 'horizontal';
  autocomplete = false;
  autocompleteOptions: string[] = [];

  chips: { label: string; color: LuxThemePalette; removable: boolean; disabled: boolean; selected: boolean }[] = [];

  groupRemovable = true;
  groupDisabled = false;
  groupColor: LuxThemePalette = undefined;
  groupLabels: string[] = [];

  chipGroup?: LuxChipAcGroupComponent;
  @ViewChild(LuxChipAcGroupComponent) chipGroupComponent!: LuxChipAcGroupComponent;

  chipAdded(newChip: string) {
    this.chips.push({
      label: newChip,
      color: 'warn',
      removable: true,
      disabled: false,
      selected: false
    });
  }

  chipClicked(index: number) {}

  chipRemoved(chipIndex: number) {
    this.chips = this.chips.filter((value: any, index: number) => index !== chipIndex);
  }

  groupChipRemoved(_index: number) {
  }

  groupChipAdded(_newChip: string) {
  }

  groupChipClicked(_index: number) {
  }

  addMockChips() {
    this.chips = [
      { label: 'Hallo Welt!', color: undefined, removable: true, disabled: false, selected: false },
      { label: 'Hello World!', color: 'primary', removable: true, disabled: false, selected: false },
      { label: 'Ciao Mundo!', color: 'warn', removable: true, disabled: false, selected: false },
      { label: 'Привет мир!', color: 'accent', removable: true, disabled: false, selected: false }
    ];
  }

  addMockGroupLabels() {
    this.groupLabels = ['Group Label 0', 'Group Label 1', 'Group Label 2'];
  }
}
