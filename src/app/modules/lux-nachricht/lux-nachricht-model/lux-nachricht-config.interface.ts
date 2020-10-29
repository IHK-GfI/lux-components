/**
 * Kennzeichnet die notwendigen Konfigurationen für das Benarichtigungssystem.
 */
export interface ILuxNachrichtConfig {
  anwendungKuerzel: string;
  ihkNr: number;
  userRole: 'ROLE_IHKAdmin' | 'ROLE_GfIAdmin' | 'ROLE_Benutzer';
  empfaenger: string[];
}
