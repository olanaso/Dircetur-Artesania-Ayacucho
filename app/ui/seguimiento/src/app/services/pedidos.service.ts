import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidosResponse } from '../interfaces/pedidos-response.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() { }

  obtenerPedido(id: string):Observable<PedidosResponse> {
    return this.http.get<PedidosResponse>(`${this.apiUrl}/pedido/${id}`);
  }

}
