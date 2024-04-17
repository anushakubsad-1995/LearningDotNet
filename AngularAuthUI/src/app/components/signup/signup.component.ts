import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm! :FormGroup;
  type: string = "password";
  isText : boolean = false;
  eyeIcon : string = "fa-eye-slash";
  constructor(private fb:FormBuilder,private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  hideshowpass()
  {
      this.isText = ! this.isText;
      this.eyeIcon = this.isText ?"fa-eye":"fa-eye-slash";
      this.type = this.isText ? "text" : "password";
  }

  onSignUp()
  {
    if(this.signUpForm.valid)
      {
        console.log(this.signUpForm.value);
        this.authService.signUp(this.signUpForm.value).subscribe({
          next:(res)=>
            
            {
              alert(res.message);
              this.signUpForm.reset();
              this.router.navigate(['login']);
            },
          error:(err)=>alert(err.error.message)
        })

        this.signUpForm.reset();
      }
      else
      {
        ValidateForm.validateAllFormFields(this.signUpForm);
        alert("Form is invalid")
      }
  }

 
}
