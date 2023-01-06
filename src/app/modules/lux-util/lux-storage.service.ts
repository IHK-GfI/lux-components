import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Der LuxStorageService speichert Daten im lokalen Browserstorage.
 * Wenn man beim Speichern (Methode -> setItem) angibt, dass es sich um sensible Daten handelt,
 * können diese einfach über die Methode 'clearSensitiveItems' gelöscht werden.
 */
@Injectable({
  providedIn: "root"
})
export class LuxStorageService implements OnDestroy {
  private readonly postfixSensitive = '.sensitive';

  private itemSources: Map<string, BehaviorSubject<string | null>> = new Map();

  constructor() {
    addEventListener('storage', this.onStorageEvent.bind(this));
  }

  ngOnDestroy(): void {
    removeEventListener('storage', this.onStorageEvent);
  }

  private onStorageEvent(event: StorageEvent) {
      if (event.key) {
        if (this.itemSources.has(event.key)) {
          this.itemSources.get(event.key)!.next(event.newValue);
        }
      }
  }

  /**
   * Diese Methode liefert den Wert für den übergebenen Schlüssel zurück.
   *
   * @param key - Der eindeutige Schlüssel.
   * @returns Liefert den Wert für den übergebenen Schlüssel zurück.
   */
  getItem(key: string): string | null {
    if (!this.itemSources.has(key)) {
      this.itemSources.set(key, new BehaviorSubject<string | null>(localStorage.getItem(key)));
    }

    return this.itemSources.get(key)!.getValue();
  }

  /**
   * Diese Methode liefert ein Observable zurück, das über alle Änderungen an dem Schlüssel informiert wird.
   *
   * @param key - Der eindeutige Schlüssel.
   * @returns Liefert ein Observable zurück, das über alle Änderungen an dem Schlüssel informiert wird.
   */
  getItemAsObservable(key: string): Observable<string | null> {
    if (!this.itemSources.has(key)) {
      this.itemSources.set(key, new BehaviorSubject<string | null>(localStorage.getItem(key)));
    }

    return this.itemSources.get(key)!.asObservable();
  }

  /**
   * Diese Methode setzt den übergebenen Wert für den Schlüssel. Zusätzlich muss angegeben werden, ob es sich um
   * sensible oder personenbezogene Daten handelt.
   *
   * @param key - Der eindeutige Schlüssel.
   * @param value - Der neue Wert.
   * @param sensitive - Gibt an, ob es sich um sensible oder personenbezogene Daten handelt. Diese können leicht über
   *                    die Methode 'clearSensitiveItems' (z.B. beim Ausloggen) gelöscht werden.
   */
  setItem(key: string, value: string, sensitive: boolean): void {
    try {
      localStorage.setItem(key, value);

      if (sensitive) {
        localStorage.setItem(key + this.postfixSensitive, 'true');
      }
      if (this.itemSources.has(key)) {
        this.itemSources.get(key)!.next(localStorage.getItem(key));
      }
    } catch (error) {
      this.itemSources.get(key)!.error(error);
    }
  }

  /**
   * Diese Methode entfernt den übergebenen Schlüssel.
   *
   * @param key - Der eindeutige Schlüssel.
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
    localStorage.removeItem(key + this.postfixSensitive);

    if (this.itemSources.has(key)) {
      this.itemSources.get(key)!.next(localStorage.getItem(key));
    }
  }

  /**
   * Diese Methode löscht alle sensiblen und personenbezogenen Einträge (d.h. alle Items bei denen das Flag 'sensitive'
   * auf true gesetzt wurde).
   */
  clearSensitiveItems(): void {
    // Alle Schlüssel sammeln.
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i)!);
    }

    // Alle sensiblen Einträge löschen.
    keys.forEach(key => {
      if (key && key.endsWith(this.postfixSensitive)) {
        this.removeItem(key.replace(this.postfixSensitive, ''));
      }
    });
  }

  /**
   * Diese Methode löscht alle Einträge aus dem Storage.
   */
  clearAll(): void {
    localStorage.clear();
    this.itemSources.forEach((itemSource: BehaviorSubject<string | null>) => {
      itemSource.next(null);
      itemSource.complete();
    });

    this.itemSources.clear();
  }
}
