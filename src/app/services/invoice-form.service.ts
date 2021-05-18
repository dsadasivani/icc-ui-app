import { environment } from './../../environments/environment';
import { Orders } from './../model/orders.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceFormService {

  baseUrl = environment.baseUrl;

  // URL = "https://icc-services-app.herokuapp.com/";
    //  URL = "http://localhost:8080/";

  constructor(private _http: HttpClient) { }

  addOrderDetails(data){
    return this._http.post(this.baseUrl+"createOrder",data)
  }

  getOrders(): Observable<Orders[]>{
    return this._http.get<Orders[]>(this.baseUrl+"getOrders")
  }
}
