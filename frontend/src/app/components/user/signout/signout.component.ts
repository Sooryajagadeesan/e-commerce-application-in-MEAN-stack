import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {
  message = "";
  constructor(public router:Router,public auth:AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem("jwt")) {
      this.auth.signout()?.subscribe({
        next: (data:any) => {
          if(data.message) {
            this.message = data.message;
          } else {
            this.message = "Sign out successful, please go to home page for purchasing"
          }
        }
      })
    } else {
      this.message = "Already signed out, please sign in"
    }
  }

}
