# LUX-Components

Die LUX-Components bestehen aus einer Sammlung von "Angular Material"-Komponenten, die speziell für den JAST-Stack (Java Angular SQL Tomcat)
entwickelt wurden. Es gibt grundlegende Komponenten wie z.B. lux-input, lux-checkbox, etc. und komplexere Komponenten wie z.B. lux-master-detail oder lux-stepper.
Alle LUX-Components sind einfach zu verwenden und und können mit den LUX-Themes "blue", "green" oder "authentic" eingesetzt werden, um eine App-übergreifende User Experience zu gewährleisten.

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
- _npm install_ ausführen.
- _npm run start_ ausführen.
- http://localhost:4200/ öffnen.
- Ausprobieren!

## Eine App auf Basis der LUX-Components erstellen

Stellen Sie zunächst sicher, dass Sie die Node-Version 16.x.x oder höher installiert haben.
Installieren Sie anschließend die folgenden zwei NPM-Pakte global:

Die aktuellste Version unterstützt die @angular/cli@14. Deswegen wird @angular/cli nicht über npm installiert, sondern on-demand via npx aufgerufen. So wird eure bestehende Version nicht verändert.

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

# Lizenzhinweis - Icons

Über das Github-Projekt https://github.com/IHK-GfI/lux-components-icons-and-fonts können statt der bisherigen Material- oder Font Awesome-Icons nun auch die "neuen" Streamline-Icons mit eingebunden werden, welche speziell für die Nutzung mit dem Theme-Authentic ausgewählt wurden.
Ab der Version 15.0.0 werden ausschließlich nur noch die Streamline-Icons verwendet, die über das o.g. Projekt eingebunden werden.
Die Streamline Icons laufen unter der Lizenz CC-BY 4.0 und der Urheber ist „streamlinehq.com“ ("Streamline Icons Core Line free Copyright © by streamlinehq.com“).
Bezugsquelle: „[Free Core Line – Free Icons Set - 1000 customizable PNGs, SVGs, PDFs (streamlinehq.com)](https://www.streamlinehq.com/icons/streamline-mini-line)“.
Die Lizenz „[CC BY 4.0“ ist zu finden unter „[Streamline Free License | Streamline Help center (intercom.help)](https://intercom.help/streamlinehq/en/articles/5354376-streamline-free-license)“.
Die Icons aus dem o.a. Iconset wurden durch die IHK-GfI mbH nicht verändert. Zusätzlich wurden eigene Icons im selben Stil erstellt und unserer Sammlung unter gleicher Lizenz hinzugefügt.

> **Note:** Bei der Entwicklung einer Applikation auf Basis der LUX-Components sind die verwendeten Icon-Sets entsprechend zu erwähnen und der Lizenztext ist individuell anzupasen.

# Lizenzhinweis - Fonts

Über das Github-Projekt https://github.com/IHK-GfI/lux-components-icons-and-fonts werden statt der bisher vorgeschlagenen Fontfamilien wie z.B. Korb, Roboo, etc.) nun auch die Schriftarten "Source Sans Pro" designed by Paul D. Hunt (Lizensiert unter SIL 1.1 Open Font License) sowie "BloggerSans" created by Sergiy Tkachenko (Lizensiert unter Creative Commons 4.0) verwendet werden, welche speziell für die Nutzung mit dem Theme-authentic ausgewählt wurden.

> **Note:** Bei der Entwicklung einer Applikation auf Basis der LUX-Components sowie unter Nutzung der Schriftart "Source Sans Pro" ist zwingend die Lizenzdatei "SIL Open Font License V1.1.md" in die GUI der Applikation einzubinden. Bei Nutzung der Schriftart "BloggerSans" ist ein Verweis auf die Lizenz unter https://www.fontsquirrel.com/license/blogger-sans erforderlich. Bei jeder Anwendung ist der Lizenzhinweis zu den tatsächlich verwendeten Schriften und Icons individuell anzupassen!
