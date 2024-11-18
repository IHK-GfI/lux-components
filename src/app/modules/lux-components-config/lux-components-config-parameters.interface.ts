/**
 * Interface, welches die Konfigurationsoptionen für die LuxComponents bereitstellt.
 */
export interface LuxComponentsConfigParameters {
  /**
   * Bestimmt den Basepfad der Icons.
   */
  iconBasePath?: string;

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
   * Bestimmt die URL des Lookup-Services für die TenantLogoComponents.
   */
  tenantLogoLookupServiceUrl?: string;

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
   * Flag, um die Animationen von LUX-Cards zu aktivieren bzw. zu deaktivieren
   */
  cardExpansionAnimationActive?: boolean;

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

  viewConfiguration?: {
    centeredView?: boolean;
    centeredWidth?: string;
  };

  appFooter?: {
    fixedDesktop?: boolean;
    fixedMobile?: boolean;
  };
}
