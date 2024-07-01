import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterModule, HttpClientModule, NavbarComponent],
  exportAs: 'app-login-pages',
  template: `<app-navbar></app-navbar> <router-outlet></router-outlet>`,
  styles: '',
})


export class ClientComponent {}
