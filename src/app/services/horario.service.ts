import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Horario } from '../models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl = '/api/Horarios';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  create(data: Horario): Observable<Horario> {
    return this.http.post<Horario>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  update(id: number, data: Horario): Observable<void> {
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
