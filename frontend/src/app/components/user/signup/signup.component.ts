import { AuthService } from './../../../services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    signupForm = new FormGroup({
    firstName: new FormControl('',[ Validators.required, Validators.minLength(3), Validators.pattern(/[a-zA-Z]/)]),
    lastName: new FormControl(''),
    email: new FormControl('',[ Validators.required ,Validators.email, Validators.pattern(/\S{4}@+\S{5}\.\S{2}/)]),
    password: new FormControl('',[ Validators.required ,Validators.required])
  });

  showForm= true;
  showError = "";

  alreadySignedUp = false;


  constructor(private auth:AuthService) { }

  ngOnInit(): void {}

  onSubmit() {
    let {firstName, lastName, email, password} = this.signupForm.controls;
    // destructuring for validations
    firstName = firstName.value;
    lastName = lastName.value;
    email = email.value;
    password = password.value;
    
  // validations
    if(!firstName || !email || !password) {
      this.showError = "Please Enter all the fields";
      return 
    }

    this.showError = "";
    this.showForm = false;


    this.auth.signup({
      name: firstName,
      lastname: lastName,
      email: email,
      password: password
    }).subscribe({
      next: (data) => {
        this.alreadySignedUp = false;
        this.signupForm.reset();
        this.showForm = false;
        this.showError = "";
      },
      error: (err:any) => {
        if(err.error.error.hasOwnProperty("keyValue")) {
          if(err.error.error.keyValue.hasOwnProperty("email")) {
            this.showError = "Email Already exists, Please sign in"
            this.alreadySignedUp = true;
            this.showForm = false;

          } else {
            this.showError = err.error.details
            this.showForm = true;
          }
        }  else {
          this.showError = err.error.details
          this.showForm = true;
        }
      }
    })
  }
}
