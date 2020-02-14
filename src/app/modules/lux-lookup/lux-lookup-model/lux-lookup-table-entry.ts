/**
 * Kennzeichnet einen einzelnen Eintrag in einer Schluesseltabelle.
 */
export class LuxLookupTableEntry {
  gueltigkeitBis?: string | number;
  gueltigkeitVon?: string | number;
  key: string;
  kurzText?: string;
  langText1?: string;
  langText2?: string;

  /*
   * Properties, die nur intern genutzt werden
   */
  isUngueltig?: boolean;

  constructor(partial: Partial<LuxLookupTableEntry>) {
    Object.assign(this, partial);
  }
}
