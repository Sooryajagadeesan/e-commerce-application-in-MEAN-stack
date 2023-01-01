import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _isCartUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isCartUpdatedObs: Observable<boolean> = this._isCartUpdated.asObservable();
  

  constructor(public router:Router) { }

  // add item to cart
  addItemToCart(product:any) {
    let cart:any =[];

    // check if product has quantity or not, if not make it as 1 
    if(!product.quantity) {
      product.quantity = 1;
    }
    
    if(typeof window !== "undefined") {
      if(localStorage.getItem("cart")) {
        const data = localStorage.getItem("cart") || "";
        cart = JSON.parse(data);
      }
      // cart.push({...product});

      let status = true;
      let outOfStock = false; // to keep track of 'out of stock'

      cart.forEach((prod:any,index:number) => {
        if(product._id == prod._id) {
          status = false;
          if(prod.quantity) {
            if(prod.quantity < prod.stock) {
              prod.quantity = prod.quantity + 1;
              product.quantity = product.quantity + 1;
            }else {
              outOfStock = true;
            }
          }else {
            prod.quantity = 1;
          }
         
        }
      })
      if(status) {
        cart.push({...product});
      }
      localStorage.setItem("cart",JSON.stringify(cart));
      // this._isCartUpdated.next(true);

      return outOfStock;
    }
    return
  }

  // load cart items from the local storage
  loadCart() {
    if(typeof window !== "undefined") {
      if(localStorage.getItem("cart")) {
        const data = localStorage.getItem("cart") || "";
        return JSON.parse(data);
      }
    }
  }

  // remove item from cart, returns the index of updated item
  removeItemFromCart(product:any) {
    let cart:any =[];
    let indexOfRemovedItem = -1;

    if(typeof window !== "undefined") {
      if(localStorage.getItem("cart")) {
        const data = localStorage.getItem("cart") || "";
        cart = JSON.parse(data);
      }
      
      cart.forEach((prod:any,index:number) => {
        if(product._id == prod._id) {
          if(prod.quantity > 1) {
            prod.quantity = prod.quantity - 1;
            product.quantity = product.quantity -1;
          }else {
            cart.splice(index,1);
            product.quantity = 0;
            indexOfRemovedItem = index;
          }
        }
      })

      // after removing, updating the cart
      localStorage.setItem("cart",JSON.stringify(cart));
      
    }
    return indexOfRemovedItem;
  }

  // delete item from cart, REMOVES THE ITEM COMPLETELY, returns index of deleted item to update the UI
  deleteItemFromCart(product:any) {
    let cart:any =[];

    let indexOfDeletedItem = -1;

    if(typeof window !== "undefined") {
      if(localStorage.getItem("cart")) {
        const data = localStorage.getItem("cart") || "";
        cart = JSON.parse(data);
      }
      
      cart.forEach((prod:any,index:number) => {
        if(product._id == prod._id) {
            product.quantity = 0;
            cart.splice(index,1);
            indexOfDeletedItem = index;
        }
      })

      localStorage.setItem("cart",JSON.stringify(cart));
    }
    return indexOfDeletedItem;
  }

  // empty the cart, remove the cart from the local storage
  emptyCart(next:any) {
    if(typeof window !== "undefined") {
      localStorage.removeItem("cart");
      next();
    }
  }

  // get total amount of the cart items (not used, because the function is placed at the cart .ts file as it is used only in the cart page)
  getTotalAmount() {
    let cart = [];
    if(localStorage.getItem("cart")) {
      const data = localStorage.getItem("cart") || "";
      cart = JSON.parse(data);
    }
    return cart.reduce((previousValue:any, product:any) => {
      return previousValue + product.price * product.quantity;
    },0)
  }

}
