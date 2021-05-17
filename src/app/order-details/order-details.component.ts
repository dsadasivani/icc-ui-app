import { Orders } from './../model/orders.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  @Input() name: Orders;

  constructor(public  activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
