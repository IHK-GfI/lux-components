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

export const LuxBadgeColors = [
  LuxBackgroundColorsEnum.red,
  LuxBackgroundColorsEnum.green,
  LuxBackgroundColorsEnum.purple,
  LuxBackgroundColorsEnum.blue,
  LuxBackgroundColorsEnum.gray,
  LuxBackgroundColorsEnum.orange,
  LuxBackgroundColorsEnum.brown,
  LuxBackgroundColorsEnum.black
];
export type LuxBadgeColor =
  | LuxBackgroundColorsEnum.red
  | LuxBackgroundColorsEnum.green
  | LuxBackgroundColorsEnum.purple
  | LuxBackgroundColorsEnum.blue
  | LuxBackgroundColorsEnum.gray
  | LuxBackgroundColorsEnum.orange
  | LuxBackgroundColorsEnum.brown
  | LuxBackgroundColorsEnum.black;

export const LuxIconColors = [
  LuxBackgroundColorsEnum.red,
  LuxBackgroundColorsEnum.green,
  LuxBackgroundColorsEnum.purple,
  LuxBackgroundColorsEnum.blue,
  LuxBackgroundColorsEnum.gray,
  LuxBackgroundColorsEnum.orange,
  LuxBackgroundColorsEnum.brown,
  LuxBackgroundColorsEnum.black
];
export type LuxIconColor =
  | LuxBackgroundColorsEnum.red
  | LuxBackgroundColorsEnum.green
  | LuxBackgroundColorsEnum.purple
  | LuxBackgroundColorsEnum.blue
  | LuxBackgroundColorsEnum.gray
  | LuxBackgroundColorsEnum.orange
  | LuxBackgroundColorsEnum.brown
  | LuxBackgroundColorsEnum.black;

export const LuxMessageBoxColors = [
  LuxBackgroundColorsEnum.red,
  LuxBackgroundColorsEnum.green,
  LuxBackgroundColorsEnum.purple,
  LuxBackgroundColorsEnum.blue,
  LuxBackgroundColorsEnum.gray,
  LuxBackgroundColorsEnum.orange,
  LuxBackgroundColorsEnum.brown,
  LuxBackgroundColorsEnum.white
];
export type LuxMessageBoxColor =
  | LuxBackgroundColorsEnum.red
  | LuxBackgroundColorsEnum.green
  | LuxBackgroundColorsEnum.purple
  | LuxBackgroundColorsEnum.blue
  | LuxBackgroundColorsEnum.gray
  | LuxBackgroundColorsEnum.orange
  | LuxBackgroundColorsEnum.brown
  | LuxBackgroundColorsEnum.white;

export const LuxProgressColors = [
  LuxBackgroundColorsEnum.red,
  LuxBackgroundColorsEnum.green,
  LuxBackgroundColorsEnum.purple,
  LuxBackgroundColorsEnum.blue,
  LuxBackgroundColorsEnum.gray,
  LuxBackgroundColorsEnum.orange,
  LuxBackgroundColorsEnum.brown
];
export type LuxProgressColor =
  | LuxBackgroundColorsEnum.red
  | LuxBackgroundColorsEnum.green
  | LuxBackgroundColorsEnum.purple
  | LuxBackgroundColorsEnum.blue
  | LuxBackgroundColorsEnum.gray
  | LuxBackgroundColorsEnum.orange
  | LuxBackgroundColorsEnum.brown;

export const LuxSnackbarColors = [
  LuxBackgroundColorsEnum.red,
  LuxBackgroundColorsEnum.green,
  LuxBackgroundColorsEnum.purple,
  LuxBackgroundColorsEnum.blue,
  LuxBackgroundColorsEnum.gray,
  LuxBackgroundColorsEnum.orange,
  LuxBackgroundColorsEnum.brown,
  LuxBackgroundColorsEnum.white
];
export type LuxSnackbarColor =
  | LuxBackgroundColorsEnum.red
  | LuxBackgroundColorsEnum.green
  | LuxBackgroundColorsEnum.purple
  | LuxBackgroundColorsEnum.blue
  | LuxBackgroundColorsEnum.gray
  | LuxBackgroundColorsEnum.orange
  | LuxBackgroundColorsEnum.brown
  | LuxBackgroundColorsEnum.white;
