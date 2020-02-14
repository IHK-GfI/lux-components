import { SPACE } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { DebugElement, Provider } from '@angular/core';
import { ComponentFixture, getTestBed, TestBed, tick } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import { BrowserModule, By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LuxActionModule } from '../../lux-action/lux-action.module';
import { LuxDirectivesModule } from '../../lux-directives/lux-directives.module';
import { LuxFormModule } from '../../lux-form/lux-form.module';
import { LuxIconModule } from '../../lux-icon/lux-icon.module';
import { LuxLayoutModule } from '../../lux-layout/lux-layout.module';
import { LuxPipesModule } from '../../lux-pipes/lux-pipes.module';
import { LuxLookupModule } from '../../lux-lookup/lux-lookup.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LuxComponentsConfigModule } from '../../lux-components-config/lux-components-config.module';
// Wichtig, damit die Testhelper-Funktion "configureTestSuite" funktioniert (darf nicht wegformatiert werden).
// import 'jasmine' hat leider nicht den gewünschten Effekt.
// import {} from 'jasmine';
// noinspection ES6UnusedImports
import {} from 'jasmine';
import { LuxErrorModule } from '../../lux-error/lux-error.module';
import { LuxCommonModule } from '../../lux-common/lux-common.module';
import { LuxPopupsModule } from '../../lux-popups/lux-popups.module';

export class LuxTestHelper {
  public static COMMON_ANGULAR_MODULES: any[] = [
    NoopAnimationsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
    LuxLookupModule,
    LuxErrorModule,
    LuxCommonModule,
    LuxPopupsModule,
    LuxComponentsConfigModule.forRoot({
      generateLuxTagIds: false,
      displayLuxConsoleLogs: true,
      labelConfiguration: {
        allUppercase: true,
        notAppliedTo: []
      },
      cardExpansionAnimationActive: true
    })
  ];

  /**
   * Wichtig: aus fakeAsync-Block heraus aufrufen, da hier tick() genutzt wird.
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
   * @param DebugElement
   */
  public static click(fixture: any, debugElement: DebugElement) {
    debugElement.triggerEventHandler('click', null);
    LuxTestHelper.wait(fixture);
  }

  /**
   * Wichtig: aus fakeAsync-Block heraus aufrufen, da hier tick() genutzt wird.
   * Sendet ein Change-Event ab und wartet dann.
   * @param fixture
   * @param DebugElement
   */
  public static radioButtonChange(fixture: any, radioButton: DebugElement) {
    radioButton.nativeElement.dispatchEvent(LuxTestHelper.createFakeEvent('change'));
    LuxTestHelper.wait(fixture);
  }

  /**
   * Erstellt eine ComponentFixture fuer die mitgegebene Komponente, optional ist es moeglich
   * weitere Provider und Declarations einzutragen. Diese werden dann im Testmodul eingetragen.
   * @param component
   * @param providers
   * @param declarations
   * @deprecated Stattdessen configureTestModule in Kombination mit configureTestSuite verwenden --> erheblich performanter
   */
  public static createComponent(
    component: any,
    providers: Provider[] = [],
    declarations: any[] = []
  ): ComponentFixture<any> {
    TestBed.configureTestingModule({
      imports: [
        ...LuxTestHelper.COMMON_ANGULAR_MODULES,
        ...LuxTestHelper.MATERIAL_MODULES,
        ...LuxTestHelper.LUX_MODULES
      ],
      declarations: [...declarations, component],
      providers: [...providers]
    });

    TestBed.compileComponents();

    return TestBed.createComponent(component);
  }

  /** Utility to dispatch any event on a Node. */
  public static dispatchEvent(node: Node | Window, event: Event): Event {
    node.dispatchEvent(event);
    return event;
  }

