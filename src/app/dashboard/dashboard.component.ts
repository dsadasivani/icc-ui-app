import { OrderDetailsComponent } from './../order-details/order-details.component';
import { Orders } from './../model/orders.model';
import { Component, OnInit } from '@angular/core';
import { InvoiceFormService } from '../services/invoice-form.service';
import * as Feather from 'feather-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  public ordersListBatch = new Array<Orders>();
  loadingAlert:boolean = true;
  noMoreData: boolean = false;
  fieldNameToSort: string = undefined;
  sortInReverse: boolean = true;

  // ngAfterViewInit(): void {
  //   Feather.replace();
  // }

  constructor(private invoiceService: InvoiceFormService, private modalService: NgbModal) { }

  open() {
    const modalRef = this.modalService.open(OrderDetailsComponent);
    modalRef.componentInstance.name = this.ordersList[0];
  }

  ngOnInit(): void {
    Feather.replace();
    this.invoiceService.getOrders().subscribe((result => {
      this.collection = result;
      console.log(this.collection);

      this.ordersList = result.map((orders: Orders) => new Orders().deserialize(orders));
      // this.ordersListBatch = this.ordersList.splice(0,5);
      this.ordersListBatch = this.getOrdersBatch();
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

  public getOrdersBatch(): Array<Orders> {
    if(this.ordersList.length <= 10) {
      return this.ordersList.splice(0,this.ordersList.length);
    }
    return this.ordersList.splice(0,10);
  }

  public loadMore(): void {
      const data = this.getOrdersBatch();
      if (data.length == 0) {
        this.noMoreData = true;
      }
      this.ordersListBatch.push(...data);
  }

  sortByField(fieldName: string): void {
    this.fieldNameToSort = fieldName;
    this.sortInReverse = !this.sortInReverse;
  }

  // setAlert(alertStr: string): void {
  //   this.alertStr = alertStr;
  // }
  
}
