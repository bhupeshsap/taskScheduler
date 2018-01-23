import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Router } from "@angular/router";
import { DataCollectorService} from '../data-collector.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './changeUserDetails.component.html',
  styleUrls: ['./changeUserDetails.component.css']
})

export class ChangeUserDetailsComponent implements OnInit {
   
  userData: any;
  cForm: FormGroup;
  constructor(private fb: FormBuilder,
  	          private router: Router,
  	          private server: DataCollectorService) 
  {
   this.userData = JSON.parse(sessionStorage.user);
   this.createForm();
  }

  createForm() 
  {
    this.cForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required,this.confirmPasswordValidator()]) ],	
      cpassword: ['', Validators.compose([Validators.required,this.confirmPasswordValidator()]) ], // <--- the FormControl called "name"
    });
  }

  confirmPasswordValidator(): any {
  return (control: any): {[key: string]: any} => {    
  	if (typeof (<any>control).root.controls != "undefined"){ 
    const confirmPassword = (<any>control).root.controls.cpassword.value;
    const password = (<any>control).root.controls.password.value;
    const result = password==confirmPassword ? null : 'error';
    if(password==confirmPassword){ 
      if((<any>control).root.controls.cpassword._status=='INVALID'){
        (<any>control).root.controls.cpassword._status='VALID';
      }
      else{
      	(<any>control).root.controls.password._status='VALID';
      }
    }
    return result ? {'wrongPassword': {value: confirmPassword}} : null;
    }
   };
  }

  onSubmit()
  {
    var userData = {
      "id" : this.userData.id,
      "name" : this.cForm.value.name,
      "email" : this.cForm.value.email,
      "password" : this.cForm.value.password,
    };

    this.server.changeData(userData)
    .subscribe(
      (data) => {
        this.loadDecisionMaker(JSON.parse((<any>data)._body));
      } );
  }
  
  loadDecisionMaker(response)
  { 
  	if(response==1)
  	alert('Successfully updated account details')
    else
    alert('Sorry some error occured in updating details') 	
  }
  ngOnInit() {
  }

}
