import {
  Anwendung,
  Empfaenger,
  Ihk,
  Nachricht
} from '../../../modules/lux-nachricht/lux-nachricht-model/lux-nachricht-model';

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
    betreff: 'GfI',
    message:
      'Das ist eine Beispielnachricht. Schau doch mal bei der <a href="https://www.ihk-gfi.de">IHK-Gfi</a> vorbei.',
    validFrom: new Date(2020, 11, 17, 0, 0),
    validTo: new Date(2022, 1, 12, 23, 59),
    erneutAnzeigen: false,
    anwendung: new Anwendung('Anwendung A'),
    ihk: [mockIhkResult[0]],
    empfaenger: [new Empfaenger('User A')]
  },
  {
    id: 2,
    betreff: 'Lorem Ipsum',
    message:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    validFrom: new Date(2019, 6, 15, 0, 0),
    validTo: new Date(2020, 2, 21, 23, 59),
    erneutAnzeigen: false,
    anwendung: new Anwendung('Anwendung A'),
    ihk: [mockIhkResult[0], mockIhkResult[1]],
    empfaenger: [new Empfaenger('User A'), new Empfaenger('User B')]
  },
  {
    id: 3,
    betreff: 'Duis autem vel eum iriure',
    message:
      'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. ',
    validFrom: new Date(2020, 12, 24, 0, 0),
    validTo: new Date(2021, 5, 10, 23, 59),
    erneutAnzeigen: false,
    anwendung: new Anwendung('Anwendung A'),
    ihk: [mockIhkResult[0], mockIhkResult[1], mockIhkResult[2]],
    empfaenger: [new Empfaenger('User C')]
  },
  {
    id: 4,
    betreff: 'Ut wisi enim ad minim veniam',
    message:
      'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. ',
    validFrom: new Date(2020, 11, 11, 0, 0),
    validTo: new Date(2022, 1, 12, 23, 59),
    erneutAnzeigen: false,
    anwendung: new Anwendung('Anwendung B'),
    ihk: [mockIhkResult[2]],
    empfaenger: [new Empfaenger('User D')]
  },
  {
    id: 5,
    betreff: 'Nam liber tempor cum soluta nobis',
    message:
      'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. ',
    validFrom: new Date(2020, 11, 11, 0, 0),
    validTo: new Date(2024, 4, 16, 23, 59),
    erneutAnzeigen: false,
    anwendung: new Anwendung('Anwendung B'),
    ihk: [mockIhkResult[2]],
    empfaenger: [new Empfaenger('User D')]
  },
  {
    id: 6,
    betreff: 'At vero eos et accusam',
    message:
      'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
    validFrom: new Date(2020, 11, 11, 0, 0),
    validTo: new Date(2027, 5, 30, 23, 59),
    erneutAnzeigen: false,
    anwendung: new Anwendung('Anwendung B'),
    ihk: [mockIhkResult[2]],
    empfaenger: [new Empfaenger('User D')]
  },
  {
    id: 7,
    betreff: 'Consetetur sadipscing elitr',
    message:
      'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    validFrom: new Date(2020, 11, 11, 0, 0),
    validTo: new Date(2023, 0, 1, 23, 59),
    erneutAnzeigen: false,
    anwendung: new Anwendung('Anwendung B'),
    ihk: [mockIhkResult[2]],
    empfaenger: [new Empfaenger('User D')]
  },
  {
    id: 8,
    betreff: 'Sed diam nonumy eirmod tempor',
    message:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    validFrom: new Date(2020, 11, 11, 0, 0),
    validTo: new Date(2024, 2, 15, 23, 59),
    erneutAnzeigen: false,
    anwendung: new Anwendung('Anwendung B'),
    ihk: [mockIhkResult[2]],
    empfaenger: [new Empfaenger('User D')]
  }
];
