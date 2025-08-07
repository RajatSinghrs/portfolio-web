import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

 onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      error: err => {
        this.error = err.error.message || 'Login failed';
      }
    });
  }

}
