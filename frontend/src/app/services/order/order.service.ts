import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BackendURLService } from 'src/app/services/backend/backend-url.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  backendURL = "";
  
  constructor(public backend:BackendURLService, public http:HttpClient) { 
    this.backendURL = this.backend.getBackendURL();
  }

  // get all orders
  getAllOrders(userData:any) {
    return this.http.get(`${this.backendURL}/order/all/${userData.user._id}`,{
      headers : {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`
      }
    });
  }

  // get product by ID
  getProduct(productId:any) {
    return this.http.get(`${this.backendURL}/product/${productId}`);
  }

  
  // update status of a order
  updateOrderStatus(orderId:any,userId:any,token:any,status:any) {
    return this.http.put(`${this.backendURL}/order/${orderId}/status/${userId}`,status,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  }

}





