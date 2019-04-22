import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './index/app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { StudentBoardComponent } from './dashboard/student-board/student-board.component';
import { StudentFormComponent } from './dashboard/student-board/student-form/student-form.component';
import { StudentListComponent } from './dashboard/student-board/student-list/student-list.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DocumentsPipe } from './core/pipes/documents.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateOfBirthPipe } from './core/pipes/date-of-birth.pipe';
import { StudentsFilterPipe } from './core/pipes/students-filter.pipe';
import { StudentDeleteComponent } from './dashboard/student-board/student-list/student-delete/student-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    StudentBoardComponent,
    StudentFormComponent,
    StudentListComponent,
    DocumentsPipe,
    DateOfBirthPipe,
    StudentsFilterPipe,
    StudentDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      preventDuplicates: true,
      progressBar: true,
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [StudentDeleteComponent]
})

/**
 * App module
 * @author Ashwani (3146451)
 */
export class AppModule { }
