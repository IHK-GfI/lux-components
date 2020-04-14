import { MatTableDataSource } from '@angular/material/table';

/**
 * Diese Ableitung berücksichtigt bei der Sortierung Sonderzeichen (z.B. öäüßé,...)
 * und ignoriert die Groß- und Kleinschreibung.
 */
export class LuxTableDataSource<T> extends MatTableDataSource<T> {
  totalElements: number;
  selectedEntries: Set<any> = new Set<any>();

  /**
   * Diese Methode liefert eine sortierte Kopie des Datenarrays zurück.
   * Die Sortierung berücksichtig ist nicht Case-Sensitive und berücksichtig
   * Sonderzeichen (z.B. öäüßé,...)
   */
  _orderData(data: T[]): T[] {
    const _this = this;
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    const active = this.sort.active;
    const direction = this.sort.direction;

    if (active === 'multiSelect') {
      // muss checken welche in dem sorted array sind und alle anderen darunter
      const selected = data.filter(value => this.selectedEntries.has(value));
      const notSelected = data.filter(value => !selected.some(selectedValue => selectedValue === value));

      if (direction === 'asc') {
        return [...selected, ...notSelected];
      } else if (direction === 'desc') {
        return [...notSelected, ...selected];
      } else {
        return data.slice();
      }
    }

    return data.slice().sort((a, b) => {
      let valueA = _this.sortingDataAccessor(a, active);
      let valueB = _this.sortingDataAccessor(b, active);

      if (!valueA) {
        valueA = '';
      }

      if (!valueB) {
        valueB = '';
      }

      if (typeof valueA === 'number' && typeof valueB === 'string') {
        valueA = '' + valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'number') {
        valueB = '' + valueB;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        const stringA = (valueA as string).toLocaleLowerCase();
        const stringB = (valueB as string).toLocaleLowerCase();
        return stringA.localeCompare(stringB) * (direction === 'asc' ? 1 : -1);
      }

      return (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1);
    });
  }

  /**
   * Override update paginator method
   * to ensure total unfiltered element count is consistent with the http result
   */
  public _updatePaginator(filteredDataLength: number): void {
    if (this.filter === '') {
      super._updatePaginator(this.totalElements);
    } else {
      super._updatePaginator(filteredDataLength);
    }
  }
}
