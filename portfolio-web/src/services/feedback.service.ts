import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private API = `${environment.apiBaseUrl}/feedback`;

  constructor(private http: HttpClient) { }

   submitFeedback(data: { name: string; rating: number; comment: string }) {
    return this.http.post(this.API, data);
  }

  getFeedbacks() {
    return this.http.get(this.API);
  }
}
