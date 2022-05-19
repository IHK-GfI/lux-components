import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy, Optional,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChip } from '@angular/material/chips';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxFormComponentBase } from "../lux-form-model/lux-form-component-base.class";
import { LuxChipGroupComponent } from './lux-chips-subcomponents/lux-chip-group.component';
import { LuxChipComponent } from './lux-chips-subcomponents/lux-chip.component';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

export declare type LuxChipsOrientation = 'horizontal' | 'vertical';
let luxChipControlUID = 0;

@Component({
  selector: 'lux-chips',
  templateUrl: './lux-chips.component.html',
  styleUrls: ['./lux-chips.component.scss']
})
export class LuxChipsComponent extends LuxFormComponentBase implements AfterViewInit, OnDestroy {
  private readonly inputValueSubscription: Subscription = new Subscription();
  private readonly newChipSubscription: Subscription = new Subscription();

  private _luxAutocompleteOptions: string[] = [];

  uid: string = 'lux-chip-control-' + luxChipControlUID++;

  filteredOptions: string[] = [];
  inputValue$: Subject<string> = new Subject<string>();
  newChip$: Subject<any> = new Subject<any>();
  canClose = false;

  @Input() luxOrientation: LuxChipsOrientation = 'horizontal';
  @Input() luxInputAllowed = false;
  @Input() luxNewChipGroup: LuxChipGroupComponent;
  @Input() luxMultiple = true;
  @Input() luxLabelLongFormat = false;
  @Input() luxPlaceholder = $localize`:@@luxc.chips.input.placeholder.lbl:eingeben oder auswählen`;
  @Input() luxOptionMultiline = false;
  
  @Output() luxChipAdded = new EventEmitter<string>();

  @ContentChildren(LuxChipComponent) luxChipComponents: QueryList<LuxChipComponent>;
  @ContentChildren(LuxChipGroupComponent) luxChipGroupComponents: QueryList<LuxChipGroupComponent>;
  @ViewChildren(MatChip) matChips: QueryList<MatChip>;

  @ViewChild('input', { read: MatAutocompleteTrigger }) matAutocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('auto', { read: MatAutocomplete }) matAutocomplete: MatAutocomplete;
  @ViewChild('chipscontainerdiv') chipContainerDivRef: ElementRef;

  get luxDisabled(): boolean {
    return this._luxDisabled;
  }

  @Input() set luxDisabled(disabled: boolean) {
    this._luxDisabled = disabled;
    setTimeout(() => {
      this.luxChipGroupComponents.forEach((chipGroup) => (chipGroup.luxDisabled = disabled));
      this.luxChipComponents.forEach((chip) => (chip.luxDisabled = disabled));
    });
  }

  get luxAutocompleteOptions(): string[] {
    return this._luxAutocompleteOptions;
  }

  @Input() set luxAutocompleteOptions(options: string[]) {
    this._luxAutocompleteOptions = options ? options : [];
    this.filteredOptions = this.luxAutocompleteOptions;
  }

  get luxInputLabel(): string {
    return this.luxLabel;
  }

  @Input() set luxInputLabel(label: string) {
    this.luxLabel = label;
  }

  get chipComponents(): LuxChipComponent[] {
    return this.luxChipComponents as any;
  }