  /** Shorthand to dispatch a fake event on a specified node. */
  public static dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
    return LuxTestHelper.dispatchEvent(node, LuxTestHelper.createFakeEvent(type, canBubble));
  }

  /** Shorthand to dispatch a keyboard event with a specified key code. */
  public static dispatchKeyboardEvent(node: Node, type: string, keyCode: number, target?: Element): KeyboardEvent {
    return LuxTestHelper.dispatchEvent(node, LuxTestHelper.createKeyboardEvent(type, keyCode, target)) as KeyboardEvent;
  }

  /** Focuses an input and sets its value. Dispatches an fake input event afterwards. */
  public static typeInElement(element: HTMLInputElement, value: string, noInputEvent?: boolean) {
    element.focus();
    element.value = value;
    if (!noInputEvent) {
      LuxTestHelper.dispatchFakeEvent(element, 'input');
    }
  }

  /** Steuerung und triggern von Overlays implementieren **/

  /**
   * Inserts data into an input field, that has to update asynchrounos before calling a callback-function
   * Allows to use RxJs Interval-Timers within the Target-Components.
   */
  public static typeInElementAsynch(text: string, fixture: ComponentFixture<any>, element: HTMLInputElement, callback) {
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

  /** Dispatches a keydown event from an element. */
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

    // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
    event.preventDefault = function() {
      Object.defineProperty(event, 'defaultPrevented', { get: () => true });
      return originalPreventDefault.apply(this, arguments);
    };

    return event;
  }

  /** Creates a fake event object with any desired event type. */
  public static createFakeEvent(type: string, canBubble = false, cancelable = true) {
    let event;
    if (typeof Event === 'function') {
      event = new Event(type);
    } else {
      event = document.createEvent('Event');
      event.initEvent(type, canBubble, cancelable);
    }

    return event;
  }

  /**
   * Selektiert ein Element anhand der Query von dem Fixture
   */
  public static selectOneFromFixture(fixture: ComponentFixture<any>, query: string): DebugElement {
    return fixture.debugElement.query(By.css(query));
  }

  /**
   * Selektiert ein Array von Elementen anhand der Query von dem Fixture
   */
  public static selectAllFromFixture(fixture: ComponentFixture<any>, query: string): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(query));
  }

  /**
   * Entfernt nicht-ASCII-Chars aus dem String (Beim IE wichtig, dieser fügt gerne versteckte Steuerzeichen
   * in Input-Feldern an die Strings).
   * @param dateString
   */
  public static stringWithoutASCIIChars(dateString: string): string {
    const exp = new RegExp('[^A-Za-z 0-9 \\.,\\?""!@#\\$%\\^&\\*\\(\\)-_=\\+;:<>\\/\\\\\\|\\}\\{\\[\\]`~]*', 'g');
    return dateString.replace(exp, '');
  }

  /**
   *  Deaktiviert den Reset des Testmoduls am Ende eines Testdurchlaufs.
   *  Verbessert die Performance der Karma-Tests erheblich.
   *  Am Ende der Testsuite wird diese Funktion wieder aktiviert.
   *
   *  Funktion dafür einfach am Anfang einer Testsuite (erstes describe) aufrufen und in einem beforeAll das Testmodul
   *  erzeugen. Dieses wird nun nicht mehr nach jedem Test neu erzeugt.
   */
  public static configureTestSuite() {
    const testBedApi: any = getTestBed();
    const originReset = TestBed.resetTestingModule;

    beforeAll(() => {
      TestBed.resetTestingModule();
      TestBed.resetTestingModule = () => TestBed;
    });

    afterEach(() => {
      testBedApi._activeFixtures.forEach((fixture: ComponentFixture<any>) => fixture.destroy());
      testBedApi._instantiated = false;
    });

    afterAll(() => {
      TestBed.resetTestingModule = originReset;
      TestBed.resetTestingModule();
    });
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
        ...LuxTestHelper.COMMON_ANGULAR_MODULES,
        ...LuxTestHelper.MATERIAL_MODULES,
        ...LuxTestHelper.LUX_MODULES,
        ...imports
      ],
      declarations: [...declarations],
      providers: [...providers]
    });

    TestBed.compileComponents();
  }

  /**
   * Erstellt ein leeres File-Objekt mit Namen und Typ via Blob-Constructor (um Edge/IE-Fehler zu vermeiden).
   * @param name
   * @param type
   */
  public static createFileBrowserSafe(name, type) {
    const file = new Blob([''], { type: type });
    file['name'] = name;

    return <File>file;
  }
}
