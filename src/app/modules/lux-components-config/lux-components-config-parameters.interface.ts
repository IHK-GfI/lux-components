/**
 * Interface, welches die Konfigurationsoptionen für die LuxComponents bereitstellt.
 */
import { LuxLayoutRowGapConfig } from '../lux-layout/lux-layout/base/lux-layout-row-gap-config';
import { LuxLayoutRowMarginConfig } from '../lux-layout/lux-layout/base/lux-layout-row-margin-config';

export interface LuxComponentsConfigParameters {
  /**
   * Bestimmt, ob die LuxTagIds (und dazugehörende) Warnungen generiert werden.
   */
  generateLuxTagIds?: boolean;

  /**
   * Bestimmt, ob die Ausgaben des LuxConsoleService in die Developer-Console des Browsers geschrieben werden.
   */
  displayLuxConsoleLogs?: boolean;

  /**
   * Bestimmt die URL des Lookup-Services für die LookupComponents.
   */
  lookupServiceUrl?: string;

  /**
   * Bestimmt, ob die Labels für LuxButtons, LuxLinks, LuxMenuItems, LuxStepper, LuxSideNavItem und LuxTabs
   * immer Uppercase dargestellt werden.
   */
  labelConfiguration?: {
    /**
     * Alle Labels Uppercase darstellen
     */
    allUppercase: boolean;

    /**
     * Ausnahmen eintragen (die Sektoren in das Array eintragen; z.B. lux-link)
     */
    notAppliedTo: string[];
  };

  /**
   * Flag, um die Ausklappanimationen von LuxCards zu aktivieren bzw. zu  deaktivieren
   */
  cardExpansionAnimationActive?: boolean;

  /**
   * Flag, welcher festlegt ob bei der Nutzung von Input-/Output-Bindings in ReactiveForm-Components Warnung in der
   * Console ausgegeben werden sollen.
   */
  displayBindingDebugHint?: boolean;

  /**
   * Bestimmt die globalen Einstellungen für die Animationen der LuxRipples.
   */
  rippleConfiguration?: {
    enterDuration: number;
    exitDuration: number;
    color?: string;
    centered?: boolean;
    radius?: number;
    disabled?: boolean;
    unbounded?: boolean;
  };

  /**
   * Bestimmt die globalen Einstellungen für die Buttons.
   */
  buttonConfiguration?: {
    throttleTimeMs?: number;
  };

  /**
   * Bestimmt die globalen Einstellungen für das Layout.
   */
  layout?: {
    cardRow?: {
      warpAt?: string;
      marginConfig?: LuxLayoutRowMarginConfig;
      gapConfig?: LuxLayoutRowGapConfig;
    };
    formRow?: {
      warpAt?: string;
      marginConfig?: LuxLayoutRowMarginConfig;
      gapConfig?: LuxLayoutRowGapConfig;
    };
  };
}
