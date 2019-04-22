import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Response } from 'src/app/shared/models/response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/**
 * Header Component
 * @author Ashwani (3146451)
 */
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  /**
   * Logout the admin
   */
  logOut() {
    const data: Response = this.authService.logOut();
    if (data.code === 200) {
      this.router.navigate(['/login']);
      this.toastrService.success(data.message);
    } else {
      this.toastrService.error(data.message);
    }
  }

}
