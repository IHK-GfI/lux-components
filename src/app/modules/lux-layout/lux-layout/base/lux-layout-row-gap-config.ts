export class LuxLayoutRowGapConfig {
  row?: string;
  rowItem?: string;
  column?: string;

  constructor(partial: Partial<LuxLayoutRowGapConfig>) {
    Object.assign(this, partial);
  }
}
