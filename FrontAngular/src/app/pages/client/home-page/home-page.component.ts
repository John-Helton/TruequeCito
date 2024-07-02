import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../../../components/product-list/product-list.component';
import { ProfileInfoCardComponent } from '../../../components/profile-info-card/profile-info-card.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductListComponent, ProfileInfoCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
