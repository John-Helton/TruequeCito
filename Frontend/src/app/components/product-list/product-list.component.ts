import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  username: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // Subscribirse al observable de productos del servicio
    this.productService.products$.subscribe(
      (data) => {
        this.products = data;
        this.loading = false;
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    );
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
  }
}
