import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(data: Array<any>, fieldName: string, reverse = false): Array<any> {
    if (!fieldName) {
      return data;
    }

    let arr = [...data];
    arr.sort((a, b) => {
      return reverse ? b[fieldName].localeCompare(a[fieldName]) : a[fieldName].localeCompare(b[fieldName]);
    });
    return arr;
  }

}
