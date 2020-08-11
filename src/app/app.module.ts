import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { NgxLoadingXConfig, POSITION, SPINNER, NgxLoadingXModule  } from 'ngx-loading-x';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceFormComponent,
    DashboardComponent,
    ProductsComponent,
    HomeComponent,
    ScrollToTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxLoadingXModule.forRoot({
      show: false,
      bgBlur: 2,
      bgColor: 'rgba(40, 40, 40, 0.5)',
      bgOpacity: 5,
  bgLogoUrl: '',
  bgLogoUrlPosition: POSITION.topLeft,
  bgLogoUrlSize: 100,
  spinnerType: SPINNER.xBallSpin,
  spinnerSize: 80,
  spinnerColor: '#343a40',
  spinnerPosition: POSITION.centerCenter,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
