import { Pipe, PipeTransform } from '@angular/core';

import { KeyValuePair } from '../model';

@Pipe({
  name: 'formatValue'
})
export class FormatValuePipe implements PipeTransform {
  transform(value: KeyValuePair): string {
    if (typeof value.value === 'boolean') {
      return value.value ? 'Yes' : 'No';
    }

    if (value.key.toLowerCase().includes('cost')) {
      return (+value.value).toFixed(2);
    }

    return `${value.value}`;
  }
}
