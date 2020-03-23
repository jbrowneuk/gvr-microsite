import { Part, PartData } from '../model';
import { DataExtractionPipe } from './data-extraction.pipe';

const mockPartData: PartData = {
  additionalData: 'yes',
  a: 1,
  b: 2
};

const mockPart: Part = {
  id: 'id',
  manufacturer: 'manufacturer',
  name: 'name',
  image: 'image',
  retailCost: 0,
  actualCost: 0,
  required: 1,
  acquired: 1,
  data: mockPartData
};

describe('Data Extraction Pipe', () => {
  let pipe: DataExtractionPipe;

  beforeEach(() => {
    pipe = new DataExtractionPipe();
  });

  it('should extract keys and values recursively from a part', () => {
    const expectedPartKeys = Object.keys(mockPart).filter(p => p !== 'data');
    const expectedPartDataKeys = Object.keys(mockPartData);
    const expectedLength =
      expectedPartKeys.length + expectedPartDataKeys.length;

    const actualValues = pipe.transform(mockPart);

    expect(actualValues.length).toBe(expectedLength);

    // Loop through data
    expectedPartKeys.forEach(key => {
      const relatedData = actualValues.find(kvp => kvp.key === key);
      expect(relatedData).toBeTruthy();
      expect(relatedData.value).toBe(mockPart[key]);
    });

    expectedPartDataKeys.forEach(key => {
      const relatedData = actualValues.find(kvp => kvp.key === key);
      expect(relatedData).toBeTruthy();
      expect(relatedData.value).toBe(mockPartData[key]);
    });
  });

  it('should not extract data property as a value', () => {
    const actualValues = pipe.transform(mockPart);
    expect(actualValues.find(p => p.key === 'data')).toBeFalsy();
  });
});
