export class LuxLayoutRowItemConfig {
  colSpan?: number;
  empty?: boolean;
  flex?: string;

  constructor(partial: Partial<LuxLayoutRowItemConfig>) {
    Object.assign(this, partial);
  }
}
