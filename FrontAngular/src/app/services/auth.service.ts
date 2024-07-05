import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../shared/interfaces/auth.interfaces';
import { URL_LOGIN, URL_REGISTER } from '../shared/constants/url.constants';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject = new BehaviorSubject<AuthResponse | null>(this.getUserFromLocalStorage());
  public authObservable: Observable<AuthResponse | null> = this.authSubject.asObservable();

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
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.authSubject.next(response);
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
    return this.http.post<AuthResponse>(URL_REGISTER, { email, password }).pipe(
      tap({
        next: (response) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.authSubject.next(response);
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

  getUser(): AuthResponse | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          return JSON.parse(user);
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

  private getUserFromLocalStorage(): AuthResponse | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          return JSON.parse(user);
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
