import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private API_URL = 'http://localhost:5000/api/auth';


  constructor(private http: HttpClient) {}
   login(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${this.API_URL}/login`, { email, password });
  }

  signup(name: string, email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${this.API_URL}/signup`, { name, email, password });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
