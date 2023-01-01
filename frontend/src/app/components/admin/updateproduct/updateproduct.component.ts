import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/adminuser/admin.service';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.scss']
})

export class UpdateproductComponent implements OnInit {
  product:any;
  allCategories:any;
  // indications for updation failure or success
  showError:any = false;
  success:any = false;
  failure:any = false;

  // variables to store the entered input in the templete driven forms
  name: any;
  description: any;
  stock: any;
  price: any;
  category: any;
  photo: any = undefined;

  user:any;
  defaultcategory:any;
  


  constructor(public router:Router, public auth:AuthService, public admin:AdminService) {
    try {
      this.product = this.router!.getCurrentNavigation()?.extras.state;
      this.product = this.product.product;
      this.defaultcategory = this.product.category._id;
    } catch(err) {
      this.product = {
        name: "",
        description:"",
        stock:"",
        price:"",
        category:"",
        photo:""
      };
    }


    this.name = this.product.name;
    this.description = this.product.description;
    this.price = this.product.price;
    this.stock = this.product.stock;
    this.category = this.product.category;
    

    this.admin.getAllCategories().subscribe({
      next: (data) => {
        this.allCategories = data;
      },
      error: (err) => {
        this.failure = err.error.error;
      }
    })
    this.user = this.auth.isAuthenticated();

  }

  ngOnInit(): void {
  }

  onSubmit() {
    //  all validations goes here
    if(!this.name || !this.description || !this.price || !this.category || !this.stock) {
      this.showError = "Please Provide all the fields";
      return;
    }


    const formData = new FormData();

    formData.append("name", this.name);
    formData.append("description", this.description);
    formData.append("price", this.price!.toString());
    formData.append("category", this.defaultcategory);
    formData.append("stock", this.stock!.toString());
    
    if(this.photo) {
      formData.append("photo", this.photo);
    }


    this.admin.updateProduct(this.product._id,this.user.user._id,this.user.token, formData).subscribe({
      next: (data) => {
        this.showError = false;
        this.failure = false;
        this.success = true;
        this.name = "";
        this.description = "";
        this.category = "";
        this.stock = undefined;
        this.price = undefined;
        // this.photo = "";
      },
      error: (err) => {
        this.failure = err.error.error;
        this.success = false;
      }
    })
  }

  // populate the photo variable when the user uploads a file
  onFileChange(event:any) {
    this.photo = event.target.files[0];
  }

  // check whether the 'Keep same photo' checkbox is clicked or not
  checked(event:any) {
    if(event.target.checked) {
      document.getElementById("product-photo")!.style.display = "none";
      document.getElementById("product-photo-validations")!.style.display = "none";
    }else {
      document.getElementById("product-photo")!.style.display = "block";
      document.getElementById("product-photo-validations")!.style.display = "block";

    }
  }

}