  get chipGroupComponents(): LuxChipGroupComponent[] {
    return this.luxChipGroupComponents as any;
  }

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);

    this.newChipSubscription = this.newChip$.subscribe((value: string) => {
      this.add(value);
      this.filteredOptions = this.luxAutocompleteOptions ? this.luxAutocompleteOptions : [];
    });

    this.inputValueSubscription = this.inputValue$
      .asObservable()
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        map((value: string) => {
          if (!value) {
            this.filteredOptions = [...this.luxAutocompleteOptions];
          } else {
            this.filteredOptions = this.luxAutocompleteOptions.filter(
              (compareValue: string) => compareValue.trim().toLowerCase().indexOf(value.trim().toLowerCase()) > -1
            );
          }
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    if (this.matAutocompleteTrigger && this.chipContainerDivRef) {
      this.matAutocompleteTrigger.connectedTo = { elementRef: this.chipContainerDivRef };
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy() {
    if (this.newChipSubscription) {
      this.newChipSubscription.unsubscribe();
    }
    if (this.inputValueSubscription) {
      this.inputValueSubscription.unsubscribe();
    }
  }

  /**
   * Fuegt einen Chip hinzu.
   * Fuegt ihn entweder der explizit mitgeteilten newChipList hinzu oder einfach
   * der letzten mitgegebenen Liste.
   *
   * @param value
   */
  add(value: string) {
    if (value && value.trim().length > 0) {
      if (this.luxNewChipGroup) {
        this.luxNewChipGroup.add(value);
      } else {
        this.luxChipAdded.emit(value);
      }

      // Autocomplete-Feld in jedem Fall schließen (Delay über Timeout, damit kein visuelles Flackern entsteht)
      setTimeout(() => this.matAutocompleteTrigger.closePanel());
    }
  }

  /**
   * Wird bei Eingabe von Werten in das Input-Feld aufgerufen und schreibt einen neuen Wert
   * in das inputValue-Subject.
   *
   * @param value
   */
  inputChanged(value: string) {
    this.inputValue$.next(value);
  }

  /**
   * Diese Methode öffnet bei jedem Klick das Optionspanel des
   * Autocomplete-Feldes.
   *
   * Details:
   * Im Standard wird das Optionspanel eines Autocomplete-Feldes nur einmal
   * geöffnet. Ein Autocomplete-Feld prüft bei jedem Klick, ob es selbst den
   * Fokus hat und ob sein Optionspanel bereits zuvor geöffnet wurde. Wenn beide
   * Bedingungen zutreffen, bleibt das Optionspanel beim erneuten Klicken
   * standardmäßig geschlossen. Hier bei den Chips soll das Verhalten des
   * Autocomplete-Feldes geändert werden. Jeder Klick soll immer das
   * Optionspanel öffnen, unabhängig von irgendwelchen Bedingungen. Dadurch
   * können die Benutzer auch mit der Maus mehrere Chips hintereinander
   * auswählen.
   */
  onAutocompleteClick() {
    this.matAutocompleteTrigger.openPanel();
  }

  /**
   * Wird beim Selektieren einer Option im Autocomplete ausgeführt.
   *
   * @param input
   * @param value
   */
  autoCompleteAdd(input, value) {
    this.newChip$.next(value);
    input.value = '';
  }

  /**
   * Wird beim Input-Event des Eingabefelds ausgeführt, fragt aber vorher ab, ob das Autocomplete offen ist.
   * Wenn ja, wird kein neuer Chip erzeugt, da das Autocomplete dies übernimmt.
   *
   * @param input
   */
  inputAdd(input) {
    if (!this.matAutocomplete.isOpen) {
      // falls nur eine Option übrig ist, diese als value nehmen anstelle des input textes
      if (
        this.luxAutocompleteOptions &&
        this.luxAutocompleteOptions.length > 1 &&
        this.filteredOptions &&
        this.filteredOptions.length === 1
      ) {
        this.newChip$.next(this.filteredOptions[0]);
        input.value = '';
      } else {
        this.newChip$.next(input.value);
        input.value = '';
      }
    }
  }

  onAutoCompleteOpened() {
    // Um einen ExpressionChangedAfterItHasBeenCheckedError im Attribute "attr.aria-expanded"
    // zu umgehen, wird hier manuell die Change Detection ausgeführt.
    this.cdr.detectChanges();

    this.canClose = false;
    setTimeout(() => {
      // Workaround: Vorschlagsliste kann erst nach kurzer Verzögerung wieder geschlossen werden.
      // Dieser Workaround ist nötig, da das Autocomplete-Panel in dem folgenden Fall sofort nach
      // dem Öffnen wieder geschlossen wird.
      //
      // Fall: Keine Chips vorhanden und der Benutzer klickt auf die Pfeil-Action
      // In diesem Fall wird das Autocomplete-Panel durch die Material-Komponente (focusin) geöffnet
      // und durch die Pfeil-Action direkt wieder geschlossen. D.h. man kann das Autocomplete-Panel
      // nicht immer schließen, wenn es bereits geöffnet ist, weil man nicht erkennen kann, ob das
      // Autocomplete-Panel gerade erst geöffnet wurde (Panel darf nicht geschlossen werden) oder
      // bereits zu einem früheren Zeitpunkt (Panel darf geschlossen werden). Um das Problem zu
      // umgehen, wird hier ein Timeout in Verbindung mit dem canClose-Flag verwendet.
      this.canClose = true;
    }, 250);
  }

  onArrowIcon() {
    if (this.matAutocompleteTrigger.panelOpen) {
      if (this.matChips.length > 0 || this.canClose) {
        this.matAutocompleteTrigger.closePanel();
      }
    } else {
      this.matAutocompleteTrigger.openPanel();
    }
  }
}
