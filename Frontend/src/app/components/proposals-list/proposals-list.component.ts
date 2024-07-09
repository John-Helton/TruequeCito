import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Proposal {
  product: string;
  proposedProduct: string;
  description: string;
  status: string;
  user: string;
}

@Component({
  selector: 'app-proposals-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proposals-list.component.html',
  styleUrl: './proposals-list.component.css'
})
export class ProposalsListComponent implements OnInit {
  proposals: Proposal[] = [
    {
      product: 'Producto 1',
      proposedProduct: 'Producto Propuesto 1',
      description: 'Descripción del producto propuesto 1.',
      user: 'usuario1',
      status: 'Pendiente',
    },
    {
      product: 'Producto 2',
      proposedProduct: 'Producto Propuesto 2',
      description: 'Descripción del producto propuesto 2.',
      user: 'usuario2',
      status: 'Pendiente',
    },
    {
      product: 'Producto 3',
      proposedProduct: 'Producto Propuesto 3',
      description: 'Descripción del producto propuesto 3.',
      user: 'usuario3',
      status: 'Pendiente',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

