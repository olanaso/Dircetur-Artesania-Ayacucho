import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SeguimientoPedidoComponent } from './pages/seguimiento-pedido/seguimiento-pedido.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SeguimientoPedidoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
