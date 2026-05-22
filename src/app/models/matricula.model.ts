import { Estudiante } from './estudiante.model';
import { Curso } from './curso.model';

export interface Matricula {
  idMatricula?: number;
  fechaInscripcion: string;
  estado: string;
  idEstudiante: number;
  estudiante?: Estudiante;
  idCurso: number;
  curso?: Curso;
}
