import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Proposal } from '../shared/interfaces/product.interface';
import { Exchange } from '../shared/interfaces/exchange.interface';
import { URL_EXCHANGES, URL_ALL_EXCHANGES } from '../shared/constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private apiUrl = URL_EXCHANGES;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
  //? trae todos los intercambios
  getAllExchanges(): Observable<Exchange[]> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Fetching all exchanges with headers:', headers);
    return this.http.get<Exchange[]>(URL_ALL_EXCHANGES, { headers });
  }

  //?trae los intecambios completados
  getCompletedExchanges(): Observable<Exchange[]> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Fetching completed exchanges with headers:', headers);
    return this.http.get<Exchange[]>(`${this.apiUrl}/completed`, { headers });
  }

  proposeExchange(productOffered: string, productRequested: string, userRequested: string): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Proposing exchange with headers:', headers);
    return this.http.post(`${this.apiUrl}/propose`, { productOffered, productRequested, userRequested }, { headers });
  }

  getReceivedExchanges(): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.get(`${this.apiUrl}/received`, { headers });
  }

  getSentExchanges(): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    return this.http.get(`${this.apiUrl}/sent`, { headers });
  }

  updateExchangeStatus(exchangeId: string, status: string): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Updating exchange status with headers:', headers);
    return this.http.put(`${this.apiUrl}/status`, { exchangeId, status }, { headers });
  }  

  getExchangeById(exchangeId: string): Observable<Proposal> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Fetching exchange by ID with headers:', headers);
    return this.http.get<Proposal>(`${this.apiUrl}/${exchangeId}`, { headers });
  }

  uploadReceipt(formData: FormData): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Uploading receipt with headers:', headers);
    return this.http.post(`${this.apiUrl}/upload-receipt`, formData, { headers });
  }

  cancelExchange(exchangeId: string): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Cancelling exchange with headers:', headers);
    return this.http.put(`${this.apiUrl}/cancel/${exchangeId}`, { exchangeId }, { headers });
  }

  acceptExchange(exchangeId: string): Observable<any> {
    const token = this.getToken();
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : undefined;
    console.log('Accepting exchange with headers:', headers);
    return this.http.put(`${this.apiUrl}/accept/${exchangeId}`, {}, { headers });
  }

}

