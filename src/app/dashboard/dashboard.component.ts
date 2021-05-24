import { OrderDetailsComponent } from './../order-details/order-details.component';
import { Orders } from './../model/orders.model';
import { Component, OnInit } from '@angular/core';
import { InvoiceFormService } from '../services/invoice-form.service';
import * as Feather from 'feather-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../services/invoice.service';

declare var require: any
const FileSaver = require('file-saver');

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
  noMoreData: boolean = true;
  fieldNameToSort: string = undefined;
  sortInReverse: boolean = true;
  filterText: string;

  // ngAfterViewInit(): void {
  //   Feather.replace();
  // }

  constructor(private invoiceService: InvoiceFormService, private modalService: NgbModal,  private invoiceContentService: InvoiceService) { }

  open(data: Orders) {
    const modalRef = this.modalService.open(OrderDetailsComponent, { size: 'lg', scrollable: true });
    modalRef.componentInstance.orderData = data;
  }

  ngOnInit(): void {
    Feather.replace();
    this.invoiceService.getOrders().subscribe((result => {
      this.collection = result;
      console.log(this.collection);

      this.ordersList = result.map((orders: Orders) => new Orders().deserialize(orders));
      // this.ordersListBatch = this.ordersList.splice(0,5);
      this.ordersListBatch = this.getOrdersBatch();
      if(this.ordersList.length == 0) { 
        this.noMoreData = true 
      }else{
        this.noMoreData = false 
      }
      console.log("Deserialized Object");
      console.log(this.ordersListBatch);
      this.loadingAlert = false;
      this.displayMessage = 'No records to display..';
      this.alertStr = 'alert-warning';
    }),
    (error => {
      this.loadingAlert = false;
      this.displayMessage = 'Error while fetching records from database. Please check connection..';
      this.alertStr = 'alert-danger';
      this.noMoreData = true;
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

  createFileURL(result: Blob): string{
    var newBlob = new Blob([result], { type: "application/pdf" });
      return window.URL.createObjectURL(newBlob);
  }
  viewInvoice(orderId: number){
    this.invoiceContentService.getFileContent(orderId).subscribe((result => {
      window.open(this.createFileURL(result), 'Invoice', "width=1100,height=600,top=100,left=100");
    }));
  }
  downloadInvoice(orderId: number){
    this.invoiceContentService.getFileContent(orderId).subscribe((result => {
      FileSaver.saveAs(this.createFileURL(result), "Invoice");
    }));
  }
  
}
