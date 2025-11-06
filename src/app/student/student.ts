import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  
import { AuthService } from '../services/auth';
import { BookListComponent } from '../books/book-list/book-list';
import { LoanManagementComponent } from '../books/loan-management/loan-management';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, BookListComponent, LoanManagementComponent],
  template: `
    <div class="student-container">
      <div class="header">
        <h1>Portal del Estudiante</h1>
        <div class="user-info">
          <span>Bienvenido, {{ authService.currentUser()?.name }}</span>
          <button (click)="logout()" class="logout-btn">Cerrar Sesión</button>
        </div>
      </div>
      
      <!-- Componente de libros integrado -->
      <app-book-list></app-book-list>

      <!-- Componente de mis préstamos -->
      <app-loan-management></app-loan-management>
    </div>
  `,
  styles: [`
    .student-container {
      min-height: 100vh;
      background-color: #f8f9fa;
    }
    
    .header {
      background-color: #28a745;
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .logout-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .logout-btn:hover {
      background-color: #c82333;
    }
  `]
})
export class StudentComponent {
  constructor(
    public authService: AuthService,
    private router: Router  
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}
