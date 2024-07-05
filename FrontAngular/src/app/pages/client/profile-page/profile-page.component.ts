import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../../shared/interfaces/auth.interfaces';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ProfilePageComponent implements OnInit {
  user: User = new User();
  userProducts: Product[] = [];
  message: string = '';

  constructor(
    private productService: ProductService,
    public authService: AuthService, // Cambiado a público
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();
    if (currentUser && currentUser.user) {
      this.user.email = currentUser.user.email;
      this.user.avatar = currentUser.user.avatar || 'default-avatar.png'; // Reemplazar con el avatar real si está disponible
    } else {
      console.error('Usuario no autenticado');
    }
    this.loadUserProducts();
  }

  loadUserProducts(): void {
    this.productService.getUserProducts().subscribe({
      next: (products) => {
        this.userProducts = products;
      },
      error: (error) => {
        console.error('Error al cargar los productos del usuario:', error);
        this.message = 'Error al cargar los productos del usuario.';
      }
    });
  }

  editProduct(productId: string): void {
    this.router.navigate(['/profile/edit-product', productId]);
  }

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.userProducts = this.userProducts.filter(product => product._id !== productId);
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
        this.message = 'Error al eliminar el producto.';
      }
    });
  }

  updateProfile(): void {
    // Implementa la lógica para actualizar el perfil del usuario
    console.log('Updated User:', this.user);
    this.message = 'Perfil actualizado con éxito.';
  }
}
