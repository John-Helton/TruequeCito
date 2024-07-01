import { Component } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-pages',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-pages.component.html',
  styleUrl: './register-pages.component.css'
})
export class RegisterPagesComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  handleSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.password !== this.confirmPassword) {
        this.message = 'Las contraseñas no coinciden.';
        return;
      }

      this.authService.register(this.username, this.password).subscribe({
        next: (response) => {
          this.message = 'Registro exitoso';
          this.router.navigate(['/']); // Redirige a la página de login después del registro
        },
        error: (error) => {
          this.message = error.error?.message || 'Error en el registro';
        }
      });
    } else {
      this.message = 'Por favor, completa todos los campos.';
    }
  }
}