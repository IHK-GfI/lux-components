import { ResponsiveBehaviour } from './responsive-behaviour';

export class ColumnConfig {
  label = '';
  sortable = true;
  sticky = false;
  _responsiveAt: string | string[] | null = null;
  _responsiveBehaviour: ResponsiveBehaviour = ResponsiveBehaviour.NOT_RESPONSIVE;

  constructor(partial: Partial<ColumnConfig>) {
    Object.assign(this, partial);
  }

  get responsiveAt() {
    return this._responsiveAt;
  }

  set responsiveAt(responsiveAt: string | string[] | null) {
    this._responsiveAt = responsiveAt;
  }

  get responsiveBehaviour() {
    return this._responsiveBehaviour;
  }

  set responsiveBehaviour(behaviour: any) {
    this._responsiveBehaviour = behaviour;

    if (behaviour.value === null) {
      this.responsiveAt = null;
    } else {
      if (this.responsiveAt === null || this.responsiveAt.length === 0) {
        setTimeout(() => {
          this.responsiveAt = ['xs', 'sm'];
        });
      }
    }
  }
}
