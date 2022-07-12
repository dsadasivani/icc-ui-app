import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HealthCheckService {
  baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient) {}

  getHealthStatus(): Observable<string> {
    return this._http.get<string>(this.baseUrl);
  }
}
