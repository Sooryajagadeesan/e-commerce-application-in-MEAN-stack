import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/adminuser/admin.service';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.scss']
})

export class CreateproductComponent implements OnInit {
  // field to store the photo value
  photo:any;

  // reactive form to get the product details
  createProductForm = new FormGroup({
    name: new FormControl("",[Validators.required,Validators.pattern(/^[a-zA-Z]/)]),
    description: new FormControl("",[Validators.required,Validators.pattern(/^[a-zA-Z]/)]),
    price: new FormControl("",[Validators.required,Validators.pattern(/^[^0-]+/)]),
    category: new FormControl("",[Validators.required]),
    stock: new FormControl("",[Validators.required,Validators.pattern(/^[^0-]+/)]),
    photo: new FormControl(""),
  })
  // fields for indication of success or failure
  showError = "";
  failure:any = false;
  success:any = false;
  user:any;
  // all catgories 
  allCategories:any;

  constructor(public admin:AdminService, public auth:AuthService) { 
    this.admin.getAllCategories().subscribe({
      next: (data) => {
        this.allCategories = data;
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.user = this.auth.isAuthenticated();
  }

  ngOnInit(): void {

  }

  onSubmit() {
    let {name, description,price,stock,photo,category} = this.createProductForm.controls;
    // destructuring for validation
    name = name.value;
    description = description.value;
    price = price.value;
    stock = stock.value;
    // photo = photo.value;
    
    category = category.value;

    // all validations
    if(!name || !description || !price || !category || !stock || !photo) {
      this.showError = "Please Provide all the fields";
      return;
    }

    // preparing the form data to be sent to the api
    const formData = new FormData();

    formData.append("name",name.toString());
    formData.append("description", description.toString());
    formData.append("price",price.toString());
    formData.append("category", category.toString());
    formData.append("stock",stock.toString());
    formData.append("photo",this.photo);


    this.admin.createProduct(this.user.user._id,this.user.token, formData).subscribe({
      next: (data) => {
        this.failure = false;
        this.success = true;
        this.createProductForm.reset();
        // this.photo = "";
        this.showError = "";
      },
      error: (err) => {
        this.failure = err.error.error;
        this.success = false;
        this.showError = err.error.error;
      }
    })
  }

  // photo field is populated when the user uploads a file(photo)
  onFileChange(event:any) {
    this.photo = event.target.files[0];
  }

}
