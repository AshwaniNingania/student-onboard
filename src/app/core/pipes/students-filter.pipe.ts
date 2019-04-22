import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/shared/models/student';

@Pipe({
  name: 'studentsFilter'
})
/**
 * Pipe to filter students array based on the category and searchtext.
 * Sort the students based on category also.
 * @author Ashwani (3146451)
 */
export class StudentsFilterPipe implements PipeTransform {

  transform(students: Student[], category?: any, searchText?: any): any {
    // filter bu category
    if (!students) { return students; }
    if (category) {
      if (category !== 'All') {
        students = students.filter(student => {
          return student.category === category;
        });
      }
    }

    // filter by searchtext
    if (searchText) {
      students = students.filter(student => {
        return student.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      });
    }

    // sort the students
    return students.sort((a, b) => {
      if (a.id >= b.id) { return -1; } else { return 1; }
    });
  }

}
