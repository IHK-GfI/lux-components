import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChip } from '@angular/material/chips';
import { LuxChipGroupComponent } from './lux-chips-subcomponents/lux-chip-group.component';
import { LuxChipComponent } from './lux-chips-subcomponents/lux-chip.component';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

export declare type LuxChipsOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'lux-chips',
  templateUrl: './lux-chips.component.html',
  styleUrls: ['./lux-chips.component.scss']
})
export class LuxChipsComponent implements OnDestroy {
  private readonly inputValueSubscription: Subscription = new Subscription();
  private readonly newChipSubscription: Subscription = new Subscription();

  private _luxDisabled = false;
  private _luxAutocompleteOptions: string[] = [];
  private _luxLabel = $localize `:@@luxc.chips.new.lbl:Neu`;

  filteredOptions: string[] = [];
  inputValue$: Subject<string> = new Subject<string>();
  newChip$: Subject<any> = new Subject<any>();

  @Input() luxOrientation: LuxChipsOrientation = 'horizontal';
  @Input() luxInputAllowed = false;
  @Input() luxNewChipGroup: LuxChipGroupComponent;
  @Input() luxMultiple = true;

  @Output() luxChipAdded = new EventEmitter<string>();

  @ContentChildren(LuxChipComponent) luxChipComponents: QueryList<LuxChipComponent>;
  @ContentChildren(LuxChipGroupComponent) luxChipGroupComponents: QueryList<LuxChipGroupComponent>;
  @ViewChildren(MatChip) matChips: QueryList<MatChip>;

  @ViewChild('input', { read: MatAutocompleteTrigger }) matAutocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('auto', { read: MatAutocomplete }) matAutocomplete: MatAutocomplete;

  get luxDisabled(): boolean {
    return this._luxDisabled;
  }

  @Input() set luxDisabled(disabled: boolean) {
    this._luxDisabled = disabled;
    setTimeout(() => {
      this.luxChipGroupComponents.forEach(chipGroup => (chipGroup.luxDisabled = disabled));
      this.luxChipComponents.forEach(chip => (chip.luxDisabled = disabled));
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
    return this._luxLabel;
  }

  @Input() set luxInputLabel(label: string) {
    this._luxLabel = label;
  }

  // Für lux-form-control, diese ruft luxLabel auf
  get luxLabel(): string {
    return this._luxLabel;
  }

  get chipComponents(): LuxChipComponent[] {
    return this.luxChipComponents as any;
  }

  get chipGroupComponents(): LuxChipGroupComponent[] {
    return this.luxChipGroupComponents as any;
  }

  constructor(@Optional() private controlContainer: ControlContainer) {
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
              (compareValue: string) =>
                compareValue
                  .trim()
                  .toLowerCase()
                  .indexOf(value.trim().toLowerCase()) > -1
            );
          }
        })
      )
      .subscribe();
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
}
