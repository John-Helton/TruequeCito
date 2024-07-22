import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string = '';
  currentUserId: string | undefined;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();

    if (currentUser && currentUser.id) {
      this.currentUserId = currentUser.id;
    } else {
      console.log('Usuario no autenticado o ID no encontrado'); 
    }

    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.filter(product => {
          return product.user._id !== this.currentUserId;
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener productos:', error); // Nota
        this.error = error;
        this.loading = false;
      }
    });
  }

  proposeExchange(productId: string): void {
    this.router.navigate(['/propose-exchange', productId]);
  }

  shouldAnimateTitle(title: string): boolean {
    const maxLength = 19;
    const charCount = title.length;
    return charCount > maxLength;
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/default_image.jpg';  // Ruta a la imagen por defecto
    console.log('Error de imagen, cargando imagen por defecto'); // Nota
  }
}
