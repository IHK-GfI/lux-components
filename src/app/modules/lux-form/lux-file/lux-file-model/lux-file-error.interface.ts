/* eslint-disable no-shadow */
// no-shadow meldet fälschlicherweise einen Fehler
export enum LuxFileErrorCause {
  MaxSizeError = 'luxMaximumSize',
  ReadingFileError = 'luxReadingFile',
  UploadFileError = 'luxUploadFile',
  FileNotAccepted = 'luxUnacceptedFile',
  MultipleForbidden = 'luxMultipleForbidden'
}
/* eslint-enable no-shadow */

export interface ILuxFileError {
  cause: LuxFileErrorCause;
  exception: any;
  file?: File;
}
