import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayReverse'
})
export class ArrayReversePipe implements PipeTransform {
  transform(value: any[]): any[] {
    return [...value].reverse();
  }
}
