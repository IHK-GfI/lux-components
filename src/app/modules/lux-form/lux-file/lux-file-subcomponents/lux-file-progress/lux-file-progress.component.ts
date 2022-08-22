import { Component, Input } from '@angular/core';
import { LuxProgressModeType } from '../../../../lux-common/lux-progress/lux-progress.component';

/**
 * Diese Component ist nur eine leichte Ergänzung zu LuxProgress und wird nicht vom Modul exportiert.
 *
 * Leider musste das CSS kopiert werden, da wir hier nicht direkt LuxProgress nutzen können.
 * (Stand: 12.06.2019, LuxProgress ist Teil des LuxCommonModule und sorgt für Cycle-Dependencies) - DRon
 */
@Component({
  selector: 'lux-file-progress',
  templateUrl: './lux-file-progress.component.html',
  styleUrls: ['./lux-file-progress.component.scss']
})
export class LuxFileProgressComponent {
  @Input() luxProgress = 0;
  @Input() luxMode: LuxProgressModeType = 'indeterminate';

  constructor() {}
}
