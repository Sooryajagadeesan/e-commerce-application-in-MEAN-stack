import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/adminuser/admin.service';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.scss']
})
export class UpdatecategoryComponent implements OnInit {

  name = "";

  // indication for success or failure of updation
  updateSuccess ="";
  updateFailure = "";

  userData:any;
  categoryToUpdate:any ;

  constructor(public admin:AdminService, public auth:AuthService,public router:Router) { 
    this.userData = this.auth.isAuthenticated();
    
    try {
      this.categoryToUpdate = this.router.getCurrentNavigation()?.extras.state;
      this.categoryToUpdate = this.categoryToUpdate.category;
      this.name = this.categoryToUpdate.name;
    }catch(err) {
      this.name = "";
      this.categoryToUpdate = {
        name: "",
      }
    }

  }

  ngOnInit(): void {
  }

  onSubmit() {

    // validations
    if (!this.name) {
      this.updateFailure = "Enter a valid category name"
      return;
    }

    this.categoryToUpdate.name = this.name;
    // update category
    this.admin.updateCategory(this.categoryToUpdate._id,this.userData.user._id,this.userData.token,this.categoryToUpdate).subscribe({
      next: (data:any) => {
        this.updateSuccess = data.message.name;
        this.updateFailure = "";
      },
      error: (err) => {
        this.updateFailure = err.error.error;
        this.updateSuccess="";
      }
    })
  }

}
