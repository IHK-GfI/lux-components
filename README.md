# LUX-Components
Die LUX-Components bestehen aus einer Sammlung von "Angular Material"-Komponenten, die speziell für den [JAST-Stack (Java Angular SQL Tomcat)](https://confluence.gfi.ihk.de/x/1ADqKQ) entwickelt wurden. Es gibt grundlegende Komponenten wie z.B. lux-input, lux-checkbox, etc. und komplexere Komponenten wie z.B. lux-master-detail oder lux-stepper. Alle LUX-Components sind einfach zu verwenden und verwenden das LUX-Theme, um eine App-übergreifende User Experience zu gewährleisten.    

Aus technischer Sicht handelt es sich bei den LUX-Components um eine Angular-Klassenbibliothek, 
die via NPM (siehe Abschnitt Install) in das eigene Projekt eingebunden wird. 

## Autoren
- Thomas Dickhut (IHK-GfI)
- Dimitrij Ron (S&N)

## Changelog
Die Änderungen weden in der Datei "CHANGELOG.md" dokumentiert.

## Install
In der Datei '.npmrc' im Benutzer- oder Projektverzeichnis die folgende Zeile ergänzen: 

`@ihk-gfi:registry=https://npm.pkg.github.com/`

Dann muss man sich noch mit der Github-Registry verbinden. 

### Anmeldung über Github-Token

Der Github-Token wird in der Datei ".npmrc" eingetragen. Man ersetze XXX durch seinen eigenen Github-Token.

`//npm.pkg.github.com/:_authToken=XXX`

### Anmeldung über "npm login"
`npm login --registry=https://npm.pkg.github.com`

### Aktuelle Version installieren: 

`npm install @ihk-gfi/lux-components --save`

### Spezielle Version installieren: 

`npm install @ihk-gfi/lux-components@1.8.4 --save`
