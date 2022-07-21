/* eslint-disable max-classes-per-file */
import { Component } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LuxConsoleService } from '../../../lux-util/lux-console.service';
import { LuxTestHelper } from '../../../lux-util/testing/lux-test-helper';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { LuxFileInputComponent } from './lux-file-input.component';
import { By } from '@angular/platform-browser';
import { LuxFormFileBase } from '../../lux-form-model/lux-form-file-base.class';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LuxFileErrorCause } from '../lux-file-model/lux-file-error.interface';
import { ILuxFileActionConfig } from '../lux-file-model/lux-file-action-config.interface';
import { ILuxFileObject } from '../lux-file-model/lux-file-object.interface';
import { LuxStorageService } from '../../../lux-util/lux-storage.service';

describe('LuxFileInputComponent', () => {

  beforeEach(async () => {
    LuxTestHelper.configureTestModule(
      [
        LuxConsoleService,
        {
          provide: HttpClient,
          useClass: MockHttp
        },
        {
          provide: LuxStorageService,
          useClass: MockStorage
        }
      ],
      [FileComponent, FileFormComponent]
    );
  });

  describe('[ReactiveForm]', () => {
    let fixture: ComponentFixture<FileFormComponent>;
    let testComponent: FileFormComponent;
    let fileComponent: LuxFileInputComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(FileFormComponent);
      testComponent = fixture.componentInstance;
      fileComponent = fixture.debugElement.query(By.directive(LuxFileInputComponent)).componentInstance;

      // den LiveAnnouncer abklemmen
      fileComponent['liveAnnouncer'] = {
        announce: (...args) => {}
      } as any;

      // Wir mocken hier den FileReader weg, da er nicht mit fakeAsync kompatibel ist
      spyOn(fileComponent, 'readFile').and.returnValue(Promise.resolve('base64-dummy'));
      // Den read-Delay für die Ladeanzeige wegmocken
      fileComponent.defaultReadFileDelay = 0;
      fixture.detectChanges();
    });

    it('Sollte den Startwert korrekt setzen', fakeAsync(() => {
      // Vorbedingungen testen
      const localFixture = TestBed.createComponent(FileFormComponent);
      const localTestComponent = localFixture.componentInstance;
      const localFileComponent = localFixture.debugElement.query(By.directive(LuxFileInputComponent)).componentInstance;

      expect(localFixture.debugElement.query(By.css('.lux-file-visible-input'))).toBeFalsy();
      expect(localTestComponent.formControl.value).toBeNull();
      expect(localFileComponent.luxSelectedFiles).toBe(undefined);

      // Änderungen durchführen
      const fileObject = { name: 'mockfile.txt', type: 'text/txt', content: 'base64-dummy' };
      localTestComponent.formControl.setValue(fileObject);
      LuxTestHelper.wait(localFixture);

      // Nachbedingungen prüfen
      expect(localFixture.debugElement.query(By.css('.lux-file-visible-input')).nativeElement.value).toEqual(
        'mockfile.txt'
      );
      expect(localTestComponent.formControl.value).toEqual(fileObject);
      expect(localFileComponent.luxSelectedFiles).toEqual(fileObject);
      expect(localFileComponent.formControl.value).toEqual(fileObject);
    }));

    it('Sollte den Wert an das FormControl übergeben', fakeAsync(() => {
      // Vorbedingungen testen
      expect(testComponent.formControl.value).toBeFalsy();
      expect(fileComponent.formControl.value).toBeFalsy();

      // Änderungen durchführen
      fileComponent.selectFiles([LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')]);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(testComponent.formControl.value.content).toEqual('base64-dummy');
      expect(fileComponent.formControl.value.content).toEqual('base64-dummy');
    }));

    it('Sollte required sein', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fileComponent.formControl.errors).toBeNull();
      expect(fileComponent.formControl.valid).toBe(true);
      expect(fixture.debugElement.query(By.css('mat-error'))).toBeNull();

      // Änderungen durchführen
      testComponent.formControl.setValidators(Validators.required);
      LuxTestHelper.wait(fixture);
      fileComponent.formControl.markAsTouched();
      fileComponent.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fileComponent.formControl.errors).not.toBeNull();
      expect(fileComponent.formControl.valid).toBe(false);
      expect(fixture.debugElement.query(By.css('mat-error'))).not.toBeNull();
    }));
  });

  describe('[Allgemein]', () => {
    let fixture: ComponentFixture<FileComponent>;
    let testComponent: FileComponent;
    let fileComponent: LuxFileInputComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(FileComponent);
      testComponent = fixture.componentInstance;
      fileComponent = fixture.debugElement.query(By.directive(LuxFileInputComponent)).componentInstance;

      // den LiveAnnouncer abklemmen
      fileComponent['liveAnnouncer'] = {
        announce: (...args) => {}
      } as any;

      // Wir mocken hier den FileReader weg, da er nicht mit fakeAsync kompatibel ist
      spyOn(fileComponent, 'readFile').and.returnValue(Promise.resolve('base64-dummy'));
      // Den read-Delay für die Ladeanzeige wegmocken
      fileComponent.defaultReadFileDelay = 0;
      fixture.detectChanges();
    });

    it('Sollte Label, Placeholder und Hint korrekt setzen', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.debugElement.query(By.css('.lux-form-label'))).toBeNull();
      expect(fixture.debugElement.query(By.css('.lux-file-visible-input')).nativeElement.placeholder).toEqual('');
      expect(fixture.debugElement.query(By.css('mat-hint'))).toBeNull();

      // Änderungen durchführen
      testComponent.label = 'Label';
      testComponent.hint = 'Hint';
      testComponent.placeholder = 'Placeholder';
      LuxTestHelper.wait(fixture);

      // // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.lux-form-label')).nativeElement.textContent.trim()).toEqual('Label');
      expect(fixture.debugElement.query(By.css('.lux-file-visible-input')).nativeElement.placeholder).toEqual(
        'Placeholder'
      );
      expect(fixture.debugElement.query(By.css('mat-hint')).nativeElement.textContent.trim()).toEqual('Hint');
    }));

    it('Sollte required sein', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fileComponent.formControl.errors).toBeNull();
      expect(fileComponent.formControl.valid).toBe(true);
      expect(fixture.debugElement.query(By.css('mat-error'))).toBeNull();

      // Änderungen durchführen
      testComponent.required = true;
      LuxTestHelper.wait(fixture);
      fileComponent.formControl.markAsTouched();
      fileComponent.formControl.updateValueAndValidity();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fileComponent.formControl.errors).not.toBeNull();
      expect(fileComponent.formControl.valid).toBe(false);
      expect(fixture.debugElement.query(By.css('mat-error'))).not.toBeNull();
    }));

    it('Sollte disabled sein', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fileComponent.formControl.disabled).toBe(false);

      // Änderungen durchführen
      testComponent.disabled = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fileComponent.formControl.disabled).toBe(true);
    }));

    it('Sollte readonly sein', fakeAsync(() => {
      // Vorbedingungen testen
      expect(fixture.debugElement.query(By.css('.lux-form-control-readonly'))).toBeNull();

      // Änderungen durchführen
      testComponent.readonly = true;
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.lux-form-control-readonly'))).not.toBeNull();
    }));

    it('Sollte Drag-and-Drop deaktivieren', fakeAsync(() => {
      // Vorbedingungen testen
      const spyDrag = spyOn(LuxFormFileBase.prototype, 'handleDragOver').and.callThrough();
      const spyDrop = spyOn(LuxFormFileBase.prototype, 'handleDrop').and.callThrough();

      const fileInputNode = fixture.debugElement.query(By.css('lux-file-input')).nativeElement;
      LuxTestHelper.dispatchFakeEvent(fileInputNode, 'dragover', true);
      LuxTestHelper.wait(fixture);
      let mockDropEvent = LuxTestHelper.createFakeEvent('drop', true);
      mockDropEvent['dataTransfer'] = {
        files: [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')]
      };
      LuxTestHelper.dispatchEvent(fileInputNode, mockDropEvent);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spyDrag).toHaveBeenCalledTimes(1);
      expect(spyDrop).toHaveBeenCalledTimes(1);

      // Änderungen durchführen
      testComponent.dndActive = false;
      LuxTestHelper.wait(fixture);

      LuxTestHelper.dispatchFakeEvent(fileInputNode, 'dragover', true);
      LuxTestHelper.wait(fixture);
      mockDropEvent = LuxTestHelper.createFakeEvent('drop', true);
      mockDropEvent['dataTransfer'] = {
        files: [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')]
      };
      LuxTestHelper.dispatchEvent(fileInputNode, mockDropEvent);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spyDrag).toHaveBeenCalledTimes(1);
      expect(spyDrop).toHaveBeenCalledTimes(1);
      expect(testComponent.selected['name']).toEqual('mockfile1.txt');
      expect(testComponent.selected['content']).toEqual('base64-dummy');
      expect(fileComponent.luxSelectedFiles['name']).toEqual('mockfile1.txt');
      expect(fileComponent.luxSelectedFiles['content']).toEqual('base64-dummy');
    }));

    it('Sollte die Dateien an die entsprechende luxUploadUrl hochladen', fakeAsync(() => {
      // Vorbedingungen testen
      const httpClient = fixture.debugElement.injector.get(HttpClient);
      const spy = spyOn(httpClient, 'post').and.returnValue(of());
      const files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];

      fileComponent.selectFiles(files);
      LuxTestHelper.wait(fixture);

      expect(spy).toHaveBeenCalledTimes(0);

      // Änderungen durchführen
      testComponent.uploadUrl = '/test/api/';
      LuxTestHelper.wait(fixture);
      fileComponent.selectFiles(files);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(spy).toHaveBeenCalledTimes(1);
      expect(fileComponent.luxSelectedFiles).toBeTruthy();
      expect(fixture.debugElement.query(By.css('.lux-file-visible-input')).nativeElement.value.trim()).toEqual(
        'mockfile1.txt'
      );
    }));

    it('Sollte den Startwert korrekt setzen', fakeAsync(() => {
      // Vorbedingungen testen
      const localFixture = TestBed.createComponent(FileComponent);
      const localTestComponent = localFixture.componentInstance;
      const localFileComponent = localFixture.debugElement.query(By.directive(LuxFileInputComponent)).componentInstance;

      expect(localFixture.debugElement.query(By.css('.lux-file-visible-input'))).toBeFalsy();
      expect(localTestComponent.selected).toBe(undefined);
      expect(localFileComponent.luxSelectedFiles).toBe(undefined);

      // Änderungen durchführen
      const fileObject = { name: 'mockfile.txt', type: 'text/txt', content: 'base64-dummy' };
      localTestComponent.selected = fileObject;
      LuxTestHelper.wait(localFixture);

      // Nachbedingungen prüfen
      expect(localFixture.debugElement.query(By.css('.lux-file-visible-input')).nativeElement.value.trim()).toEqual(
        'mockfile.txt'
      );
      expect(localTestComponent.selected).toEqual(fileObject);
      expect(localFileComponent.luxSelectedFiles).toEqual(fileObject);
      expect(localFileComponent.formControl.value).toEqual(fileObject);
    }));

    it('Sollte beim Klick auf den Entfernen-Button die Selektion leeren', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.selected = { name: 'mockfile.txt', type: 'text/txt', content: 'base64-dummy' };
      LuxTestHelper.wait(fixture);

      expect(fileComponent.luxSelectedFiles).toEqual(testComponent.selected);
      expect(fixture.debugElement.query(By.css('.lux-file-visible-input')).nativeElement.value.trim()).toEqual(
        'mockfile.txt'
      );

      // Änderungen durchführen
      fixture.debugElement
        .query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-remove] button'))
        .nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fileComponent.luxSelectedFiles).toEqual(undefined);
      expect(fixture.debugElement.query(By.css('.lux-file-visible-input')).nativeElement.value.trim()).toEqual('');

      discardPeriodicTasks();
    }));

    it('Sollte den Base64-String via Base64-Callback füllen', fakeAsync(() => {
      // Vorbedingungen testen
      testComponent.selected = {
        name: 'mockfile.txt',
        type: 'text/txt',
        contentCallback: () => 'callback base64-dummy'
      };
      LuxTestHelper.wait(fixture);

      expect(fixture.debugElement.query(By.css('.lux-file-visible-input')).nativeElement.value.trim()).toEqual(
        'mockfile.txt'
      );
      expect(fileComponent.luxSelectedFiles['name']).toEqual('mockfile.txt');
      expect(fileComponent.luxSelectedFiles['content']).toEqual(undefined);

      // Änderungen durchführen
      fixture.debugElement
        .query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-view] button'))
        .nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fixture.debugElement.query(By.css('.lux-file-visible-input')).nativeElement.value.trim()).toEqual(
        'mockfile.txt'
      );
      expect(fileComponent.luxSelectedFiles['name']).toEqual('mockfile.txt');
      expect(fileComponent.luxSelectedFiles['content']).toEqual('callback base64-dummy');

      discardPeriodicTasks();
    }));

    it('Sollte statt des Base64-Strings den Dateityp Blob nutzen', fakeAsync(() => {
      // Vorbedingungen testen
      fileComponent.selectFiles([LuxTestHelper.createFileBrowserSafe('mockfile1.png', 'image/png')]);
      LuxTestHelper.wait(fixture);

      expect(typeof fileComponent.luxSelectedFiles['content']).toEqual('string');

      // Änderungen durchführen
      testComponent.contentsAsBlob = true;
      LuxTestHelper.wait(fixture);
      fileComponent.selectFiles([LuxTestHelper.createFileBrowserSafe('mockfile1.png', 'image/png')]);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fileComponent.luxSelectedFiles['content'] instanceof Blob).toBe(true);
    }));

    it('Sollte eine Datei auswählen, löschen und erneut auswählen können', fakeAsync(() => {
      // Vorbedingungen testen
      const spy = spyOn(testComponent, 'selectedChange').and.callThrough();
      fileComponent.selectFiles([LuxTestHelper.createFileBrowserSafe('mockfile1.png', 'image/png')]);

      LuxTestHelper.wait(fixture);
      flush();

      expect(fileComponent.luxSelectedFiles['name']).toEqual('mockfile1.png');
      expect(fileComponent.luxSelectedFiles['content']).toEqual('base64-dummy');
      expect(spy).toHaveBeenCalledTimes(1);

      // Änderungen durchführen
      fixture.debugElement
        .query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-remove] button'))
        .nativeElement.click();
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fileComponent.luxSelectedFiles).toBe(undefined);
      expect(spy).toHaveBeenCalledTimes(2);

      // Änderungen durchführen
      fileComponent.selectFiles([LuxTestHelper.createFileBrowserSafe('mockfile1.png', 'image/png')]);
      LuxTestHelper.wait(fixture);

      // Nachbedingungen prüfen
      expect(fileComponent.luxSelectedFiles['name']).toEqual('mockfile1.png');
      expect(fileComponent.luxSelectedFiles['content']).toEqual('base64-dummy');
      expect(spy).toHaveBeenCalledTimes(3);

      flush();
      discardPeriodicTasks();
    }));

    describe('Sollte die Events mit passenden Werten emitten,', () => {
      it('wenn Dateien korrekt selektiert wurden', fakeAsync(() => {
        // Vorbedingungen testen
        const selectedChange = spyOn(testComponent, 'selectedChange').and.callThrough();
        const files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];

        LuxTestHelper.wait(fixture);

        expect(selectedChange).toHaveBeenCalledTimes(0);

        // Änderungen durchführen
        fileComponent.selectFiles(files);
        LuxTestHelper.wait(fixture);

        // Nachbedingungen prüfen
        expect(selectedChange).toHaveBeenCalledTimes(1);
        expect(testComponent.selected.name).toEqual('mockfile1.txt');
      }));

      it('wenn ein Fehler aufgetreten ist', fakeAsync(() => {
        // Vorbedingungen testen
        const selectedChange = spyOn(testComponent, 'selectedChange');
        const files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];

        LuxTestHelper.wait(fixture);

        expect(selectedChange).toHaveBeenCalledTimes(0);

        // Änderungen durchführen
        testComponent.accept = '.pdf';
        LuxTestHelper.wait(fixture);
        fileComponent.selectFiles(files);
        LuxTestHelper.wait(fixture);

        // Nachbedingungen prüfen
        expect(selectedChange).toHaveBeenCalledTimes(0);
      }));
    });

    describe('Sollte eine passende Fehlermeldung abgeben,', () => {
      it('wenn die maximale Dateigröße überschritten wird (luxClearOnError = true)', fakeAsync(() => {
        // Vorbedingungen testen
        let files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];
        // wir mocken erstmal 2MB Dateigröße
        spyOnProperty(files[0], 'size', 'get').and.returnValue(200000);

        fileComponent.selectFiles(files);
        LuxTestHelper.wait(fixture);

        expect(fileComponent.formControl.errors).toBeNull();
        expect(fileComponent.formControl.valid).toBe(true);
        expect(fileComponent.luxSelectedFiles).toBeTruthy();
        expect(fixture.debugElement.query(By.css('mat-error'))).toBeNull();

        // Änderungen durchführen
        testComponent.maxSizeMb = 5;
        LuxTestHelper.wait(fixture);

        files = [LuxTestHelper.createFileBrowserSafe('mockfile2.txt', 'text/txt')];
        // wir mocken hier jetzt 20MB Dateigröße
        spyOnProperty(files[0], 'size', 'get').and.returnValue(20000000);

        fileComponent.selectFiles(files);
        LuxTestHelper.wait(fixture);

        // Nachbedingungen prüfen
        expect(fileComponent.formControl.errors).not.toBeNull();
        expect(fileComponent.formControl.errors[LuxFileErrorCause.MaxSizeError]).toBeDefined();
        expect(fileComponent.formControl.valid).toBe(false);
        expect(fileComponent.luxSelectedFiles).toBe(undefined);
        expect(fileComponent.formControl.value).toBe(undefined);
        expect(fixture.debugElement.query(By.css('mat-error'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('mat-error')).nativeElement.textContent.trim()).toEqual(
          'Die Datei "mockfile2.txt" überschreitet mit 20MB die erlaubte Dateigröße von 5MB'
        );
      }));

      it('wenn die maximale Dateigröße überschritten wird (luxClearOnError = false)', fakeAsync(() => {
        // Vorbedingungen testen
        let files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];
        // wir mocken erstmal 2MB Dateigröße
        spyOnProperty(files[0], 'size', 'get').and.returnValue(200000);

        fileComponent.selectFiles(files);
        LuxTestHelper.wait(fixture);

        expect(fileComponent.formControl.errors).toBeNull();
        expect(fileComponent.formControl.valid).toBe(true);
        expect(fileComponent.luxSelectedFiles).toBeTruthy();
        expect(fixture.debugElement.query(By.css('mat-error'))).toBeNull();

        // Änderungen durchführen
        testComponent.maxSizeMb = 5;
        fileComponent.luxClearOnError = false;
        LuxTestHelper.wait(fixture);

        files = [LuxTestHelper.createFileBrowserSafe('mockfile2.txt', 'text/txt')];
        // wir mocken hier jetzt 20MB Dateigröße
        spyOnProperty(files[0], 'size', 'get').and.returnValue(20000000);

        fileComponent.selectFiles(files);
        LuxTestHelper.wait(fixture);

        // Nachbedingungen prüfen
        expect( fileComponent.luxClearOnError).toBe(false);
        expect(fileComponent.formControl.errors).not.toBeNull();
        expect(fileComponent.formControl.errors[LuxFileErrorCause.MaxSizeError]).toBeDefined();
        expect(fileComponent.formControl.valid).toBe(false);
        expect(fileComponent.luxSelectedFiles.name).toBe('mockfile1.txt');
        expect(fileComponent.luxSelectedFiles.type).toBe('text/txt');
        expect(fileComponent.formControl.value.name).toBe('mockfile1.txt');
        expect(fileComponent.formControl.value.type).toBe('text/txt');
        expect(fixture.debugElement.query(By.css('mat-error'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('mat-error')).nativeElement.textContent.trim()).toEqual(
          'Die Datei "mockfile2.txt" überschreitet mit 20MB die erlaubte Dateigröße von 5MB'
        );
      }));

      it('die luxUploadUrl nicht erreichbar ist', fakeAsync(() => {
        // Vorbedingungen testen
        const httpClient = fixture.debugElement.injector.get(HttpClient);
        const spy = spyOn(httpClient, 'post').and.returnValue(throwError('404'));
        const files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];

        fileComponent.selectFiles(files);
        LuxTestHelper.wait(fixture);

        expect(spy).toHaveBeenCalledTimes(0);
        expect(fileComponent.formControl.errors).toBeNull();
        expect(fileComponent.formControl.valid).toBe(true);
        expect(fixture.debugElement.query(By.css('mat-error'))).toBeNull();

        // Änderungen durchführen
        testComponent.uploadUrl = '/test/api/';
        LuxTestHelper.wait(fixture);
        fileComponent.selectFiles(files);
        LuxTestHelper.wait(fixture);

        // Nachbedingungen prüfen
        expect(spy).toHaveBeenCalledTimes(1);
        expect(fileComponent.formControl.errors).not.toBeNull();
        expect(fileComponent.formControl.errors[LuxFileErrorCause.UploadFileError]).toBeDefined();
        expect(fileComponent.formControl.valid).toBe(false);
        expect(fileComponent.luxSelectedFiles).toBe(undefined);
        expect(fixture.debugElement.query(By.css('mat-error'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('mat-error')).nativeElement.textContent.trim()).toEqual(
          'Das Hochladen der ausgewählten Datei ist fehlgeschlagen'
        );
      }));

      it('wenn ein Dateityp nicht unter luxAccept geführt wird', fakeAsync(() => {
        // Vorbedingungen testen
        LuxTestHelper.wait(fixture);
        expect(fileComponent.formControl.errors).toBeNull();
        expect(fileComponent.formControl.valid).toBe(true);
        expect(fixture.debugElement.query(By.css('mat-error'))).toBeNull();

        // Änderungen durchführen,
        testComponent.accept = '.html,.pdf,/image/*';
        LuxTestHelper.wait(fixture);
        fileComponent.selectFiles([LuxTestHelper.createFileBrowserSafe('mockfile.txt', 'text/txt')]);
        LuxTestHelper.wait(fixture);

        // Nachbedingungen prüfen
        expect(fileComponent.formControl.errors).not.toBeNull();
        expect(fileComponent.formControl.errors[LuxFileErrorCause.FileNotAccepted]).toBeDefined();
        expect(fileComponent.formControl.valid).toBe(false);
        expect(fixture.debugElement.query(By.css('mat-error'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('mat-error')).nativeElement.textContent.trim()).toEqual(
          'Die Datei "mockfile.txt" hat einen nicht akzeptierten Dateityp'
        );

        // Änderungen durchführen,
        fileComponent.selectFiles([LuxTestHelper.createFileBrowserSafe('mockfile1.pdf', 'text/pdf')]);
        LuxTestHelper.wait(fixture);

        // Nachbedingungen prüfen
        expect(fileComponent.formControl.errors).toBeNull();
        expect(fileComponent.formControl.valid).toBe(true);
        expect(fixture.debugElement.query(By.css('mat-error'))).toBeNull();
      }));
    });

    describe('Sollte Action-Konfigurationen korrekt behandeln', () => {
      beforeEach(fakeAsync(() => {}));

      describe('[uploadActionConfig]', () => {
        it('Sollte den Upload-Button verstecken', fakeAsync(() => {
          // Vorbedingungen testen
          expect(fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-upload]'))).not.toBeNull();

          // Änderungen durchführen
          testComponent.uploadActionConfig.hidden = true;
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-upload]'))).toBeNull();
        }));

        it('Sollte den Upload-Button deaktivieren', fakeAsync(() => {
          // Vorbedingungen testen
          expect(
            fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-upload] button')).nativeElement
              .disabled
          ).toBe(false);

          // Änderungen durchführen
          testComponent.uploadActionConfig.disabled = true;
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(
            fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-upload] button')).nativeElement
              .disabled
          ).toBe(true);
        }));

        it('Sollte den Callback aufrufen', fakeAsync(() => {
          // Vorbedingungen testen
          const files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];
          const spy = spyOn(testComponent.uploadActionConfig, 'onClick');
          LuxTestHelper.wait(fixture);

          expect(spy).toHaveBeenCalledTimes(0);

          // Änderungen durchführen
          fileComponent.selectFiles(files);
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(fileComponent.luxSelectedFiles);

          discardPeriodicTasks();
        }));
      });

      describe('[downloadActionConfig]', () => {
        it('Sollte den Download-Button verstecken', fakeAsync(() => {
          // Vorbedingungen testen
          expect(fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-download]'))).not.toBeNull();

          // Änderungen durchführen
          testComponent.downloadActionConfig.hidden = true;
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-download]'))).toBeNull();
        }));

        it('Sollte den Download-Button deaktivieren', fakeAsync(() => {
          // Vorbedingungen testen
          expect(
            fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-download] button'))
              .nativeElement.disabled
          ).toBe(true);

          // Änderungen durchführen
          const files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];
          fileComponent.selectFiles(files);
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(
            fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-download] button'))
              .nativeElement.disabled
          ).toBe(false);

          // Änderungen durchführen
          testComponent.downloadActionConfig.disabled = true;
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(
            fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-download] button'))
              .nativeElement.disabled
          ).toBe(true);
        }));

        it('Sollte den Callback aufrufen', fakeAsync(() => {
          // Vorbedingungen testen
          // den Download für den Test verhindern
          spyOn(fileComponent.downloadLink.nativeElement, 'click');

          const files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];
          const spy = spyOn(testComponent.downloadActionConfig, 'onClick');
          LuxTestHelper.wait(fixture);

          expect(spy).toHaveBeenCalledTimes(0);

          // Änderungen durchführen
          fileComponent.selectFiles(files);
          LuxTestHelper.wait(fixture);
          fixture.debugElement
            .query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-download] button'))
            .nativeElement.click();
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(fileComponent.luxSelectedFiles);

          discardPeriodicTasks();
        }));
      });

      describe('[deleteActionConfig]', () => {
        it('Sollte den Delete-Button verstecken', fakeAsync(() => {
          // Vorbedingungen testen
          expect(fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-remove]'))).not.toBeNull();

          // Änderungen durchführen
          testComponent.deleteActionConfig.hidden = true;
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-remove]'))).toBeNull();
        }));

        it('Sollte den Delete-Button deaktivieren', fakeAsync(() => {
          // Vorbedingungen testen
          expect(
            fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-remove] button')).nativeElement
              .disabled
          ).toBe(true);

          // Änderungen durchführen
          const files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];
          fileComponent.selectFiles(files);
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(
            fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-remove] button')).nativeElement
              .disabled
          ).toBe(false);

          // Änderungen durchführen
          testComponent.deleteActionConfig.disabled = true;
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(
            fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-remove] button')).nativeElement
              .disabled
          ).toBe(true);
        }));

        it('Sollte den Callback aufrufen', fakeAsync(() => {
          // Vorbedingungen testen
          const files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];
          const spy = spyOn(testComponent.deleteActionConfig, 'onClick');
          LuxTestHelper.wait(fixture);

          expect(spy).toHaveBeenCalledTimes(0);

          // Änderungen durchführen
          fileComponent.selectFiles(files);
          LuxTestHelper.wait(fixture);
          fixture.debugElement
            .query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-remove] button'))
            .nativeElement.click();
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(spy).toHaveBeenCalledTimes(1);

          discardPeriodicTasks();
        }));
      });

      describe('[viewActionConfig]', () => {
        it('Sollte den View-Button verstecken', fakeAsync(() => {
          // Vorbedingungen testen
          expect(fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-view]'))).not.toBeNull();

          // Änderungen durchführen
          testComponent.viewActionConfig.hidden = true;
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-view]'))).toBeNull();
        }));

        it('Sollte den View-Button deaktivieren', fakeAsync(() => {
          // Vorbedingungen testen
          expect(
            fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-view] button')).nativeElement
              .disabled
          ).toBe(true);

          // Änderungen durchführen
          const files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];
          fileComponent.selectFiles(files);
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(
            fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-view] button')).nativeElement
              .disabled
          ).toBe(false);

          // Änderungen durchführen
          testComponent.viewActionConfig.disabled = true;
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(
            fixture.debugElement.query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-view] button')).nativeElement
              .disabled
          ).toBe(true);
        }));

        it('Sollte den Callback aufrufen', fakeAsync(() => {
          // Vorbedingungen testen
          const files = [LuxTestHelper.createFileBrowserSafe('mockfile1.txt', 'text/txt')];
          const spy = spyOn(testComponent.viewActionConfig, 'onClick');
          LuxTestHelper.wait(fixture);

          expect(spy).toHaveBeenCalledTimes(0);

          // Änderungen durchführen
          fileComponent.selectFiles(files);
          LuxTestHelper.wait(fixture);
          fixture.debugElement
            .query(By.css('lux-button[ng-reflect-lux-tag-id=lux-file-view] button'))
            .nativeElement.click();
          LuxTestHelper.wait(fixture);

          // Nachbedingungen prüfen
          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(fileComponent.luxSelectedFiles);

          discardPeriodicTasks();
        }));
      });
    });
  });
});

