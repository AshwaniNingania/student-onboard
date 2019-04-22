import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/models/student';
import { StudentService } from 'src/app/core/services/student/student.service';
import { Router } from '@angular/router';
import { Response } from 'src/app/shared/models/response';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentDeleteComponent } from './student-delete/student-delete.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
/**
 * Student list display component
 * @author Ashwani (3146451)
 */
export class StudentListComponent implements OnInit {

  students: Student[];
  filterCategory = 'All';
  searchFilterText: string;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAllStudents();
  }

  /**
   * Get all student list and inilize to list variable.
   */
  getAllStudents() {
    this.students = this.studentService.getStudents();
  }

  /**
   * Redirect to form for update the student
   * @param (id) student id pass to params
   */
  updateStudent(id: number) {
    this.router.navigate(['/onboard/' + id]);
  }

  /**
   * Delet the student with particular id
   * @param (id) student id
   */
  deleteStudent(id: any) {
    // tslint:disable-next-line: radix
    const response: Response = this.studentService.deleteStudentData(parseInt(id));
    if (response.code === 200 ) {
      this.students = response.data;
      this.toastrService.success(response.message);
    } else {
      this.toastrService.error(response.message);
    }
  }

  /**
   * Redirect to form for view the student
   * @param (id) student id pass to params
   */
  viewStudent(id: number) {
    this.router.navigate(['/onboard/view/' + id]);
  }

  /**
   * Open delete student popup component
   * @param (student) student data passed to delete popup component
   */
  openDeletePopup(student: Student) {
    const modalRef = this.modalService.open(StudentDeleteComponent, { centered: true });
    modalRef.componentInstance.student = student;
    modalRef.componentInstance.response.subscribe((responsedeStudent) => {
      this.deleteStudent(responsedeStudent.id);
    });
  }

}
