import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/adminuser/admin.service';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-managecategories',
  templateUrl: './managecategories.component.html',
  styleUrls: ['./managecategories.component.scss']
})
export class ManagecategoriesComponent implements OnInit {
  allCategories:any;
  userData:any;

  // updateSuccess = "";
  deleteSuccess = "";
  updateFailure = "";
  deleteFailure = "";
  getFailure = "";

  constructor(public admin:AdminService, public auth:AuthService, public router:Router) {
    
    this.admin.getAllCategories().subscribe({
      next: (data:any) => {
        this.allCategories = data;
        if(!data.length) {
          this.getFailure = "No categories available, please create a new one";
        }else {
          this.getFailure = "";
        }
        
      },
      error: (err) => {
        this.getFailure = err.error.error;
      }
    })

    this.userData = this.auth.isAuthenticated();
  }

  ngOnInit(): void {
  }
  // on updating a category, route to update category page with the category data
  onUpdate(category:any) {
    this.router.navigate(["/admin/updatecategory"], {
      state: {
        "category" : category
      }
    })
  }
  // on deleting a category
  onDelete(category:any) {
    const categoryIndex = this.allCategories.findIndex((eachCategory:any) => {
      return category._id == eachCategory._id;
    })

    this.admin.deleteCategory(category._id,this.userData.user._id,this.userData.token).subscribe({
      next: (data:any) => {
        this.deleteSuccess = data.message;
        this.deleteFailure = "";
        this.updateFailure="";
        this.allCategories.splice(categoryIndex,1);
      },
      error: (err) => {
        this.deleteFailure = err.error.error;
        this.deleteSuccess = "";
        this.updateFailure="";
      }
    })
  }

}
