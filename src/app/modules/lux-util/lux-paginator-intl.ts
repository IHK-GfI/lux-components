import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class LuxPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();

    // Original Properties überschreiben
    this.itemsPerPageLabel = $localize `:@@luxc.paginator.elements_on_page:Elemente pro Seite`;
    this.nextPageLabel = $localize `:@@luxc.paginator.next_page:Nächste Seite`;
    this.previousPageLabel = $localize `:@@luxc.paginator.previous_page:Vorherige Seite`;
    this.lastPageLabel = $localize `:@@luxc.paginator.last_page:Letzte Seite`;
    this.firstPageLabel = $localize `:@@luxc.paginator.first_page:Erste Seite`;
    this.getRangeLabel = this.customRangeLabel;
  }

  /**
   * Deutsche Fassunng des Material-Paginators
   *
   * @param page
   * @param pageSize
   * @param length
   */
  private customRangeLabel(page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return $localize `:@@luxc.paginator.0_until_length:0 von ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return $localize `:@@luxc.paginator.page_part:${startIndex + 1} - ${endIndex} von ${length}`;
  }
}
