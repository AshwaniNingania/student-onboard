import { Component } from '@angular/core';
import { Student } from '../shared/models/student';
import { StudentService } from '../core/services/student/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * App Component
 * @author Ashwani (3146451)
 */
export class AppComponent {
  title = 'ashwani-student-management';

  constructor(private studentService: StudentService) {
    // initialize the local storage with a json data.
    this.studentService.initializeDB();
  }
}
