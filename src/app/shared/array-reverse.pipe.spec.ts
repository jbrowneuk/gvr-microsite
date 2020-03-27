import { ArrayReversePipe } from './array-reverse.pipe';

describe('Array Reverse Pipe', () => {
  it('shoud reverse input array', () => {
    const inputArray = [5, 4, 3, 2, 1];
    const pipe = new ArrayReversePipe();

    const outputArray = pipe.transform(inputArray);

    for (let index = 0; index < inputArray.length; index++) {
      const expected = inputArray[inputArray.length - 1 - index];
      const actual = outputArray[index];
      expect(actual).toBe(expected);
    }
  });
});
