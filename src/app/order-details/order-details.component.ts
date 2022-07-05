import { InvoiceService } from './../services/invoice.service';
import { Orders } from './../model/orders.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  @Input()
  orderData: Orders;

  constructor(
    public activeModal: NgbActiveModal,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {}

  getOrderScope(): string {
    return this.orderData.igstFlag ? 'Inter-State' : 'Within State';
  }

  getTerms(): string {
    return this.orderData.terms == 'Credit'
      ? this.orderData.terms + ' (' + this.orderData.dueDate + ' Days)'
      : this.orderData.terms;
  }

  createFileURL(result: Blob): string {
    var newBlob = new Blob([result], { type: 'application/pdf' });
    return window.URL.createObjectURL(newBlob);
  }
  viewInvoice(orderId: number) {
    this.invoiceService.getFileContent(orderId).subscribe((result) => {
      window.open(
        this.createFileURL(result),
        'Invoice',
        'width=1100,height=600,top=100,left=100'
      );
    });
  }
  downloadInvoice(orderId: number) {
    this.invoiceService.getFileContent(orderId).subscribe((result) => {
      FileSaver.saveAs(this.createFileURL(result), 'Invoice');
    });
  }
}
