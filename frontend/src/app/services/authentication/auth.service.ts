import { Injectable } from '@angular/core';
import { BackendURLService } from '../backend/backend-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendURL:string = "";

  private _isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticatedObs: Observable<boolean> = this._isAuthenticatedSubject.asObservable();
  private _isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAdminObs: Observable<boolean> = this._isAdminSubject.asObservable();
  

  signupHeader:HttpHeaders = new HttpHeaders({
    Accept: "application/json",
    "Content-Type": "application/json"
  });
  
  constructor(private backend:BackendURLService, private http:HttpClient,public router:Router) { 
    this.backendURL = this.backend.getBackendURL();
  }

  // signup 
  signup(user:any) {
    return this.http.post(`${this.backendURL}/signup`,user,{headers: this.signupHeader})
  }

  // sign in
  signin(user:any) {
    return this.http.post(`${this.backendURL}/signin`,user,{headers: this.signupHeader})
  }
   
  // set the passed JWT and user info in the local storage
  authenticate(data:any,next:any) {
    if(typeof window !== "undefined") {
      localStorage.setItem("jwt",JSON.stringify(data));
      next();
    }
  }
  // sign out
  signout() {
    if(typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      localStorage.removeItem("paymentid");
      localStorage.removeItem("cart");
      this._isAuthenticatedSubject.next(false)
      return this.http.get(`${this.backendURL}/signout`);
    }
    return;
  }

  // cheks whether the user is signed In, updates the subject observables like _isAuthenticatedSubject and _isAdminSubject
  isAuthenticated() {
    if(typeof window === "undefined") {
      this._isAuthenticatedSubject.next(false)
      return false;
    }

    if(localStorage.getItem("jwt")) {
      const token:string = String(localStorage.getItem("jwt"));
      this._isAuthenticatedSubject.next(true); // authenticated


      if (JSON.parse(token).user.role === 1 ) {
        this._isAdminSubject.next(true);
      } else {
        this._isAdminSubject.next(false);
      }
      return JSON.parse(token);
      
    } else {
      this._isAuthenticatedSubject.next(false);
      this._isAdminSubject.next(false);
      return false;
    }
  }

}
