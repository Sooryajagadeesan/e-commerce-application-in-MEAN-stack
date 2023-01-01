import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/adminuser/admin.service';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
  styleUrls: ['./manageproducts.component.scss']
})
export class ManageproductsComponent implements OnInit {

  allProducts:any;
  // indications for deletion success or failure
  deleteSuccess = "";
  deleteFailure = "";

  getFailure = "";

  constructor(public admin:AdminService, public auth:AuthService,public router:Router) { 
    this.admin.getAllProducts().subscribe({
      next: (data:any) => {
        this.allProducts = data;
        if(!data.length) {
          this.getFailure = "No products out there, please create a new one"
        } else {
          this.getFailure = "";
        }
      },
      error: (err) => {
        this.getFailure = err.error.error;
      }
    })
  }

  ngOnInit(): void {

  }
  // on updating a product, route to update product page with the product data
  onUpdate(product:any) {
    this.router.navigate(["/admin/updateproduct"], {
      state: {
        product: product
      }
    })
  }

  // when deleting a product
  onDelete(product:any) {
    const userData = this.auth.isAuthenticated();
    const productIndex = this.allProducts.findIndex((prod:any) => {
      return prod._id === product._id;
    }) 

    this.admin.deleteProduct(product._id,userData.user._id,userData.token).subscribe({
      next: (data:any) => {
        this.deleteSuccess = data.message;
        this.deleteFailure = "";
        this.allProducts.splice(productIndex,1);

      },  
      error: (err) => {
        this.deleteSuccess = ""; 
        this.deleteFailure = err.error.error;
      }
    })
  }

}
