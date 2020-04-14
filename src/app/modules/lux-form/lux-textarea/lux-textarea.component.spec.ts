import { Component, OnInit } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LuxTestHelper } from '../../lux-util/testing/lux-test-helper';
import { LuxTextareaComponent } from './lux-textarea.component';
import { By } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LuxConsoleService } from '../../lux-util/lux-console.service';

describe('LuxTextareaComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule([LuxConsoleService], [LuxMockFormTextareaComponent, LuxMockTextareaComponent]);
  });

  let textarea: LuxTextareaComponent;

  describe('[ReactiveForm]', () => {
    let component: LuxMockFormTextareaComponent;
    let fixture: ComponentFixture<LuxMockFormTextareaComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(LuxMockFormTextareaComponent);
      component = fixture.componentInstance;
      textarea = fixture.debugElement.query(By.directive(LuxTextareaComponent)).componentInstance;
    });

    it('Sollte value über das FormControl aktualisieren', fakeAsync(() => {
      // Given
      fixture.detectChanges();
      const formControl = component.form.get('control');
      const textareaEl = fixture.debugElement.query(By.css('textarea')).nativeElement;
      // When
      // Then
      expect(component.value).toBeFalsy();
      expect(formControl.value).toBeFalsy();

      // When
      formControl.setValue('Test');
      LuxTestHelper.wait(fixture);
      // Then
      expect(component.value).toEqual('Test');
      expect(textareaEl.value).toEqual('Test');
    }));

    it('Sollte invalid sein wenn Validators.required', fakeAsync(() => {
      // Given
      const formControl = component.form.get('control');
      formControl.setValidators(Validators.required);
      component.value = 'Test';
      fixture.detectChanges();
      // When
      // Then
      expect(formControl.errors).toBeFalsy();
      expect(formControl.valid).toBeTruthy();

      // When
      component.value = '';
      fixture.detectChanges();
      // Then
      expect(formControl.errors).toBeTruthy();
      expect(formControl.errors.required).toBeTruthy();
      expect(formControl.valid).toBeFalsy();
    }));

    it('Sollte Validatoren setzen und korrekte Fehlermeldungen anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      let errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeFalsy(`Vorbedingung 1`);

      // Änderungen durchführen
      component.form.get('control').setValidators(Validators.maxLength(1));
      component.form.get('control').setValue('12');
      LuxTestHelper.wait(fixture);
      textarea.formControl.markAsTouched();
      textarea.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeTruthy(`Nachbedingung 1`);
      expect(errorEl.nativeElement.innerText.trim()).toEqual('Die Maximallänge ist 1', `Nachbedingung 2`);
      expect(textarea.formControl.valid).toBeFalsy(`Nachbedingung 3`);
    }));
  });

  describe('[Allgemein]', () => {
    let component: LuxMockTextareaComponent;
    let fixture: ComponentFixture<LuxMockTextareaComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(LuxMockTextareaComponent);
      component = fixture.componentInstance;
      textarea = fixture.debugElement.query(By.directive(LuxTextareaComponent)).componentInstance;
    });

    it('Sollte value über Two-Way-Binding aktualisieren', fakeAsync(() => {
      // Given
      fixture.detectChanges();
      const textareaEl = fixture.debugElement.query(By.css('textarea')).nativeElement;
      // When
      // Then
      expect(component.value).toBeFalsy();
      expect(textarea.luxValue).toBeFalsy();

      // When
      component.value = 'Test';
      LuxTestHelper.wait(fixture);
      // Then
      expect(textarea.luxValue).toEqual('Test');
      expect(textareaEl.value).toEqual('Test');
    }));

    it('Sollte label und placeholder setzen', fakeAsync(() => {
      // Given
      component.label = 'Testlabel';
      component.placeholder = 'Testplaceholder';
      fixture.detectChanges();

      const labelEl = fixture.debugElement.query(By.css('.lux-label')).nativeElement;
      const textareaEl = fixture.debugElement.query(By.css('textarea')).nativeElement;
      // When
      // Then
      expect(labelEl.innerText.trim()).toEqual('Testlabel');
      expect(textareaEl.placeholder).toEqual('Testplaceholder');
    }));

    it('Sollte invalid sein wenn luxRequired = true', fakeAsync(() => {
      // Given
      component.required = true;
      component.value = 'Test';
      fixture.detectChanges();
      // When
      // Then
      expect(textarea.formControl.errors).toBeFalsy();
      expect(textarea.formControl.valid).toBeTruthy();

      // When
      component.value = '';
      fixture.detectChanges();
      // Then
      expect(textarea.formControl.errors).toBeTruthy();
      expect(textarea.formControl.errors.required).toBeTruthy();
      expect(textarea.formControl.valid).toBeFalsy();
    }));

    it('Sollte Validatoren setzen und korrekte Fehlermeldungen anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      fixture.detectChanges();
      let errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeFalsy(`Vorbedingung 1`);

      // Änderungen durchführen
      component.validators = Validators.maxLength(1);
      component.value = '12';
      LuxTestHelper.wait(fixture);
      textarea.formControl.markAsTouched();
      textarea.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      errorEl = fixture.debugElement.query(By.css('mat-error'));
      expect(errorEl).toBeTruthy(`Nachbedingung 1`);
      expect(errorEl.nativeElement.innerText.trim()).toEqual('Die Maximallänge ist 1', `Nachbedingung 2`);
      expect(textarea.formControl.valid).toBeFalsy(`Nachbedingung 3`);
    }));

    it('Sollte einen Startwert haben', fakeAsync(() => {
      component.value = 'Praise the sun';
      LuxTestHelper.wait(fixture);
      expect(textarea.luxValue).toEqual('Praise the sun');
      expect(fixture.debugElement.query(By.css('textarea')).nativeElement.value.trim()).toEqual('Praise the sun');
    }));

    it('Sollte den Hint setzen', fakeAsync(() => {
      // Vorbedingungen testen
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('mat-hint'))).toBeNull();

      // Änderungen durchführen
      component.hint = 'Hint';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(fixture.debugElement.query(By.css('mat-hint')).nativeElement.textContent.trim()).toEqual('Hint');
    }));

    it('Sollte disabled sein', fakeAsync(() => {
      // Vorbedingungen testen
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('textarea')).nativeElement.disabled).toBe(false);
      expect(textarea.luxDisabled).toBe(false);

      // Änderungen durchführen
      component.disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(fixture.debugElement.query(By.css('textarea')).nativeElement.disabled).toBe(true);
      expect(textarea.luxDisabled).toBe(true);
    }));

    it('Sollte die luxErrorMessage anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('mat-error'))).toBe(null);

      // Änderungen durchführen
      component.validators = Validators.required;
      component.errorMessage = 'Alle meine Entchen';
      LuxTestHelper.wait(fixture);

      textarea.formControl.markAsTouched();
      textarea.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(fixture.debugElement.query(By.css('mat-error'))).not.toBe(null);
      expect(fixture.debugElement.query(By.css('mat-error')).nativeElement.textContent.trim()).toEqual(
        'Alle meine Entchen'
      );
      expect(textarea.formControl.errors.required).toBeDefined();
    }));

    it('Sollte den Fehler über luxErrorCallback anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('mat-error'))).toBe(null);

      // Änderungen durchführen
      component.validators = Validators.required;
      component.errorCb = (value, errors) => 'Alle meine Entchen';
      const spy = spyOn(component, 'errorCb').and.callThrough();
      LuxTestHelper.wait(fixture);

      textarea.formControl.markAsTouched();
      textarea.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(fixture.debugElement.query(By.css('mat-error'))).not.toBe(null);
      expect(fixture.debugElement.query(By.css('mat-error')).nativeElement.textContent.trim()).toEqual(
        'Alle meine Entchen'
      );
      expect(textarea.formControl.errors.required).toBeDefined();
      expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('Sollte nicht null/undefined im Label anzeigen', fakeAsync(() => {
      // Vorbedingungen testen
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('mat-label'))).toBeNull();

      // Änderungen durchführen
      component.label = null;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(fixture.debugElement.query(By.css('.lux-label')).nativeElement.textContent.trim()).toEqual('');

      // Änderungen durchführen
      component.label = undefined;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(fixture.debugElement.query(By.css('.lux-label')).nativeElement.textContent.trim()).toEqual('');
    }));

    it('Sollte readonly sein', fakeAsync(() => {
      // Vorbedingungen testen
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('textarea')).attributes.readonly).toBeFalsy();

      // Änderungen durchführen
      component.readonly = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      expect(fixture.debugElement.query(By.css('textarea')).attributes.readonly).toBe('true');
    }));

    it('Sollte maximal und minimal n-Zeilen erlauben', fakeAsync(() => {
      // Vorbedingungen testen
      component.minRows = 0;
      component.maxRows = 1;
      LuxTestHelper.wait(fixture);
      let textareaNode = fixture.debugElement.query(By.css('textarea'));
      const lineHeight = textareaNode.nativeElement.style.maxHeight;

      // Änderungen durchführen
      component.maxRows = 3;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      textareaNode = fixture.debugElement.query(By.css('textarea'));
      expect(textareaNode.nativeElement.style.maxHeight).toEqual(lineHeight.replace('px', '') * 3 + 'px');

      // Änderungen durchführen
      component.minRows = 2;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen testen
      textareaNode = fixture.debugElement.query(By.css('textarea'));
      expect(textareaNode.nativeElement.style.minHeight).toEqual(lineHeight.replace('px', '') * 2 + 'px');
    }));

    it('Sollte luxValueChange angemessen oft aufrufen', fakeAsync(() => {
      // Vorbedingungen prüfen
      const spy = spyOn(component, 'valueChanged');
      LuxTestHelper.wait(fixture);

      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      component.value = 'a';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(1);

      // Änderungen durchführen
      component.value = 'b';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(2);

      // Änderungen durchführen
      // Absichtlich den selben Wert nochmal, sollte nichts auslösen
      component.value = 'b';
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(2);
    }));
  });
});

