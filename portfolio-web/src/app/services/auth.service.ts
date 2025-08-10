import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:5000/api/auth';

  private authStatus = new BehaviorSubject<boolean>(this.isLoggedIn());

  authStatus$ = this.authStatus.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }

  login(email: string, password: string): Observable<{ token: string; user: any }> {
    return this.http.post<{ token: string; user: any }>(`${this.API_URL}/login`, { email, password });
  }

  signup(name: string, email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${this.API_URL}/signup`, { name, email, password });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.authStatus.next(false);
    }
  }
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      this.authStatus.next(true);

    }
  }
}
