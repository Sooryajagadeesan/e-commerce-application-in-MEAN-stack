import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.scss']
})
export class PaymentsuccessComponent implements OnInit {
  showSuccessMessage = false;
  showRedirectMessage = false;
  constructor(public route:ActivatedRoute, public router:Router) {
    if(route.snapshot.params["id"] === localStorage.getItem("paymentid")) {
      localStorage.removeItem("cart"); // removing items from the cart
      this.showSuccessMessage = true;
      localStorage.removeItem("paymentid");
    } else {
      this.showRedirectMessage = true;
    }
  }

  ngOnInit(): void {
    
  }

}
