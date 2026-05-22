import { Estudiante } from './estudiante.model';
import { MetodoPago } from './metodo-pago.model';

export interface Pago {
  idPago?: number;
  monto: number;
  fechaPago: string;
  estadoTransaccion: string;
  idEstudiante: number;
  estudiante?: Estudiante;
  idMetodoPago: number;
  metodoPago?: MetodoPago;
}
