import { ILuxFileObject } from '../lux-form/lux-file/lux-file-model/lux-file-object.interface';
import { LuxFormFileBase } from '../lux-form/lux-form-model/lux-form-file-base.class';

export interface LuxFilePreviewData {
  fileComponent?: LuxFormFileBase;
  fileObject?: ILuxFileObject;
}
