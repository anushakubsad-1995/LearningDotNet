import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText : boolean = false;
  eyeIcon : string = "fa-eye-slash";
  loginForm! : FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  hideshowpass()
  {
      this.isText = !this.isText;
      this.eyeIcon = this.isText ? "fa-eye" :"fa-eye-slash";
      this.type = this.isText ? "text" : "password";
  }

  Onsubmit()
  {
    if(this.loginForm.valid)
      {
        console.log(this.loginForm.value);
        this.authService.login(this.loginForm.value).subscribe({
          next:(res)=>{
           alert(res.message);
           this.router.navigate(['dashboard']);

          },
          error:(err)=>{
            alert(err?.error.message)
          }

        })
      }
      else
      {
        ValidateForm.validateAllFormFields(this.loginForm);
        alert("your form is invalid");
      }
  }
 
 

}
