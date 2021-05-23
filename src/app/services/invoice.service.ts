import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  getFileContent(orderId: number): Observable<Blob> {
    return this._http.get(this.baseUrl+"generateInvoiceById/"+orderId,{ responseType: 'blob' });
  }
}
