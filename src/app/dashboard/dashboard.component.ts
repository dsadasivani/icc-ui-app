import { Orders } from './../model/orders.model';
import { Component, OnInit } from '@angular/core';
import { InvoiceFormService } from '../services/invoice-form.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  alertStr: string;
  displayMessage: string;
  public collection:any;
  public ordersList = new Array<Orders>();
  loadingAlert:boolean = true;

  constructor(private invoiceService: InvoiceFormService) { }

  ngOnInit(): void {
    this.invoiceService.getOrders().subscribe((result => {
      this.collection = result;
      console.log(this.collection);

      this.ordersList = result.map((orders: Orders) => new Orders().deserialize(orders));
      console.log("Deserialized Object");
      console.log(this.ordersList);
      this.loadingAlert = false;
      this.displayMessage = 'No records to display..';
      this.alertStr = 'alert-warning';
    }),
    (error => {
      this.loadingAlert = false;
      this.displayMessage = 'Error while fetching records from database. Please check connection..';
      this.alertStr = 'alert-danger';
    }))
  }

  // setAlert(alertStr: string): void {
  //   this.alertStr = alertStr;
  // }

}
