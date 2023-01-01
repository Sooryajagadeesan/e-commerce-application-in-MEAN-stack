import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData:any;
  userProfile:any = [];
  // indication field
  failure:any = "";

  constructor(public user:UserService,public alertController:AlertController) {
    let userObj = localStorage.getItem("jwt") || "";
    userObj = JSON.parse(userObj);
    this.userData = userObj;


    this.user.getUser(this.userData.user._id,this.userData.token).subscribe({
      next: (data:any) => {
        this.userProfile.push(data);
        this.failure = "";
      },
      error: (err) => {
        this.failure = err.error.error;
      }
    })
  }

  ngOnInit(): void {
    
  }

  // update user name, lastname
  updateProfile(propertyToBeUpdated:any) {
    let key = Object.keys(propertyToBeUpdated)[0];
    let propertyValue = propertyToBeUpdated[key];
    if(key === "name" && !propertyValue) {
      document.querySelector(".name-error")!.textContent ="Name cannot be empty";
      return;
    } else if(key === "lastname" && !propertyValue) {
      document.querySelector(".lastname-error")!.textContent = "Last Name cannot be empty";
      return;
    }
    this.user.updateUserProfile(this.userData,propertyToBeUpdated).subscribe({
      next: (data:any) => {
        if(data) {
          this.userData.user.name = data.name;
          this.userData.user.lastname = data.lastname;
          document.querySelector(".name-error")!.textContent ="";
          document.querySelector(".lastname-error")!.textContent = "";
        }
      },
      error: (err:any) => {
        if(propertyToBeUpdated?.name) {
          document.querySelector(".name-error")!.textContent = err.error.error;

        }else if(propertyToBeUpdated?.lastname) {
          document.querySelector(".lastname-error")!.textContent = err.error.error;
        }
      }
    })
  }

  // update name alert prompt
  async nameAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit your Name',
      inputs: [
        {
          name: 'name',
          label: "Name",
          type: 'text',
          value: this.userData.user.name,
          placeholder: 'Enter new name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        
        }, {
          text: 'Ok',
          handler: (data) => {
            this.updateProfile(data);
          }
        }
      ]
    });

    await alert.present();
  }

  // update last name alert prompt
  async lastnameAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit your Last Name',
      inputs: [
        {
          name: 'lastname',
          label: "LastName",
          type: 'text',
          value: this.userData.user.lastname,
          placeholder: 'Enter new lastname',
        
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        
        }, {
          text: 'Ok',
          handler: (data) => {
            this.updateProfile(data);
          }
        }
      ]
    });

    await alert.present();
  }
}
