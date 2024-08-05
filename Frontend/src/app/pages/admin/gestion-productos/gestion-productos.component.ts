import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  newProduct: any = {};
  view: 'list' | 'create' | 'edit' = 'list'; // Controla la vista actual

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.adminService.getAllProducts().subscribe(
      (data: any) => {
        this.products = data;
        console.log('Productos cargados:', this.products); // Línea de depuración
      },
      (error) => {
        console.error('Error cargando productos', error);
      }
    );
  }

  createProduct(): void {
    this.adminService.createProduct(this.newProduct).subscribe(
      () => {
        this.loadProducts();
        this.newProduct = {};
        this.view = 'list';
      },
      (error) => {
        console.error('Error creando producto', error);
      }
    );
  }

  startEditProduct(product: any): void {
    this.selectedProduct = { ...product };
    console.log('Producto seleccionado para editar:', this.selectedProduct); // Línea de depuración
    this.view = 'edit';
  }

  saveEditProduct(): void {
    if (this.selectedProduct && this.selectedProduct._id) {
      this.adminService.editProduct(this.selectedProduct._id, this.selectedProduct).subscribe(
        () => {
          this.loadProducts();
          this.selectedProduct = null;
          this.view = 'list';
        },
        (error) => {
          console.error('Error editando producto', error);
        }
      );
    } else {
      console.error('ID del producto no está definido', this.selectedProduct); // Línea de depuración
    }
  }

  cancelEdit(): void {
    this.selectedProduct = null;
    this.view = 'list';
  }

  deleteProduct(id: string): void {
    if (id) {
      this.adminService.deleteProduct(id).subscribe(
        () => {
          this.loadProducts();
        },
        (error) => {
          console.error('Error eliminando producto', error);
        }
      );
    } else {
      console.error('ID del producto no está definido', id); // Línea de depuración
    }
  }

  toggleView(view: 'list' | 'create'): void {
    this.view = view;
  }
}
