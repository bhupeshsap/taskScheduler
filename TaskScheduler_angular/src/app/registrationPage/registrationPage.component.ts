import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { DataCollectorService} from '../data-collector.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-t',
  templateUrl: './registrationPage.component.html',
  styleUrls: ['./registrationPage.component.css']
})

export class RegistrationPageComponent {
  regForm: FormGroup; 
  constructor(private fb: FormBuilder,
              private user: DataCollectorService,
              private router: Router) 
  { 
    this.createForm();
  }

  createForm() 
  {
    this.regForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required,this.confirmPasswordValidator()]) ], 
      cpassword: ['', Validators.compose([Validators.required,this.confirmPasswordValidator()]) ],  // <--- the FormControl called "name"
    });
  }

  confirmPasswordValidator(): any { 
  return (control: any): {[key: string]: any} => { 
  	if (typeof control.root.controls != "undefined"){ 
    const confirmPassword = control.root.controls.cpassword.value;
    const password = control.root.controls.password.value;
    const result: any = password==confirmPassword ? null : 'error';
    
    if(password==confirmPassword)
    { 
      if(control.root.controls.cpassword.status=='INVALID')
      { 
        control.root.controls.cpassword._status="VALID";
        
      }
      else
      { 
      	control.root.controls.password._status='VALID';
      }
    } 
    return result ? {'wrongPassword': {value: confirmPassword}} : null;
    }
   };
  }
   
  onSubmit()
  {
    var userData = {
      "id" : null,
      "name" : this.regForm.value.name,
      "email" : this.regForm.value.email,
      "password" : this.regForm.value.password,
    }; 
    this.user.saveData(userData).subscribe((data) => { 
           this.saveResultEvaluator(JSON.parse((<any>data)._body))
    })
  }

  saveResultEvaluator(data)
  { 
    if(data === true)
    {
     alert("Registeration successfull!!, Please proceed to Login");
    }
                  
  } 

}
