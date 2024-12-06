export interface PedidosResponse {
  num_pedido:             number;
  fecha_pedido:           Date;
  list_productos:         string;
  imagen_pago:            string;
  list_reclamo:           string;
  comprobante_solic:      null;
  estado:                 string;
  list_atencion:          string;
  usuariocreacion_id:     null;
  usuariomodificacion_id: null;
  createdAt:              null;
  updatedAt:              Date;
  cliente:                Cliente;
  artesano?:              Artesano;
}

export interface Artesano {
  nombres:   string;
  apellidos: string;
  id:        number;
  celular:   string;
  telefonos: null;
}

export interface Cliente {
  nombres:          string;
  apellidos:        string;
  numero_documento: string;
  correo:           string;
  telefono:         string;
  tipo_documento:   string;
  direccion:        string;
  pais:             string;
  region:           string;
  ciudad:           string;
}

export interface Producto {
  nombre: string;
  precio_unitario: number;
  cantidad: number;
  subtotal: number;
  descripcion: string;
}
