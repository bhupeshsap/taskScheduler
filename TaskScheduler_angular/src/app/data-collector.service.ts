import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class DataCollectorService {
  laravelUrl:string="http://localhost/git_task_scheduler/TaskScheduler/TaskScheduler_laravel/public/api/"; 
  constructor(private http: Http) { }

  getJson2(id) 
  { 
    return this.http.get(this.laravelUrl+'getTasks/'+id)
                .map(function(response:Response){  
                  return response})
  } 

  getMyTasks(id) 
  { 
    return this.http.get(this.laravelUrl+'getMyTasks/'+id)
                .map(function(response:Response){  
                  return response})
  } 

  getTaskAssignee(id) 
  { 
    return this.http.get(this.laravelUrl+'getTaskAssignee/'+id)
                .map(function(response:Response){  
                  return response})
  }

  getData()
  {
    return this.http.get(this.laravelUrl+'getData');
  }

  saveData(user)
  { 
    const body = user;
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(this.laravelUrl+'saveData',body,{headers:headers});
  } 

  changeData(user)
  { 
    const body = user;
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(this.laravelUrl+'changeData',body,{headers:headers});
  } 

  validateData(userData)
  {
    const body = userData;
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(this.laravelUrl+'validateData',body,{headers:headers});
  }

  getTask(taskId)
  { 
    var param = JSON.parse(taskId);
    return this.http.get(this.laravelUrl+'getTask/'+param)
    .map(function(response:Response){
      return response
    });
  }

  updateTask(taskObj,id)
  { 
    const body = taskObj;
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.put(this.laravelUrl+'updateTask/'+id, body, {headers:headers})
    .map(function(response:Response){
     return response
    })  

  }

  updateStatus(str,taskId)
  {
    const body = {'status':str,'taskId':taskId};
    const headers = new Headers({'Content-Type':'application/json'});
    return this.http.post(this.laravelUrl+'updateStatus',body,{headers:headers})
  }

  deleteTask(id)
  { 
    return this.http.get(this.laravelUrl+'deleteTask/'+id);
  }

  addTask(taskData)
  {
    const body = taskData;
    const headers = new Headers({'Content-Type':'application/json'})
    return this.http.post(this.laravelUrl+'addTask',body,{headers:headers});
  }
}
