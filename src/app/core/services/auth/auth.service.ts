import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN_INFO, ADMIN_USERNAME, ADMIN_PASSWORD } from 'src/app/shared/config';
import { Response } from 'src/app/shared/models/response';

@Injectable({
  providedIn: 'root'
})
/**
 * Auth Service to login and logout the admin.
 * @author Ashwani (3146451)
 */
export class AuthService {

  constructor(
    private router: Router
  ) { }

  /**
   *  login admin and put detail in sessiom
   * @param (data) username and password
   */
  login(data: any): Response {
    if (data.email === ADMIN_USERNAME && data.password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_INFO, JSON.stringify(data.data));
      return {
        code : 200,
        message : 'Login Successful',
        data : null
      };
    } else {
      return {
      code : 503,
      message : 'Invalid Credentials',
      data : null
      };
    }
  }

  /**
   * Logout admin and remove data from session
   */
  logOut(): Response {
    localStorage.removeItem(ADMIN_INFO);

    return {
      code : 200,
      message : 'Logout Successful',
      data : null
    };
  }
}
