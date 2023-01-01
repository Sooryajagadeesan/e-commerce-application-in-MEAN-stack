import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { BackendURLService } from './services/backend/backend-url.service';
import { BaseComponent } from './components/core/base/base.component';
import { MenuComponent } from './components/core/menu/menu.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './components/user/signin/signin.component';
import { AuthService } from './services/authentication/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';
import { AdminbaseComponent } from './components/admin/adminbase/adminbase.component';
import { CreatecategoryComponent } from './components/admin/createcategory/createcategory.component';
import { AdminService } from './services/adminuser/admin.service';
import { CreateproductComponent } from './components/admin/createproduct/createproduct.component';
import { ManageproductsComponent } from './components/admin/manageproducts/manageproducts.component';
import { UpdateproductComponent } from './components/admin/updateproduct/updateproduct.component';
import { ManagecategoriesComponent } from './components/admin/managecategories/managecategories.component';
import { UpdatecategoryComponent } from './components/admin/updatecategory/updatecategory.component';
import { HomeComponent } from './components/core/home/home.component';
import { ProductComponent } from './components/core/product/product.component';
import { ProductService } from './services/core/product.service';
import { CartComponent } from './components/core/cart/cart.component';
import { CartService } from './services/cart/cart.service';
import { AdminGuard } from './guards/admin/admin.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { SignoutComponent } from './components/user/signout/signout.component';
import { OrderService } from './services/order/order.service';
import { NgxStripeModule } from 'ngx-stripe';
import { OrderComponent } from './components/core/order/order.component';
import { PaymentsuccessComponent } from './components/core/paymentsuccess/paymentsuccess.component';
import { ManageordersComponent } from './components/admin/manageorders/manageorders.component';
import { UserService } from './services/user/user.service';
import { ContactusComponent } from './components/core/contactus/contactus.component';
import { AboutusComponent } from './components/core/aboutus/aboutus.component';
import { PaymentfailureComponent } from './components/core/paymentfailure/paymentfailure.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    MenuComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    AdmindashboardComponent,
    AdminbaseComponent,
    CreatecategoryComponent,
    CreateproductComponent,
    ManageproductsComponent,
    UpdateproductComponent,
    ManagecategoriesComponent,
    UpdatecategoryComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    SignoutComponent,
    OrderComponent,
    PaymentsuccessComponent,
    ManageordersComponent,
    ContactusComponent,
    AboutusComponent,
    PaymentfailureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot("pk_test_51KZgXzSG1TDNbv5faa9FwrMmLRzJH5LNRYc2PCXMI5yv7GqwMSRXxGXawBh3LFxGAq1uwGsYfZotHvcSb4SvFlKV001gEDf3VV")
  ],
  providers: [BackendURLService,AuthService,AdminService,ProductService,CartService,OrderService,UserService,AdminGuard,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