@Component({
  selector: 'lux-mock-textarea',
  template:
    '<lux-textarea [(luxValue)]="value" [luxLabel]="label" [luxPlaceholder]="placeholder" ' +
    '[luxControlValidators]="validators" [luxReadonly]="readonly" [luxRequired]="required" ' +
    '[luxMaxRows]="maxRows" [luxMinRows]="minRows" [luxDisabled]="disabled" [luxHint]="hint" ' +
    '[luxErrorMessage]="errorMessage" [luxErrorCallback]="errorCb" (luxValueChange)="valueChanged()"></lux-textarea>'
})
class LuxMockTextareaComponent implements OnInit {
  value: string;
  label: string;
  placeholder: string;
  hint: string;
  disabled: boolean;
  errorMessage: string;

  readonly: boolean;
  required: boolean;

  maxRows: number;
  minRows: number;

  validators;
  errorCb: (value, errors) => string = (value, errors) => undefined;

  constructor() {}

  ngOnInit() {}

  valueChanged() {}
}

@Component({
  selector: 'lux-mock-form-textarea',
  template:
    '<form [formGroup]="form"><lux-textarea [(luxValue)]="value" [luxLabel]="label" [luxPlaceholder]="placeholder" ' +
    '[luxReadonly]="readonly" [luxRequired]="required" [luxMaxRows]="maxRows" ' +
    '[luxMinRows]="minRows" luxControlBinding="control"></lux-textarea></form>'
})
class LuxMockFormTextareaComponent implements OnInit {
  value: string;
  label: string;
  placeholder: string;
  readonly: boolean;
  required: boolean;

  maxRows: number;
  minRows: number;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      control: []
    });
  }

  ngOnInit() {}
}
