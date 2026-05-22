import { Nivel } from './nivel.model';
import { TipoCurso } from './tipo-curso.model';
import { Aula } from './aula.model';

export interface Curso {
  idCurso?: number;
  nombre: string;
  descripcion: string;
  duracionHoras: number;
  costo: number;
  idNivel: number;
  nivel?: Nivel;
  idTipoCurso: number;
  tipoCurso?: TipoCurso;
  idAula: number;
  aula?: Aula;
}
