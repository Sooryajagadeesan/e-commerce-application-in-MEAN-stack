import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public router:Router) {

  }
  // admin route guard
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(typeof window !== "undefined") {
      if(localStorage.getItem("jwt")) {
        let userData:any = localStorage.getItem("jwt") || "";
        userData = JSON.parse(userData);
        if(userData.user.role === 1) {
          return true; // only if admin
        }else {
          this.router.navigateByUrl("/home")
          return false;
        }
      }else {
        this.router.navigateByUrl("/signin");
        return false;
      }
    } else {
      this.router.navigateByUrl("/signin");
      return false;
    }
  }
  
}
