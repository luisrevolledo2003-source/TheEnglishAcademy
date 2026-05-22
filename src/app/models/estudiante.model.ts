import { Nivel } from './nivel.model';

export interface Estudiante {
  idEstudiante?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  idNivel: number;
  nivel?: Nivel;
}
