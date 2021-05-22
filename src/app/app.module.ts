import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { NgxLoadingXConfig, POSITION, SPINNER, NgxLoadingXModule  } from 'ngx-loading-x';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { SortPipe } from './pipes/sort.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceFormComponent,
    DashboardComponent,
    ProductsComponent,
    HomeComponent,
    ScrollToTopComponent,
    NumbersOnlyDirective,
    SortPipe,
    OrderDetailsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
