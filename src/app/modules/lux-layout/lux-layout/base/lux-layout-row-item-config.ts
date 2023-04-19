export class LuxLayoutRowItemConfig {
  colSpan?: number;
  empty?: boolean;
  flex?: string;
  formNoTopLabel?: boolean;
  formNoBottomLabel?: boolean;

  constructor(partial: Partial<LuxLayoutRowItemConfig>) {
    Object.assign(this, partial);
  }
}
