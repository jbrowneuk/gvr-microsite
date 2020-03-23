import { Pipe, PipeTransform } from '@angular/core';

import { KeyValuePair } from '../model';

@Pipe({
  name: 'tableClass'
})
export class TableClassPipe implements PipeTransform {
  transform(value: KeyValuePair): string {
    if (value.key.toLowerCase().includes('cost')) {
      return 'cost';
    }

    return typeof value.value;
  }
}
