import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { URL_PRODUCTS } from '../shared/constants/url.constants'; // Importa la URL de constantes
import { ExchangeProposal, Product } from '../shared/interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  });

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(URL_PRODUCTS).pipe(
      catchError((error) => {
        console.log('Error al obtener los productos', error);
        return throwError(error.error.error || 'Servidor no disponible');
      })
    );
  }
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${URL_PRODUCTS}/${productId}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el producto', error);
        return throwError(error.error.error || 'Servidor no disponible');
      })
    );
  }

  proposeExchange(proposal: ExchangeProposal): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(`${URL_PRODUCTS}/exchange`, { proposal }, { headers }).pipe(
      catchError((error) => {
        console.error('Error al proponer el cambio', error);
        return throwError(error.error.error || 'Servidor no disponible');
      })
    );
  }
  editProduct(productId: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${URL_PRODUCTS}/${productId}`, product, { headers: this.headers }).pipe(
      catchError((error) => {
        console.log('Error al editar el producto', error);
        return throwError(error.error.error || 'Servidor no disponible');
      })
    );
  }
  deleteProduct(productId: string): Observable<void> {
    return this.http.delete<void>(`${URL_PRODUCTS}/${productId}`, { headers: this.headers }).pipe(
      catchError((error) => {
        console.log('Error al eliminar el producto', error);
        return throwError(error.error.error || 'Servidor no disponible');
      })
    );
  }
}
