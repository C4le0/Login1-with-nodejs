import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  formData = { username: '', email: '', password: '' };
  confirmPassword = '';
  acceptTerms = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  get isPasswordMatch(): boolean {
    return this.formData.password === this.confirmPassword;
  }

  onRegister() {
    if (!this.isPasswordMatch) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (!this.acceptTerms) {
      this.errorMessage = 'Debes aceptar los términos y condiciones';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.http.post('http://localhost:3000/register', this.formData)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          if (response.success) {
            alert('Registro exitoso! Por favor inicia sesión.');
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error al registrar';
        }
      });
  }

  // Métodos para login social (simulados)
  registerWithGoogle() {
    alert('Login con Google aún no implementado');
  }

  registerWithFacebook() {
    alert('Login con Facebook aún no implementado');
  }

  registerWithApple() {
    alert('Login con Apple aún no implementado');
  }
}