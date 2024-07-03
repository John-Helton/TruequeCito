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
          if (isPlatformBrowser(this.platformId)) { // Verifica que estés en el navegador
            localStorage.setItem('token', response.token);
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
          if (isPlatformBrowser(this.platformId)) { // Verifica que estés en el navegador
            localStorage.setItem('token', response.token);
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
    if (isPlatformBrowser(this.platformId)) { // Verifica que estés en el navegador
      localStorage.removeItem('token');
      this.authSubject.next(null);
      this.router.navigate(['/login']);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) { // Verifica que estés en el navegador
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setUserToLocalStorage(user: AuthResponse): void {
    if (isPlatformBrowser(this.platformId)) { // Verifica que estés en el navegador
      localStorage.setItem('token', user.token);
    }
  }

  private getUserFromLocalStorage(): AuthResponse | null {
    if (isPlatformBrowser(this.platformId)) { // Verifica que estés en el navegador
      const token = localStorage.getItem('token');
      return token ? { token } : null;
    }
    return null;
  }
}