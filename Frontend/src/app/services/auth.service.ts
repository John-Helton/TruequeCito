import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../shared/interfaces/auth.interfaces';
import { URL_LOGIN, URL_PROFILE, URL_REGISTER } from '../shared/constants/url.constants';
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
              username: response.user.username || '',
              avatar: response.user.avatar || '',
              token: response.token,
              role: response.user.role || 'user'
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

  register(email: string, password: string, username: string): Observable<AuthResponse> {
    // Si no se proporciona un nombre de usuario, se genera uno por defecto
    const userNameToUse = username.trim() || `user_${Math.floor(Math.random() * 10000)}`;
  
    return this.http.post<AuthResponse>(URL_REGISTER, {
      email,
      password,
      username: userNameToUse,
      avatar: 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
    }).pipe(
      tap({
        next: (response) => {
          if (isPlatformBrowser(this.platformId)) {
            if (response && response.user) {
              console.log('Registro exitoso:', response);
              const user: User = {
                id: response.user.id,
                email: response.user.email,
                username: response.user.username || '',
                avatar: response.user.avatar || '',
                token: response.token,
                role: response.user.role || 'user'
              };
              localStorage.setItem('token', response.token);
              localStorage.setItem('user', JSON.stringify(user));
              this.authSubject.next(user);
              this.router.navigate(['/']);
            } else {
              console.error('Respuesta de registro inválida:', response);
            }
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
  setUser(user: User | null): void {
    if (isPlatformBrowser(this.platformId)) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
      this.authSubject.next(user);
    }
  }
}
