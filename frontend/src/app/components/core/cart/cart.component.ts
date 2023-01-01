import { CartService } from './../../../services/cart/cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import {StripeService} from "ngx-stripe";
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
// import { MystripeService } from 'src/app/services/stripe/mystripe.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  allCartItems:any=[];
  isSignedIn:any;
  // indication for "Is there cart items ?", initially no cart item is set to true, later it is changed in the constructor
  noCartItems = true;
  totalAmount = this.cart.getTotalAmount();

  constructor(public cart:CartService,public auth:AuthService,public stripeService:StripeService,public http:HttpClient) {
    this.allCartItems = this.cart.loadCart();
    if(this.allCartItems) {
      if(this.allCartItems.length > 0) {
        this.noCartItems = false;
      }else {
        this.noCartItems = true;
      }
    }
   
    this.isSignedIn = this.auth.isAuthenticated();
  }

  ngOnInit(): void {
  }

  // get total amount for the items in the cart
  getTotalAmount() {
    if(this.allCartItems) {
      return this.allCartItems.reduce((previousValue:any, product:any) => {
        return previousValue + product.price * product.quantity;
      },0)
    }
    return 0;
  }

  // method to get the count of products displayed in the page
  getCountOfItems() {
    return document.querySelectorAll("app-product").length;
  }
}
