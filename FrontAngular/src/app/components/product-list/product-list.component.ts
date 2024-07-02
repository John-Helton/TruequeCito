import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
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
  proposeExchange(productId: string) {
    window.location.href = `/propose-exchange?productRequested=${productId}`;
  }

  shouldAnimateTitle(title: string): boolean {
    const wordCount = title.split(' ').length;
    return wordCount > 15;
  }

}
