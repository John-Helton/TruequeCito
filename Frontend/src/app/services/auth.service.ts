import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../shared/interfaces/auth.interfaces';
import { URL_LOGIN, URL_REGISTER } from '../shared/constants/url.constants';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject = new BehaviorSubject<User | null>(this.getUserFromLocalStorage());
  public authObservable: Observable<User | null> = this.authSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(URL_LOGIN, { email, password }).pipe(
      tap({
        next: (response) => {
          if (isPlatformBrowser(this.platformId)) {
            const user: User = {
              id: response.user.id,
              email: response.user.email,
              username: response.user.username || '', // Asignar valor predeterminado si es undefined
              avatar: response.user.avatar || '', // Asignar valor predeterminado si es undefined
              token: response.token,
              role: response.user.role || 'user' // Asignar un valor por defecto
            };
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(user));
            this.authSubject.next(user);
            this.router.navigate(['/']);
          }
        },
        error: (errorResponse) => {
          console.error('Error de inicio de sesión:', errorResponse.error);
        }
      })
    );
  }

  register(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(URL_REGISTER, {
      email,
      password,
      username: `user_${Math.floor(Math.random() * 10000)}`, // Nombre de usuario predeterminado
      avatar: 'default_avatar_url' // URL del avatar predeterminado
    }).pipe(
      tap({
        next: (response) => {
          if (isPlatformBrowser(this.platformId)) {
            const user: User = {
              id: response.user.id,
              email: response.user.email,
              username: response.user.username || '', // Asignar valor predeterminado si es undefined
              avatar: response.user.avatar || '', // Asignar valor predeterminado si es undefined
              token: response.token,
              role: response.user.role || 'user' // Asignar un valor por defecto
            };
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(user));
            this.authSubject.next(user);
            this.router.navigate(['/']);
          }
        },
        error: (errorResponse) => {
          console.error('Error de registro:', errorResponse.error);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.authSubject.next(null);
      this.router.navigate(['/login']);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          return JSON.parse(user) as User;
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
          return null;
        }
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getUserFromLocalStorage(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          return JSON.parse(user) as User;
        } catch (error) {
          console.error('Error parsing user from localStorage:', error);
          localStorage.removeItem('user');
          return null;
        }
      }
    }
    return null;
  }
}