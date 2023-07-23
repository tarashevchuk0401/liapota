import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin-discount', component: AdminDiscountComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
