import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit  {
  email = '';
  password = '';
  error = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private auth: AuthService, private router: Router) { }

   ngAfterViewInit() {
    // Fade & scale in
      if (isPlatformBrowser(this.platformId)) {
    gsap.to('.login-container', {
      duration: 1.2,
      opacity: 1,
      scale: 1,
      ease: 'power3.out'
    });

    // Pulsing glow
    gsap.to('.login-container', {
      boxShadow: '0 0 25px rgba(255,255,255,0.5)',
      repeat: -1,
      yoyo: true,
      duration: 2
    });
  }
   }


 onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed';
      }
    });
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:5000/api/auth/google';
  }

  loginWithGithub() {
  window.location.href = 'http://localhost:5000/api/auth/github';
}
}
