import { ArraySortPipe } from './array-sort.pipe';

describe('Array Sort Pipe', () => {
  let pipe: ArraySortPipe;
  beforeEach(() => {
    pipe = new ArraySortPipe();
  });

  it('should sort arrays with numeric property in default order', () => {
    const sortProperty = 'val';
    const inputArray = [
      { val: 1 },
      { val: 4 },
      { val: 2 },
      { val: 5 },
      { val: 6 },
      { val: 3 },
      { val: 9 },
      { val: 7 },
      { val: 8 }
    ];
    const outputArray = [
      { val: 1 },
      { val: 2 },
      { val: 3 },
      { val: 4 },
      { val: 5 },
      { val: 6 },
      { val: 7 },
      { val: 8 },
      { val: 9 }
    ];

    const actual = pipe.transform(inputArray, sortProperty);

    expect(actual).toEqual(outputArray);
  });

  it('should sort arrays with string property in default order', () => {
    const sortProperty = 'val';
    const inputArray = [
      { val: 'd' },
      { val: 'h' },
      { val: 'b' },
      { val: 'g' },
      { val: 'i' },
      { val: 'c' },
      { val: 'f' },
      { val: 'a' },
      { val: 'e' }
    ];
    const outputArray = [
      { val: 'a' },
      { val: 'b' },
      { val: 'c' },
      { val: 'd' },
      { val: 'e' },
      { val: 'f' },
      { val: 'g' },
      { val: 'h' },
      { val: 'i' }
    ];

    const actual = pipe.transform(inputArray, sortProperty);

    expect(actual).toEqual(outputArray);
  });
});
