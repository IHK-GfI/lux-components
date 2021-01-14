import { Pipe, PipeTransform } from '@angular/core';
import { LuxUtil } from '../../lux-util/lux-util';

@Pipe({
  name: 'luxPropertyFromObject'
})
export class LuxPropertyFromObjectPipe implements PipeTransform {
  /**
   * Ruft die Funktion aus Util auf, um ein Property aus einem Objekt (auch mit Unterpfaden) auszulesen.
   *
   * @param object
   * @param propertyNamePath
   */
  transform(object: any, propertyNamePath: string): any {
    return LuxUtil.readPropertyValueFromObject(object, propertyNamePath);
  }
}
