import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DiscountComponent } from './discount/discount.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { SignUpComponent } from './authorization/sign-up/sign-up.component';

const routes: Routes = [ 
  {path: '', component: MenuComponent},
  {path: 'home', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'discount', component: DiscountComponent},
  {path: 'authorization', component: AuthorizationComponent},
  {path: 'sign-up', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
