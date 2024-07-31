import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExchangeService } from '../../services/exchange.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Product, Proposal } from '../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PaymentComponent implements OnInit {
  exchangeId: string | null = null;
  exchange: Proposal | null = null;
  productOffered: Product | undefined;
  productRequested: Product | undefined;
  uniqueCode: string | undefined;
  selectedFile: File | null = null;
  userType: string = '';

  constructor(
    private route: ActivatedRoute,
    private exchangeService: ExchangeService,
    private productService: ProductService,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.exchangeId = this.route.snapshot.paramMap.get('exchangeId');
    if (this.exchangeId) {
      this.loadExchange(this.exchangeId);
    }
  }

  private loadExchange(exchangeId: string): void {
    this.exchangeService.getExchangeById(exchangeId).subscribe({
      next: (exchange: Proposal) => {
        this.exchange = exchange;
        this.uniqueCode = exchange.uniqueCode;
        this.userType = exchange.userType || '';
        this.loadProducts(exchange.productOffered._id, exchange.productRequested._id);

        const currentUser = this.authService.getUser();
        if (currentUser) {
     
        } else {
          console.error('No authenticated user found');
        }
      },
      error: (error: any) => {
        console.error('Error fetching exchange:', error);
      }
    });
  }

  private loadProducts(productOfferedId: string, productRequestedId: string): void {
    this.productService.getProductById(productOfferedId).subscribe({
      next: (product: Product) => {
        this.productOffered = product;
      },
      error: (error: any) => {
        console.error('Error fetching offered product:', error);
      }
    });
    this.productService.getProductById(productRequestedId).subscribe({
      next: (product: Product) => {
        this.productRequested = product;
      },
      error: (error: any) => {
        console.error('Error fetching requested product:', error);
      }
    });
  }

  getImageSrc(images: string[] | undefined): string {
    return images && images.length > 0 ? images[0] : 'assets/default_image.jpg';
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitComprobante(): void {
    if (!this.selectedFile || !this.exchangeId) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'No se seleccionó ningún archivo.',
        timer: 1500,
        showConfirmButton: false
      });
      return;
    }

    const formData = new FormData();
    formData.append('receipt', this.selectedFile);
    formData.append('exchangeId', this.exchangeId);
    formData.append('userType', this.userType);

    this.exchangeService.uploadReceipt(formData).subscribe({
      next: (response) => {
        this.loadExchange(this.exchangeId!); 
        this.verifyAndCompleteExchange();
        Swal.fire({
          icon: 'success',
          title: 'Comprobante enviado',
          text: 'Propuesta de intercambio enviada correctamente.',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/']);
        });
      },
      error: (error) => {
        console.error('Error al enviar el comprobante:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al enviar el comprobante.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  verifyAndCompleteExchange(): void {
    if (this.exchange) {
      const otherReceipt = this.userType === 'offered' ? this.exchange.receiptRequested : this.exchange.receiptOffered;

      if (otherReceipt) {
        this.exchangeService.updateExchangeStatus(this.exchange._id, 'completed').subscribe({
          next: (response) => {
            console.log('Exchange completed:', response);
            Swal.fire({
              icon: 'success',
              title: 'Intercambio completado',
              text: 'Ambos comprobantes han sido subidos. El intercambio está pendiente de revisión por el administrador.',
              timer: 3500,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/']);
            });
          },
          error: (error) => {
            console.error('Error al completar el trueque:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al completar el trueque.',
              timer: 1500,
              showConfirmButton: false
            });
          }
        });
      } else {
        const otherUserType = this.userType === 'offered' ? 'requested' : 'offered';
        Swal.fire({
          icon: 'info',
          title: 'Comprobante enviado',
          text: `Comprobante enviado exitosamente, le hemos notificado al usuario para que realice su pago.`,
          timer: 4500,
          showConfirmButton: false
        });
      }
    }
  }

  shouldShowPaymentButton(): boolean {
    return this.exchange ? this.exchange.status !== 'completed' : false;
  }

  cancelarTrueque(): void {
    console.log('Trueque cancelado');
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    element.src = 'assets/default_image.jpg';
  }
}
