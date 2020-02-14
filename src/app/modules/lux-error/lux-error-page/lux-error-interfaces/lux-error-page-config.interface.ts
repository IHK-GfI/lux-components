export interface ILuxErrorPageConfig {
  iconName?: string;
  iconSize?: '1x' | '2x' | '3x' | '4x' | '5x';
  errorText?: string;
  homeRedirectText?: string;
  homeRedirectUrl?: string;
  errorPageUrl?: string;
  skipLocationChange?: boolean;
}
