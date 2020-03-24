import { FormatValuePipe } from './format-value.pipe';

describe('Format Value Pipe', () => {
  let pipe: FormatValuePipe;

  beforeEach(() => {
    pipe = new FormatValuePipe();
  });

  it('should convert boolean values into ‘Yes’ or ‘No’', () => {
    const convertedTrue = pipe.transform({ key: '', value: true });
    expect(convertedTrue).toBe('Yes');

    const convertedFalse = pipe.transform({ key: '', value: false });
    expect(convertedFalse).toBe('No');
  });

  it('should convert number to string representation', () => {
    const value = 128;
    const converted = pipe.transform({ key: '', value });
    expect(converted).toBe(`${value}`);
  });

  it('should return string values as-is', () => {
    const value = 'string';
    const converted = pipe.transform({ key: '', value });
    expect(converted).toBe(value);
  });
});
