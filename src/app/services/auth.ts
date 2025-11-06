import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../environments/environments';

export interface User {
  id: string;
  username: string;
  role: string;
  name: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = API_URL;
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  
  currentUser = signal<User | null>(null);
  isLoggedIn = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      username,
      password
    });
  }

  setUser(user: User) {
    this.currentUser.set(user);
    this.isLoggedIn.set(true);
    
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  logout() {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
  }

  checkStoredUser() {
    if (this.isBrowser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.setUser(user);
      }
    }
  }
 
  getStudents(): Observable<{ success: boolean; users?: any[] }> {
    return this.http.get<{ success: boolean; users?: any[] }>(`${this.apiUrl}/users/list`);
  }
}
