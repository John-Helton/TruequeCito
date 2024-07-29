import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/interfaces/auth.interfaces';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PublicProfileComponent implements OnInit {
  @Input() userId!: string;
  user: User | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    console.log('UserID recibido:', this.userId);
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        console.log('Datos del usuario recibidos:', data);
        this.user = data.user;
        console.log('Usuario asignado:', this.user);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        this.error = 'No se pudo obtener el perfil del usuario. Inténtalo de nuevo más tarde.';
        this.loading = false;
      }
    });
  }

  closeUserProfileModal(): void {
    // Implement the method to close the modal
  }

  proposeExchange(productId: string): void {
    this.router.navigate(['/propose-exchange', productId]);
  }

  followUser(userId: string): void {
    console.log('Seguir usuario con ID:', userId);
    // Implement the follow user functionality
  }

  likeUser(userId: string): void {
    console.log('Dar like al usuario con ID:', userId);
    // Implement the like user functionality
  }
}
