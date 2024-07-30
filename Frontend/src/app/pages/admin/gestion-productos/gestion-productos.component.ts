import { Component } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-productos.component.html',
  styleUrl: './gestion-productos.component.css'
})
export class GestionProductosComponent {
  products: any[] = [];
  selectedProduct: any = null;
  newProduct: any = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.adminService.getAllProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  createProduct(): void {
    this.adminService.createProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = {};
    });
  }

  editProduct(): void {
    if (this.selectedProduct) {
      this.adminService.editProduct(this.selectedProduct.id, this.selectedProduct).subscribe(() => {
        this.loadProducts();
        this.selectedProduct = null;
      });
    }
  }

  deleteProduct(id: string): void {
    this.adminService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  selectProduct(product: any): void {
    this.selectedProduct = { ...product };
  }

  clearSelection(): void {
    this.selectedProduct = null;
  }
}

