import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DiscountComponent } from './discount/discount.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';

const routes: Routes = [ 
  {path: '', component: MenuComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'delivery', component: DeliveryComponent},
  {path: 'discount', component: DiscountComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin-discount', component: AdminDiscountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
