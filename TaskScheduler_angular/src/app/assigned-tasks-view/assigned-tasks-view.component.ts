import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { DataCollectorService } from '../data-collector.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from "@angular/router";

@Component({
  selector: 'app-assigned-tasks-view',
  templateUrl: './assigned-tasks-view.component.html',
  styleUrls: ['./assigned-tasks-view.component.css']
})

export class AssignedTasksViewComponent implements OnInit {
  
  taskData : any={};
  userData: any={};
  edit: boolean = false;
  editTask : FormGroup;
  allUserData:any;
  
  constructor(private dataServer: DataCollectorService,
  	          private activatedRoute: ActivatedRoute,
  	          private fb: FormBuilder,
              private router:Router) 
  { 
  	this.createForm();
  }

  createForm()
  {
  	this.editTask = this.fb.group({
  		status : ['',Validators.compose([])],
  		subject : ['',Validators.compose([])],
  		date : ['',Validators.compose([])],
  		time : ['',Validators.compose([])],
  		priority : ['',Validators.compose([])],
  		assignee : ['', Validators.compose([])],
  		body : ['',Validators.compose([])],
  	})
  }


  ngOnInit() 
  { 
  	this.activatedRoute.params.subscribe((parms: any) => {  
	   this.dataServer.getTask((<any>parms).taskId).subscribe((val) => { 
       this.getTasks(JSON.parse((<any>val)._body)[0]);                                                                
     });
	   this.userData = JSON.parse(sessionStorage.user)
	    this.dataServer.getData().subscribe((val) => {  
       this.getDataResponseEvaluator(JSON.parse((<any>val)._body));                                                   
      });
    });

  }
   getDataResponseEvaluator(val)
  { 
    this.allUserData = val.data;
  }
  getTasks(task)
  { 
    this.taskData = task;
    var dateTime = this.taskData.target_date;
    dateTime = dateTime.split(" ");
    var date = dateTime[0];
    var time = dateTime[1].substr(0,5);
    this.editTask.reset({ subject: this.taskData.subject,
                          date: date,
                          time: time,
                          priority: this.taskData.subject,
                          assignee: this.taskData.userId,
                          body: this.taskData.body 
                        });
  }


  onSubmit()
  { 
    var dateTime = this.editTask.value.date+" "+this.editTask.value.time+":00";

  	var userData = {
      "status" : this.taskData.status,
      "subject": this.editTask.value.subject,
      "dateTime": dateTime,
      "priority" : this.editTask.value.priority,
      "assignee" :this.editTask.value.assignee,
      "body" : this.editTask.value.body,
    };
    
    this.dataServer.updateTask(userData, this.taskData.id)
    .subscribe((val) =>  { 
      this.decider( JSON.parse((<any>val)._body))
    });
  } 
 
  decider(val)
  {
   if(val == 1)
  	{ 
  	  alert("Update Sucessfull");
  	  this.edit = false;
  	  window.location.reload();
  	}
  	else
  	{ 
      alert("Some error occurred");
    }
  }

  deleteTask(id)
  {
    if(confirm("Are you sure to delete "+id)) {
    this.dataServer.deleteTask(id)
    .subscribe((val) =>  {if(JSON.parse((<any>val)._body))
                          {
                            alert("task deleted");
                            this.router.navigate(["../dashboard/assignedTasks"]);
                            window.location.reload();
                          }
                         }
    );
    }
  }

}
