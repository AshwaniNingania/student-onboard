import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/shared/models/student';
import { StudentService } from 'src/app/core/services/student/student.service';
import { Response } from 'src/app/shared/models/response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
/**
 * Student Form Component
 * @author Ashwani (3146451)
 */
export class StudentFormComponent implements OnInit {

  studentFormData: FormGroup;
  studentId: number = null;
  studentView: string = null;
  categories = [
    { name: 'Domicile',  selected: false, id: 1, required: true},
    { name: 'Birth Certificate',  selected: false, id: 2, required: true },
    { name: 'Marksheets',  selected: false, id: 3, required: true },
    { name: 'Police Clearence',  selected: false, id: 4, required: false },
    { name: 'Passport',  selected: false, id: 5, required: false },
    { name: 'Declaration',  selected: false, id: 6, required: true }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    // check params and fill the form
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: radix
      this.studentId = parseInt(params.id);
      this.studentView = params.view;

      // check student id exist for student form
      if (this.studentId) {
        this.updateStudentFormData();
      } else {
        this.createStudentFormData();
      }

      if (this.studentView === 'view') {
        this.studentFormData.disable();
      }
    });
  }

  /**
   * Method to build again documents array when category changed
   * Will retain old vales also
   */
  categoryChanged() {
    const values = this.studentFormData.controls.documents.value;
    (this.studentFormData.controls.documents as FormArray).controls = [];
    (this.studentFormData.controls.documents as FormArray).setValidators([]);
    this.buildCategories(values);
  }

  /**
   * Create or update the form data with student data
   */
  createUpdateStudentData() {
    let response: Response;
    if (this.studentId) {
      response = this.studentService.updateStudentData(this.studentId, this.studentFormData.value);
    } else {
      response = this.studentService.createStudentData(this.studentFormData.value);
    }

    if (response.code === 200) {
      this.router.navigate(['/list']);
      this.toastrService.success(response.message);
    } else {
      this.toastrService.error(response.message);
    }
  }

  /**
   * Return the documents Form Array
   */
  getCategoryControls() {
    return (this.studentFormData.controls.documents as FormArray).controls;
  }

  /**
   * Get the student data from the student id and fill the form with data.
   */
  private updateStudentFormData() {
    const response: Response = this.studentService.getStudentById(this.studentId);
    if (response.code === 200) {
      this.createStudentFormData(response.data);
    } else {
      this.router.navigate(['/onboard']);
      this.toastrService.error(response.message);
    }
  }


  /**
   * Create empty or fill foem data with validations
   * @param (studentData) student data
   */
  private createStudentFormData(studentData: Student = null) {

    if (studentData == null) {
      // create empty form
      this.studentFormData = this.formBuilder.group({
        name: ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        category: ['National',  [Validators.required]],
        documents:  new FormArray([]),
        dob: ['', [Validators.required]],
        fatherName: ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        motherName: ['',  [Validators.minLength(3), Validators.maxLength(50)]],
        lastClassScore: ['',  [Validators.required]]
      });
      this.buildCategories(null);
    } else {
      // create form with filled values
      this.studentFormData = this.formBuilder.group({
        name: [studentData.name,  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [studentData.email, [Validators.required, Validators.email]],
        category: [studentData.category,  [Validators.required]],
        documents: new FormArray([]),
        dob: [studentData.dob, [Validators.required]],
        fatherName: [studentData.fatherName,  [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        motherName: [studentData.motherName,  [Validators.minLength(3), Validators.maxLength(50)]],
        lastClassScore: [studentData.lastClassScore,  [Validators.required, Validators.min(0), Validators.max(100)]]
      });
      this.buildCategories(studentData.documents);
    }
  }

  /**
   * Build the documents list
   * @param (values)
   */
  private buildCategories(values = null) {
    this.categories.map((category, index) => {
      let value: boolean;
      let control: FormControl;
      if (values != null) {
        value = values[index];
      } else {
        value = category.selected;
      }

      // add validations based on category
      if (this.studentFormData.controls.category.value === 'International' || category.required) {
        control = new FormControl(value, Validators.pattern('true'));
      } else {
        control = new FormControl(value);
      }
      (this.studentFormData.controls.documents as FormArray).push(control);
    });
  }

}
