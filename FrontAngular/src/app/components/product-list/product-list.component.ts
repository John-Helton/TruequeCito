import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
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
    window.location.href = `/propose-exchange?productRequested=${productId}`;
  }

  shouldAnimateTitle(title: string): boolean {
    const maxLength = 19;  // Ajusta el número máximo de caracteres antes de activar la animación
    const charCount = title.length; // Cuenta los caracteres en el título
    return charCount > maxLength;
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/default_image.jpg';  // Reemplaza con la ruta a tu imagen por defecto
  }
}
