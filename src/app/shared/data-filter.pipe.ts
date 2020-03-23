import { Pipe, PipeTransform } from '@angular/core';

import { KeyValuePair } from '../model';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {
  transform(value: KeyValuePair[], hiddenKeys: string[]): KeyValuePair[] {
    return value.filter(v => this.keyValuePairFilter(v, hiddenKeys || []));
  }

  private keyValuePairFilter(
    pair: KeyValuePair,
    hiddenKeys: string[]
  ): boolean {
    if (typeof pair.value === 'string' && `${pair.value}`.length === 0) {
      return false;
    }

    if (typeof pair.value === 'number' && pair.value < 0) {
      return false;
    }

    return !hiddenKeys.includes(pair.key);
  }
}
