// tslint:disable:  max-classes-per-file

export class Nachricht {
  id: number;
  betreff: string;
  message: string;
  validFrom: Date;
  validTo: Date;
  erneutAnzeigen: boolean;
  empfaenger: Empfaenger[];
  anwendung: Anwendung;
  ihk: Ihk[];
}

export class Empfaenger {
  id: number;
  bezeichnung: string;

  constructor(bezeichnung: string) {
    this.bezeichnung = bezeichnung;
  }
}

export class Anwendung {
  id: number;
  kuerzel: string;

  constructor(kuerzel: string) {
    this.kuerzel = kuerzel;
  }
}

export class Ihk {
  id: number;
  ihkNr: number;
  name: string;

  constructor(ihkNr: number, name: string) {
    this.ihkNr = ihkNr;
    this.name = name;
  }
}

export class SaveNachrichtResult {
  nachricht: Nachricht;
  startTimeChanged: boolean;
}
