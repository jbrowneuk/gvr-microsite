import { Pipe, PipeTransform } from '@angular/core';

import { KeyValuePair, Part, PartData } from '../model';

function extractData(dataObject: Part | PartData) {
  const data = [];
  for (const [key, value] of Object.entries(dataObject)) {
    if (typeof value === 'object') {
      data.push(...extractData(value));
      continue;
    }

    data.push({ key, value });
  }

  return data;
}

@Pipe({
  name: 'dataExtraction'
})
export class DataExtractionPipe implements PipeTransform {
  transform(value: Part): KeyValuePair[] {
    return extractData(value);
  }
}
