import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-oauth-redirect',
  template: `<p>Signing you in...</p>`
})
export class OAuthRedirectComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private auth: AuthService, private router: Router) {}

  ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
    const fragment = window.location.hash; 
    const match = fragment.match(/token=([^&]+)/);
    if (match) {
      const token = match[1];
      this.auth.setToken(token);// this will trigger header update
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  }
}
