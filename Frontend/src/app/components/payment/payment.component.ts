import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeService } from '../../services/exchange.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  exchangeId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private exchangeService: ExchangeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exchangeId = this.route.snapshot.paramMap.get('exchangeId');
    if (this.exchangeId) {
      // Realiza alguna lógica si es necesario
    }
  }

  // Lógica para el pago
  processPayment(): void {
    if (this.exchangeId) {
      console.log('Procesando pago para el intercambio:', this.exchangeId);
      // Lógica para procesar el pago
    }
  }

  submitComprobante() {
    console.log('Comprobante enviado');
    // Lógica para enviar el comprobante
  }

  finalizarTrueque() {
    console.log('Trueque finalizado');
    // Lógica para finalizar el trueque
  }

  cancelarTrueque() {
    console.log('Trueque cancelado');
    // Lógica para cancelar el trueque
  }
}




