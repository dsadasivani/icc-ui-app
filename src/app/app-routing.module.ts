import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { component: InvoiceFormComponent, path: 'add-invoice' },
  { component: DashboardComponent, path: 'dashboard' },
  { component: ProductsComponent, path: 'products' },
  { component: HomeComponent, path: '**' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
