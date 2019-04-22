import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ADMIN_INFO } from 'src/app/shared/config';

@Injectable({
  providedIn: 'root'
})
/**
 * AuthGuard class for check admin login or not
 * @author Ashwani (3146451)
 */
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  /**
   * Method to check if admin login or not
   */
  canActivate(): boolean {
    if (localStorage.getItem(ADMIN_INFO)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
