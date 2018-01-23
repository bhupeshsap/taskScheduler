import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';   
import { TasksComponent } from './tasks/tasks.component';  
import { RegistrationPageComponent } from './registrationPage/registrationPage.component'; 
import { LoginPageComponent } from './loginPage/loginPage.component';
import { ChangeUserDetailsComponent } from './changeUserDetails/changeUserDetails.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { AssignedTasksComponent } from './assigned-tasks/assigned-tasks.component';
import { AssignedTasksViewComponent } from './assigned-tasks-view/assigned-tasks-view.component';
import { AssignedTasksAddComponent } from './assigned-tasks-add/assigned-tasks-add.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/loginPage',
        pathMatch: 'full'
    },
    {
        path: 'loginPage',
        component: LoginPageComponent
    },
    {
        path: 'registration',
        component: RegistrationPageComponent
    },
    {
        path: 'dashboard',
        component: TaskManagerComponent,
        children: [ 
        {
            path: 'myTasks',
            component: TasksComponent,
            children: [ 
            {
                path: 'edit/:taskId',
                component: TasksViewComponent
            },
            {
                path: 'view/:taskId',
                component: TasksViewComponent
            },
            ]
        },
        {
            path: 'assignedTasks',
            component: AssignedTasksComponent,
            children:[
            {
                path: 'assignedEdit/:taskId',
                component: AssignedTasksViewComponent
            },
            {
                path: 'assignedView/:taskId',
                component: AssignedTasksViewComponent
            },
            {
                path: 'assignTaskAdd',
                component: AssignedTasksAddComponent
            },
            ]
        },
        {
            path: 'settings',
            component: ChangeUserDetailsComponent
        }
        ]
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }