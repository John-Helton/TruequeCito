import { Component } from '@angular/core';
import { ProductSearchService } from '../../services/product-search.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchQuery: string = '';

  constructor(private http: HttpClient, private router: Router, private productService: ProductService) {}

  search() {
    if (this.searchQuery.trim() === '') {
      return;
    }

    this.http.get(`/api/products?search=${this.searchQuery}`).subscribe(
      (response: any) => {
        this.productService.setProducts(response.data);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  setProducts(products: any) {
    // Aquí debes implementar la lógica para actualizar la lista de productos en tu aplicación.
    // Esto podría implicar el uso de un servicio compartido que mantiene el estado de los productos.
    // Por ejemplo, podrías tener un ProductService con un BehaviorSubject para mantener y emitir el estado de los productos.
  }
}

