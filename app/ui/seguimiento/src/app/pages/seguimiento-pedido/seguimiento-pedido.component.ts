import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CompraDetalleModalComponent } from '../../components/compra-detalle-modal/compra-detalle-modal.component';
import { PedidosService } from '../../services/pedidos.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PedidosResponse } from '../../interfaces/pedidos-response.interface';
import { Atencion } from '../../interfaces/lista-atencion.interface';
import { RecaptchaModule, RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-seguimiento-pedido',
  standalone: true,
  imports: [CommonModule, DialogModule, ReactiveFormsModule],
  templateUrl: './seguimiento-pedido.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeguimientoPedidoComponent {
  private pedidosService = inject(PedidosService);
  private reCaptchaV3Service = inject(ReCaptchaV3Service);

  private dialog = inject(Dialog);

  public codigoPedidoInput = new FormControl('');

  public pedido = signal<PedidosResponse | null>(null);
  public totalPagado = signal<number>(0);
  public listaAtencion = signal<Atencion[]>([]);

  public estaBuscandoPedido = signal<boolean>(false);
  public pedidoNoEncontrado = signal<boolean>(false);

  abrirComprobanteModal(pedido: PedidosResponse) {
    this.dialog.open(CompraDetalleModalComponent, {
      data: pedido,
      width: '1000px',
    });
  }

  buscarPedido() {
    const valor = this.codigoPedidoInput.value;

    if (!valor) {
      return;
    }

    this.pedidoNoEncontrado.set(false);
    this.estaBuscandoPedido.set(true);
    this.pedido.set(null);

    this.pedidosService.obtenerPedido(valor).subscribe({
      next: (pedido) => {
        this.pedido.set(pedido);
        this.totalPagado.set(this.obtenerTotalPedido(pedido));

        const listaAtencion = this.obtenerListaAtencion(pedido);
        this.listaAtencion.set(listaAtencion);

        this.estaBuscandoPedido.set(false);
      },
      error: (error) => {
        console.error(error);
        this.estaBuscandoPedido.set(false);
        this.pedidoNoEncontrado.set(true);
      },
    });
  }

  obtenerTotalPedido(pedido: PedidosResponse) {
    const productos = JSON.parse(pedido.list_productos);

    return productos.reduce((total: number, producto: any) => {
      return total + producto.subtotal;
    }, 0);
  }

  obtenerListaAtencion(pedido: PedidosResponse) {
    return JSON.parse(pedido.list_atencion);
  }

  ejecutarRecaptcha() {
    console.log('Ejecutando reCaptcha');

    this.reCaptchaV3Service.execute('').subscribe({
      next: (token) => {
        console.log('Token: ', token);

        this.buscarPedido();
      },
      error: (error) => {
        console.error('Error: ', error);
      },
    });
  }

  ejecutarRecaptchaVisible( token: any ) {
    console.log('Token: ', token);

    this.buscarPedido();

  }
}
