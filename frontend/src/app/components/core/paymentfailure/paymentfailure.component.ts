import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paymentfailure',
  templateUrl: './paymentfailure.component.html',
  styleUrls: ['./paymentfailure.component.scss']
})
export class PaymentfailureComponent implements OnInit {
  // indication fields
  showFailureMessage = false;
  showRedirectMessage = false;

  constructor(public route:ActivatedRoute, public router:Router) { 
    if(route.snapshot.params["id"] === localStorage.getItem("paymentid")) {
      this.showFailureMessage = true;
      localStorage.removeItem("paymentid");
    } else {
      this.showRedirectMessage = true;
    }
  }

  ngOnInit(): void {
  }

}
