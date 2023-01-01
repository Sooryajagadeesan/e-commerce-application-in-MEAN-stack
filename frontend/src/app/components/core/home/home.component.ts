import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/core/product.service';
import { ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/services/adminuser/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allProducts:any = [];
  // fields to store the filter options
  selectedCategory= "";
  selectedLimit= "";
  selectedSorting = "";

  allCategories:any = [];
  //  indication fields
  failure:any = "";
  categoryFetchFailure = "";


  constructor(public productService:ProductService, public toastController: ToastController,public admin:AdminService) {
    this.productService.getAllProducts().subscribe({
      next: (data:any) => {
        this.allProducts = data;
        this.failure = "";
      },
      error: (err) => {
        this.failure = err.error.error;
      },
      complete: () => {
        this.allProducts = this.allProducts.filter((product:any) => {
          if(product.stock > 0) {
            return product;
          }
        })
      }
    })

    // get all categories for filtering purpose
    this.admin.getAllCategories().subscribe({
      next: (data:any) => {
        this.allCategories = data;
        this.categoryFetchFailure = "";
      },
      error: (err) => {
        this.categoryFetchFailure = err.error.error;
      }
    })

  }

  // checking for the entered filter values
  ngOnInit(): void {
    let seletedCategory = <HTMLInputElement>document.getElementById("select-category");
    let seletedSorting = <HTMLInputElement>document.getElementById("select-sorting");
    let seletedLimit = <HTMLInputElement>document.getElementById("select-limit");

    seletedCategory?.addEventListener("change",(event) => {
      let selectedCategoryValue = seletedCategory.value.trim();

      if(selectedCategoryValue.toLocaleLowerCase() !== "all") {
        this.selectedCategory = selectedCategoryValue;
      }else {
        this.selectedCategory = "";
      }

    })
    seletedSorting?.addEventListener("change",(event) => {
      let selectedSortingValue = seletedSorting.value.trim();

      if(selectedSortingValue.toLocaleLowerCase() !== "id") {
        this.selectedSorting = selectedSortingValue;
      }else {
        this.selectedSorting = "";
      }

    })
    seletedLimit?.addEventListener("change",(event) => {
      let selectedLimitValue = seletedLimit.value.trim();

      if(selectedLimitValue.toLocaleLowerCase() !== "15") {
        this.selectedLimit = selectedLimitValue;
      }else {
        this.selectedLimit = "";
      }

    })

  }

  // toast message when an item is added to cart
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Item Added To Cart',
      duration: 2000
    });
    toast.present();
  }

  onFilter() {
    this.admin.getAllProducts(this.selectedCategory,this.selectedSorting,this.selectedLimit).subscribe({
      next: (data:any) => {
        this.allProducts = data;
        this.failure = "";
      },
      error: (err) => {
        this.failure = err.error.error;
      },
      complete: () => {
        this.allProducts = this.allProducts.filter((product:any) => {
          if(product.stock > 0) {
            return product;
          }
        })
      }
    })



  }
}
