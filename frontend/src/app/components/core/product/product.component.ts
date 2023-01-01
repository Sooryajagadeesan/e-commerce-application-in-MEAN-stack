import { ProductService } from './../../../services/core/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastController } from '@ionic/angular';
import { BackendURLService } from 'src/app/services/backend/backend-url.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() addToCart = true;
  @Input() removeFromCart = false;
  @Input() product : any
  @Input() showModifyBtns = false;

  productPhoto:any;



  constructor(public backend:BackendURLService,public cart:CartService,public toastController:ToastController) { 
    
   }

  ngOnInit(): void {
    this.productPhoto = `${this.backend.getBackendURL()}/product/photo/${this.product._id}`;
  }

  // on add to cart
  onAddToCart() {
    let isOutOfStock = this.cart.addItemToCart(this.product);
    if(isOutOfStock) {
      this.outOfStockToast();
    }else {
      this.itemAddedToast();
    }
  }

  // on increment the quantity of product
  incrementCartItem() {
    let isOutOfStock = this.cart.addItemToCart(this.product);

    if(isOutOfStock) {
      this.outOfStockToast();
    }
  }
  
  // on decrement the quantity of product
  onRemoveFromCart() {
    let indexOfRemovedItem = this.cart.removeItemFromCart(this.product);
    this.removeItemFromView(indexOfRemovedItem);

  }

  // on entirely removing the product from cart
  onDeleteFromCart() {
    let indexOfDeletedItem = this.cart.deleteItemFromCart(this.product);
    this.removeItemFromView(indexOfDeletedItem);
  }

  // removes the product from the view
  removeItemFromView(indexOfDeletedItem:any) {
    if(indexOfDeletedItem !== -1) {
      document.querySelectorAll("ion-card")[indexOfDeletedItem].remove();
    }
  }

  // item added to cart toast
  async itemAddedToast() {
    const toast = await this.toastController.create({
      message: 'Item Added to cart',
      duration: 500
    });
    toast.present();
  }

  // item out of stock toast
  async outOfStockToast() {
    const toast = await this.toastController.create({
      message: 'Item out of stock',
      duration: 500
    });
    toast.present();
  }
}
