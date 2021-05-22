import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(arr: Array<any>, filterText: string, fieldName: string): Array<any> {
    if (!filterText) {
      return arr;
    }
    const re = new RegExp(filterText, 'i'); // re = /vin/i
    return arr.filter(el => re.test(el[fieldName]));
  }

}
