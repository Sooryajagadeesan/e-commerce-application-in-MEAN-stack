import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { BackendURLService } from '../backend/backend-url.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  userData:any;
  header:HttpHeaders;
  backendURL:string;

  constructor(public http:HttpClient,public backend:BackendURLService,public auth: AuthService) { 
    this.userData = this.auth.isAuthenticated();

    this.backendURL = this.backend.getBackendURL()
    this.header =  new HttpHeaders({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.userData.token}`
    });

  }

 
  // CATEGORY
  // create category 
  createCategory(name:string) {
    return this.http.post(`${this.backendURL}/category/create/${this.userData.user._id}`,{
      name
    }, {
      headers: this.header
    })
  }
  // get all categories
  getAllCategories() {
    return this.http.get(`${this.backendURL}/categories`)
  }

  // update category
  updateCategory(categoryId:string,userId:string,token:string,category:any) {
    this.header =  new HttpHeaders({
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.backendURL}/category/${categoryId}/${userId}`,category,{
      headers: this.header
    })
  }
  // delete category
  deleteCategory(categoryId:string,userId:string,token:string) {
    this.header =  new HttpHeaders({
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.backendURL}/category/${categoryId}/${userId}`,{
      headers: this.header
    })
  }

  // PRODUCTS
  // create product
  createProduct(userId:string,token:string,product:any) {
    this.header =  new HttpHeaders({
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.backendURL}/product/create/${userId}`,product,{
      headers: this.header
    })
  }
  // get all products
  getAllProducts(category:any="",sortBy:any="",limit:any="") {
    let query = ""
    if(category || sortBy || limit) {
      if(category) {
        query = query + `category=${category}&`;
      }

      if(sortBy) {
        query= query + `sortBy=${sortBy}&`;
      }

      if(limit) {
        query = query + `limit=${limit}&`;
      }

      query = query.slice(0,query.length-1);
      return this.http.get(`${this.backendURL}/products?${query}`);
    }
     else {
      return this.http.get(`${this.backendURL}/products`);
    }
  }
  // get a product by id
  getProduct(productId:string) {
    return this.http.get(`${this.backendURL}/product/${productId}`);
  }
  // update product
  updateProduct(productId:string,userId:string,token:string,product:any) {
    this.header =  new HttpHeaders({
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`${this.backendURL}/product/${productId}/${userId}`,product,{
      headers: this.header
    })
  }
  // delete product
  deleteProduct(productId:string,userId:string,token:string) {
    this.header =  new HttpHeaders({
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.backendURL}/product/${productId}/${userId}`,{
      headers: this.header
    })
  }

}
