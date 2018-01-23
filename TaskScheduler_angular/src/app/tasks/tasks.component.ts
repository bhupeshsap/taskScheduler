import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';
import { ChangeUserDetailsComponent } from '../changeUserDetails/changeUserDetails.component';
import { DataCollectorService } from '../data-collector.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit 
{
  userData: any;
  taskData: any;

  constructor(private data: DataCollectorService,private router: Router) 
  {
    this.userData = JSON.parse(sessionStorage.user);
  }   

  changeUserDetails()
  {
    this.router.navigate(['/changeUserDetails']);
  }

  ngOnInit() 
  {
  	this.getData(this.userData.id);
  }

  getData(id:number)
  {
  	this.data.getMyTasks(id)
  	.subscribe((val) =>this.getDataResponseEvaluator(JSON.parse((<any>val)._body)));
  }

  getDataResponseEvaluator(val)
  {
    this.taskData = val.taskData;
  }
}