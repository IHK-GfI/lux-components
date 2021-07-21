import { Observable } from 'rxjs';

export interface ILuxFileObject {
  name: string;
  type: string;
  content?: string | Blob;
  contentCallback?: Promise<any> | Observable<any> | any;
  namePrefix?: string;
  namePrefixColor?: string;
  nameSuffix?: string;
  nameSuffixColor?: string;
}
