import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Asistencia } from '../models/asistencia.model';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private apiUrl = '/api/Asistencias';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Asistencia> {
    return this.http.get<Asistencia>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(data: Asistencia): Observable<Asistencia> {
    return this.http.post<Asistencia>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, data: Asistencia): Observable<void> {
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
