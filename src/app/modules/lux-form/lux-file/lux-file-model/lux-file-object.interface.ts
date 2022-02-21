import { Observable } from 'rxjs';

export interface ILuxFileObject {
  name: string;
  type: string;
  size?: number;
  content?: string | Blob;
  contentCallback?: Promise<any> | Observable<any> | any;
  namePrefix?: string;
  namePrefixColor?: string;
  nameSuffix?: string;
  nameSuffixColor?: string;
}
