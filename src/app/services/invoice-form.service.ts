import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceFormService {

  // URL = "https://icc-services-app.herokuapp.com/";
     URL = "http://localhost:8080/";

  constructor(private _http: HttpClient) { }

  addOrderDetails(data){
    return this._http.post(this.URL+"createOrder",data)
  }
}
