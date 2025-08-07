import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private API_URL = 'http://localhost:5000/api/auth';


  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient) {}
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
    if (isPlatformBrowser(this.platformId)) {
    return !!localStorage.getItem('token');
  }
  return false; // on server
}
}
