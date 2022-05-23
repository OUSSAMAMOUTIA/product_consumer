import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {CustomersComponent} from "./components/customers/customers.component";

const routes: Routes = [
  {path:"products", component: ProductsComponent},
  {path:"customers", component: CustomersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
