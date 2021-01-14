/* eslint-disable no-shadow */
// no-shadow meldet fälschlicherweise einen Fehler
/**
 * Enums, welche die auswaehlbaren Felder fuer den Response einer Lookup-Service-Abfrage beinhaltet.
 */
export enum LuxFieldValues {
  kurz = 'kurz',
  lang1 = 'lang1',
  lang2 = 'lang2',
  gueltig_von = 'gueltig_von',
  gueltig_bis = 'gueltig_bis'
}

export enum LuxBehandlungsOptionenUngueltige {
  anzeigen = 'anzeigen',
  ausgrauen = 'ausgrauen',
  ausblenden = 'ausblenden'
}
/* eslint-enable no-shadow */

/**
 * Class, welche benutzt wird um die Abfrage an den Lookup-Service zu modifizeren.
 */
export class LuxLookupParameters {
  knr: number;
  keys: any[];
  fields: LuxFieldValues[];
  raw: boolean;

  constructor(data: { knr: number; keys?: string[]; fields?: LuxFieldValues[]; raw?: boolean }) {
    this.knr = data.knr;
    this.keys = !!data.keys ? data.keys : [];
    this.fields = !!data.fields
      ? data.fields
      : [
          LuxFieldValues.kurz,
          LuxFieldValues.lang1,
          LuxFieldValues.lang2,
          LuxFieldValues.gueltig_bis,
          LuxFieldValues.gueltig_von
        ];
    this.raw = !!data.raw ? data.raw : false;
  }
}
