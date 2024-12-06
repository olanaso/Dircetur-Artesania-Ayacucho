import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidosResponse } from '../../interfaces/pedidos-response.interface';
import { environment } from '../../../environments/environment';
import { PedidoItemComponent } from '../../components/pedido-item/pedido-item.component';

@Component({
  selector: 'app-seguimiento-pedido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PedidoItemComponent],
  templateUrl: './seguimiento-pedido.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeguimientoPedidoComponent implements OnInit {
  private webUrl = environment.webUrl;

  private pedidosService = inject(PedidosService);

  public codigoPedidoInput = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+$/),
  ]);

  public pedidos = signal<PedidosResponse[]>([]);

  public estaBuscandoPedido = signal<boolean>(false);
  public pedidoNoEncontrado = signal<boolean>(false);
  public errorTokenExpirado = signal<boolean>(false);

  ngOnInit() {
    this.obtenerQueryParams();
  }

  obtenerQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const idCliente = queryParams.get('idCliente');

    if (token && idCliente) {
      this.obtenerPedidosCliente(token, idCliente);
    } else {
      window.location.href = this.webUrl;
    }
  }

  buscarPedido() {
    if (this.codigoPedidoInput.invalid) {
      this.codigoPedidoInput.markAsTouched();
      return;
    }

    const valor = this.codigoPedidoInput.value;

    if (!valor) {
      return;
    }

    this.pedidoNoEncontrado.set(false);
    this.estaBuscandoPedido.set(true);
    this.pedidos.set([]);

    this.pedidosService.obtenerPedido(valor).subscribe({
      next: (pedido) => {
        this.pedidos.set([pedido]);
        this.estaBuscandoPedido.set(false);
      },
      error: (error) => {
        this.estaBuscandoPedido.set(false);
        this.pedidoNoEncontrado.set(true);
      },
    });
  }

  obtenerPedidosCliente(token: string, idCliente: string) {
    this.pedidosService
      .obtenerPedidosPorCliente(idCliente, token)
      .subscribe({
        next: (pedidos) => {
          this.pedidos.set(pedidos);
        },
        error: (error) => {
          this.errorTokenExpirado.set(true);
        }
      });
  }
}
