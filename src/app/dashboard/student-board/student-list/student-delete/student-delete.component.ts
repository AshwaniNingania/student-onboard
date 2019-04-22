import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/shared/models/student';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css']
})
/**
 * Delete student popup component
 * @author Ashwwani (3146451)
 */
export class StudentDeleteComponent implements OnInit {

  @Input() public student: Student;
  @Output() public response: EventEmitter<any> = new EventEmitter();

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() { }

  /**
   * Emit the response with student data which have to delete.
   */
  deleteStudent() {
    this.response.emit(this.student);
    this.modal.close();
  }

}
