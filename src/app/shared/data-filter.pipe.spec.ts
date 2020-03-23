import { DataFilterPipe } from './data-filter.pipe';

describe('Data Filter Pipe', () => {
  let pipe: DataFilterPipe;

  beforeEach(() => {
    pipe = new DataFilterPipe();
  });

  it('should filter key value pairs with empty string values', () => {
    const pairs = [
      { key: 'hello', value: 'hi' },
      { key: 'goodbye', value: '' }
    ];

    const actualValues = pipe.transform(pairs, []);

    expect(actualValues.find(kvp => kvp.value === '')).toBeFalsy();
  });

  it('should filter key value pairs with negative number values', () => {
    const pairs = [
      { key: 'hello', value: 10 },
      { key: 'goodbye', value: -1 }
    ];

    const actualValues = pipe.transform(pairs, []);

    expect(actualValues.find(kvp => kvp.value < 0)).toBeFalsy();
  });

  it('should filter key value pairs that are passed as parameter', () => {
    const filteredKeys = ['b', 'd'];
    const pairs = [
      { key: 'a', value: '12345' },
      { key: 'b', value: '12345' },
      { key: 'c', value: '12345' },
      { key: 'd', value: '12345' }
    ];

    const actualValues = pipe.transform(pairs, filteredKeys);

    filteredKeys.forEach(key => {
      expect(actualValues.find(kvp => kvp.key === key)).toBeFalsy();
    });
  });
});
