import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../../components/product-list/product-list.component';
import { ProfileInfoCardComponent } from '../../../components/profile-info-card/profile-info-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProfileInfoCardComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent { }
