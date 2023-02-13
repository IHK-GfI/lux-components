# LUX-Mitmachen

Jeder kann helfen die LUX-Components zu verbessern.

- [LUX-Mitmachen](#lux-mitmachen)
  - [Vorgehen: Einen Bug beheben oder ein Feature umsetzen](#vorgehen-einen-bug-beheben-oder-ein-feature-umsetzen)
    - [Husky lokal einrichten](#husky-lokal-einrichten)
    - [Vorgehen](#vorgehen)
      - [Erfassung](#erfassung)
      - [Umsetzung](#umsetzung)
      - [Test und Review](#test-und-review)
      - [Integration](#integration)

## Vorgehen: Einen Bug beheben oder ein Feature umsetzen

### Husky lokal einrichten

Husky im Projekt initialisieren. Der folgende `NPM`-Befehl muss nur einmal ausgeführt werden:

```bash
npm run husky-init
```

Bei der Verwendung von SourceTree muss sichergestellt sein, dass Node (inkl. NPM) im Pfad enthalten ist.

### Vorgehen

#### Erfassung

1. Issue für den Bug oder das neue Feature anlegen. Die Komponente sollte durch einen Bindestrich von dem Rest des Titels abgetrennt werden.
   - Beispiel: `lux-button - Neues Property "abc" einführen`
   - Beispiel: `lux-snackbar - Lange Texte werden in der mobilen Ansicht abgeschnitten`
2. Ein passendes Label (z.B. `bug`, `enhancement`,...) setzen.
3. Im Beschreibungstext möglichst den Ist- und Soll-Zustand beschreiben. Wenn möglich einen Screenshot anhängen.

#### Umsetzung

1. Einen Branch mit der Issue-Nummer und ein paar Schlagwörtern für die Änderung anlegen. Anstatt von Leerzeichen werden Unterstriche verwendet. Die Issue-Nummer wird durch einen Bindestrich von der Komponente bzw. den Schlagwörtern getrennt.
   - Beispiel: `Issue_123-button-new_property_xyz`
   - Beispiel: `Issue_234-snackbar_long_text`
2. In der `CHANGELOG.md` den Issue (inkl. Link) unter der entsprechenden Version und Rubrik (New oder Bugfixes) einfügen.

   - ```md
     # Version 14.1.0

     ## New

     - **allgemein**: Update auf LUX-Components-Theme [14.1.0](https://github.com/IHK-GfI/lux-components-theme/releases/tag/14.1.0)
     - **allgemein**: Update auf LUX-Components-Icons-And-Fonts [1.1.0](https://github.com/IHK-GfI/lux-components-icons-and-fonts/releases/tag/1.1.0)
     - **lux-table**: Button zum Zurücksetzen des Filters hinzugefügt. [Issue 245](https://github.com/IHK-GfI/lux-components/issues/245)

     ## Bug Fixes

     - **lux-app-header**: Das User-Menu wird immer angezeigt. [Issue 248](https://github.com/IHK-GfI/lux-components/issues/248)
     ```

3. Den Bug fixen oder das Feature entwickeln. Nach Möglichkeit sollte ein automatisierter Test mit entwickelt werden. Die Commit-Nachricht sollte mit einem der folgenden Präfixen beginnen:

   - Issue #123: _(123 steht symbolisch für die Issue-Nummer)_

     - Einzeilig:

       ```text
       Issue #123: lux-button - Neues Property "abc" einführen
       ```

     - Mehrzeilig mit **Leerzeile (wichtig!)** und Aufzählungszeichen:

       ```text
       Issue #123: lux-snackbar - Lange Texte werden in der mobilen Ansicht abgeschnitten

       - Hier stehen Details
       - Und hier stehen andere Dinge
       ```

   - Demo: _(falls die Änderung nur die Demo betrifft)_

     - Einzeilig:

       ```text
       Demo: lux-btton - Einen blauen Button hinzugefügt
       ```

     - Mehrzeilig mit **Leerzeile (wichtig!)** und Aufzählungszeichen:

       ```text
       Demo: lux-btton - Einen blauen Button hinzugefügt

       - Rechtschreibfehler behoben.
       - Property "myColor" in "color" umbenannt.
       ```

   - Release _(nur für Releases)_
   - Merge _(nur für Merges)_

4. Die Demo erweitern, damit der Bug oder das Feature manuell getestet werden kann.
5. Im Issue einen manuellen Test beschreiben, damit Bug oder das Feature in der Demo getestet oder ausprobiert werden kann.

#### Test und Review

1. Den Vorgang durch ein Mitglied testen und schließen lassen.
2. Einen Pull Request auf dem `develop`-Branch anlegen. Bitte keinen Meilenstein setzen!
3. Im Pull Request den Issue verlinken.
4. Im Pull Request nach vorheriger Nachfrage einen Reviewer eintragen.

#### Integration

1. Nach dem erfolgreichen Review wird der Pull Request durch ein Mitglied in den Develop-Zweig integriert.
2. Meilenstein in den Issue eintragen.
3. Den Branch löschen.
4. Fertig!
