/**
 * Interface, welches die Struktur einer einzelnen Message für die LuxMessageBox definiert.
 */
import { LuxMessageBoxColor } from '../../../lux-util/lux-colors.enum';

export interface ILuxMessage {
  text: string;
  iconName?: string;
  color?: LuxMessageBoxColor;
}
