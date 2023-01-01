import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // indication fields for checking whether the user is signed in, admin 
  isSignedIn:boolean = false;
  isAdmin:boolean = false;

  constructor(public auth:AuthService, public menu:MenuController) {
    
    this.auth.isAuthenticated(); // update the observable based on local storage
    this.auth.isAuthenticatedObs.subscribe({
      next: (data) => {
        this.isSignedIn = data;
      }
    })
    // this.isSignedIn = this.auth.isAuthenticated();
    this.auth.isAdminObs.subscribe({
      next: (data) => {
        this.isAdmin = data;
        console.log("I received ", data)
      }
    })
  }

  ngOnInit(): void {
  }

  // when menu opened (in mobile view)
  opened(event:any) {
    event.currentTarget.classList.add("no-z-index")
  }

  // when menu closed (in mobile view)
  closed(event:any) {
    event.currentTarget.classList.remove("no-z-index")
  }

  // triggers closing of menu when we click on the menu items (tabs)
  async closeMenu() {
    if(await this.menu.isOpen()) {
      this.menu.close();
    }
  }

}
