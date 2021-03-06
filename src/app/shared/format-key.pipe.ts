import { Pipe, PipeTransform } from '@angular/core';

import { KeyValuePair } from '../model';

function formatCamelCase(input: string) {
  return input
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, m => m.toUpperCase());
}

@Pipe({
  name: 'formatKey'
})
export class FormatKeyPipe implements PipeTransform {
  transform(value: KeyValuePair[]): KeyValuePair[] {
    return value.map(v => ({ key: formatCamelCase(v.key), value: v.value }));
  }
}
