export class ResponsiveBehaviour {
  public static NOT_RESPONSIVE = new ResponsiveBehaviour({ label: ' ', value: null });
  public static COLUMN_HIDE = new ResponsiveBehaviour({ label: 'Spalte ausblenden', value: 'hide' });
  public static COLUMN_NAME = new ResponsiveBehaviour({ label: 'Spalte - Name', value: 'name' });
  public static COLUMN_SYMBOL = new ResponsiveBehaviour({ label: 'Spalte - Symbol', value: 'symbol' });
  public static COLUMN_DATE = new ResponsiveBehaviour({ label: 'Spalte - Datum', value: 'date' });

  public static BEHAVIOURS: ResponsiveBehaviour[] = [
    ResponsiveBehaviour.NOT_RESPONSIVE,
    ResponsiveBehaviour.COLUMN_HIDE,
    ResponsiveBehaviour.COLUMN_NAME,
    ResponsiveBehaviour.COLUMN_SYMBOL,
    ResponsiveBehaviour.COLUMN_DATE
  ];

  label = '';
  value: string | null = '';

  constructor(partial: Partial<ResponsiveBehaviour>) {
    Object.assign(this, partial);
  }
}
