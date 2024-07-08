import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Al iniciar el componente, carga todos los productos
    this.loadAllProducts();
  }

  // Método para manejar cambios en el campo de búsqueda
  onSearchQueryChange(): void {
    if (this.searchQuery.trim() === '') {
      // Si el campo de búsqueda está vacío, carga todos los productos
      this.loadAllProducts();
    } else {
      // Realiza la búsqueda con el término proporcionado
      this.productService.getAllProductsBySearch(this.searchQuery).subscribe(
        (response: Product[]) => {
          this.productService.setProducts(response);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
    }
  }

  private loadAllProducts(): void {
    this.productService.getProducts().subscribe(
      (response: Product[]) => {
        this.productService.setProducts(response);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  search(): void {
    // Implementa aquí cualquier lógica adicional que necesites al hacer clic en el botón de búsqueda
    this.onSearchQueryChange(); // Opcional, si quieres forzar una búsqueda
  }
}
