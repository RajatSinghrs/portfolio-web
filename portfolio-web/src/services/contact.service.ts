import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private API = `${environment.apiBaseUrl}/contact`;

  constructor(private http: HttpClient) {
  }

     submitContact(data: { name: string; email: string; message: string }) {
    return this.http.post(this.API, data);
  }
  
}
