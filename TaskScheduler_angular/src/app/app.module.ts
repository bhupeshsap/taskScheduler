import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { DataCollectorService } from './data-collector.service';
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component'; // <-- NgModel lives here
import { HttpModule } from '@angular/http';
import { LoginPageComponent } from './loginPage/loginPage.component';
import { ChangeUserDetailsComponent } from './changeUserDetails/changeUserDetails.component';

import { AppRoutingModule } from './app-routing.module'; // Added here

import { RegistrationPageComponent } from './registrationPage/registrationPage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { AssignedTasksComponent } from './assigned-tasks/assigned-tasks.component';
import { AssignedTasksViewComponent } from './assigned-tasks-view/assigned-tasks-view.component';
import { AssignedTasksAddComponent } from './assigned-tasks-add/assigned-tasks-add.component';  // <-- #1 import module

//angular material
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDatepickerModule} from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material';
// import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    ChangeUserDetailsComponent,
    TaskManagerComponent,
    TasksViewComponent,
    AssignedTasksComponent,
    AssignedTasksViewComponent,
    AssignedTasksAddComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // BrowserAnimationsModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatSelectModule

  ],
  providers: [DataCollectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }