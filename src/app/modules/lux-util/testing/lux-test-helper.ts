import { SPACE } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, Injectable, NO_ERRORS_SCHEMA, OnDestroy, Provider } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatCardModule } from '@angular/material/card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { LuxActionModule } from '../../lux-action/lux-action.module';
import { LuxCommonModule } from '../../lux-common/lux-common.module';
import { LuxComponentsConfigModule } from '../../lux-components-config/lux-components-config.module';
import { LuxDirectivesModule } from '../../lux-directives/lux-directives.module';
import { LuxErrorModule } from '../../lux-error/lux-error.module';
import { LuxFormModule } from '../../lux-form/lux-form.module';
import { LuxIconModule } from '../../lux-icon/lux-icon.module';
import { LuxLayoutModule } from '../../lux-layout/lux-layout.module';
import { LuxLookupModule } from '../../lux-lookup/lux-lookup.module';
import { LuxPipesModule } from '../../lux-pipes/lux-pipes.module';
import { LuxPopupsModule } from '../../lux-popups/lux-popups.module';
import { LuxTenantLogoModule } from '../../lux-tenant-logo/lux-tenant-logo.module';

export class LuxTestHelper {
  public static COMMON_ANGULAR_MODULES: any[] = [
    NoopAnimationsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterTestingModule
  ];

  public static MATERIAL_MODULES: any[] = [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTooltipModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatOptionModule,
    MatCommonModule,
    MatBadgeModule
  ];

  public static LUX_MODULES: any[] = [
    LuxFormModule,
    LuxLayoutModule,
    LuxActionModule,
    LuxDirectivesModule,
    LuxPipesModule,
    LuxIconModule,
    LuxTenantLogoModule,
    LuxLookupModule,
    LuxErrorModule,
    LuxCommonModule,
    LuxPopupsModule,
    LuxComponentsConfigModule.forRoot({
      generateLuxTagIds: false,
      displayLuxConsoleLogs: false,
      labelConfiguration: {
        allUppercase: true,
        notAppliedTo: []
      },
      cardExpansionAnimationActive: true
    })
  ];

  /**
   * Wichtig: aus fakeAsync-Block heraus aufrufen, da hier tick() genutzt wird.
   * @param input
   * @param value
   * @param fixture
   */
  public static setInputValue(input: any, value: any, fixture: any) {
    if (input) {
      input.value = value;
      input.dispatchEvent(LuxTestHelper.createFakeEvent('input'));
      LuxTestHelper.wait(fixture);
    } else {
      console.error('UNIT-TEST FEHLER: input ist nicht definiert.');
    }
  }

  /**
   * Wichtig: aus fakeAsync-Block heraus aufrufen, da hier tick() genutzt wird.
   * Wartet asynchrone Aufrufe ab und ruft die ChangeDetection auf
   * @param fixture
   * @param tickDuration
   */
  public static wait(fixture: any, tickDuration?: number) {
    fixture.detectChanges();
    tick(tickDuration);
    fixture.detectChanges();
  }

  /**
   * Wichtig: aus fakeAsync-Block heraus aufrufen, da hier tick() genutzt wird.
   * Sendet ein Klick-Event ab und wartet dann.
   * @param fixture
   * @param debugElement
   */
  public static click(fixture: any, debugElement: DebugElement) {
    debugElement.triggerEventHandler('click', null);
    LuxTestHelper.wait(fixture);
  }

  /**
   * Erstellt eine ComponentFixture für die mitgegebene Komponente, optional ist es möglich
   * weitere Provider und Declarations einzutragen. Diese werden dann im Testmodul eingetragen.
   * @param component
   * @param providers
   * @param declarations
   */
  public static createComponent(component: any, providers: Provider[] = [], declarations: any[] = []): ComponentFixture<any> {
    TestBed.configureTestingModule({
      imports: [...LuxTestHelper.COMMON_ANGULAR_MODULES, ...LuxTestHelper.MATERIAL_MODULES, ...LuxTestHelper.LUX_MODULES],
      declarations: [...declarations, component],
      providers: [...providers]
    });

    TestBed.compileComponents();

    return TestBed.createComponent(component);
  }

  /**
   * Utility to dispatch any event on a Node.
   * @param node
   * @param event
   */
  public static dispatchEvent(node: Node | Window, event: Event): Event {
    node.dispatchEvent(event);
    return event;
  }

