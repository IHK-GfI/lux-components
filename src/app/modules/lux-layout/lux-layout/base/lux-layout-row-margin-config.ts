export class LuxLayoutRowMarginConfig {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  marginLeft?: boolean;
  marginRight?: boolean;

  constructor(partial: Partial<LuxLayoutRowMarginConfig>) {
    Object.assign(this, partial);
  }
}
