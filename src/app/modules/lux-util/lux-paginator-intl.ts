import { MatPaginatorIntl } from '@angular/material';

export class LuxPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();

    // Original Properties überschreiben
    this.itemsPerPageLabel = 'Elemente pro Seite';
    this.nextPageLabel = 'Nächste Seite';
    this.previousPageLabel = 'Vorherige Seite';
    this.lastPageLabel = 'Letzte Seite';
    this.firstPageLabel = 'Erste Seite';
    this.getRangeLabel = this.customRangeLabel;
  }

  /**
   * Deutsche Fassunng des Material-Paginators
   * @param page
   * @param pageSize
   * @param length
   */
  private customRangeLabel(page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return '0 von ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' von ' + length;
  }
}
