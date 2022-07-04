import { environment } from './../../environments/environment';
import { Orders } from './../model/orders.model';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceFormService {

  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  addOrderDetails(data){
    return this._http.post(this.baseUrl+"createOrder",data)
  }

  getOrders(offsetValue: number): Observable<Orders[]>{
    const params = new HttpParams().set('offset', offsetValue.toString());
    return this._http.get<Orders[]>(this.baseUrl+"getOrders", {params});
  }
}
