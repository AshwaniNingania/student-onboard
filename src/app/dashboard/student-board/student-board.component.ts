import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-board',
  templateUrl: './student-board.component.html',
  styleUrls: ['./student-board.component.css']
})
/**
 * Student board component
 * @author Ashwani (3146451)
 */
export class StudentBoardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // redirect to add url by default.
    this.router.navigate(['/onboard']);
  }
}
