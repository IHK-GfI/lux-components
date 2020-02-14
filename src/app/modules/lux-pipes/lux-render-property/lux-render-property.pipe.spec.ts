import { LuxRenderPropertyPipe } from './lux-render-property.pipe';

describe('LuxRenderPropertyPipe', () => {
  let pipe: LuxRenderPropertyPipe = null;

  beforeEach(() => {
    pipe = new LuxRenderPropertyPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('get property of object', () => {
    // Given
    const testObject = { value: 'TESTVALUE', label: 'TESTLABEL' };
    // When
    const result = pipe.transform(testObject, 'label');
    // Then
    expect(result).toEqual('TESTLABEL', 'Der Wert des Label-Properties muss ausgegeben werden!');
  });

  it('get empty string if value or label do not exist', () => {
    // Given
    const testObject1 = null;
    const testObject2 = { value: 'TESTVALUE' };
    // When
    const result1 = pipe.transform(testObject1, 'label');
    const result2 = pipe.transform(testObject2, 'label');
    // Then
    expect(result1).toEqual('', 'Bei einem leeren Objekt muss das Ergebnis ein Leerstring ("") sein!');
    expect(result2).toEqual('', 'Bei nicht vorhandenem Label-Attribut muss das Ergebnis ein Leerstring ("") sein!');
  });
});
