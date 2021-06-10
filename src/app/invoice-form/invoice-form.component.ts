import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';
import { InvoiceFormService } from '../services/invoice-form.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit, AfterViewInit {

  invoiceDate: NgbDateStruct;
  alert:boolean = false;
  connectionAlert:boolean = false;
  loadingAlert:boolean = false;
  gstInput = '';

  ngAfterViewInit(): void {
    Feather.replace();
  }

  constructor(private customValidator: CustomValidationService, private invoiceService: InvoiceFormService) { }

  submitted: boolean = false;
  hidePriceCalcOnSubmit: boolean = false;
  PaddingProd1: String = '';
  PaddingProd2: String = '';
  PaddingProd3: String = '';
  PaddingTd: String = '';
  PaddingCd: String = '';
  PaddingGst: String = '';

  addOrder:FormGroup;
  onLoadHideProd1: String = 'collapse multi-collapse';
  onLoadHideProd2: String = 'collapse multi-collapse';
  onLoadHideProd3: String = 'collapse multi-collapse';
  onLoadHideTd: String = 'collapse multi-collapse';
  onLoadHideCd: String = 'collapse multi-collapse';
  onLoadHideGst: String = 'collapse multi-collapse';
  
  productList: number = 0;
  readonly DELIMITER = '-';
  

  ngOnInit(): void {
   
    this.addOrder = new FormGroup({
      companyName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      address2: new FormControl(''),
      gstin: new FormControl('', Validators.compose([Validators.required, this.customValidator.alphaNumericValidator()])),
      phoneNumber: new FormControl('', Validators.compose([Validators.required, this.customValidator.numberValidator(),Validators.minLength(10)])),
      salesPersonName: new FormControl(''),
      transport: new FormControl('', Validators.required),
      otherTransport: new FormControl('', Validators.required),
      fobPoint: new FormControl(''),
      terms: new FormControl('',Validators.required),
      dueDate: new FormControl('', Validators.required),
      product1: new FormGroup({
        productSelected: new FormControl(false),
        quantity: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()])),
        unitPrice: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()]))
      }),
      product2: new FormGroup({
        productSelected: new FormControl(false),
        quantity: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()])),
        unitPrice: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()]))
      }),
      product3: new FormGroup({
        productSelected: new FormControl(false),
        quantity: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()])),
        unitPrice: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()]))
      }),
      tradeDiscount: new FormControl(''),
      tradeDiscountValue: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()])),
      cashDiscount: new FormControl(''),
      cashDiscountValue: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()])),
      orderScope: new FormControl('',Validators.required),
      invoiceNumber: new FormControl('',Validators.required),
      invoiceDate: new FormControl('')
    });
    this.onInitFunctionCalls();
  }

  private onInitFunctionCalls() {
    this.onPageLoadDisableField(['product1', 'product2', 'product3']);
    this.onCheckBoxChangeDisableField(['product1', 'product2', 'product3']);
    this.handleOtherTransportAndTerms('transport', 'otherTransport');
    this.handleOtherTransportAndTerms('terms', 'dueDate');
    this.handleOtherTransportAndTerms('tradeDiscount', 'tradeDiscountValue');
    this.handleOtherTransportAndTerms('cashDiscount', 'cashDiscountValue');
    this.handleOrderScope();
  }
  private onSubmitResetFields() {
    this.submitted = false;
    this.PaddingProd1 = '';
    this.PaddingProd2 = '';
    this.PaddingProd3 = '';
    this.PaddingTd = '';
    this.PaddingCd = '';
    this.PaddingGst = '';
    this.onLoadHideProd1 = 'collapse';
    this.onLoadHideProd2 = 'collapse';
    this.onLoadHideProd3 = 'collapse';
    this.onLoadHideTd = 'collapse';
    this.onLoadHideCd = 'collapse';
    this.onLoadHideGst = 'collapse';
    this.productList = 0;
  }

  get orderFormControl() {
    return this.addOrder.controls;
  }

  productFormControl(value: any) {
    return this.addOrder.get(value)['controls'];
  }

  jsonToString(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + (date.month.toString.length==1 ? '0'+date.month: date.month) + this.DELIMITER + (date.day.toString.length==1 ? '0'+date.day: date.day) : null;
  }

  createOrder(){
    this.submitted = true;
    if(this.addOrder.valid){
      this.addOrder.patchValue({invoiceDate: this.jsonToString(this.addOrder.get('invoiceDate').value)})
      this.hidePriceCalcOnSubmit = true;
      window.scroll({ 
        top: 200, 
        left: 0, 
        behavior: 'smooth' 
      });
      this.loadingAlert = true;
      this.invoiceService.addOrderDetails(this.addOrder.value).subscribe((result => {
        this.addOrder.reset();
        this.onSubmitResetFields();
        this.onInitFunctionCalls();
        
        console.log('Data persisted on server', result);
        this.alert = true;
        this.loadingAlert = false;
      }),
      (error => { 
        console.log('Error occured while connecting to DB.', error);
        this.connectionAlert = true;
        this.loadingAlert = false;
      })
      );
      
      this.submitted = false;
    }
  }

onPageLoadDisableField(list: any[]) {
  for(let value of list){
    this.addOrder.get(value+'.quantity').disable();
    this.addOrder.get(value+'.quantity').reset(); 
    this.addOrder.get(value+'.unitPrice').disable();
    this.addOrder.get(value+'.unitPrice').reset();
  }
}

