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
  currentUser: any;

  constructor(private exchangeService: ExchangeService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    if (this.currentUser) {
      console.log('Current user:', this.currentUser);
      this.loadReceivedExchanges();
      this.loadSentExchanges();
    } else {
      console.error('Usuario no autenticado');
    }
  }

  loadReceivedExchanges(): void {
    console.log('Loading received exchanges');
    this.exchangeService.getReceivedExchanges().subscribe({
      next: (exchanges: Proposal[]) => {
        this.exchangesReceived = exchanges.map((exchange: Proposal) => {
          const updatedExchange = {
            ...exchange,
            userType: 'offered'  // Asignar explícitamente el rol de offered
          };
          console.log('Updated received exchange:', updatedExchange);
          return updatedExchange;
        });
        console.log('Received exchanges loaded:', this.exchangesReceived);
      },
      error: (error) => {
        console.error('Error al cargar los intercambios recibidos:', error);
      }
    });
  }

  loadSentExchanges(): void {
    console.log('Loading sent exchanges');
    this.exchangeService.getSentExchanges().subscribe({
      next: (exchanges: Proposal[]) => {
        this.exchangesSent = exchanges.map((exchange: Proposal) => {
          const updatedExchange = {
            ...exchange,
            userType: 'requested'  // Asignar explícitamente el rol de requested
          };
          console.log('Updated sent exchange:', updatedExchange);
          return updatedExchange;
        });
        console.log('Sent exchanges loaded:', this.exchangesSent);
      },
      error: (error) => {
        console.error('Error al cargar los intercambios enviados:', error);
      }
    });
  }

  navigateToProduct(productId: string, exchangeId: string): void {
    console.log(`Navigating to product with ID: ${productId} and exchange ID: ${exchangeId}`);
    this.router.navigate(['/product', productId, exchangeId]);
  }

  navigateToPayment(exchangeId: string): void {
    console.log(`Navigating to payment for exchange ID: ${exchangeId}`);
    this.router.navigate(['/payment', exchangeId]);
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/default_image.jpg'; // Asegúrate de que la ruta sea correcta
  }

  acceptExchange(exchangeId: string, productId: string): void {
    console.log(`Accepting exchange with ID: ${exchangeId}`);
    this.exchangeService.updateExchangeStatus(exchangeId, 'accepted').subscribe({
      next: (response) => {
        console.log('Exchange accepted:', response);
        this.loadReceivedExchanges();
        this.router.navigate(['/product', productId, exchangeId]);
      },
      error: (error) => {
        console.error('Error al aceptar el intercambio:', error);
      }
    });
  }

  rejectExchange(exchangeId: string): void {
    console.log(`Rejecting exchange with ID: ${exchangeId}`);
    this.exchangeService.updateExchangeStatus(exchangeId, 'rejected').subscribe({
      next: (response) => {
        console.log('Exchange rejected:', response);
        this.loadReceivedExchanges();
      },
      error: (error) => {
        console.error('Error al rechazar el intercambio:', error);
      }
    });
  }
}
