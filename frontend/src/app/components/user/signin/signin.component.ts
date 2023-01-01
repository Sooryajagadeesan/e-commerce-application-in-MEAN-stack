import { AuthService } from './../../../services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email, Validators.pattern(/\S{4}@+\S{5}\.\S{2}/)]),
    password: new FormControl("",[Validators.required,Validators.minLength(6)])
  })

  showError = "";

  user:any;
  constructor(private auth:AuthService,private router:Router) {
   
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let {email, password} = this.signinForm.controls;
    email = email.value;
    password = password.value;

    // validations
    if(!email || !password) {
      this.showError = "Please Enter all the fields";
      return;
    }

    this.auth.signin({
      email: email,
      password: password
    }).subscribe({
      next: (data) => {
        // set the token and user data in localstorage
        this.auth.authenticate(data, () => {
          this.user = this.auth.isAuthenticated();
          if(this.user.user.role === 1) {
            this.router.navigate(["/admin/dashboard"]);
          }else {
            this.router.navigate(["/home"]);
          }
        })
        this.showError = "";
      },
      error: (err) => {
        this.showError = err.error.error;
      }
    })
  }
}
