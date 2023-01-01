import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendURLService } from '../backend/backend-url.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  backendURL = "";

  constructor(public http:HttpClient,public backend:BackendURLService) {
    this.backendURL = this.backend.getBackendURL();
   }

  // get photo of a specific product
  getProductPhoto(product:any) {
    return this.http.get(`${this.backendURL}/product/photo/${product._id}`);
  }

  // get all the products from DB 
  getAllProducts() {
    return this.http.get(`${this.backendURL}/products`);
  }
}
