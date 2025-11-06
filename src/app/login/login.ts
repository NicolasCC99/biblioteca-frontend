import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';
  loading = signal(false);
  error = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.error.set('Por favor complete todos los campos');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response.success && response.user) {
          this.authService.setUser(response.user);
          // Navegar según el rol
          if (response.user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (response.user.role === 'student') {
            this.router.navigate(['/student']);
          }
        } else {
          this.error.set(response.message || 'Error de autenticación');
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Error de conexión con el servidor');
        console.error('Error de login:', err);
      }
    });
  }
}
