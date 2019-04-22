import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateOfBirth'
})
/**
 * Pipe to convert date object in MMMM DD YYYY format.
 * @author Ashwani (3146451)
 */
export class DateOfBirthPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Date(value.year, value.month - 1 , value.day);
  }

}
