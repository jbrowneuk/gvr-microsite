import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixEpoch'
})
export class UnixEpochPipe implements PipeTransform {
  transform(value: number): number {
    return value * 1000;
  }
}
