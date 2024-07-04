import { Component, OnInit } from '@angular/core';
import { ExchangeProposal, Product } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-propose-exchange-pages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './propose-exchange-pages.component.html',
  styleUrl: './propose-exchange-pages.component.css'
})
export class ProposeExchangeComponent implements OnInit {
  product: Product | null = null;
  offeredProducts: Product[] = [];
  requestedProducts: Product[] = [];
  productOffered: string = '';
  productRequested: string = '';
  message: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.loadProducts();
  }

  private loadProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data) => {
          this.product = data;
        },
        (error) => {
          console.error('Error loading product', error);
        }
      );
    }
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.offeredProducts = data;
        this.requestedProducts = data;
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  handleSubmit(): void {
    const token = localStorage.getItem('token');
    const userRequested = this.product?.user._id;  // Asume que el producto tiene una propiedad `user`

    if (!userRequested) {
      this.message = 'Error: Usuario no encontrado.';
      return;
    }

    const proposal: ExchangeProposal = {
      productOffered: this.productOffered,
      productRequested: this.productRequested,
      userRequested: userRequested
    };

    this.productService.proposeExchange(proposal).subscribe(
      (response) => {
        this.message = response.message;
      },
      (error) => {
        this.message = error.error || 'Error al proponer el intercambio';
      }
    );
  }
}