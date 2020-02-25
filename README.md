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
Die Änderungen weden in der Datei [CHANGELOG.md](https://github.com/IHK-GfI/lux-components/blob/master/CHANGELOG.md) dokumentiert.

## Eine App auf Basis der LUX-Components erstellen

Stellen Sie zunächst sicher, dass Sie die Node-Version 8 oder höher installiert haben. 
Installieren Sie anschließend die folgenden zwei NPM-Pakte global:

Die aktuellste Version unterstützt die @angular/cli@8. Deswegen wird @angular/cli nicht über 
npm installiert, sondern on-demand via npx aufgerufen. So wird eure bestehende Version nicht 
verändert.

Die Schematics-CLI installieren.
```bash
npm install -g @angular-devkit/schematics-cli
```

Zuerst erzeugt man über die Angular CLI eine neue App.

```bash
npx @angular/cli@8 new my-new-app
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS

cd my-new-app
```
> Es ist wichtig das Projekt mit Routing und SCSS anzulegen!

Im Anschluss installiert man sich den [LUX-Componentsupdater](https://github.com/IHK-GfI/lux-components-update). 

```bash
npm install @ihk-gfi/lux-components-update --save-dev
```

Dann kann man über den LUX-Componentsupdater die LUX-Components seiner App hinzufügen: 

```bash
ng generate @ihk-gfi/lux-components-update:add-lux-components-1.8
```

Jetzt kann die App normal gestartet werden: 

```bash
ng serve
```

Die Dokumentation der LUX-Components befindet sich [hier](https://github.com/IHK-GfI/lux-components/wiki).

## LUX-Components aktualisieren
Wie man seine LUX-Components aktualisiert, steht im [Update Guide](https://github.com/IHK-GfI/lux-components/wiki/update-guide).

## Demo
Die LUX-Components enthalten auch eine Demo.
- LUX-Components via Git runterladen. 
- In das entsprechende Verzeichnis wechseln.
- npm install ausführen.
- ng serve ausführen.
- http://localhost:4200/ öffnen.
- Ausprobieren!
