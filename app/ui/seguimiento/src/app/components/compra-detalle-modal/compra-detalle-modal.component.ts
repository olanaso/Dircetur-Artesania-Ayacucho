import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  PedidosResponse,
  Producto,
} from '../../interfaces/pedidos-response.interface';

@Component({
  selector: 'app-compra-detalle-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compra-detalle-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompraDetalleModalComponent {
  // Para el cierre del dialog y el envío de datos al componente padre
  private readonly dialogRef = inject(DialogRef<PedidosResponse>);
  // Data del todo seleccionado que se envía desde el componente padre
  private readonly data: PedidosResponse = inject(DIALOG_DATA);


  public pedido = computed(() => this.data);
  public productos = computed<Producto[]>(() =>
    JSON.parse(this.data.list_productos)
  );
  public totalPagado = computed(() =>
    this.productos().reduce((total: number, producto: Producto) => {
      return total + producto.subtotal;
    }, 0)
  );

  public close() {
    this.dialogRef.close();
  }
}