@Component({
  template: `
    <lux-file-input
      [luxLabel]="label"
      [luxPlaceholder]="placeholder"
      [luxHint]="hint"
      [luxRequired]="required"
      [luxReadonly]="readonly"
      [luxDisabled]="disabled"
      [luxAccept]="accept"
      [luxCapture]="capture"
      [luxDnDActive]="dndActive"
      [luxMaxSizeMB]="maxSizeMb"
      [luxUploadUrl]="uploadUrl"
      [luxSelectedFiles]="selected"
      [luxUploadActionConfig]="uploadActionConfig"
      [luxDownloadActionConfig]="downloadActionConfig"
      [luxDeleteActionConfig]="deleteActionConfig"
      [luxViewActionConfig]="viewActionConfig"
      [luxContentsAsBlob]="contentsAsBlob"
      (luxSelectedFilesChange)="selectedChange($event)"
    >
    </lux-file-input>
  `
})
class FileComponent {
  label;
  placeholder;
  hint;
  required;
  readonly;
  disabled;
  accept;
  capture;
  dndActive = true;
  iconName;
  maxSizeMb = 10;
  uploadUrl;
  contentsAsBlob;

  selected: ILuxFileObject;

  uploadActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-cloud-upload-alt',
    label: 'Hochladen',
    onClick: $event => null
  };
  deleteActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-trash',
    label: 'Löschen',
    onClick: $event => null
  };
  viewActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-eye',
    label: 'Anzeigen',
    onClick: $event => null
  };
  downloadActionConfig: ILuxFileActionConfig = {
    disabled: false,
    hidden: false,
    iconName: 'fas fa-download',
    label: 'Downloaden',
    onClick: $event => null
  };

  selectedChange($event) {
    this.selected = $event;
  }
}

@Component({
  template: `
    <div [formGroup]="form">
      <lux-file-input
        [luxLabel]="label"
        [luxPlaceholder]="placeholder"
        [luxHint]="hint"
        [luxControlBinding]="'file'"
        [luxReadonly]="readonly"
        [luxDisabled]="disabled"
        [luxAccept]="accept"
        [luxCapture]="capture"
        [luxDnDActive]="dndActive"
        [luxMaxSizeMB]="maxSizeMb"
        [luxUploadUrl]="uploadUrl"
        [luxClearOnError]="clearOnError"
      >
      </lux-file-input>
    </div>
  `
})
class FileFormComponent {
  form: UntypedFormGroup;
  formControl: AbstractControl;

  label;
  placeholder;
  hint;
  readonly;
  disabled;
  accept;
  capture;
  dndActive = true;
  iconName;
  maxSizeMb = 10;
  uploadUrl;
  clearOnError = true;

  constructor(private fb: UntypedFormBuilder) {
    this.form = this.fb.group({
      file: []
    });
    this.formControl = this.form.get('file');
  }
}

class MockHttp {
  post(...any) {
    return of(null);
  }
}

class MockStorage {
  getItem(...any): string {
    return '';
  }

  setItem(...any) {}
}
