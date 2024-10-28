// Define el tipo de estado posible
export type EstadoAtencion = 'pagado' | 'enviado' | 'finalizado';

// Interfaz para un elemento individual de atención
export interface Atencion {
    id: string;
    estado: EstadoAtencion;
    notificarCliente: boolean;
    enlaceSeguimiento: string;
    comentario: string;
    medioPrueba: string;
    fecha_atencion: string; // ISO 8601 date string
}
