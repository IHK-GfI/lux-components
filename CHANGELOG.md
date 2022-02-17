# Version 11.11.0
## Bug Fixes
- **lux-lookup-autocomplete**: Komponente wirft beim initialen Laden einen ExpressionChangedAfterItHasBeenCheckedError [Issue 165](https://github.com/IHK-GfI/lux-components/issues/165)
- **lux-filter-form**: Wenn ein Filter initial vorbelegt ist, dann zeigt die Debugconsole einen Fehler an und die Filterchips werden eventuell nicht korrekt aktualisiert. [Issue 169](https://github.com/IHK-GfI/lux-components/issues/169)
- **lux-filter-form**: Der Laden-Button im Dialog ist im Vergleich zum Lösch-Button zu groß. [Issue 169](https://github.com/IHK-GfI/lux-components/issues/169)
- **lux-filter-form**: Wenn man im Firefox in einem Autocomplete-Feld das Filtern über die Tastatur (Shift + Enter) auslöst, fliegt ein Fehler in der Debugconsole. [Issue 169](https://github.com/IHK-GfI/lux-components/issues/169)

# Version 11.10.0
## New
- **lux-stepper-large**: Der Stepper ist weniger strikt und ermöglicht immer das Zurücknavigieren. [Issue 161](https://github.com/IHK-GfI/lux-components/issues/161)
- **lux-stepper-large**: Schritte im Stepper können deaktiviert werden. [Issue 161](https://github.com/IHK-GfI/lux-components/issues/161)

## Bug Fixes
- **lux-stepper-large**: Verhinderung eines ExpressionChangedAfterItHasBeenCheckedError beim Setzen der Cursorposition (Tastatursteuerung). [Issue 161](https://github.com/IHK-GfI/lux-components/issues/161)
- **lux-dialog**: Darstellungsfehler in Safari behoben. [Issue 163](https://github.com/IHK-GfI/lux-components/issues/163)

# Version 11.9.0
## New
- **allgemein**: LUX-Theme [11.11.0](https://github.com/IHK-GfI/lux-components-theme/releases/tag/11.11.0) integriert.
- **allgemein**: Die Font Awesome- und Material-Icons sollen mit der App ausgeliefert werden können. [Issue 159](https://github.com/IHK-GfI/lux-components/issues/159)

## Bug Fixes
- **lux-stepper-large**: Zurück Button im "neuen Stepper" ohne Funktion. [Issue 157](https://github.com/IHK-GfI/lux-components/issues/157)

# Version 11.8.0
## New
- **allgemein**: Sicherheitsupdates eingespielt.
- **allgemein**: LUX-Theme [11.10.0](https://github.com/IHK-GfI/lux-components-theme/releases/tag/11.10.0) integriert.
- **lux-button**: Buttons können jetzt das Icon auch rechts vom Label anzeigen. [Issue 156](https://github.com/IHK-GfI/lux-components/issues/156)
- **lux-stepper-large**: Neuer Stepper für viele Schritte mit Veto-Funktion. [Issue 156](https://github.com/IHK-GfI/lux-components/issues/156)

# Version 11.7.0
## New
- **allgemein**: Sicherheitsupdates eingespielt.
- **lux-autocomplete**: Prefix und Suffix hinzugefügt. [Issue 152](https://github.com/IHK-GfI/lux-components/issues/152)

## Bug Fixes
- **lux-filter-form**: Lux-Layout lässt sich nicht in Lux-Filter verwenden. [Issue 153](https://github.com/IHK-GfI/lux-components/issues/153)

# Version 11.6.0
## New
- **allgemein**: LUX-Theme [11.8.0](https://github.com/IHK-GfI/lux-components-theme/releases/tag/11.8.0) integriert.
- **lux-tabs**: Das Verwenden von Custom-Icons ermöglichen. [Issue 139](https://github.com/IHK-GfI/lux-components/issues/139)
- **lux-chips**: Nach Selektion eines Chips erscheint keine Autocomplete Liste beim erneuten Mouse-Klick. [Issue 142](https://github.com/IHK-GfI/lux-components/issues/142)
- **lux-radio**: Label der vertikalen Radiobuttons brechen nicht um. [Issue 145](https://github.com/IHK-GfI/lux-components/issues/145)
- **lux-filter-form**: Filtern mit Shift + Eingabetaste starten. [Issue 147](https://github.com/IHK-GfI/lux-components/issues/147)
- **lux-filter-form**: LUX-Datetimepicker im LUX-Filterform ergänzen. [Issue 149](https://github.com/IHK-GfI/lux-components/issues/149)

# Version 11.5.0
## New
- **allgemein**: LUX-Theme [11.7.1](https://github.com/IHK-GfI/lux-components-theme/releases/tag/11.7.0) integriert. [Issue 138](https://github.com/IHK-GfI/lux-components/issues/138)
- **lux-input**: Neue Anzeige eines Character-Counters, bei gesetzter luxMaxLength. [Issue 134](https://github.com/IHK-GfI/lux-components/issues/134)
- **lux-textarea**: Neue Anzeige eines Character-Counters, bei gesetzter luxMaxLength. [Issue 134](https://github.com/IHK-GfI/lux-components/issues/134)

## Bug Fixes
- **lux-table**: Selektion zurücksetzen bei neuen Daten. [Issue 136](https://github.com/IHK-GfI/lux-components/issues/136)
- **lux-file-list**: Zeigt "..." an, obwohl ausreichend Platz vorhanden ist. [Issue 128](https://github.com/IHK-GfI/lux-components/issues/128)
- **lux-form-components**: Die Funktion "luxErrorCallback" wird aufgerufen, obwohl die Eingabe korrigiert wurde. [Issue 129](https://github.com/IHK-GfI/lux-components/issues/129)

# Version 11.4.0
## New
- **lux-table**: Neue Property "luxMultiSelectOnlyCheckboxClick" für Tabellen mit aktiver Selektion. [Issue 126](https://github.com/IHK-GfI/lux-components/issues/126)
- **lux-table**: Neue Property "luxPagerDisabled" eingeführt. [Issue 126](https://github.com/IHK-GfI/lux-components/issues/126)
- **lux-table**: Neue Property "luxPagerTooltip" eingeführt. [Issue 126](https://github.com/IHK-GfI/lux-components/issues/126)

## Bug Fixes
- **lux-table**: Filtereingaben setzen beim serverseitigen Blättern die Seite nicht zurück. [Issue 122](https://github.com/IHK-GfI/lux-components/issues/122)
- **lux-chips**: Generierte Label-Id und Verknüpfung zum Input-Feld. [Issue 120](https://github.com/IHK-GfI/lux-components/issues/120)

# Version 11.3.0
## New
- **allgemein**: LUX-Theme [11.5.0](https://github.com/IHK-GfI/lux-components-theme/releases/tag/11.5.0) hinzugefügt. [Commit 98f5863](https://github.com/IHK-GfI/lux-components/commit/98f5863032bf030bf7c20f85d49b6d027fcfc1d3)
- **lux-datetimepicker**: Neuer Datepicker inklusive Uhrzeit. [Issue 106](https://github.com/IHK-GfI/lux-components/issues/106)
- **lux-datepicker**: Datepicker soll Datum auch ohne Sonderzeichen erkennen können. [Issue 115](https://github.com/IHK-GfI/lux-components/issues/115)
- **lux-link**: Link soll wie ein üblicher Weblink agieren. [Issue 117](https://github.com/IHK-GfI/lux-components/issues/117)

## Bug Fixes
- **allgemein**: Rechtschreibfehler behoben. [Commit d6ca307](https://github.com/IHK-GfI/lux-components/commit/d6ca307cea2b3e4bba4df5fdb8202ce4b142f0c0)
- **lux-button**: Unterschiedliche Buttongrößen in lux-card-actions. [Issue 114](https://github.com/IHK-GfI/lux-components/issues/114)

# Version 11.2.0
## New
- **allgemein**: Abhängigkeiten aktualisiert. [Commit c39b83b](https://github.com/IHK-GfI/lux-components/commit/c39b83be341cd73f6bc604392eaa9689f7ac282b)
- **lux-file-list**: Rückgabeobjekt bei Einzelupload ist kein Array. [Issue 104](https://github.com/IHK-GfI/lux-components/issues/104)
- **lux-radio**: Einzelne Optionen im lux-radio deaktivieren. [Issue 105](https://github.com/IHK-GfI/lux-components/issues/105)
- **lux-filter-form**: Buttonfarben sollten angepasst werden können. [Issue 107](https://github.com/IHK-GfI/lux-components/issues/107)

## Bug Fixes
- **lux-chips**: lux-chip mit Autocomplete führt beim Löschen des letzten Chips zum Fehler. [Issue 103](https://github.com/IHK-GfI/lux-components/issues/103)
- **lux-stepper**: *ngIf lässt Icon verschwinden. [Issue 110](https://github.com/IHK-GfI/lux-components/issues/110)

# Version 11.1.1
## Bug Fixes
- **lux-app-footer**: Buttons werden in der falschen Reihenfolge angezeigt. [Issue 101](https://github.com/IHK-GfI/lux-components/issues/101)

# Version 11.1.0
## New
- **allgemein**: LUX-Theme [11.3.0](https://github.com/IHK-GfI/lux-components-theme/releases/tag/11.3.0) hinzugefügt. [Commit fbf0ddd](https://github.com/IHK-GfI/lux-components/commit/fbf0ddd3c4fac2439d7063d1413d33da4de0633e)
- **allgemein**: Dependabot Alert: Abhängigkeit "marked" aktualisieren. [Issue 96](https://github.com/IHK-GfI/lux-components/issues/96)
- **lux-file-input**: Erweiterung um individuelle Buttons. [Issue 85](https://github.com/IHK-GfI/lux-components/issues/85)
- **lux-file-list**: Erweiterung um individuelle Buttons. [Issue 85](https://github.com/IHK-GfI/lux-components/issues/85)
- **lux-menu**: Über luxPrio kann die Anzeigereihenfolge beeinflusst werden. [Issue 85](https://github.com/IHK-GfI/lux-components/issues/85)

## Bug Fixes
- **lux-autocomplete**: Im Strict-Modus ist bei falscher Eingabe das Formular kurzzeitig valide. [Issue 98](https://github.com/IHK-GfI/lux-components/issues/98)

# Version 11.0.1
## New
- **allgemein**: Abhängigkeiten aktualisiert.

## Bug Fixes
- **lux-autocomplete**: Event "luxValueChange" wird doppelt getriggert. [Issue 90](https://github.com/IHK-GfI/lux-components/issues/90)
- **lux-autocomplete**: Beim Nachladen von Optionen werden nicht die aktuellsten Auswahloptionen dargestellt. [Issue 89](https://github.com/IHK-GfI/lux-components/issues/89)
- **lux-table**: Tooltipps werden nur angezeigt, wenn der Header sortierbar ist. [Issue 88](https://github.com/IHK-GfI/lux-components/issues/88)
- **lux-filter-form**: Die Filtermethode wird trotz Validierungsfehler aufgerufen. [Issue 94](https://github.com/IHK-GfI/lux-components/issues/94)

# Version 11.0.0
## New
- **allgemein**: Update auf Angular 11
- **lux-badge-notification**: Optik verbessert. [Issue 43](https://github.com/IHK-GfI/lux-components/issues/43)
- **lux-button**: Doppelklick unterbinden [Issue 52](https://github.com/IHK-GfI/lux-components/issues/52)

# Version 10.8.2
## Bug Fixes
- **lux-select**: "luxPickValue"-Funktion wird zu häufig aufgerufen [Issue 86](https://github.com/IHK-GfI/lux-components/issues/86)

# Version 10.8.1
## Bug Fixes
- **lux-filter**: LUX-Filter soll keine doppelten Namen mehr akzeptieren [Issue 83](https://github.com/IHK-GfI/lux-components/issues/83)
- **lux-filter**: LUX-Filterdialog löscht den falschen Filter [Issue 81](https://github.com/IHK-GfI/lux-components/issues/81)

# Version 10.8.0
## New
- **lux-table**: Reload bei einer Table mit serverseitigen Paging möglich [Issue 79](https://github.com/IHK-GfI/lux-components/issues/79)

# Version 10.7.0
## New
- **allgemein**: Sicherheitsupdates eingespielt.
- **lux-autocomplete**: Optionpanelbreite kann über "luxPanelWidth" angepasst werden [Issue 77](https://github.com/IHK-GfI/lux-components/issues/77)

# Version 10.6.0
## New
- **allgemein**: Dependabot-Konfiguration hinzufügen [Issue 53](https://github.com/IHK-GfI/lux-components/issues/53)
- **lux‐file‐input**: Anpassbares Verhalten bei Validierung im lux‐file‐input gewünscht [Issue 50](https://github.com/IHK-GfI/lux-components/issues/50)
- **lux-card**: Überschriften-Tags (h1,h2,...) sollen individuell vergeben werden können [Issue 49](https://github.com/IHK-GfI/lux-components/issues/49)
- **lux-stepper**: Neue Output-Events "luxCheckValidation" und "luxStepClicked" einführen [Issue 57](https://github.com/IHK-GfI/lux-components/issues/57)

## Bug Fixes
- **allgemein**: Sicherheitsupdate - Dependabot CVE-2020-26870 [Issue 54](https://github.com/IHK-GfI/lux-components/issues/54)
- **lux-master-detail**: Master-Detail-Header wächst nicht korrekt mit [Issue 59](https://github.com/IHK-GfI/lux-components/issues/59)

# Version 10.5.0
## New
- **lux-filter-form**: Unterstützung für Lookup-Komponenten. [Issue 46](https://github.com/IHK-GfI/lux-components/issues/46)

## Bug Fixes
- **lux-dialog**: Buttons sind auf kleinen Bildschirmen im Querformat unerreichbar. [Issue 47](https://github.com/IHK-GfI/lux-components/issues/47)

# Version 10.4.0
## New
- **allgemein**: UX und Barrierefreiheit: Focus (Outline) für alle Komponenten vereinheitlicht. 
- **allgemein**: UX und Barrierefreiheit: Kontrast der Themefarben für alle Komponenten angepasst.
- **allgemein**: UX und Barrierefreiheit: Demoapp für Buttons, Badges, Message-Boxes,...) angepasst.
- **allgemein**: UX und Barrierefreiheit: Landmarks (z.B. Header, Footer, Navigation, Main,...) hinzugefügt. 
- **allgemein**: UX und Barrierefreiheit: Überschriftenstruktur (h1..h6) angepasst. 
- **lux-master-detail**: UX und Barrierefreiheit: Header und Footer umgestaltet.  
- **lux-tile**: UX und Barrierefreiheit: Mouseover hinzugefügt
- **lux-tooltip**: UX und Barrierefreiheit: lux-tooltips schließen sich beim Drücken der ESC-Taste
- **lux-side-nav**: UX und Barrierefreiheit: Appmenü angepasst
- **lux-message-box**: UX und Barrierefreiheit: Meldungen werden vom Screenreader vorgelesen
- **lux-file-preview**: UX und Barrierefreiheit: Initialen Focus auf den ersten Button gesetzt.
- **lux-app-header**: UX und Barrierefreiheit: Neue Aria-Attribute für das Menü, Icon, Image,... hinzugefügt.
- **lux-app-content**: UX und Barrierefreiheit: Neues Attribut "luxAriaRoleMainLabel" hinzugefügt.
- **lux-app-footer**: UX und Barrierefreiheit: Neues Attribut "luxAriaRoleFooterLabel" hinzugefügt.

# Version 10.3.0
## New
- **lux-app-footer**: Buttons können jetzt Tooltips anzeigen. [Issue 44](https://github.com/IHK-GfI/lux-components/issues/44)
- **lux-filter-form**: Allgemeine Filterkomponente für Master-Detail-Ansichten, Tabellen, Listen,... erstellt. [Issue 29](https://github.com/IHK-GfI/lux-components/issues/29)

# Version 10.2.0
## New
- **allgemein**: Sicherheitsupdates eingespielt.
- **lux-autocomplete**: Property "luxFilterFn" hinzugefügt. [Issue 40](https://github.com/IHK-GfI/lux-components/issues/40)

# Version 10.1.0
## New
- **allgemein**: Alle Formularkomponenten (z.B. lux-input, lux-toggle,...) haben das neue Property "luxHintShowOnlyOnFocus" erhalten. [Issue 38](https://github.com/IHK-GfI/lux-components/issues/38)

# Version 10.0.0
## New
- **allgemein**: Update auf Angular 10.

# Version 1.9.5
## New
- **allgemein**: Update auf die aktuellste 9er Angular-Version inklusive Sicherheitsupdates. 
- **lux-autocomplete**: Neue Features "luxPickValue" für lux‐autocomplete hinzugefügt. [Issue 26](https://github.com/IHK-GfI/lux-components/issues/26)

## Bug Fixes
- **lux-datepicker**: luxMaxDate greift bei 5- oder 6-stelligen Jahreszahlen nicht und luxValueChange empfängt event. [Issue 28](https://github.com/IHK-GfI/lux-components/issues/28)

# Version 1.9.4
## New
- **Demo**: Demoseiten für den Datenschutz und Impressum hinzugefügt. [Issue 32](https://github.com/IHK-GfI/lux-components/issues/32)

## Bug Fixes
- **lux-textarea**: Höhenberechnung von luxMaxRows fehlerhaft. [Issue 25](https://github.com/IHK-GfI/lux-components/issues/25)
- **lux-checkbox**: Die Checkbox unterstützt jetzt lange mehrzeilige Labels. [Issue 27](https://github.com/IHK-GfI/lux-components/issues/27)
- **lux-toggle**: Das Toggle unterstützt jetzt lange mehrzeilige Labels. [Issue 27](https://github.com/IHK-GfI/lux-components/issues/27)

# Version 1.9.3
## New
- **lux-layout**: Zeilenbasiertes Layout für Karten und Formulare hinzugefügt. [Issue 18](https://github.com/IHK-GfI/lux-components/issues/18)
- **lux-layout-form-row**: Zeilenbasiertes Layout für Formulare hinzugefügt. [Issue 18](https://github.com/IHK-GfI/lux-components/issues/18)
- **lux-layout-card-row**: Zeilenbasiertes Layout für Karten hinzugefügt. [Issue 18](https://github.com/IHK-GfI/lux-components/issues/18)
- **lux-app-header**: Click-Event, welches beim KLick auf den App-Titel, das App-Icon (falls vorhanden) oder das App-Image (falls vorhanden) ausgelöst wird, hinzugefügt. [Issue 17](https://github.com/IHK-GfI/lux-components/issues/17)

## Bug Fixes
- **lux-datepicker**: Datumänderung per Tasteneingabe im IE nicht möglich. [Issue 13](https://github.com/IHK-GfI/lux-components/issues/13)
- **lux-progress**: Überflüssiges Padding entfernt. [Issue 14](https://github.com/IHK-GfI/lux-components/issues/14)
- **lux-select**: Option nicht immer direkt sichtbar. [Issue 22](https://github.com/IHK-GfI/lux-components/issues/22)
- **lux-datepicker**: Datepickerpopup zeigt immer Sonntag als ersten Wochentag an. [Issue 20](https://github.com/IHK-GfI/lux-components/issues/20)

# Version 1.9.2
## New
- **lux-app-header**: Im Header kann jetzt auch ein Bild angegeben werden. [Issue 11](https://github.com/IHK-GfI/lux-components/issues/11)

# Version 1.9.1
## New
- **lux-html**: Component zur Anzeige HTML-Fragmenten hinzugefügt. [Issue 6](https://github.com/IHK-GfI/lux-components/issues/6)
- **lux-markdown**: Component zur Anzeige von Markdown-Fragmenten hinzugefügt. [Issue 6](https://github.com/IHK-GfI/lux-components/issues/6)
 
## Features
- **lux-table**: Die LuxTable stellt jetzt den Filter als LuxInputComponent zur Verfügung. [Issue 8](https://github.com/IHK-GfI/lux-components/issues/8)
- **lux-table**: Der Defaultwert für das Autocomplete-Attribut des Tabellenfilters ist jetzt "off". [Issue 8](https://github.com/IHK-GfI/lux-components/issues/8)
- **lux-input**: Das Attribut "luxName" hinzugefügt. [Issue 8](https://github.com/IHK-GfI/lux-components/issues/8)
- **lux-textarea**: Das Attribut "luxName" hinzugefügt. [Issue 8](https://github.com/IHK-GfI/lux-components/issues/8)

# Version 1.9.0
## Features
- **allgemein**: Umstellung auf Angular 9

# Version 1.8.7
## Features
- **lux-app-footer**: Es werden nur 5 Buttons in der Footerleiste angezeigt. [Issue 1](https://github.com/IHK-GfI/lux-components/issues/1)
- **lux-lookup-combobox**: Defaultmäßig wird ein zusätzlicher leerer Eintrag dargestellt. [Issue 2](https://github.com/IHK-GfI/lux-components/issues/2)
- **lux-error-page**: Der Button wird nur noch angezeigt, wenn eine URL und ein Label hinterlegt sind. [Issue 5](https://github.com/IHK-GfI/lux-components/issues/5)

# Version 1.8.6
## Features
- **allgemein**: Alle Confluence-Verweise auf Github umgestellt.
- **allgemein**: README.md erweitert.

# Version 1.8.5
## Features
- **allgemein**: Die LUX-Components können jetzt über https://www.npmjs.com bezogen werden.
  Die Installationshinweise in der Datei "README.md" wurden entsprechend angepasst.

# Version 1.8.4
## Features
- **allgemein**: Die LUX-Components sind jetzt frei auf Github verfügbar.
