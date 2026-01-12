import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  rememberMe = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.post('http://localhost:3000/login', this.credentials)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.success) {
            // Guarda el usuario en localStorage
            localStorage.setItem('user', JSON.stringify(response.user));
            
            // Redirige según el rol
            if (response.user.is_staff) {
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.router.navigate(['/dashboard']);
            }
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error de login';
        }
      });
  }

  // Métodos para login social (simulados)
  loginWithGoogle() {
    alert('Login con Google aún no implementado');
  }

  loginWithFacebook() {
    alert('Login con Facebook aún no implementado');
  }

  loginWithApple() {
    alert('Login con Apple aún no implementado');
  }
}