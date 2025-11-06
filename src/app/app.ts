import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';  // ← IMPORTANTE
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule,
    RouterOutlet  // ← IMPORTANTE: Añadir aquí
  ],
  template: `
    @if (!authService.isLoggedIn()) {
      <!-- Si NO está logueado, mostrar login -->
      <router-outlet></router-outlet>
    } @else {
      <!-- Si está logueado, mostrar el contenido según la ruta -->
      <router-outlet></router-outlet>
    }
  `
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.checkStoredUser();
  }
}
