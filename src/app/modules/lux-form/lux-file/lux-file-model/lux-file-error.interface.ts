export enum LuxFileErrorCause {
  MaxSizeError = 'luxMaximumSize',
  ReadingFileError = 'luxReadingFile',
  UploadFileError = 'luxUploadFile',
  FileNotAccepted = 'luxUnacceptedFile',
  MultipleForbidden = 'luxMultipleForbidden'
}

export interface ILuxFileError {
  cause: LuxFileErrorCause;
  exception: any;
  file?: File;
}
