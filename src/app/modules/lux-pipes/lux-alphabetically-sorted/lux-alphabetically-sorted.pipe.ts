import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'luxAlphabeticallySorted'
})
export class LuxAlphabeticallySortedPipe implements PipeTransform {
  transform(array: any[]): any {
    if (!array) {
      return [];
    }
    return this.sortAlphabetically(array);
  }

  private sortAlphabetically(array: any[]) {
    return array.slice().sort((a, b) => {
      const valueA = a.label || '';
      const valueB = b.label || '';

      const stringA = (valueA as string).toLocaleLowerCase();
      const stringB = (valueB as string).toLocaleLowerCase();
      return stringA.localeCompare(stringB);
    });
  }
}
