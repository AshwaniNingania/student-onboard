import { Injectable } from '@angular/core';
import { STUDENT_LIST } from 'src/app/shared/config';
import students from 'src/app/shared/students.json';
import { Student } from 'src/app/shared/models/student';
import { Response } from 'src/app/shared/models/response';

@Injectable({
  providedIn: 'root'
})
/**
 * Student servie for add, edit and delete the students from the localstorage.
 * @author Ashwani (3146451)
 */
export class StudentService {

  constructor() { }

  /**
   * initialize the application with a json data
   */
  initializeDB() {
    if (this.getStudentsFromLocalStorage() == null) {
      localStorage.setItem(STUDENT_LIST, JSON.stringify(students));
    }
  }

  /**
   * List of students from the localstorage
   */
  getStudents(): Student[] {
    return this.getStudentsFromLocalStorage();
  }

  /**
   * Return the student by id
   * @param (id) student id
   */
  getStudentById(id: number): Response {
    const studentList: Student[] = this.getStudentsFromLocalStorage();
    for (const student of studentList) {
      if (student.id === id) {
        return {
          code : 200,
          message : 'Student found.',
          data : student
        };
      }
    }

    return {
        code : 503,
        message : 'Student not found with id : ' + id,
        data : null
      };
  }

  /**
   * Create the student and store in localstorage
   * @param (studentData)
   */
  createStudentData(studentData: Student): Response {
    const studentList: Student[] = this.getStudentsFromLocalStorage();
    for (const student of studentList) {
      if (student.email === studentData.email) {
        return {
          code : 503,
          message : 'Email id already in use',
          data : null
        };
      }
    }

    studentData.id = students.length + 1;
    studentList.push(studentData);
    this.setStudentsInLocalStorage(studentList);
    return {
      code : 200,
      message : 'Student Created Sccussfully.',
      data : this.getStudentsFromLocalStorage()
    };
  }

  /**
   * Update the student and store in localstorage
   * @param (data) Student data
   * @param (id) Student id
   */
  updateStudentData(id: number, data: Student): Response {
    const studentList: Student[] = this.getStudentsFromLocalStorage();
    let found = false;
    for (let index = 0; index < studentList.length; index++) {
      const student: Student = studentList[index];
      if (student.id === id) {
        found = true;
        data.id = id;
        studentList.splice(index, 1, data);
        break;
      }
    }

    if (found) {
      this.setStudentsInLocalStorage(studentList);
      return {
        code : 200,
        message : 'Student updated Sccussfully.',
        data : this.getStudentsFromLocalStorage()
      };
    } else {
      return {
        code : 503,
        message : 'Student data not found in local storage.',
        data : null
      };
    }
  }

  /**
   * Delete the student from the localstorage
   * @param (id) student id
   */
  deleteStudentData(id: number) {
    const studentList: Student[] = this.getStudentsFromLocalStorage();
    let found = false;
    for (let index = 0; index < studentList.length; index++) {
      const student: Student = studentList[index];
      if (student.id === id) {
        found = true;
        studentList.splice(index, 1);
        break;
      }
    }

    if (found) {
      this.setStudentsInLocalStorage(studentList);
      return {
        code : 200,
        message : 'Student deleted Sccussfully.',
        data : this.getStudentsFromLocalStorage()
      };
    } else {
      return {
        code : 503,
        message : 'Student data not found in local storage.',
        data : null
      };
    }
  }

  private getStudentsFromLocalStorage() {
    return JSON.parse(localStorage.getItem(STUDENT_LIST));
  }

  private setStudentsInLocalStorage(studentList: Student[]) {
    localStorage.setItem(STUDENT_LIST, JSON.stringify(studentList));
  }

}
