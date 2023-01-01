import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendURLService } from '../backend/backend-url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendURL;
  
  constructor(public http:HttpClient,public backend:BackendURLService) { 
    this.backendURL = this.backend.getBackendURL();
  }

  // get a user by ID
  getUser(userId:any,token:any) {
    return this.http.get(`${this.backendURL}/user/${userId}`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  // update user profile (only name and lastname is updated)
  updateUserProfile(userData:any,field:any) {
    return this.http.put(`${this.backendURL}/user/${userData.user._id}`,field,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`
      }
    })
  }
}
