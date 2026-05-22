import { Estudiante } from './estudiante.model';
import { Nivel } from './nivel.model';

export interface Evaluacion {
  idEvaluacion?: number;
  tipo: string;
  calificacion: number;
  fecha: string;
  idEstudiante: number;
  estudiante?: Estudiante;
  idNivel: number;
  nivel?: Nivel;
}
