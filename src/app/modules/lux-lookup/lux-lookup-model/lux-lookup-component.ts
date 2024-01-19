/* eslint-disable max-len */

import { ChangeDetectorRef, Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { LuxBehandlungsOptionenUngueltige, LuxLookupParameters } from './lux-lookup-parameters';
import { LuxLookupTableEntry } from './lux-lookup-table-entry';
import { LuxLookupService } from '../lux-lookup-service/lux-lookup.service';
import { ControlContainer } from '@angular/forms';
import { LuxFormComponentBase, LuxValidationErrors } from '../../lux-form/lux-form-model/lux-form-component-base.class';
import { LuxLookupHandlerService } from '../lux-lookup-service/lux-lookup-handler.service';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { Subscription } from 'rxjs';
import { LuxComponentsConfigParameters } from '../../lux-components-config/lux-components-config-parameters.interface';

/**
 * Der Typ für die Lookup-Vergleichsfunktionen.
 */
export type LuxLookupCompareFn<T = LuxLookupTableEntry> = (a: T, b: T) => number;

/**
 * Diese Vergleichsfunktion sortiert die Schlüsseltabelleneinträge nach ihrem Schlüssel.
 *
 * @param a Erster Schlüsseltabelleneintrag.
 * @param b Zweiter Schlüsseltabelleneintrag.
 */
export const luxLookupCompareKeyFn: LuxLookupCompareFn = (a: LuxLookupTableEntry, b: LuxLookupTableEntry) => {
  let aText = a?.key ?? '';
  let bText = b?.key ?? '';

  aText = aText.padStart(20, '0');
  bText = bText.padStart(20, '0');

  return aText.localeCompare(bText);
};

/**
 * Diese Vergleichsfunktion sortiert die Schlüsseltabelleneinträge nach ihrem Kurztext.
 *
 * @param a Erster Schlüsseltabelleneintrag.
 * @param b Zweiter Schlüsseltabelleneintrag.
 */
export const luxLookupCompareKurzTextFn: LuxLookupCompareFn = (a: LuxLookupTableEntry, b: LuxLookupTableEntry) => {
  const aText = a?.kurzText ?? '';
  const bText = b?.kurzText ?? '';

  return aText.localeCompare(bText);
};

/**
 * Diese Vergleichsfunktion sortiert die Schlüsseltabelleneinträge nach ihrem Langtext1.
 *
 * @param a Erster Schlüsseltabelleneintrag.
 * @param b Zweiter Schlüsseltabelleneintrag.
 */
export const luxLookupCompareLangText1Fn: LuxLookupCompareFn = (a: LuxLookupTableEntry, b: LuxLookupTableEntry) => {
  const aText = a?.langText1 ?? '';
  const bText = b?.langText1 ?? '';

  return aText.localeCompare(bText);
};

/**
 * Diese Vergleichsfunktion sortiert die Schlüsseltabelleneinträge nach ihrem Langtext2.
 *
 * @param a Erster Schlüsseltabelleneintrag.
 * @param b Zweiter Schlüsseltabelleneintrag.
 */
export const luxLookupCompareLangText2Fn: LuxLookupCompareFn = (a: LuxLookupTableEntry, b: LuxLookupTableEntry) => {
  const aText = a?.langText2 ?? '';
  const bText = b?.langText2 ?? '';

  return aText.localeCompare(bText);
};

@Directive() // Angular 9 (Ivy) ignoriert @Input(), @Output() in Klassen ohne @Directive() oder @Component().
export abstract class LuxLookupComponent<T> extends LuxFormComponentBase<T> implements OnInit, OnDestroy {
  LuxBehandlungsOptionenUngueltige = LuxBehandlungsOptionenUngueltige;

  lookupService: LuxLookupService;
  lookupHandler: LuxLookupHandlerService;
  componentsConfigService: LuxComponentsConfigService;
  entries: LuxLookupTableEntry[] = [];
  apiPath = LuxComponentsConfigService.DEFAULT_CONFIG.lookupServiceUrl;

  @Input() luxPlaceholder = '';
  @Input() luxLookupId!: string;
  @Input() luxTableNo!: string;
  @Input() luxRenderProp: any;
  @Input() luxRenderPropNoPropertyLabel = '---';
  @Input() luxBehandlungUngueltige: LuxBehandlungsOptionenUngueltige = LuxBehandlungsOptionenUngueltige.ausgrauen;
  @Input() luxParameters?: LuxLookupParameters;
  @Input() luxCustomStyles?: {} | null;
  @Input() luxCustomInvalidStyles?: {} | null;
  @Input() luxCompareFn?: LuxLookupCompareFn;
  @Input() luxTagId?: string;
  @Output() luxDataLoaded = new EventEmitter<boolean>();
  @Output() luxDataLoadedAsArray: EventEmitter<T[]> = new EventEmitter<T[]>();
  @Output() luxValueChange = new EventEmitter<T>();

  subscriptions: Subscription[] = [];

  protected constructor(
    lookupService: LuxLookupService,
    lookupHandler: LuxLookupHandlerService,
    controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    componentsConfigService: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, componentsConfigService);

    this.lookupService = lookupService;
    this.lookupHandler = lookupHandler;
    this.componentsConfigService = componentsConfigService;
  }

  get luxValue(): T {
    return this.getValue();
  }

  @Input() set luxValue(value: T) {
    this.setValue(value);
  }

  ngOnInit() {
    super.ngOnInit();

    if (!this.luxParameters) {
      throw Error(`The lookup component with the table number ${this.luxTableNo} has no LookupParameter.`);
    }

    if (!this.luxLookupId) {
      throw Error(`The lookup component with the table number ${this.luxTableNo} has no LookupId.`);
    }

    this.lookupHandler.addLookupElement(this.luxLookupId);

    const lookupElementObs = this.lookupHandler.getLookupElementObsv(this.luxLookupId);
    if (!lookupElementObs) {
      throw Error(`Observable "${this.luxLookupId}" not found."`);
    }

    this.subscriptions.push(
      lookupElementObs.subscribe(() => {
        this.fetchLookupData();
      })
    );

    this.subscriptions.push(
      this.componentsConfigService.config.subscribe((newConfig: LuxComponentsConfigParameters) => {
        this.apiPath = newConfig.lookupServiceUrl ?? LuxComponentsConfigService.DEFAULT_CONFIG.lookupServiceUrl;

        this.lookupHandler.reloadData(this.luxLookupId);
      })
    );
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Gibt zurueck, ob die RenderProperty eine Funktion ist oder nicht.
   *
   * @returns boolean
   */
  isRenderPropAFunction(): boolean {
    return typeof this.luxRenderProp === 'function';
  }

  /**
   * Gibt zurück ob sich das entsprechende Element in der Liste ungültiger Elemente befindet.
   *
   * @param LuxLookupTableEntry entry
   * @param entry
   * @returns boolean
   */
  isUngueltig(entry: LuxLookupTableEntry | LuxLookupTableEntry[]) {
    let isUngueltig = false;
    if (entry) {
      if (!Array.isArray(entry)) {
        if (entry.gueltigkeitBis) {
          isUngueltig = Date.now() > +entry.gueltigkeitBis;
        }
      } else {
        entry.forEach((element) => {
          if (element.gueltigkeitBis && !isUngueltig) {
            isUngueltig = Date.now() > +element.gueltigkeitBis;
          }
        });
      }
    }

    return isUngueltig;
  }

  /**
   * Gibt zurück ob ungültige Einträge angezeigt werden sollen.
   *
   * @returns boolean
   */
  showUngueltige() {
    return (
      this.luxBehandlungUngueltige === this.LuxBehandlungsOptionenUngueltige.ausgrauen ||
      this.luxBehandlungUngueltige === this.LuxBehandlungsOptionenUngueltige.anzeigen
    );
  }

  /**
   * Gibt zurück ob ungültige Einträge deaktiviert werden sollen.
   *
   * @returns boolean
   */
  disableUngueltige() {
    return this.luxBehandlungUngueltige === this.LuxBehandlungsOptionenUngueltige.ausgrauen;
  }

  /**
   * Gibt die mitgegebenen Styles abhaengig ob das Element invalid ist zurueck.
   *
   * @param boolean invalid
   * @param invalid
   * @returns LuxLookupOptionStyle
   */
  getStyles(invalid: boolean | undefined) {
    if (invalid) {
      return this.luxCustomInvalidStyles ? this.luxCustomInvalidStyles : {};
    }
    return this.luxCustomStyles ? this.luxCustomStyles : {};
  }

  /**
   * @override
   * @param value
   * @param errors
   */
  errorMessageModifier(value: any, errors: LuxValidationErrors): string | undefined {
    if (errors['ungueltig']) {
      return $localize`:@@luxc.lookup.error_message.invalid:Der ausgewählte Wert ist ungültig.`;
    }
    return undefined;
  }

  getLabel(entry: any): string {
    if (this.isRenderPropAFunction()) {
      return this.luxRenderProp(entry);
    }

    if (entry.hasOwnProperty(this.luxRenderProp as string) && entry[this.luxRenderProp as string]) {
      return entry[this.luxRenderProp as string];
    } else {
      return this.luxRenderPropNoPropertyLabel;
    }
  }

  /**
   * Holt die Lookup-Table Daten vom Backend
   */
  protected fetchLookupData() {
    if (!this.luxParameters) {
      throw Error('LuxParameters not found!');
    }

    const backendRequest = this.lookupService.getLookupTable(this.luxTableNo, this.luxParameters, this.apiPath);
    this.subscriptions.push(
      backendRequest.subscribe(
        (entries: LuxLookupTableEntry[]) => {
          this.setLookupData(entries);
          this.luxDataLoaded.emit(true);
          this.luxDataLoadedAsArray.emit(entries as any);
        },
        () => {
          this.luxDataLoaded.emit(false);
        }
      )
    );
  }

  /**
   * Setzt die aktuellen Werte auf die mitgegebenen Entries.
   *
   * @param entries
   */
  protected setLookupData(entries: LuxLookupTableEntry[]) {
    this.entries = entries;

    if (this.entries && this.luxCompareFn) {
      this.entries.sort(this.luxCompareFn);
    }

    if (this.entries) {
      // Merken welche Einträge ungültig sind, um bei vielen Informationen
      // nicht die ganzen Funktionsaufrufe zu haben
      this.entries.forEach((entry: LuxLookupTableEntry) => {
        entry.isUngueltig = this.isUngueltig(entry);
      });
    }
  }

  notifyFormValueChanged(formValue: any) {
    this.luxValueChange.emit(formValue);
  }
}
