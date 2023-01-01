import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router:Router) {

  }

  // authentication guard
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(typeof window !== "undefined") {
      if(localStorage.getItem("jwt")) {
        let userData =  localStorage.getItem("jwt") || "";
        userData = JSON.parse(userData);
        return true;
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
