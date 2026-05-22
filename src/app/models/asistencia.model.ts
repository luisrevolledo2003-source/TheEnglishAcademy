import { Estudiante } from './estudiante.model';
import { Curso } from './curso.model';

export interface Asistencia {
  idAsistencia?: number;
  fecha: string;
  presente: boolean;
  idEstudiante: number;
  estudiante?: Estudiante;
  idCurso: number;
  curso?: Curso;
}
