import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  name:string="";
  email:string ="";
  // user data is stored
  constructor(public auth:AuthService) {
    const {user: {name, email , role}} = auth.isAuthenticated(); // returns the user Data
    this.name = name;
    this.email = email;
  }

  ngOnInit(): void {
  }

}
