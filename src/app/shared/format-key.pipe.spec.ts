import { FormatKeyPipe } from './format-key.pipe';

describe('Format Key Pipe', () => {
  let pipe: FormatKeyPipe;

  beforeEach(() => {
    pipe = new FormatKeyPipe();
  });

  it('should convert keys to sentence case', () => {
    const pairs = [{ key: 'ALongStringWhichReadsLikeASentence', value: '' }];

    const actualValues = pipe.transform(pairs);
    const convertedKey = actualValues[0].key;

    expect(convertedKey).toBe('A Long String Which Reads Like A Sentence');
  });

  it('should convert single word key to Capitalised case', () => {
    const pairs = [{ key: 'acquired', value: '' }];

    const actualValues = pipe.transform(pairs);
    const convertedKey = actualValues[0].key;

    expect(convertedKey).toBe('Acquired');
  });
});
