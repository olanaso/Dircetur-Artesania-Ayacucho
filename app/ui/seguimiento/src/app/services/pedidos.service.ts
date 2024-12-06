import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidosResponse } from '../interfaces/pedidos-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() {}

  obtenerPedido(id: string): Observable<PedidosResponse> {
    return this.http.get<PedidosResponse>(`${this.apiUrl}/pedido/${id}`);
  }

  obtenerPedidosPorCliente( idCliente: string, token: string ): Observable<PedidosResponse[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const params = new HttpParams().set('idCliente', idCliente);

    const url = `${this.apiUrl}/pedidos-cliente`;

    return this.http.get<PedidosResponse[]>(url, { headers, params });
  }
}
