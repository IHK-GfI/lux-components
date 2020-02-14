import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'luxRenderProperty'
})
export class LuxRenderPropertyPipe implements PipeTransform {
  transform(value: any, renderPropertyName: string): string {
    if (!renderPropertyName) {
      return value;
    }

    if (!value || !value[renderPropertyName]) {
      return '';
    }

    return value[renderPropertyName];
  }
}
