import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TipoCurso } from '../models/tipo-curso.model';

@Injectable({
  providedIn: 'root'
})
export class TipoCursoService {
  private apiUrl = '/api/TiposCurso';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TipoCurso[]> {
    return this.http.get<TipoCurso[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<TipoCurso> {
    return this.http.get<TipoCurso>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(data: TipoCurso): Observable<TipoCurso> {
    return this.http.post<TipoCurso>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, data: TipoCurso): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
