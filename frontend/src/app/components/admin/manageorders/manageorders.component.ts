import { OrderService } from './../../../services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-manageorders',
  templateUrl: './manageorders.component.html',
  styleUrls: ['./manageorders.component.scss']
})
export class ManageordersComponent implements OnInit {
  allOrders:any;
  orderedProducts:any;
  orderedUsers:any;

  // indication for fetch failure
  getFailure = "";

  userData:any;
  constructor(public order:OrderService,public router:Router,public alertController:AlertController) { 
    const data = localStorage.getItem("jwt") || '';
    this.userData = JSON.parse(data);

    this.order.getAllOrders(this.userData).subscribe(
      {
        next: (data:any) => {
          this.allOrders = data;
          console.log(this.allOrders)
          if(!data.length) {
            this.getFailure = "No orders as of now !"
          }else {
            this.getFailure = "";
          }
        },
        error: (err) => {
          this.getFailure = err.error.error;
        }
      }
    )
    
  }




  ngOnInit(): void {
    
  }

  // alert box for updating the status of the order
  async presentAlertRadio(event:any,defaultStatus:any,orderId:any,statusViewId:any) {
    let received = "Received";
    let processing = "Processing";
    let shipped = "Shipped";
    let delivered = "Delivered";
    let cancelled = "Cancelled";


    let isReceived = defaultStatus.status.toLowerCase() === received.toLowerCase();
    let isProcessing = defaultStatus.status.toLowerCase() === processing.toLowerCase();
    let isShipped = defaultStatus.status.toLowerCase() === shipped.toLowerCase();
    let isDelivered = defaultStatus.status.toLowerCase() === delivered.toLowerCase();
    let isCancelled = defaultStatus.status.toLowerCase() === cancelled.toLowerCase();

    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Order Status',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: received,
          value: 'Received',
          handler: (data) => {
            this.updateStatus(event,orderId,{"status": data.value},statusViewId,defaultStatus);
            alert.dismiss();
          },
          checked: isReceived
        },
        {
          name: 'radio2',
          type: 'radio',
          label: processing,
          value: 'Processing',
          handler: (data) => {
            this.updateStatus(event,orderId,{"status": data.value},statusViewId,defaultStatus);

            alert.dismiss();
          },
          checked: isProcessing
        },
        {
          name: 'radio3',
          type: 'radio',
          label: shipped,
          value: 'Shipped',
          handler: (data) => {
            this.updateStatus(event,orderId,{"status": data.value},statusViewId,defaultStatus);

            alert.dismiss();
          },
          checked: isShipped
        },
        {
          name: 'radio4',
          type: 'radio',
          label: delivered,
          value: 'Delivered',
          handler: (data) => {
            this.updateStatus(event,orderId,{"status": data.value},statusViewId,defaultStatus);
            

            alert.dismiss();
          },
          checked: isDelivered

        },
        {
          name: 'radio5',
          type: 'radio',
          label: cancelled,
          value: 'Cancelled',
          handler: (data) => {
            this.updateStatus(event,orderId,{"status": data.value},statusViewId,defaultStatus);
            alert.dismiss();
          },
          checked: isCancelled
        },
      ],
      
    });

    await alert.present();

  }

  updateStatus(event:any,orderId:any,newStatus:any,statusViewId:any,defaultStatus:any) {
    
    this.order.updateOrderStatus(orderId,this.userData.user._id,this.userData.token,newStatus).subscribe({
      next: (data) => {
        document.getElementById(statusViewId)!.textContent = newStatus.status;
        defaultStatus.status = newStatus.status;
      },
      error: (err:any) => {
        let errorMessage = "Cannot Update, error while saving user in DB";
        let errorElement = document.createElement("p");
        errorElement.style.fontSize = "18px";
        errorElement.style.color = "red";

        errorElement.textContent = errorMessage;
        event.target.parentElement.append(errorElement);

        setTimeout(()=> {
          errorElement.remove();
        },5000)
      }
    })
  }
}
