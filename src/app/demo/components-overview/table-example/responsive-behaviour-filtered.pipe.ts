import { Pipe, PipeTransform } from '@angular/core';
import { ResponsiveBehaviour } from './responsive-behaviour';
import { ColumnConfig } from './column-config';

@Pipe({
  name: 'responsiveBehaviourFiltered'
})
export class ResponsiveBehaviourFilteredPipe implements PipeTransform {
  /**
   * Filtert die übergebene Konfiguration aus den möglichen Optionen heraus (damit z.B. für das Verschieben in Mobile für
   * die Spalte "date" nicht die Zielspalte "date" ausgewählt werden kann.
   *
   * @param value
   * @param config
   */
  transform(value: ResponsiveBehaviour[], config: ColumnConfig): any {
    return ResponsiveBehaviour.BEHAVIOURS.filter(
      behaviour => behaviour.label.toLowerCase().indexOf(config.label.toLowerCase()) === -1
    );
  }
}
