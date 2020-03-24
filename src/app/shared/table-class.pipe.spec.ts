import { TableClassPipe } from './table-class.pipe';

describe('Table Class Pipe', () => {
  let pipe: TableClassPipe;

  beforeEach(() => {
    pipe = new TableClassPipe();
  });

  it('should return data type for value', () => {
    const pairs = [
      { key: '', value: 'any textual value' },
      { key: '', value: 0 },
      { key: '', value: true }
    ];

    pairs.forEach(pair => {
      const actualValue = pipe.transform(pair);

      expect(actualValue).toBe(typeof pair.value);
    });
  });

  it('should return ‘cost’ for pair with ‘cost‘ in the key', () => {
    const pair = { key: 'someCost', value: 0 };

    const actualValue = pipe.transform(pair);

    expect(actualValue).toBe('cost');
  });
});
