import { Anwendung, Empfaenger, Ihk, Nachricht } from '../../../modules/lux-nachricht/lux-nachricht-model/lux-nachricht-model';

export const mockIhkResult: Ihk[] = [
    {
        id: 1,
        ihkNr: 118,
        name: 'IHK zu Dortmund'
    },
    {
        id: 2,
        ihkNr: 142,
        name: 'IHK zu Köln'
    },
    {
        id: 3,
        ihkNr: 131,
        name: 'IHK zu Düsseldorf'
    }
];

export const mockNachrichtResult: Nachricht[] = [
    {
        id: 1,
        betreff: 'Hello World',
        message: 'Das ist eine Beispielnachricht. Schau doch mal bei der <a href="https://www.ihk-gfi.de">IHK-Gfi</a> vorbei.',
        validFrom: new Date(2020, 11, 17),
        validTo: new Date(2022, 1, 12),
        erneutAnzeigen: false,
        anwendung: new Anwendung('Anwendung A'),
        ihk: [mockIhkResult[0]],
        empfaenger: [new Empfaenger('User A')]
    },
    {
        id: 2,
        betreff: 'Lorem Ipsum',
        message: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        validFrom: new Date(2019, 6, 15),
        validTo: new Date(2020, 2, 21),
        erneutAnzeigen: false,
        anwendung: new Anwendung('Anwendung A'),
        ihk: [mockIhkResult[0], mockIhkResult[1]],
        empfaenger: [new Empfaenger('User A'), new Empfaenger('User B')]
    },
    {
        id: 3,
        betreff: 'Small-Letter',
        message: 'Dieser Text hat eigentlich gar keinen wirklichen Inhalt. Er dient lediglich als Platzhalter um mal zu zeigen, wie diese Stelle der Seite aussieht, wenn ein paar Zeilen vorhanden sind.',
        validFrom: new Date(2020, 12, 24),
        validTo: new Date(2021, 5, 10),
        erneutAnzeigen: false,
        anwendung: new Anwendung('Anwendung A'),
        ihk: [mockIhkResult[0], mockIhkResult[1], mockIhkResult[2]],
        empfaenger: [new Empfaenger('User C')]
    },
    {
        id: 4,
        betreff: 'Ich bin ein kleiner Blindtext.',
        message: 'Hallo. Ich bin ein kleiner Blindtext. Und zwar schon so lange ich denken kann. Es war nicht leicht zu verstehen, was es bedeutet, ein blinder Text zu sein: Man ergibt keinen Sinn. Wirklich keinen Sinn.',
        validFrom: new Date(2020, 11, 11),
        validTo: new Date(2022, 1, 12),
        erneutAnzeigen: false,
        anwendung: new Anwendung('Anwendung B'),
        ihk: [mockIhkResult[2]],
        empfaenger: [new Empfaenger('User D')]
    },
];

