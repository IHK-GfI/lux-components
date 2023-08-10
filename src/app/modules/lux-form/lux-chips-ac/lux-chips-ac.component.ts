import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import {
  MatLegacyAutocomplete as MatAutocomplete,
  MatLegacyAutocompleteTrigger as MatAutocompleteTrigger
} from '@angular/material/legacy-autocomplete';
import { MatLegacyChip as MatChip } from '@angular/material/legacy-chips';
import { LuxComponentsConfigService } from '../../lux-components-config/lux-components-config.service';
import { LuxConsoleService } from '../../lux-util/lux-console.service';
import { LuxUtil } from '../../lux-util/lux-util';
import { LuxFormComponentBase } from '../lux-form-model/lux-form-component-base.class';
import { LuxChipAcGroupComponent } from './lux-chips-subcomponents/lux-chip-ac-group.component';
import { LuxChipAcComponent } from './lux-chips-subcomponents/lux-chip-ac.component';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

export declare type LuxChipsAcOrientation = 'horizontal' | 'vertical';
let luxChipControlUID = 0;

@Component({
  selector: 'lux-chips-ac',
  templateUrl: './lux-chips-ac.component.html',
  styleUrls: ['./lux-chips-ac.component.scss']
})
export class LuxChipsAcComponent extends LuxFormComponentBase<string[]> implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private _luxAutocompleteOptions: string[] = [];

  uid: string = 'lux-chip-control-ac-' + luxChipControlUID++;

  _filteredOptions: string[] = [];
  displayedOptions: string[] = [];
  loadingRunning = false;
  activeIndex = -1;
  onInitFinished = false;

  get filteredOptions() {
    return this._filteredOptions;
  }

  set filteredOptions(newOptions: string[]) {
    if (newOptions && Array.isArray(newOptions)) {
      const selectedChips = this.luxNewChipGroup && Array.isArray(this.luxNewChipGroup.luxLabels) ? this.luxNewChipGroup.luxLabels : [];
      this._filteredOptions = newOptions.filter((option) => !selectedChips.includes(option));
    } else {
      this._filteredOptions = [];
    }

    if (this.onInitFinished) {
      this.displayedOptions = [];
      this.updateDisplayedEntries();
    }
  }

  inputValue$: Subject<string> = new Subject<string>();
  newChip$: Subject<any> = new Subject<any>();
  canClose = false;
  actionRunning = false;
  initRunning = false;

  @Input() luxOrientation: LuxChipsAcOrientation = 'horizontal';
  @Input() luxInputAllowed = false;
  @Input() luxNewChipGroup?: LuxChipAcGroupComponent;
  @Input() luxMultiple = true;
  @Input() luxStrict = false;
  @Input() luxLabelLongFormat = false;
  @Input() luxPlaceholder = $localize`:@@luxc.chips.input.placeholder.lbl:eingeben oder auswählen`;
  @Input() luxOptionMultiline = false;
  @Input() luxOptionBlockSize = 500;
  @Input() luxHideBorder = false;

  @Output() luxChipAdded = new EventEmitter<string>();

  @ContentChildren(LuxChipAcComponent) luxChipComponents!: QueryList<LuxChipAcComponent>;
  @ContentChildren(LuxChipAcGroupComponent) luxChipGroupComponents!: QueryList<LuxChipAcGroupComponent>;
  @ViewChildren(MatChip) matChips!: QueryList<MatChip>;

  @ViewChild('input', { read: ElementRef }) matInput!: ElementRef;
  @ViewChild('input', { read: MatAutocompleteTrigger }) matAutocompleteTrigger?: MatAutocompleteTrigger;
  @ViewChild('auto', { read: MatAutocomplete }) matAutocomplete?: MatAutocomplete;
  @ViewChild(MatAutocomplete) matAutocompleteComponent?: MatAutocomplete;
  @ViewChild('chipsContainerDiv') chipContainerDivRef!: ElementRef;

  get luxDisabled(): boolean {
    return this._luxDisabled;
  }

  @Input() set luxDisabled(disabled: boolean) {
    this._luxDisabled = disabled;
    if (!this.initRunning) {
      // Den Disabled-State nicht während der Initialisierung übertragen.
      setTimeout(() => {
        this.luxChipGroupComponents.forEach((chipGroup) => (chipGroup.luxDisabled = disabled));
        this.luxChipComponents.forEach((chip) => (chip.luxDisabled = disabled));
      });
    }
  }

  get luxAutocompleteOptions(): string[] {
    return this._luxAutocompleteOptions;
  }

  @Input() set luxAutocompleteOptions(options: string[]) {
    this._luxAutocompleteOptions = options ? [...options] : [];
    this.filteredOptions = this.luxAutocompleteOptions;
  }

  get luxInputLabel(): string {
    return this.luxLabel;
  }

  @Input() set luxInputLabel(label: string) {
    this.luxLabel = label;
  }

  get chipComponents(): LuxChipAcComponent[] {
    return this.luxChipComponents ? this.luxChipComponents.toArray() : [];
  }

  get chipGroupComponents(): LuxChipAcGroupComponent[] {
    return this.luxChipGroupComponents ? this.luxChipGroupComponents.toArray() : [];
  }

  constructor(
    @Optional() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
    logger: LuxConsoleService,
    config: LuxComponentsConfigService
  ) {
    super(controlContainer, cdr, logger, config);

    this.subscriptions.push(
      this.newChip$.subscribe((value: string) => {
        this.add(value);
        this.filteredOptions = this.luxAutocompleteOptions ? this.luxAutocompleteOptions : [];
      })
    );

    this.subscriptions.push(
      this.inputValue$
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
        .subscribe()
    );
  }

  ngOnInit() {
    super.ngOnInit();

    this.displayedOptions = [];
    this.updateDisplayedEntries();
    this.onInitFinished = true;
  }

  ngAfterContentInit() {
    if (this.inForm && this.luxNewChipGroup) {
      if (this.formControl.value && Array.isArray(this.formControl.value)) {
        this.luxNewChipGroup.luxLabels = [...this.formControl.value];
      } else {
        this.luxNewChipGroup.luxLabels = [];
      }

      this.filteredOptions = this.luxAutocompleteOptions ? this.luxAutocompleteOptions : [];
    }
  }

  ngAfterViewInit() {
    LuxUtil.assertNonNull('chipContainerDivRef', this.chipContainerDivRef);

    if (this.matAutocompleteTrigger && this.chipContainerDivRef) {
      this.matAutocompleteTrigger.connectedTo = { elementRef: this.chipContainerDivRef };
      this.cdr.detectChanges();
    }

    if (this.matAutocompleteComponent) {
      this.subscriptions.push(
        this.matAutocompleteComponent._keyManager.change.subscribe((index) => {
          if (this.loadingRunning && index === -1) {
            // Workaround: Bei Änderungen an den Optionen wird der Aktivindex zurückgesetzt!
            //
            // Beim Nachladen werden die Optionen verändert und der Aktivindex
            // im KeyManager wird zurückgesetzt. D.h. der nächste Klick auf die
            // Pfeiltaste (nach unten) aktiviert nicht die nächste Option, sondern
            // die erste Option am Anfang der Liste. Aus diesem Grund wird hier
            // der letzte Aktivindex wiederhergestellt, damit der Benutzer dort
            // weitermachen kann, wo er aufgehört hat.
            //
            // Siehe: _MatAutocompleteTriggerBase._subscribeToClosingActions
            // this._resetActiveItem();
            setTimeout(() => {
              if (this.matAutocompleteComponent) {
                this.matAutocompleteComponent._keyManager.setActiveItem(this.activeIndex!);
                this.loadingRunning = false;
              }
            });
          }
        })
      );

      this.subscriptions.push(
        this.matAutocompleteComponent.opened.subscribe(() => {
          setTimeout(() => {
            if (this.matAutocompleteComponent) {
              if (this.matAutocompleteComponent.panel) {
                this.matAutocompleteComponent.panel.nativeElement.addEventListener('scroll', this.loadOnScroll.bind(this));
              }
            }
          });
        })
      );

      this.subscriptions.push(
        this.matAutocompleteComponent.closed.subscribe(() => {
          if (this.matAutocompleteComponent) {
            this.matAutocompleteComponent.panel.nativeElement.removeEventListener('scroll', this.loadOnScroll);
          }
        })
      );
    }
  }

  /**
   * Stößt das Nachladen von Elementen an, wenn ein bestimmter Scrollwert erreicht wurde.
   *
   * @param event - ScrollEvent
   */
  private loadOnScroll(event: Event) {
    const position = event.target as any;
    if (position && (position.scrollTop + position.clientHeight) / position.scrollHeight > 85 / 100) {
      this.updateDisplayedEntries();
    }
  }

  /**
   * Läd den nächsten Block Daten aus den Entries nach.
   */
  updateDisplayedEntries() {
    if (this.filteredOptions.length > 0) {
      if (this.matAutocompleteComponent) {
        this.loadingRunning = true;
        this.activeIndex = this.matAutocompleteComponent._keyManager.activeItemIndex ?? -1;
      }
      const start = 0;
      const end = Math.min(this.luxOptionBlockSize, this.filteredOptions.length);
      this.displayedOptions.push(...this.filteredOptions.splice(start, end));
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * Fügt einen Chip hinzu.
   * Fügt ihn entweder der explizit mitgeteilten newChipList hinzu oder einfach
   * der letzten mitgegebenen Liste.
   *
   * @param value
   */
  add(value: string) {
    try {
      this.actionRunning = true;

      if (value && value.trim().length > 0) {
        if (this.luxNewChipGroup) {
          const found =
            this.luxAutocompleteOptions && this.luxAutocompleteOptions.length > 0
              ? !!this.luxAutocompleteOptions.find((option) => option === value)
              : true;
          const foundLabel = this.luxNewChipGroup.luxLabels ? !!this.luxNewChipGroup.luxLabels.find((label) => label === value) : false;

          if (!this.luxStrict || (found && !foundLabel)) {
            this.luxNewChipGroup.add(value);

            if (
              this.luxNewChipGroup.luxLabels &&
              Array.isArray(this.luxNewChipGroup.luxLabels) &&
              this.luxNewChipGroup.luxLabels.length > 0
            ) {
              this.formControl.setValue([...this.luxNewChipGroup.luxLabels]);
            } else {
              this.formControl.setValue([]);
            }
          }
        } else {
          this.luxChipAdded.emit(value);
        }

        // Autocomplete-Feld in jedem Fall schließen (Delay über Timeout, damit kein visuelles Flackern entsteht)
        setTimeout(() => {
          if (this.matAutocompleteTrigger) {
            this.matAutocompleteTrigger.closePanel();
          }
        });
      }
    } finally {
      this.actionRunning = false;
    }
  }

  onFocusOut() {
    if (this.luxNewChipGroup) {
      setTimeout(() => {
        // Hier wird der markAsTouched-Aufruf gezielt verzögert,
        // damit die Darstellung eines required-Chips nicht flackert
        // (kurzzeitig rot, wegen der Pflichtfeldfehlermeldung,
        // danach wieder normal, sobald der Wert gesetzt wurde).
        this.formControl.markAsTouched();
      }, 100);
    }
  }

  onChipGroupRemove(chipGroup: LuxChipAcGroupComponent, index: number) {
    try {
      this.actionRunning = true;

      chipGroup.remove(index);

      if (chipGroup === this.luxNewChipGroup) {
        if (chipGroup.luxLabels && Array.isArray(chipGroup.luxLabels) && chipGroup.luxLabels.length > 0) {
          this.formControl.setValue([...chipGroup.luxLabels]);
        } else {
          this.formControl.setValue([]);
        }

        this.filteredOptions = this.luxAutocompleteOptions ? this.luxAutocompleteOptions : [];
      }
    } finally {
      this.actionRunning = false;
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
    if (this.matAutocompleteTrigger) {
      this.matAutocompleteTrigger.openPanel();
    }
  }

  /**
   * Wird beim Selektieren einer Option im Autocomplete ausgeführt.
   *
   * @param input
   * @param value
   */
  autoCompleteAdd(input: HTMLInputElement, value: string) {
    this.newChip$.next(value);
    input.value = '';
  }

  /**
   * Wird beim Input-Event des Eingabefelds ausgeführt, fragt aber vorher ab, ob das Autocomplete offen ist.
   * Wenn ja, wird kein neuer Chip erzeugt, da das Autocomplete dies übernimmt.
   *
   * @param input
   */
  inputAdd(input: HTMLInputElement) {
    if (!this.matAutocomplete?.isOpen) {
      // Falls nur eine Option übrig ist, wird diese als Wert anstelle des Inputtextes verwendet.
      if (
        input.value &&
        input.value.length > 0 &&
        this.luxAutocompleteOptions &&
        this.luxAutocompleteOptions.length > 1 &&
        this.displayedOptions &&
        this.displayedOptions.length === 1
      ) {
        this.newChip$.next(this.displayedOptions[0]);
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
      // Fall: Keine Chips vorhanden und der Benutzer klickt auf die Pfeil-Action.
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
    if (this.matAutocompleteTrigger?.panelOpen) {
      if (this.matChips.length > 0 || this.canClose) {
        this.matAutocompleteTrigger?.closePanel();
      }
    } else {
      this.matAutocompleteTrigger?.openPanel();
    }
  }

  protected initFormControl() {
    try {
      this.initRunning = true;
      super.initFormControl();
    } finally {
      this.initRunning = false;
    }
  }

  protected notifyFormValueChanged(formValue: any) {
    super.notifyFormValueChanged(formValue);

    // An dieser Stelle muss man die ValueChanged-Events ignorieren,
    // welche durch die add- und onChipGroupRemove-Methode ausgelöst
    // wurden. In diesen Fällen sind die luxLabels der ChipGroup
    // bereits aktualisiert worden. Um das doppelte Setzen zu
    // verhindern, wurde hier das actionRunning-Flag eingeführt.
    if (!this.actionRunning && this.inForm && this.luxNewChipGroup) {
      if (formValue && Array.isArray(formValue)) {
        this.luxNewChipGroup.luxLabels = [...formValue];
      } else {
        this.luxNewChipGroup.luxLabels = [];
      }

      this.filteredOptions = this.luxAutocompleteOptions ? this.luxAutocompleteOptions : [];
    }
  }
}
