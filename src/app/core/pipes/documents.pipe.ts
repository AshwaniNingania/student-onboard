import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'documents'
})
/**
 * Pipe to convert array of documents to documents name display.
 * @author Ashwani (3146451)
 */
export class DocumentsPipe implements PipeTransform {

  private categories = ['Domicile', 'Birth Certificate', 'Marksheets', 'Police Clearence', 'Passport', 'Declaration'];

  transform(values: any, args?: any): any {
    let result = ' ';
    values.forEach((value: boolean, index: number) => {
      if (value === true) {
        result += this.categories[index] + ', ';
      }
    });
    return result.substring(0, result.length - 2);
  }
}
