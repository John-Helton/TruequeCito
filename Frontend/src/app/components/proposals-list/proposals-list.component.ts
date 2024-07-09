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
    console.log('Cargando intercambios recibidos...');
    this.exchangeService.getReceivedExchanges().subscribe({
      next: (exchanges) => {
        console.log('Intercambios recibidos:', exchanges);
        this.exchangesReceived = exchanges;
      },
      error: (error) => {
        console.error('Error al cargar los intercambios recibidos:', error);
      }
    });
  }

  loadSentExchanges(): void {
    console.log('Cargando intercambios enviados...');
    this.exchangeService.getSentExchanges().subscribe({
      next: (exchanges) => {
        console.log('Intercambios enviados:', exchanges);
        this.exchangesSent = exchanges;
      },
      error: (error) => {
        console.error('Error al cargar los intercambios enviados:', error);
      }
    });
  }

  navigateToProduct(productId: string): void {
    this.router.navigate(['/product', productId]);
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = '../../../../assets/default_image.jpg';
  }

  acceptExchange(exchangeId: string): void {
    this.exchangeService.updateExchangeStatus(exchangeId, 'accepted').subscribe({
      next: (response) => {
        this.loadReceivedExchanges();
      },
      error: (error) => {
        console.error('Error al aceptar el intercambio:', error);
      }
    });
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