onCheckBoxChangeDisableField(list: any[]) {
  this.PaddingProd1 = '0px';
  this.PaddingProd2 = '0px';
  this.PaddingProd3 = '0px';
  // this.onLoadHide = 'unset';
  for(let value of list){
  this.addOrder.get(value+'.productSelected').valueChanges
  .subscribe(selectedProduct => {
      if (!selectedProduct) {
        if(value == "product1") {this.onLoadHideProd1 = 'unset'
                                 this.PaddingProd1 = '0px'
                                 this.productList--}
        if(value == "product2") {this.onLoadHideProd2 = 'unset'
                                 this.PaddingProd2 = '0px'
                                 this.productList--}
        if(value == "product3") {this.onLoadHideProd3 = 'unset'
                                 this.PaddingProd3 = '0px' 
                                 this.productList--}
          this.addOrder.get(value+'.quantity').disable();
          this.addOrder.get(value+'.quantity').reset(); 
          this.addOrder.get(value+'.unitPrice').disable();
          this.addOrder.get(value+'.unitPrice').reset();
      }
      else {
        if(value == "product1") {this.PaddingProd1 = '0.75rem 1.25rem';this.productList++}
        if(value == "product2") {this.PaddingProd2 = '0.75rem 1.25rem';this.productList++}
        if(value == "product3") {this.PaddingProd3 = '0.75rem 1.25rem';this.productList++}
        this.addOrder.get(value+'.quantity').enable();
        this.addOrder.get(value+'.unitPrice').enable();
      }
  }); 
}
}
handleOtherTransportAndTerms(sourceControl: string, targetControl: string) {
  this.PaddingTd = '0px';
  this.PaddingCd = '0px';
  this.addOrder.get(targetControl).disable();
  this.addOrder.get(targetControl).reset();

  this.addOrder.get(sourceControl).valueChanges.subscribe(selectedValue => {
    if((sourceControl == 'transport' && selectedValue == 'OTHERS') 
      || (sourceControl == 'terms' && selectedValue == 'Credit')){
        this.addOrder.get(targetControl).enable();
      }else if(sourceControl == 'tradeDiscount' && selectedValue){
        this.addOrder.get(targetControl).enable();
        this.onLoadHideTd = 'unset';
        this.PaddingTd = '0.75rem 1.25rem';
      }
      else if(sourceControl == 'cashDiscount' && selectedValue){
        this.addOrder.get(targetControl).enable();
        this.onLoadHideCd = 'unset';
        this.PaddingCd = '0.75rem 1.25rem';
      }
    else{
      if(sourceControl == 'cashDiscount' && !selectedValue) this.PaddingCd = '0px';
      if(sourceControl == 'tradeDiscount' && !selectedValue) this.PaddingTd = '0px';
      this.addOrder.get(targetControl).disable();
      this.addOrder.get(targetControl).reset();
    }
  })
}
handleOrderScope(){
  this.PaddingGst = '0px';
  this.addOrder.get('orderScope').valueChanges.subscribe(selectedValue => {
    if(selectedValue == 'state' || selectedValue == 'interState'){
      this.onLoadHideGst = 'unset';
      this.PaddingGst = '0.75rem 1.25rem';
    }else{
      this.PaddingGst = '0px';
      this.onLoadHideGst = 'collapse';
    }
  });
}

get prod1Quantity() {
  let value = this.addOrder.get('product1.quantity').value
  return (value == undefined) ? 0 : value
}
get prod1UnitPrice() {
 let value = this.addOrder.get('product1.unitPrice').value
 return (value == undefined) ? 0 : value
}
get prod2Quantity() {
  let value = this.addOrder.get('product2.quantity').value
  return (value == undefined) ? 0 : value
}
get prod2UnitPrice() {
 let value = this.addOrder.get('product2.unitPrice').value
 return (value == undefined) ? 0 : value
}
get prod3Quantity() {
  let value = this.addOrder.get('product3.quantity').value
  return (value == undefined) ? 0 : value
}
get prod3UnitPrice() {
 let value = this.addOrder.get('product3.unitPrice').value
 return (value == undefined) ? 0 : value
}

get tradeDiscount() {
  let value = this.addOrder.get('tradeDiscountValue').value
  return (value == undefined) ? 0 : value
 }

 get cashDiscount() {
  let value = this.addOrder.get('cashDiscountValue').value
  return (value == undefined) ? 0 : value
 }

getTotalValue():number {
  return ((this.prod1Quantity * this.prod1UnitPrice) + 
          (this.prod2Quantity * this.prod2UnitPrice) + 
          (this.prod3Quantity * this.prod3UnitPrice))
}

getTradeDiscountAmt():number {
  return this.getTotalValue() * this.tradeDiscount/100;
}

getCashDiscountAmt():number {
  return (this.getTotalValue() - this.getTradeDiscountAmt()) * this.cashDiscount/100;
}

getGstAmt():number {
  return (this.getTotalValue() - this.getTradeDiscountAmt() - this.getCashDiscountAmt()) * 18/100;
}

getCalculatedTotal():number {
  return (this.getTotalValue() - this.getTradeDiscountAmt() - this.getCashDiscountAmt() + this.getGstAmt());
}

closeAlert(value){
  value = false;
  this.connectionAlert = false;
  this.alert = false;
  this.hidePriceCalcOnSubmit = false;
}

}
