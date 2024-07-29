import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeService } from '../../../services/exchange.service';
import { AuthService } from '../../../services/auth.service';
import { Exchange } from '../../../shared/interfaces/exchange.interface';

@Component({
  selector: 'app-gestion-intercambios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-intercambios.component.html',
  styleUrls: ['./gestion-intercambios.component.css']
})
export class GestionIntercambiosComponent implements OnInit {
  exchanges: Exchange[] = []; 
  error: string | null = null;
  currentUserId: string | undefined;

  constructor(
    private exchangeService: ExchangeService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getUser();

    if (currentUser && currentUser.id) {
      this.currentUserId = currentUser.id;
    } else {
      console.log('Usuario no autenticado o ID no encontrado'); 
    }
    this.loadCompletedExchanges();
  }
  loadCompletedExchanges(): void {
    this.exchangeService.getCompletedExchanges().subscribe(
      (data) => {
        this.exchanges = data;
        this.error = null; 
      },
      (error) => {
        console.error('Error fetching completed exchanges:', error);
        this.error = 'Failed to load completed exchanges. Please try again later.'; 
      }
    );
  }
  
}
