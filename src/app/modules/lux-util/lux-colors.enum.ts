/* eslint-disable no-shadow */
// no-shadow meldet fälschlicherweise einen Fehler
/**
 * Enum fuer die moeglichen Background-Farben
 */
export enum LuxBackgroundColorsEnum {
  red = 'red',
  green = 'green',
  purple = 'purple',
  blue = 'blue',
  gray = 'gray',
  orange = 'orange',
  brown = 'brown',
  black = 'black',
  white = 'white'
}

/**
 * Enum fuer die moeglichen Schrift-Farben
 */
export enum LuxFontColorsEnum {
  white = 'white',
  black = 'black'
}

/* eslint-enable no-shadow */
export declare type LuxFgColor = 'white' | 'black';
export declare type LuxBgBaseColor = 'red' | 'green' | 'purple' | 'blue' | 'gray' | 'orange' | 'brown';
export declare type LuxBgAllColor = LuxBgBaseColor | 'black' | 'white';
export declare type LuxBadgeColor = LuxBgBaseColor | 'black';
export declare type LuxIconColor = LuxBgBaseColor | 'black';
export declare type LuxMessageBoxColor = LuxBgBaseColor | 'white';
export declare type LuxProgressColor = LuxBgBaseColor;
export declare type LuxSnackbarColor = LuxBgBaseColor | 'white';

export const LuxBadgeColors: LuxBadgeColor[] = ['red', 'green', 'purple', 'blue', 'gray', 'orange', 'brown', 'black'];
export const LuxIconColors = ['red', 'green', 'purple', 'blue', 'gray', 'orange', 'brown', 'black'];
export const LuxMessageBoxColors = ['red', 'green', 'purple', 'blue', 'gray', 'orange', 'brown', 'white'];
export const LuxProgressColors = ['red', 'green', 'purple', 'blue', 'gray', 'orange', 'brown'];
export const LuxSnackbarColors = ['red', 'green', 'purple', 'blue', 'gray', 'orange', 'brown', 'white'];
