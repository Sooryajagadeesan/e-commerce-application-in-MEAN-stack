import { CartComponent } from './components/core/cart/cart.component';
import { AdminbaseComponent } from './components/admin/adminbase/adminbase.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { CreatecategoryComponent } from './components/admin/createcategory/createcategory.component';
import { CreateproductComponent } from './components/admin/createproduct/createproduct.component';
import { ManageproductsComponent } from './components/admin/manageproducts/manageproducts.component';
import { UpdateproductComponent } from './components/admin/updateproduct/updateproduct.component';
import { ManagecategoriesComponent } from './components/admin/managecategories/managecategories.component';
import { UpdatecategoryComponent } from './components/admin/updatecategory/updatecategory.component';
import { HomeComponent } from './components/core/home/home.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { SignoutComponent } from './components/user/signout/signout.component';
import { OrderComponent } from './components/core/order/order.component';
import { PaymentsuccessComponent } from './components/core/paymentsuccess/paymentsuccess.component';
import { ManageordersComponent } from './components/admin/manageorders/manageorders.component';
import { ContactusComponent } from './components/core/contactus/contactus.component';
import { AboutusComponent } from './components/core/aboutus/aboutus.component';
import { PaymentfailureComponent } from './components/core/paymentfailure/paymentfailure.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "signout",
    component: SignoutComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin",
    component: AdminbaseComponent,
    canActivate: [AdminGuard],
    children : [
      {
        path: "dashboard",
        component: AdmindashboardComponent
      },
      {
        path: "createcategory",
        component: CreatecategoryComponent
      },
      {
        path: "createproduct",
        component: CreateproductComponent
      },
      {
        path: "manageproducts",
        component: ManageproductsComponent
      },
      {
        path: "updateproduct",
        component: UpdateproductComponent
      },
      {
        path: "managecategories",
        component: ManagecategoriesComponent
      },
      {
        path: "updatecategory",
        component: UpdatecategoryComponent
      },
      {
        path: "manageorders",
        component: ManageordersComponent
      },
      {
        path: "manageorders",
        component: ManageordersComponent
      }
    ]
  },
  {
    path:"cart",
    component: CartComponent,
  },
  {
    path: "order",
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "order/payment/success/:id",
    component: PaymentsuccessComponent,
    canActivate: [AuthGuard]
  
  },
  {
    path: "order/payment/failure/:id",
    component: PaymentfailureComponent,
    canActivate: [AuthGuard]
  
  },
  {
    path: "contactus",
    component: ContactusComponent,
  
  },
  {
    path: "aboutus",
    component: AboutusComponent,
  
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
