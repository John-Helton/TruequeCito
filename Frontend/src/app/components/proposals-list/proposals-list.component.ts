import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Proposal } from '../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proposals-list',
  templateUrl: './proposals-list.component.html',
  styleUrls: ['./proposals-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProposalsListComponent implements OnInit {
  exchangesReceived: Proposal[] = [];
  exchangesSent: Proposal[] = [];
  currentUser: Proposal | any;

  constructor(private exchangeService: ExchangeService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    console.log('Usuario actual:', this.currentUser);
    if (this.currentUser) {
      this.loadReceivedExchanges();
      this.loadSentExchanges();
    } else {
      console.error('Usuario no autenticado');
    }
  }

  loadReceivedExchanges(): void {
    this.exchangeService.getReceivedExchanges().subscribe({
      next: (exchanges) => {
        this.exchangesReceived = exchanges;
      },
      error: (error) => {
        console.error('Error al cargar los intercambios recibidos:', error);
      }
    });
  }

  loadSentExchanges(): void {
    this.exchangeService.getSentExchanges().subscribe({
      next: (exchanges) => {
        this.exchangesSent = exchanges;
      },
      error: (error) => {
        console.error('Error al cargar los intercambios enviados:', error);
      }
    });
  }

  navigateToProduct(productId: string, exchangeId: string): void {
    this.router.navigate(['/product', productId, exchangeId]);
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/default_image.jpg'; // Asegúrate de que la ruta sea correcta
  }

  acceptExchange(exchangeId: string, productId: string): void {
    this.router.navigate(['/product', productId, exchangeId]);
  }

  rejectExchange(exchangeId: string): void {
    this.exchangeService.updateExchangeStatus(exchangeId, 'rejected').subscribe({
      next: (response) => {
        this.loadReceivedExchanges();
      },
      error: (error) => {
        console.error('Error al rechazar el intercambio:', error);
      }
    });
  }
}
