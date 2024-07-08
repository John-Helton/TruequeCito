import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterModule, HttpClientModule, NavbarComponent, FooterComponent],
  exportAs: 'app-login-pages',
  template: `
    <app-navbar></app-navbar>
    <div class="flex flex-col min-h-screen">
      <div class="flex-grow">
        <router-outlet></router-outlet>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .flex {
      display: flex;
    }
    .flex-col {
      flex-direction: column;
    }
    .min-h-screen {
      min-height: 100vh;
    }
    .flex-grow {
      flex-grow: 1;
    }
  `]
})



export class ClientComponent {}
