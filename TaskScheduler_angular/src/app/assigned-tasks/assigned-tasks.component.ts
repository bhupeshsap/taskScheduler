import { Component, OnInit } from '@angular/core';
import { DataCollectorService } from '../data-collector.service';

@Component({
  selector: 'app-assigned-tasks',
  templateUrl: './assigned-tasks.component.html',
  styleUrls: ['./assigned-tasks.component.css']
})
export class AssignedTasksComponent implements OnInit {

  userData: any;
  taskData: any;
  allUserData:any;

  constructor(private data: DataCollectorService) 
  { 
    this.userData = JSON.parse(sessionStorage.user);
  }   

  ngOnInit() 
  {
  	this.getData(this.userData.id);
  }

  getData(id:number): void
  {
  	this.data.getTaskAssignee(id)
  	.subscribe((val) => { 
      this.evaluate(JSON.parse((<any>val)._body))
    });
  }

  evaluate(val)
  {
    this.taskData = val.taskData;
    this.allUserData = val.allUsers; 
  }


}
