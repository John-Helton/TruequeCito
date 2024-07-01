import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { URL_PRODUCTS } from '../shared/constants/url.constants'; // Importa la URL de constantes
import { Product } from '../shared/interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(URL_PRODUCTS);
  }
}
