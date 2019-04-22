import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { StudentFormComponent } from './dashboard/student-board/student-form/student-form.component';
import { StudentListComponent } from './dashboard/student-board/student-list/student-list.component';

// child routes for dashboard components
export const childRoutes: Routes = [
  {
    path: '',
    redirectTo: '/onboard',
    pathMatch: 'full'
  },
  {
    path: 'onboard',
    component: StudentFormComponent
  },
  {
    path: 'onboard/:id',
    component: StudentFormComponent
  },
  {
    path: 'onboard/:view/:id',
    component: StudentFormComponent
  },
  {
    path: 'list',
    component: StudentListComponent
  }
  ];

// application routes
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children : childRoutes,
    canActivate : [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
/**
 * App routing module
 * @author Ashwani (3146451)
 */
export class AppRoutingModule { }
