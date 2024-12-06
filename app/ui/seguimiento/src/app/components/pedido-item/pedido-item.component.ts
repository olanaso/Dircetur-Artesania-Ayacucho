import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { PedidosResponse } from '../../interfaces/pedidos-response.interface';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CompraDetalleModalComponent } from '../compra-detalle-modal/compra-detalle-modal.component';
import { Atencion } from '../../interfaces/lista-atencion.interface';

@Component({
  selector: 'app-pedido-item',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './pedido-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedidoItemComponent {
  private dialog = inject(Dialog);

  public pedido = input.required<PedidosResponse>();

  public totalPagado = computed<number>(() =>
    this.obtenerTotalPedido(this.pedido())
  );
  public listaAtencion = computed<Atencion[]>(() =>
    this.obtenerListaAtencion(this.pedido())
  );

  obtenerTotalPedido(pedido: PedidosResponse) {
    const productos = JSON.parse(pedido.list_productos);

    return productos.reduce((total: number, producto: any) => {
      return total + producto.subtotal;
    }, 0);
  }

  obtenerListaAtencion(pedido: PedidosResponse) {
    return JSON.parse(pedido.list_atencion);
  }

  obtenerColorEstado(estado: string): string {
    const colores = {
      pagado: 'bg-emerald-100 text-emerald-800',
      enviado: 'bg-violet-100 text-violet-800',
      finalizado: 'bg-blue-100 text-blue-800',
    };
    return (
      colores[estado as keyof typeof colores] || 'bg-gray-100 text-gray-800'
    );
  }

  abrirComprobanteModal(pedido: PedidosResponse) {
    this.dialog.open(CompraDetalleModalComponent, {
      data: pedido,
      width: '1000px',
    });
  }
}
