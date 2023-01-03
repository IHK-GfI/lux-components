# LUX-Components
Die LUX-Components bestehen aus einer Sammlung von "Angular Material"-Komponenten, 
die speziell für den JAST-Stack (Java Angular SQL Tomcat)
entwickelt wurden. Es gibt grundlegende Komponenten wie z.B. lux-input, lux-checkbox, 
etc. und komplexere Komponenten wie z.B. lux-master-detail oder lux-stepper. 
Alle LUX-Components sind einfach zu verwenden und verwenden das LUX-Theme, 
um eine App-übergreifende User Experience zu gewährleisten.    

Aus technischer Sicht handelt es sich bei den LUX-Components um eine 
Angular-Klassenbibliothek, die via NPM in das eigene Projekt eingebunden wird. 

## Autoren
- Thomas Dickhut (IHK-GfI)
- Dimitrij Ron (S&N)

## Changelog
Die Änderungen werden in der Datei [CHANGELOG.md](https://github.com/IHK-GfI/lux-components/blob/master/CHANGELOG.md) dokumentiert.

## Demo
Live-Demo vom Zweig (develop): 
- https://lux-components-develop.gfi.ihk.de

Live-Demo vom Zweig (master): 
- https://lux-components-master.gfi.ihk.de

Die Demo kann auch lokal ausgeführt werden: 
- LUX-Components via Git runterladen. 
- In das entsprechende Verzeichnis wechseln.
- npm install ausführen.
- ng serve ausführen.
- http://localhost:4200/ öffnen.
- Ausprobieren!

## Eine App auf Basis der LUX-Components erstellen

Stellen Sie zunächst sicher, dass Sie die Node-Version 14.x.x oder höher installiert haben. 
Installieren Sie anschließend die folgenden zwei NPM-Pakte global:

Die aktuellste Version unterstützt die @angular/cli@13. Deswegen wird @angular/cli nicht über 
npm installiert, sondern on-demand via npx aufgerufen. So wird eure bestehende Version nicht 
verändert.

Die Schematics-CLI installieren.
```bash
npm install -g @angular-devkit/schematics-cli
```

Zuerst erzeugt man über die Angular CLI eine neue App.

```
npx @angular/cli@14 new my-new-app
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS

cd my-new-app
```
> Es ist wichtig das Projekt mit Routing und SCSS anzulegen!

Im Anschluss installiert man sich den [LUX-Componentsupdater](https://github.com/IHK-GfI/lux-components-update). 

```bash
npm install @ihk-gfi/lux-components-update@14 --save-dev
```

Dann kann man über den LUX-Componentsupdater die LUX-Components seiner App hinzufügen: 

```bash
ng generate @ihk-gfi/lux-components-update:add-lux-components
```

Jetzt kann die App normal gestartet werden: 

```bash
ng serve
```

Die Dokumentation der LUX-Components befindet sich [hier](https://github.com/IHK-GfI/lux-components/wiki).

## LUX-Components aktualisieren
Wie man seine LUX-Components aktualisiert, steht im [Update Guide](https://github.com/IHK-GfI/lux-components/wiki/update-guide).

## Lizenzhinweis - Icons

Über das Github-Projekt [https://github.com/IHK-GfI/lux-components-icons-and-fonts](https://github.com/IHK-GfI/lux-components-icons-and-fonts) können statt der bisherigen Material- oder Font Awesome-Icons nun auch die "neuen" Streamline-Icons mit eingebunden werden, welche speziell für die Nutzung mit dem Theme-authentic ausgewählt wurden.
Die Streamline Icons laufen unter der Lizenz CC-BY 4.0 und der Urheber ist „streamlinehq.com“ ("Streamline Icons Core Line free Copyright © by streamlinehq.com“).
Bezugsquelle: „[Free Core Line – Free Icons Set - 1000 customizable PNGs, SVGs, PDFs (streamlinehq.com)](https://www.streamlinehq.com/icons/streamline-mini-line)“.
Die Lizenz „[CC BY 4.0“ ist zu finden unter „[Streamline Free License | Streamline Help center (intercom.help)](https://intercom.help/streamlinehq/en/articles/5354376-streamline-free-license)“.
Die Icons aus dem o.a. Iconset wurden durch die IHK-GfI mbH nicht verändert. Es wurden jedoch eigene Icons im selben Stil erstellt und unserer Sammlung unter gleicher Lizenz hinzugefügt.

>**WICHTIGER HINWEIS**: In jedem Projekt, welches auf Basis der LUX-Components und ggf. unter Nutzung der Streamline-Icons und oder der Schriftarten von Drittanbietern erstellt und publiziert wird, muss ein für den Endanwender sichtbarer Hinweis auf genutzte Quellen (z.B. Entwicklungsplattform, Schriften, Icons, etc.) enthalten und auf der App-Oberfläche sichtbar sein.
