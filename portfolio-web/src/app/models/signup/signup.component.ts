import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  error = '';
  success = false;

  constructor(private auth: AuthService, private router: Router) { }

  onSignup() {
    this.auth.signup(this.name, this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
        // this.success = true;
      },
      error: err => {
        this.error = err.error.message || 'Signup failed';
      }
    });
  }

}
