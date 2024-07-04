import { Component } from '@angular/core';
import { ProductSearchService } from '../../services/product-search.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string = '';

  constructor(private productSearchService: ProductSearchService, private router: Router) {}

  handleSearch(): void {
    this.productSearchService.searchProducts(this.searchTerm).subscribe({
      next: (response) => {
        // Handle the response, e.g., update product list
        console.log('Products found:', response);
        this.router.navigate(['/']); // Navigate to home or update view accordingly
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }

}
