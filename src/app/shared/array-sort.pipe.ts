import { Pipe, PipeTransform } from '@angular/core';

function sortNumber(a: number, b: number): number {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

function sortWrapper(a: any, b: any, property: string) {
  const aProp = a[property];
  const bProp = b[property];
  if (typeof aProp === 'number' && typeof bProp === 'number') {
    return sortNumber(aProp, bProp);
  }

  return `${aProp}`.localeCompare(`${bProp}`);
}

@Pipe({
  name: 'arraySort'
})
export class ArraySortPipe implements PipeTransform {
  transform(value: any[], sortProp: string): any[] {
    return [...value].sort((a, b) => sortWrapper(a, b, sortProp));
  }
}
