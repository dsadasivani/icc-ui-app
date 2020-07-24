import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    Feather.replace();
  }

  submitted: boolean = false;
  PaddingProd1: String = '';
  PaddingProd2: String = '';
  PaddingProd3: String = '';
  PaddingTd: String = '';
  PaddingCd: String = '';
  PaddingGst: String = '';

  addOrder:FormGroup;
  onLoadHideProd1: String = 'collapse';
  onLoadHideProd2: String = 'collapse';
  onLoadHideProd3: String = 'collapse';
  onLoadHideTd: String = 'collapse';
  onLoadHideCd: String = 'collapse';
  onLoadHideGst: String = 'collapse';
  
  constructor(private customValidator: CustomValidationService) { }

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
        productName: new FormControl(''),
        quantity: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()])),
        unitPrice: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()]))
      }),
      product2: new FormGroup({
        productName: new FormControl(''),
        quantity: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()])),
        unitPrice: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()]))
      }),
      product3: new FormGroup({
        productName: new FormControl(''),
        quantity: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()])),
        unitPrice: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()]))
      }),
      tradeDiscount: new FormControl(''),
      tradeDiscountValue: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()])),
      cashDiscount: new FormControl(''),
      cashDiscountValue: new FormControl('',Validators.compose([Validators.required, this.customValidator.numberValidator()])),
      orderScope: new FormControl('',Validators.required)
    });
    this.onPageLoadDisableField(['product1','product2','product3']);
    this.onCheckBoxChangeDisableField(['product1','product2','product3']);
    this.handleOtherTransport('transport','otherTransport');
    this.handleOtherTransport('terms','dueDate');
    this.handleOtherTransport('tradeDiscount','tradeDiscountValue');
    this.handleOtherTransport('cashDiscount','cashDiscountValue');
    this.handleOrderScope();
  }

  get orderFormControl() {
    return this.addOrder.controls;
  }

  productFormControl(value: any) {
    return this.addOrder.get(value)['controls'];
  }

  createOrder(){
    // prdt1: FormGroup;
    // this.prdt1 =  this.addOrder..
    // console.log(this.addOrder.get('product1')['controls']);
    this.submitted = true;
    if(this.addOrder.valid){
      console.log(this.addOrder.value);
      this.addOrder.reset();
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
  this.addOrder.get(value+'.productName').valueChanges
  .subscribe(selectedCountry => {
      if (!selectedCountry) {
        if(value == "product1") this.onLoadHideProd1 = 'unset';
        if(value == "product2") this.onLoadHideProd2 = 'unset';
        if(value == "product3") this.onLoadHideProd3 = 'unset';
          this.addOrder.get(value+'.quantity').disable();
          this.addOrder.get(value+'.quantity').reset(); 
          this.addOrder.get(value+'.unitPrice').disable();
          this.addOrder.get(value+'.unitPrice').reset();
          if(value == "product1") this.PaddingProd1 = '0px';
          if(value == "product2") this.PaddingProd2 = '0px';
          if(value == "product3") this.PaddingProd3 = '0px';
      }
      else {
        if(value == "product1") this.PaddingProd1 = '0.75rem 1.25rem';
        if(value == "product2") this.PaddingProd2 = '0.75rem 1.25rem';
        if(value == "product3") this.PaddingProd3 = '0.75rem 1.25rem';
        this.addOrder.get(value+'.quantity').enable();
        this.addOrder.get(value+'.unitPrice').enable();
      }
  }); 
}
}
handleOtherTransport(sourceControl: string, targetControl: string) {
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
      this.PaddingCd = '0px';
      this.PaddingTd = '0px';
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
}