import { Component } from '@angular/core';
import { ILuxTourHintStepConfig } from 'src/app/modules/lux-tour-hint/lux-tour-hint-model/lux-tour-hint-step-config.interface';
import { LuxTourHintService } from 'src/app/modules/lux-tour-hint/lux-tour-hint.service';

@Component({
  selector: 'tour-hint-example',
  templateUrl: './tour-hint-example.component.html'
})
export class TourHintExampleComponent {
  private complexTourConfigs: ILuxTourHintStepConfig[] = [
    {
      targetId: 'Karte_1',
      data: {
        title: 'Karte 1',
        content:
          "Die lux-tour-hint Komponente kann auch an mehrere Elemente gehangen werden, um dadurch eine 'Tour' zu erstellen. \n\nNormalerweise würden sich die Inhalte der Tour auf die erhobenen Elemente beziehen."
      }
    },

    {
      targetId: 'Input_1',
      data: {
        title: 'Karte 1',
        content: 'Durch die Pfeiltasten oder die Buttons unten kann durch die Steps navigiert werden! Probier es doch mal aus!'
      }
    },

    {
      targetId: 'Input_2_Und_3',
      data: {
        title: 'Karte 1',
        content: 'So lange die lux-tour-hint Komponente geöffnet ist kann kein anderes Element selektiert werden.'
      }
    },

    {
      targetId: 'Karte_1_Aktionen',
      data: {
        title: 'Karte 1',
        content:
          "Wenn bei dem Schließen die Option 'Nicht wieder anzeigen' ausgewählt wurde, wird die Komponente lux-tour-hint bei dem nächsten Mal nicht wieder aufgerufen. Dies wird jedoch nur in dem Browser-Storage abgespeichert. Wenn ein 'don't show again' permanent gespeichert werden soll kann ein listener in die ILuxTourHintOptions beim öffnen mitgegeben werden."
      }
    },

    {
      targetId: 'Karte_1_Aktion_1',
      data: {
        title: 'Karte 1',
        content:
          "Die Komponente soll / kann als art 'Tutorial' verwendet werden, um eventuell neue Funktionen der Applikation vorzustellen."
      }
    },

    {
      targetId: 'Karte_1_Aktion_2',
      data: {
        title: 'Karte 1',
        content:
          "Wenn eine Tour nicht wieder angezeigt wird (durch voherigem Schließen mit der Option 'Nicht wieder anzeigen') und nun doch wieder gezeigt werden soll kann die Methode 'LuxTourHintService.clearDSACacheForConfig' verwendet werden, um den Eintrag im Browser-Storage für diese eine Tour zu löschen."
      }
    },

    {
      targetId: 'Karte_2',
      data: {
        title: '2. Karte',
        content: 'Für weitere Informationen kann in dem GitHub - Wiki nachgeguckt werden.'
      }
    },

    {
      targetId: 'Karte_2_Aktion_1',
      data: {
        title: '2. Karte',
        content: 'Das ist das Ende der Beispiel - Tour, ich hoffe es konnte einen Einblick in den Nutzen dieser Komponente geben.'
      }
    }
  ];

  public singleHintTargetOptions: string[] = [
    'Karte_1',
    'Input_1',
    'Input_2_Und_3',
    'Karte_1_Aktionen',
    'Karte_1_Aktion_1',
    'Karte_1_Aktion_2',
    'Karte_2',
    'Karte_2_Aktion_1'
  ];

  public singleHintTarget = 'Karte_1';
  public singleHintTitle = 'Test Titel';
  public singleHintContent = 'Beschreibung für das Element';
  public singleHintShowDontShowAgain = true;

  public tourShowDontShowAgain = true;

  constructor(private tourService: LuxTourHintService) {}

  public openHint() {
    this.tourService.open(
      {
        targetId: this.singleHintTarget,
        data: {
          title: this.singleHintTitle,
          content: this.singleHintContent
        }
      },
      this.singleHintShowDontShowAgain
    );
  }

  public startTour() {
    this.tourService.open(this.complexTourConfigs, this.tourShowDontShowAgain);
  }

  public clearCaches() {
    this.tourService.clearDSACacheForConfig([
      {
        targetId: this.singleHintTarget,
        data: {
          title: this.singleHintTitle,
          content: this.singleHintContent
        }
      }
    ]);

    this.tourService.clearDSACacheForConfig(this.complexTourConfigs);
  }
}