  /**
   * Shorthand to dispatch a fake event on a specified node.
   * @param node
   * @param type
   * @param canBubble
   */
  public static dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
    return LuxTestHelper.dispatchEvent(node, LuxTestHelper.createFakeEvent(type, canBubble));
  }

  /**
   * Shorthand to dispatch a keyboard event with a specified key code.
   * @param node
   * @param type
   * @param keyCode
   * @param target
   */
  public static dispatchKeyboardEvent(node: Node, type: string, keyCode: number, target?: Element): KeyboardEvent {
    return LuxTestHelper.dispatchEvent(node, LuxTestHelper.createKeyboardEvent(type, keyCode, target)) as KeyboardEvent;
  }

  /**
   * Focuses an input and sets its value. Dispatches a fake input event afterwards.
   * @param element
   * @param value
   * @param noInputEvent
   */
  public static typeInElement(element: HTMLInputElement, value: string, noInputEvent?: boolean) {
    element.focus();
    element.value = value;
    if (!noInputEvent) {
      LuxTestHelper.dispatchFakeEvent(element, 'input');
    }
  }

  /** Steuerung und triggern von Overlays implementieren */

  /**
   * Inserts data into an input field, that has to update asynchronous before calling a callback-function
   * Allows to use RxJs Interval-Timers within the Target-Components.
   * @param text
   * @param fixture
   * @param element
   * @param callback
   */
  public static typeInElementAsync(text: string, fixture: ComponentFixture<any>, element: HTMLInputElement, callback: () => void) {
    fixture.whenStable().then(() => {
      LuxTestHelper.typeInElement(element, text);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        LuxTestHelper.dispatchKeyboardEvent(element, 'keydown', SPACE);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          callback();
        });
      });
    });
  }

  /**
   * Dispatches a keydown event from an element.
   * @param type
   * @param keyCode
   * @param target
   * @param key
   */
  public static createKeyboardEvent(type: string, keyCode: number, target?: Element, key?: string) {
    const event = document.createEvent('KeyboardEvent') as any;
    // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
    const initEventFn = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
    const originalPreventDefault = event.preventDefault;

    initEventFn(type, true, true, window, 0, 0, 0, 0, 0, keyCode);

    // Webkit Browsers don't set the keyCode when calling the init function.
    // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
    Object.defineProperties(event, {
      keyCode: { get: () => keyCode },
      key: { get: () => key },
      target: { get: () => target }
    });

    // IE won't set `defaultPrevented` on synthetic events, so we need to do it manually.
    event.preventDefault = function () {
      Object.defineProperty(event, 'defaultPrevented', { get: () => true });
      return originalPreventDefault.apply(this, arguments);
    };

    return event;
  }

  /**
   * Creates a fake event object with any desired event type.
   * @param type
   * @param canBubble
   * @param cancelable
   */
  public static createFakeEvent(type: string, canBubble = false, cancelable = true): Event {
    let event;
    if (typeof Event === 'function') {
      event = new Event(type);
    } else {
      event = document.createEvent('Event');
      event.initEvent(type, canBubble, cancelable);
    }

    return event;
  }

  public static createDropEvent(files: { name: string; type: string }[]): DragEvent {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(LuxTestHelper.createFileBrowserSafe(file.name, file.type));
    });

    return new DragEvent('drop', { dataTransfer });
  }

  /**
   * Konfiguriert das TestModul für eine Testsuite, kann dabei Provider und Komponenten (Deklarationen) entgegennehmen.
   * @param providers
   * @param declarations
   * @param imports
   */
  public static configureTestModule(providers: Provider[] = [], declarations: any[] = [], imports: any[] = []) {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ...LuxTestHelper.COMMON_ANGULAR_MODULES,
        ...LuxTestHelper.MATERIAL_MODULES,
        ...LuxTestHelper.LUX_MODULES,
        ...imports
      ],
      declarations: [...declarations],
      providers: [...providers],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });

    TestBed.compileComponents();
  }

  /**
   * Erstellt ein leeres File-Objekt mit Namen und Typ via Blob-Constructor (um Edge/IE-Fehler zu vermeiden).
   * @param name
   * @param type
   */
  public static createFileBrowserSafe(name: string, type: string) {
    return new File([''], name, { type: type });
  }
}
