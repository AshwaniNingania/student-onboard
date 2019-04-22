import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../shared/config';
import { Response } from '../shared/models/response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * Login componet
 * @author Ashwani (3146451)
 */
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  adminUsername: string = ADMIN_USERNAME;
  adminPassword: string = ADMIN_PASSWORD;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  /**
   * Created login form with validations
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)]]
    }, { updateOn: 'blur' });
  }

  /**
   * Login the admin
   */
  login() {
    const response: Response = this.authService.login(this.loginForm.value);
    if (response.code === 200) {
      this.router.navigate(['/']);
      this.toastrService.success(response.message);
    } else {
      this.toastrService.error(response.message);
    }
  }

}
