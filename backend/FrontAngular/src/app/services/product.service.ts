import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { URL_PRODUCTS } from '../shared/constants/url.constants'; // Importa la URL de constantes


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(URL_PRODUCTS).pipe(
      catchError((error) => {
        console.log('Error al obtener los productos', error);
        return throwError(error.error.error || 'Servidor no disponible');
      })
    );
  }
}
