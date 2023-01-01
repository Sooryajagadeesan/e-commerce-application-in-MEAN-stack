import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/authentication/auth.service';
import {StripeService} from "ngx-stripe";
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  allCartItems;
  isSignedIn;
  // indication
  failure: any = "";

  constructor(public cart:CartService,public auth:AuthService,public stripeService:StripeService,public http:HttpClient) { 
    this.allCartItems = this.cart.loadCart();
    this.cart.isCartUpdatedObs.subscribe({
      next: (data) => {
        if(data) {
          this.allCartItems = this.cart.loadCart();
        }
        this.failure = "";
      },
      error: (err) => {
        this.failure = err.error.error;
      }
    })
    this.isSignedIn = this.auth.isAuthenticated();
  }

  // checkout -- in built code from the documentation
  checkout() {
    let userData = localStorage.getItem("jwt");
    let userId = JSON.parse(userData || "").user._id;

    let value = this.http.post('http://localhost:8000/api/stripepayment', {
     "items": this.allCartItems,
      "userId": userId
    })
      .pipe(
        switchMap((session:any) => {
          localStorage.setItem("paymentid",session.id);
          return this.stripeService.redirectToCheckout({ sessionId: session.id })
        })
      )

      .subscribe( {
        // If `redirectToCheckout` fails due to a browser or network
        // error, you should display the localized error message to your
        // customer using `error.message`.
        next: (result:any) => {
            this.failure = "";
        },
        error: (err) => {
          this.failure = err.toString();
        }
      });
  }

  ngOnInit(): void {
  }

}
