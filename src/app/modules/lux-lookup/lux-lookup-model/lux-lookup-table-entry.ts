/**
 * Kennzeichnet einen einzelnen Eintrag in einer Schlüsseltabelle.
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
    if (!partial.hasOwnProperty('key') || !partial.key) {
      throw Error(`The LuxLookupTableEntry has no key.`);
    }
    this.key = partial.key;

    Object.assign(this, partial);
  }
}
