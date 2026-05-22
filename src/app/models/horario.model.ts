import { Curso } from './curso.model';

export interface Horario {
  idHorario?: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  idCurso: number;
  curso?: Curso;
}
